"use client";

import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   COLOR SCIENCE HELPERS
============================================================ */

function xyY_to_XYZ([x, y, Y]: number[]) {
  if (y === 0) return [0, 0, 0];
  return [(x * Y) / y, Y, ((1 - x - y) * Y) / y];
}

function XYZ_to_sRGB([X, Y, Z]: number[]) {
  let r = 3.2406 * X - 1.5372 * Y - 0.4986 * Z;
  let g = -0.9689 * X + 1.8758 * Y + 0.0415 * Z;
  let b = 0.0557 * X - 0.204 * Y + 1.057 * Z;

  const max = Math.max(r, g, b);
  if (max > 0) {
    r /= max;
    g /= max;
    b /= max;
  }

  const compand = (c: number) =>
    c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

  return [r, g, b].map(v => Math.max(0, Math.min(1, compand(v))));
}

/* ============================================================
   SPECTRAL LOCUS (SIMPLIFIED / STABLE)
============================================================ */

const SPECTRAL_LOCUS: Record<number, [number, number]> = {
  620: [0.6915, 0.3083],
  625: [0.7006, 0.2993],
  630: [0.7079, 0.292],
  635: [0.714, 0.2859],
};

function dominantWavelength(x: number, y: number) {
  let best = { wl: "Purple", dist: Infinity };
  Object.entries(SPECTRAL_LOCUS).forEach(([wl, [xl, yl]]) => {
    const d = Math.hypot(x - xl, y - yl);
    if (d < best.dist) best = { wl: `${wl} nm`, dist: d };
  });
  return best.dist < 0.06 ? best.wl : "Purple";
}

/* ============================================================
   DEFAULT DATA
============================================================ */

const defaultPolygon = (idx: number) =>
  Array.from({ length: 4 }, (_, i) => [
    0.4326 + idx * 0.01 + i * 0.005,
    0.38 - idx * 0.01 - i * 0.005,
  ]);

const COLORS = [
  "#00E5FF",
  "#FFFFFF",
  "#7CFF00",
  "#FFD700",
  "#B388FF",
  "#FF80AB"
];

/* ============================================================
   MAIN COMPONENT
============================================================ */

interface CIEComparatorProps {
  isDemo?: boolean;
}

export default function CIEComparator({ isDemo = false }: CIEComparatorProps) {
  const [showSidebar, setShowSidebar] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [sets, setSets] = useState(
    Array.from({ length: isDemo ? 1 : 2 }, (_, i) => ({
      name: `LED Set ${i + 1}`,
      points: defaultPolygon(i),
    }))
  );

  const [numSets, setNumSets] = useState(isDemo ? 1 : 2);
  const [showPoints, setShowPoints] = useState(true);
  const [showBorders, setShowBorders] = useState(true);
  const [showFill, setShowFill] = useState(false);
  const [showCentroids, setShowCentroids] = useState(true);
  const [showWavelengths, setShowWavelengths] = useState(true);
  const [autoZoom, setAutoZoom] = useState(true);

  /* ============================================================
     RESPONSIVE CANVAS RESIZING
  ============================================================ */
  const [canvasSize, setCanvasSize] = useState({ w: 900, h: 720 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const newW = Math.min(width - 48, 900);
        const newH = newW * 0.8; // Maintain 5:4 aspect ratio
        setCanvasSize({ w: newW, h: newH });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ============================================================
     KEEP SET COUNT IN SYNC (UP TO 6)
  ============================================================ */
  useEffect(() => {
    const maxSets = isDemo ? 1 : 6;
    const finalNum = Math.min(numSets, maxSets);
    
    setSets(prev => {
      const next = [...prev];
      while (next.length < finalNum)
        next.push({ name: `LED Set ${next.length + 1}`, points: defaultPolygon(next.length) });
      while (next.length > finalNum) next.pop();
      return next;
    });
  }, [numSets, isDemo]);

  /* ============================================================
     DRAW ENGINE
  ============================================================ */
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    
    // Scale canvas for high DPI
    const dpr = window.devicePixelRatio || 1;
    c.width = canvasSize.w * dpr;
    c.height = canvasSize.h * dpr;
    const ctx = c.getContext("2d", { alpha: false })!;
    ctx.scale(dpr, dpr);

    draw(ctx, canvasSize.w, canvasSize.h);
  }, [
    sets,
    showPoints,
    showBorders,
    showFill,
    showCentroids,
    showWavelengths,
    autoZoom,
    canvasSize
  ]);

  function draw(ctx: CanvasRenderingContext2D, W: number, H: number) {
    /* ------------------ AUTO ZOOM ------------------ */
    let xMin = 0, xMax = 0.8, yMin = 0, yMax = 0.9;

    if (autoZoom) {
      const allPts = sets.flatMap(s => s.points);
      if (allPts.length) {
        xMin = Math.min(...allPts.map(p => p[0])) - 0.05;
        xMax = Math.max(...allPts.map(p => p[0])) + 0.05;
        yMin = Math.min(...allPts.map(p => p[1])) - 0.05;
        yMax = Math.max(...allPts.map(p => p[1])) + 0.05;
      }
    }

    /* ------------------ BACKGROUND (OFFSCREEN RENDERING) ------------------ */
    // We use an offscreen canvas for the heavy per-pixel math to avoid putImageData scaling issues
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement("canvas");
    }
    const off = offscreenCanvasRef.current;
    if (off.width !== Math.floor(W) || off.height !== Math.floor(H)) {
        off.width = Math.floor(W);
        off.height = Math.floor(H);
    }
    const octx = off.getContext("2d")!;
    const img = octx.createImageData(off.width, off.height);
    
    const w = off.width;
    const h = off.height;

    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        const x = xMin + (i / w) * (xMax - xMin);
        const y = yMin + (1 - j / h) * (yMax - yMin);
        const [X, Y, Z] = xyY_to_XYZ([x, y, 1]);
        const [r, g, b] = XYZ_to_sRGB([X, Y, Z]);
        const idx = (j * w + i) * 4;
        img.data[idx] = r * 255;
        img.data[idx + 1] = g * 255;
        img.data[idx + 2] = b * 255;
        img.data[idx + 3] = 255;
      }
    }
    octx.putImageData(img, 0, 0);
    
    // Draw the background
    ctx.drawImage(off, 0, 0, W, H);

    const toCanvas = ([x, y]: number[]) => [
      ((x - xMin) / (xMax - xMin)) * W,
      H - ((y - yMin) / (yMax - yMin)) * H,
    ];

    /* ------------------ PLOTS ------------------ */
    sets.forEach((set, si) => {
      const color = COLORS[si % COLORS.length];
      const pts = set.points.map(toCanvas);

      if (showFill && pts.length >= 3) {
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.fillStyle = color + "44"; // Add transparency
        ctx.fill();
      }

      if (showBorders && pts.length >= 2) {
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      if (showPoints) {
        set.points.forEach((p, pi) => {
          const [x, y] = toCanvas(p);
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();

          if (showWavelengths) {
            ctx.fillStyle = "#fff";
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(0,0,0,0.5)";
            ctx.font = "bold 10px Inter, sans-serif";
            ctx.fillText(`(${p[0].toFixed(4)}, ${p[1].toFixed(4)})`, x + 8, y + 4);
            ctx.shadowBlur = 0;
          }
        });
      }

      if (showCentroids && set.points.length > 0) {
        const cx = set.points.reduce((s, p) => s + p[0], 0) / set.points.length;
        const cy = set.points.reduce((s, p) => s + p[1], 0) / set.points.length;
        const [x, y] = toCanvas([cx, cy]);

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 8, y - 8); ctx.lineTo(x + 8, y + 8);
        ctx.moveTo(x + 8, y - 8); ctx.lineTo(x - 8, y + 8);
        ctx.stroke();
      }
    });
  }

  function downloadPNG() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "cie_chromaticity.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function downloadCSV() {
    let csv = "Set,Point,x,y,Wavelength\n";
    sets.forEach((set, si) => {
      set.points.forEach((p, pi) => {
        const wl = dominantWavelength(p[0], p[1]);
        csv += `${set.name},P${pi + 1},${p[0]},${p[1]},${wl}\n`;
      });
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cie_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Tool Configuration</h2>
        <button onClick={() => setShowSidebar(false)} className="md:hidden text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {/* SET COUNT */}
        <section>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
            Dataset Count (Max 6)
          </label>
          <input
            type="number"
            min={1}
            max={6}
            value={numSets}
            onChange={e => setNumSets(Number(e.target.value))}
            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-brand-accent outline-none transition"
          />
        </section>

        {/* LED SETS */}
        <div className="space-y-4">
          {sets.map((s, si) => (
            <div key={si} className="p-3 bg-neutral-900/50 rounded-lg border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[si % COLORS.length] }}></div>
                <input
                  type="text"
                  value={s.name}
                  onChange={e => {
                    const v = e.target.value;
                    setSets(prev => {
                      const c = [...prev];
                      c[si].name = v;
                      return c;
                    });
                  }}
                  className="bg-transparent border-b border-transparent hover:border-white/20 focus:border-brand-accent outline-none text-xs font-bold text-gray-300 uppercase w-full"
                />
              </div>

              <div className="space-y-2">
                {s.points.map((p, pi) => (
                  <div key={pi} className="grid grid-cols-5 gap-2 items-center text-[10px]">
                    <span className="text-gray-500 font-mono">P{pi + 1}</span>
                    <div className="col-span-2 relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600">x</span>
                      <input
                        type="number"
                        step="0.0001"
                        value={p[0]}
                        onChange={e => {
                          const v = Number(e.target.value);
                          setSets(prev => {
                            const c = [...prev];
                            c[si].points[pi][0] = v;
                            return c;
                          });
                        }}
                        className="w-full bg-black/40 border border-white/5 rounded pl-5 pr-1 py-1 text-center"
                      />
                    </div>
                    <div className="col-span-2 relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600">y</span>
                      <input
                        type="number"
                        step="0.0001"
                        value={p[1]}
                        onChange={e => {
                          const v = Number(e.target.value);
                          setSets(prev => {
                            const c = [...prev];
                            c[si].points[pi][1] = v;
                            return c;
                          });
                        }}
                        className="w-full bg-black/40 border border-white/5 rounded pl-5 pr-1 py-1 text-center"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* VISUAL CONTROLS */}
        <section>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Display Settings</div>
          <div className="grid grid-cols-1 gap-2">
            {[
              { label: "Auto-zoom View", val: autoZoom, set: setAutoZoom },
              { label: "Show Data Points", val: showPoints, set: setShowPoints },
              { label: "Outline Polygons", val: showBorders, set: setShowBorders },
              { label: "Fill Areas", val: showFill, set: setShowFill },
              { label: "Plot Centroids", val: showCentroids, set: setShowCentroids },
              { label: "Show Coordinates", val: showWavelengths, set: setShowWavelengths },
            ].map((ctrl, i) => (
              <label key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer transition">
                <span className="text-sm text-gray-400">{ctrl.label}</span>
                <input
                  type="checkbox"
                  checked={ctrl.val}
                  onChange={e => ctrl.set(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-neutral-900 text-brand-accent focus:ring-brand-accent"
                />
              </label>
            ))}
          </div>
        </section>
      </div>

      {/* EXPORT ACTIONS */}
      <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 gap-3">
        <button
          onClick={downloadPNG}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 transition border border-white/10"
        >
          <svg className="w-5 h-5 mb-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span className="text-[10px] font-bold uppercase">PNG</span>
        </button>
        <button
          onClick={downloadCSV}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 transition border border-white/10"
        >
          <svg className="w-5 h-5 mb-1 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span className="text-[10px] font-bold uppercase">CSV</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col md:flex-row overflow-hidden">
      {/* MOBILE HEADER */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-white/10 bg-brand-panel z-40">
        <div className="flex items-center gap-3">
          <a href="/" className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </a>
          <span className="font-bold tracking-tight">CIE 1931</span>
        </div>
        <button 
          onClick={() => setShowSidebar(true)}
          className="p-2 rounded-lg bg-brand-accent text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
        </button>
      </header>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:block w-80 p-6 border-r border-white/10 bg-brand-panel/50 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-8">
           <a href="/" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           </a>
           <h1 className="font-bold text-xl">Xuanlabs</h1>
        </div>
        <SidebarContent />
      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSidebar(false)}></div>
          <div className="absolute inset-y-0 right-0 w-80 bg-brand-panel p-6 shadow-2xl animate-slideLeft">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT */}
      <main ref={containerRef} className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-neutral-950/50">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition"></div>
          <div className="relative bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <canvas
              ref={canvasRef}
              style={{ width: canvasSize.w, height: canvasSize.h }}
              className="block cursor-crosshair"
            />
          </div>
          
          <div className="mt-4 flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-widest px-2">
            <span>CIE 1931 Standard Observer</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> sRGB Gamut</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> D65 Point</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

