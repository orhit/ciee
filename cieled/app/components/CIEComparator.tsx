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
    0.68 + idx * 0.01 + i * 0.005,
    0.3 - idx * 0.01 - i * 0.005,
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

export default function CIEComparator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [sets, setSets] = useState(
    Array.from({ length: 2 }, (_, i) => ({
      name: `LED Set ${i + 1}`,
      points: defaultPolygon(i),
    }))
  );

  const [numSets, setNumSets] = useState(2);

  const [showPoints, setShowPoints] = useState(true);
  const [showBorders, setShowBorders] = useState(true);
  const [showFill, setShowFill] = useState(false);
  const [showCentroids, setShowCentroids] = useState(true);
  const [showWavelengths, setShowWavelengths] = useState(true);
  const [autoZoom, setAutoZoom] = useState(true);

  /* ============================================================
     KEEP SET COUNT IN SYNC (UP TO 6)
  ============================================================ */

  useEffect(() => {
    setSets(prev => {
      const next = [...prev];
      while (next.length < numSets)
        next.push({ name: `LED Set ${next.length + 1}`, points: defaultPolygon(next.length) });
      while (next.length > numSets) next.pop();
      return next;
    });
  }, [numSets]);

  /* ============================================================
     DRAW ENGINE
  ============================================================ */

  useEffect(() => draw(), [
    sets,
    showPoints,
    showBorders,
    showFill,
    showCentroids,
    showWavelengths,
    autoZoom,
  ]);

  function draw() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const W = c.width;
    const H = c.height;

    ctx.clearRect(0, 0, W, H);

    /* ------------------ AUTO ZOOM ------------------ */
    let xMin = 0, xMax = 0.8, yMin = 0, yMax = 0.9;

    if (autoZoom) {
      const allPts = sets.flatMap(s => s.points);
      if (allPts.length) {
        xMin = Math.min(...allPts.map(p => p[0])) - 0.02;
        xMax = Math.max(...allPts.map(p => p[0])) + 0.02;
        yMin = Math.min(...allPts.map(p => p[1])) - 0.02;
        yMax = Math.max(...allPts.map(p => p[1])) + 0.02;
      }
    }

    /* ------------------ BACKGROUND ------------------ */
    const img = ctx.createImageData(W, H);
    for (let j = 0; j < H; j++) {
      for (let i = 0; i < W; i++) {
        const x = xMin + (i / W) * (xMax - xMin);
        const y = yMin + (1 - j / H) * (yMax - yMin);
        const [X, Y, Z] = xyY_to_XYZ([x, y, 1]);
        const [r, g, b] = XYZ_to_sRGB([X, Y, Z]);
        const idx = (j * W + i) * 4;
        img.data[idx] = r * 255;
        img.data[idx + 1] = g * 255;
        img.data[idx + 2] = b * 255;
        img.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);

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
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (showBorders && pts.length >= 2) {
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (showPoints) {
        set.points.forEach((p, pi) => {
          const [x, y] = toCanvas(p);
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          ctx.fill();
          ctx.stroke();

          if (showWavelengths) {
            ctx.fillStyle = "#fff";
            ctx.font = "11px monospace";
            ctx.fillText(dominantWavelength(p[0], p[1]), x + 8, y + 4);
          }
        });
      }

      if (showCentroids) {
        const cx = set.points.reduce((s, p) => s + p[0], 0) / set.points.length;
        const cy = set.points.reduce((s, p) => s + p[1], 0) / set.points.length;
        const [x, y] = toCanvas([cx, cy]);

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 8, y - 8);
        ctx.lineTo(x + 8, y + 8);
        ctx.moveTo(x + 8, y - 8);
        ctx.lineTo(x - 8, y + 8);
        ctx.stroke();
      }
    });
  }

  /* ============================================================
     UI
  ============================================================ */
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
  return (
    <div className="h-screen flex bg-neutral-950 text-white">
      {/* SIDEBAR */}
     <aside className="w-80 p-5 border-r border-white/10 bg-neutral-950 overflow-y-auto hidden md:block">
  <h2 className="text-lg font-semibold mb-6">LED Sets</h2>

  {/* SET COUNT */}
  <div className="mb-6">
    <label className="text-xs text-gray-400 block mb-1">
      Number of sets (max 6)
    </label>
    <input
      type="number"
      min={1}
      max={6}
      value={numSets}
      onChange={e => setNumSets(Number(e.target.value))}
      className="w-full bg-neutral-900 border border-white/10 rounded-md px-3 py-2 text-sm"
    />
  </div>

  {/* LED SETS */}
  {sets.map((s, si) => (
    <div key={si} className="mb-6">
      <div className="text-sm font-medium text-gray-300 mb-2">
        {s.name}
      </div>

      <div className="space-y-2">
        {s.points.map((p, pi) => (
          <div key={pi} className="grid grid-cols-3 gap-2 items-center text-xs">
            <span className="text-gray-400">P{pi + 1}</span>
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
              className="bg-neutral-900 border border-white/10 rounded px-2 py-1"
            />
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
              className="bg-neutral-900 border border-white/10 rounded px-2 py-1"
            />
          </div>
        ))}
      </div>
    </div>
  ))}

  {/* DISPLAY CONTROLS */}
  <div className="mb-6">
    <div className="text-xs text-gray-400 mb-2">Display</div>
    <div className="grid grid-cols-2 gap-2 text-sm">
      <label><input type="checkbox" checked={autoZoom} onChange={e => setAutoZoom(e.target.checked)} /> Auto zoom</label>
      <label><input type="checkbox" checked={showPoints} onChange={e => setShowPoints(e.target.checked)} /> Points</label>
      <label><input type="checkbox" checked={showBorders} onChange={e => setShowBorders(e.target.checked)} /> Borders</label>
      <label><input type="checkbox" checked={showFill} onChange={e => setShowFill(e.target.checked)} /> Fill</label>
      <label><input type="checkbox" checked={showCentroids} onChange={e => setShowCentroids(e.target.checked)} /> Centroids</label>
      <label><input type="checkbox" checked={showWavelengths} onChange={e => setShowWavelengths(e.target.checked)} /> Wavelength</label>
    </div>
  </div>

  {/* EXPORT */}
  <div className="border-t border-white/10 pt-4 space-y-2">
    <button
      onClick={downloadPNG}
      className="w-full bg-neutral-800 hover:bg-neutral-700 transition rounded-md py-2 text-sm"
    >
      Export PNG
    </button>
    <button
      onClick={downloadCSV}
      className="w-full bg-neutral-800 hover:bg-neutral-700 transition rounded-md py-2 text-sm"
    >
      Export CSV
    </button>
  </div>
</aside>

      {/* CANVAS */}
      <main className="flex-1 flex items-center justify-center p-4">
        <canvas
          ref={canvasRef}
          width={900}
          height={720}
          className="rounded bg-neutral-900 shadow-inner"
        />
      </main>
    </div>
  );
}
