export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg text-gray-100">

      {/* ================= NAVBAR ================= */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-semibold tracking-wide">
            Xuanlabs
          </div>

          <nav className="hidden md:flex gap-6 text-sm text-gray-300">
            <a href="#tools" className="hover:text-white">Tools</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#usecases" className="hover:text-white">Use cases</a>
            {/* <a
              href="/tool"
              className="text-white font-medium"
            >
              Launch Tool
            </a> */}
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Engineering tools for real-world problem solvers
            <span className="block text-gray-400 mt-3 text-2xl">
              Built by Xuanlabs for engineers working across hardware, software, data, and validation.
            </span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg max-w-xl">
            Xuanlabs builds{" "}
            <strong>focused, no-nonsense tools</strong> —
            that help engineers move faster from <strong>color science and optics to validation, data analysis, automation, and internal workflows.</strong>.
            Our tools are designed for teams who prefer clarity over complexity and results over buzzwords.
          </p>

          <p className="mt-4 text-gray-400 max-w-xl">
            No heavy software. No messy setups.
Just open, build, analyze, and ship.
          </p>

          <div className="mt-8 flex gap-4">
            {/* <a
              href="/tool"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md
                         bg-brand-accent text-white font-medium
                         hover:bg-blue-500 transition"
            >
              Launch Tool
            </a> */}

            <a
              href="#tools"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md
                         border border-white/20 text-gray-200
                         hover:border-white/40 transition"
            >
              View Tool Suite
            </a>
          </div>
        </div>

        {/* Visual placeholder */}
       <div className="hidden md:block">
  <div className="relative aspect-video rounded-xl border border-white/10 bg-brand-panel overflow-hidden">

    {/* SVG system */}
    <svg
      viewBox="0 0 600 360"
      className="w-full h-full"
      aria-hidden
    >
      {/* Grid */}
      <defs>
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="rgba(255,255,255,0.035)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="600" height="360" fill="url(#grid)" />

      {/* Connection lines */}
      <g className="opacity-60">
        <line
          x1="140"
          y1="90"
          x2="360"
          y2="200"
          className="stroke-blue-400/40 animate-lineFade"
          strokeWidth="1.5"
        />
        <line
          x1="200"
          y1="260"
          x2="360"
          y2="200"
          className="stroke-pink-400/30 animate-lineFade delay-2000"
          strokeWidth="1.5"
        />
      </g>

      {/* Drifting points */}
      <circle
        cx="140"
        cy="90"
        r="5"
        className="fill-blue-400 animate-driftSlow"
      />
      <circle
        cx="200"
        cy="260"
        r="4"
        className="fill-pink-400 animate-driftSlow delay-3000"
      />
      <circle
        cx="420"
        cy="120"
        r="4"
        className="fill-purple-400 animate-driftSlow delay-5000"
      />

      {/* Focus / analysis region */}
      <circle
        cx="360"
        cy="200"
        r="10"
        className="fill-emerald-400"
      />
      <circle
        cx="360"
        cy="200"
        r="24"
        className="stroke-emerald-400/30 fill-none animate-focusPulse"
        strokeWidth="1.5"
      />
    </svg>
  </div>
</div>

      </section>

      {/* ================= TOOL CATALOG ================= */}
      <section id="tools" className="bg-brand-panel py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10">
            Xuanlabs Engineering Tool Suite
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {/* ACTIVE TOOL */}
            <div className="rounded-xl border border-white/10 bg-black/30 p-6">
              <div className="text-sm text-blue-400 mb-2">
                Available now
              </div>
              <h3 className="font-semibold mb-2">
                CIE 1931 Chromaticity Comparator
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Visualize, compare, and validate LED & display color accuracy
                using the CIE 1931 diagram.
              </p>
              <a
                href="/tool"
                className="text-blue-400 text-sm hover:underline"
              >
                Launch →
              </a>
            </div>

            {/* COMING SOON */}
            <div className="rounded-xl border border-white/10 bg-black/10 p-6 opacity-70">
              <div className="text-sm text-gray-500 mb-2">
                Coming soon
              </div>
              <h3 className="font-semibold mb-2">
                Color Tolerance & Δu′v′ Analyzer
              </h3>
              <p className="text-gray-400 text-sm">
                Quantitative tolerance checks for compliance,
                QA, and customer specifications.
              </p>
            </div>

            {/* COMING SOON */}
            <div className="rounded-xl border border-white/10 bg-black/10 p-6 opacity-70">
              <div className="text-sm text-gray-500 mb-2">
                Coming soon
              </div>
              <h3 className="font-semibold mb-2">
                LED Bin Spread Visualizer
              </h3>
              <p className="text-gray-400 text-sm">
                Batch-to-batch chromaticity spread visualization
                for manufacturing and sourcing teams.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10">
            Built for real engineering workflows
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-300">
            <ul className="space-y-4">
              <li>⚡ Rapid LED bin & batch comparison</li>
              <li>📐 Visual color tolerance & compliance checks</li>
              <li>🧠 Centroid, purity & dominant wavelength analysis</li>
            </ul>

            <ul className="space-y-4">
              <li>📤 Export-ready visuals for PPTs & reports</li>
              <li>🌐 Browser-based — no MATLAB, no licenses</li>
              <li>🔒 Secure internal & customer-facing access</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section id="usecases" className="bg-brand-panel py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-10">
            Used in
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>• LED manufacturing & binning</div>
            <div>• Display & lighting R&D</div>
            <div>• Optical QA & validation</div>
            <div>• Embedded & sensor systems</div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">
            Ready to validate color — properly?
          </h2>

          <p className="mt-4 text-gray-300">
            Launch the CIE 1931 Comparator and start analyzing
            LED chromaticity with confidence.
          </p>

          <div className="mt-8">
            <a
              href="/app"
              className="inline-flex items-center justify-center px-8 py-4 rounded-md
                         bg-brand-accent text-white font-medium text-lg
                         hover:bg-blue-500 transition"
            >
              Launch Tool
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Xuanlabs · Engineering-grade color tools
        </div>
      </footer>
    </main>
  );
}
