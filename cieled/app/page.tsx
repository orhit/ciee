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
            <a
              href="/app"
              className="text-white font-medium"
            >
              Launch Tool
            </a>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Engineering tools for color, optics & validation
            <span className="block text-gray-400 mt-3 text-2xl">
              Built by Xuanlabs for real hardware workflows
            </span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg max-w-xl">
            Our first tool — the{" "}
            <strong>CIE 1931 Chromaticity Comparator</strong> —
            helps hardware teams visually validate and communicate
            color accuracy <strong>in minutes, not hours</strong>.
          </p>

          <p className="mt-4 text-gray-400 max-w-xl">
            No heavy software. No complex setup.
            Just open, plot, and analyze.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/app"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md
                         bg-brand-accent text-white font-medium
                         hover:bg-blue-500 transition"
            >
              Launch Tool
            </a>

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
          <div
            className="aspect-video rounded-xl bg-gradient-to-br
                       from-blue-500/10 via-purple-500/10 to-pink-500/10
                       border border-white/10"
          />
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
                href="/app"
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
