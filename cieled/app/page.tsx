export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg text-gray-100">

      {/* ================= NAVBAR ================= */}
      <header className="border-b border-white/10 sticky top-0 bg-brand-bg/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-semibold tracking-wide text-xl">
            Xuanlabs
          </div>

          <nav className="hidden md:flex gap-8 text-sm text-gray-300 items-center">
            <a href="#demo" className="hover:text-white transition">Demo</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a
              href="/tool"
              className="bg-brand-accent px-4 py-2 rounded-md text-white font-medium hover:bg-blue-500 transition"
            >
              Launch Tool
            </a>
          </nav>

          {/* Mobile Launch */}
          <a
            href="/tool"
            className="md:hidden bg-brand-accent px-3 py-1.5 rounded-md text-sm text-white font-medium"
          >
            Launch
          </a>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Precision Color <br />
            <span className="text-brand-accent">Engineering Tools</span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-xl mx-auto md:mx-0">
            Built for engineers working across hardware, software, and validation. 
            Move faster from <strong>color science to production-ready results</strong>.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/tool"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg
                         bg-brand-accent text-white font-semibold text-lg
                         hover:bg-blue-600 transition shadow-lg shadow-blue-500/20"
            >
              Try the Tool
            </a>

            <a
              href="mailto:contact@xuanlabs.info?subject=Request for Demo"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg
                         border border-white/20 text-gray-200 font-semibold text-lg
                         hover:bg-white/5 transition"
            >
              Contact for Demo
            </a>
          </div>
        </div>

        {/* Visual placeholder */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative aspect-video rounded-xl border border-white/10 bg-brand-panel overflow-hidden shadow-2xl">
            {/* Animated SVG (keeping your existing cool animation) */}
            <svg viewBox="0 0 600 360" className="w-full h-full" aria-hidden>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="600" height="360" fill="url(#grid)" />
              <g className="opacity-60">
                <line x1="140" y1="90" x2="360" y2="200" className="stroke-blue-400/40 animate-lineFade" strokeWidth="1.5" />
                <line x1="200" y1="260" x2="360" y2="200" className="stroke-pink-400/30 animate-lineFade delay-2000" strokeWidth="1.5" />
              </g>
              <circle cx="140" cy="90" r="5" className="fill-blue-400 animate-driftSlow" />
              <circle cx="200" cy="260" r="4" className="fill-pink-400 animate-driftSlow delay-3000" />
              <circle cx="420" cy="120" r="4" className="fill-purple-400 animate-driftSlow delay-5000" />
              <circle cx="360" cy="200" r="10" className="fill-emerald-400" />
              <circle cx="360" cy="200" r="24" className="stroke-emerald-400/30 fill-none animate-focusPulse" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* ================= LIVE DEMO SECTION ================= */}
      <section id="demo" className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Precision</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            See how our CIE 1931 Chromaticity Comparator handles real-time data visualization. 
            This is a preview of the core engine used by top optical engineers.
          </p>
          
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-brand-panel p-4 md:p-8 shadow-2xl">
            <div className="aspect-[16/9] bg-neutral-900 rounded-lg flex items-center justify-center relative group">
               <img 
                 src="/api/placeholder/800/450" 
                 alt="Tool Demo Screenshot" 
                 className="rounded opacity-50 group-hover:opacity-40 transition"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <a href="/demo" className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    Try Demo Mode
                  </a>
               </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 uppercase tracking-widest italic">
              Demo mode limited to 1 LED set. Professional subscription required for full access.
            </p>
          </div>
        </div>
      </section>

      {/* ================= UPCOMING PROJECTS ================= */}
      <section className="py-24 border-y border-white/5 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineering Roadmap</h2>
              <p className="text-gray-400">We are expanding our suite of precision tools. Stay tuned for these upcoming releases designed for advanced hardware validation.</p>
            </div>
            <div className="text-brand-accent font-mono text-sm tracking-tighter bg-brand-accent/10 px-4 py-2 rounded-full border border-brand-accent/20">
              PIPELINE v1.4
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-brand-panel/30 group hover:border-brand-accent/50 transition duration-500">
              <div className="w-12 h-12 bg-white/5 rounded-xl mb-6 flex items-center justify-center text-gray-400 group-hover:text-brand-accent transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Luminous Flux Calc</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Advanced integration engine for calculating total hemispherical power from goniophotometric data.</p>
              <div className="mt-6 inline-flex items-center text-xs font-bold text-gray-600 uppercase tracking-widest">Coming Q3 2026</div>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-brand-panel/30 group hover:border-brand-accent/50 transition duration-500">
              <div className="w-12 h-12 bg-white/5 rounded-xl mb-6 flex items-center justify-center text-gray-400 group-hover:text-brand-accent transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2-2 0 00-2 2v10a2-2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Thermal Derating Tool</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Predict LED life and color shift over temperature using manufacturer-specific junction modeling.</p>
              <div className="mt-6 inline-flex items-center text-xs font-bold text-gray-600 uppercase tracking-widest">Coming Q4 2026</div>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-brand-panel/30 group hover:border-brand-accent/50 transition duration-500">
              <div className="w-12 h-12 bg-white/5 rounded-xl mb-6 flex items-center justify-center text-gray-400 group-hover:text-brand-accent transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Spectrum Analyzer</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Direct SPD file import with TM-30-18 and CRI (R1-R15) fidelity reporting.</p>
              <div className="mt-6 inline-flex items-center text-xs font-bold text-gray-600 uppercase tracking-widest">Coming Early 2027</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT IS INSIDE ================= */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">What is inside?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2-2 0 00-2-2H5a2-2 0 00-2 2v6a2-2 0 002 2h2a2-2 0 002-2zm0 0V9a2-2 0 012-2h2a2-2 0 012 2v10m-6 0a2-2 0 002 2h2a2-2 0 002-2m0 0V5a2-2 0 012-2h2a2-2 0 012 2v14a2-2 0 01-2 2h-2a2-2 0 01-2-2z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">CIE 1931 Chromaticity Diagram</h3>
                    <p className="text-gray-400">High-fidelity rendering of the spectral locus with real-time coordinate plotting.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Centroid & Delta Analysis</h3>
                    <p className="text-gray-400">Automatically calculate centers of gravity for LED bins and visualize color shifts.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Export-Ready Reports</h3>
                    <p className="text-gray-400">One-click PNG and CSV exports formatted specifically for engineering reports.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-brand-panel rounded-2xl border border-white/10 p-2 overflow-hidden shadow-2xl rotate-1">
               <div className="bg-neutral-900 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-white/5 rounded w-3/4"></div>
                    <div className="h-4 bg-white/5 rounded w-1/2"></div>
                    <div className="grid grid-cols-3 gap-2 py-4">
                      <div className="aspect-square bg-blue-500/20 rounded"></div>
                      <div className="aspect-square bg-purple-500/20 rounded"></div>
                      <div className="aspect-square bg-emerald-500/20 rounded"></div>
                    </div>
                    <div className="h-4 bg-white/5 rounded w-full"></div>
                    <div className="h-4 bg-white/5 rounded w-2/3"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING / SUBSCRIPTION PREVIEW ================= */}
      <section id="pricing" className="py-24 bg-brand-panel">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Scalable Pricing</h2>
          <p className="text-gray-400 mb-16">Choose the plan that fits your engineering workflow.</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl border border-white/10 bg-black/20 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Individual</h3>
              <div className="text-3xl font-bold mb-4">$0 <span className="text-sm font-normal text-gray-500">/mo</span></div>
              <ul className="text-gray-400 text-sm space-y-3 mb-8 text-left flex-1">
                <li className="flex items-center gap-2">✓ Basic CIE Plotting</li>
                <li className="flex items-center gap-2">✓ 1 LED Sets Max</li>
                <li className="flex items-center gap-2">✓ CSV & PDF Exports</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-white/20 hover:bg-white/5 transition"><a 
                href="mailto:contact@xuanlabs.info?subject=Enterprise Inquiry" 
                className="w-full py-3 rounded-lg border border-white/20 hover:bg-white/5 transition block text-center"
              >Start Free</a></button>
            </div>
 

            
            <div className="p-8 rounded-2xl border-2 border-brand-accent bg-black/40 relative flex flex-col transform md:scale-105">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Recommended
              </div>
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <div className="text-3xl font-bold mb-4">$49 <span className="text-sm font-normal text-gray-500">/mo</span></div>
              <ul className="text-gray-400 text-sm space-y-3 mb-8 text-left flex-1">
                <li className="flex items-center gap-2 font-medium text-gray-200">✓ Unlimited LED Sets</li>
                <li className="flex items-center gap-2 font-medium text-gray-200">✓ Δu′v′ Analysis</li>
                <li className="flex items-center gap-2 font-medium text-gray-200">✓ CSV & PDF Exports</li>
                <li className="flex items-center gap-2 font-medium text-gray-200">✓ Custom Tolerance Bins</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-brand-accent hover:bg-blue-600 transition font-bold"><a 
                href="mailto:contact@xuanlabs.info?subject=Enterprise Inquiry" 
                className="w-full py-3 rounded-lg border border-white/20 hover:bg-white/5 transition block text-center"
              >Get Started</a></button>
            </div>
            
            <div className="p-8 rounded-2xl border border-white/10 bg-black/20 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="text-3xl font-bold mb-4">Custom</div>
              <ul className="text-gray-400 text-sm space-y-3 mb-8 text-left flex-1">
                <li className="flex items-center gap-2">✓ SSO Integration</li>
                <li className="flex items-center gap-2">✓ Custom API Access</li>
                <li className="flex items-center gap-2">✓ Dedicated Support</li>
                <li className="flex items-center gap-2">✓ On-premise Options</li>
              </ul>
              <a 
                href="mailto:contact@xuanlabs.info?subject=Enterprise Inquiry" 
                className="w-full py-3 rounded-lg border border-white/20 hover:bg-white/5 transition block text-center"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center bg-gradient-to-b from-brand-accent/20 to-transparent rounded-3xl py-16 border border-white/5">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to validate color?
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the teams building the next generation of lighting and display technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tool"
              className="inline-flex items-center justify-center px-10 py-5 rounded-xl
                         bg-brand-accent text-white font-bold text-lg
                         hover:bg-blue-600 transition"
            >
              Launch Tool Now
            </a>
            <a
              href="mailto:contact@xuanlabs.com?subject=Request for Demo"
              className="inline-flex items-center justify-center px-10 py-5 rounded-xl
                         bg-white text-black font-bold text-lg
                         hover:bg-gray-100 transition"
            >
              Request a Demo
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-12 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Xuanlabs · Precision Engineering Tools
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="mailto:contact@xuanlabs.com" className="hover:text-white transition">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
