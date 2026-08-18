const fallbackContent = {
  heroTitle: "Build smarter systems for modern growth.",
  subtitle:
    "We help enterprise teams align strategy, operations, and digital transformation to unlock measurable performance.",
  ctaText: "Book a strategy call",
  stats: [
    { label: "Global clients", value: "120+" },
    { label: "Average ROI uplift", value: "32%" },
    { label: "Transformation programs", value: "260" },
    { label: "Market response", value: "4.9/5" }
  ]
};

async function getLandingPageContent() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  try {
    const response = await fetch(`${apiBaseUrl}/api/content`, {
      cache: "no-store",
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error("Unable to load landing page content");
    }

    return response.json();
  } catch {
    return fallbackContent;
  }
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getLandingPageContent();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-lg font-bold text-emerald-300 ring-1 ring-emerald-400/30">
              E
            </div>
            <div>
              <div className="text-lg font-semibold tracking-wide text-white">Eminenture</div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
                Enterprise systems
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#solutions" className="transition hover:text-white">Solutions</a>
            <a href="#industries" className="transition hover:text-white">Industries</a>
            <a href="#insights" className="transition hover:text-white">Insights</a>
            <a href="#about" className="transition hover:text-white">About</a>
          </div>

          <div className="flex items-center gap-3">
            <a href="/admin" className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400/60 hover:text-white md:inline-flex">
              Admin
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Talk to an expert
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.25),transparent_40%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:px-8 lg:py-28">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
                Built for enterprise momentum
              </div>

              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white md:text-5xl lg:text-7xl">
                {content.heroTitle}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
                {content.subtitle}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-3.5 text-base font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  {content.ctaText}
                </a>
                <a
                  href="#solutions"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition hover:border-emerald-400/50 hover:bg-slate-900"
                >
                  Explore solutions
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-emerald-400/30 bg-slate-900/80 p-5 shadow-[0_0_40px_rgba(16,185,129,0.18)] backdrop-blur-sm">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950 p-5">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Operations pulse</p>
                      <h2 className="mt-2 text-xl font-semibold text-white">Quarterly growth</h2>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-300">
                      +18.4%
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[68, 86, 94, 78].map((height: number, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="w-14 text-xs uppercase tracking-[0.16em] text-slate-400">
                          {index === 0 ? "Q1" : index === 1 ? "Q2" : index === 2 ? "Q3" : "Q4"}
                        </span>
                        <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-300"
                            style={{ width: `${height}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                    <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Efficiency</p>
                      <p className="mt-3 text-2xl font-bold text-white">41%</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Velocity</p>
                      <p className="mt-3 text-2xl font-bold text-white">2.3x</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-900/80">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {content.stats.map((item: { label: string; value: string }, index: number) => (
              <div key={`${item.label}-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-left">
                <div className="text-3xl font-black tracking-tight text-emerald-300">{item.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="solutions" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">What we deliver</p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">A transformation strategy built for outcomes.</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Digital operations",
                text: "Modernize workflows, process intelligence, and automation with measurable operational gains."
              },
              {
                title: "Business strategy",
                text: "Translate growth goals into execution roadmaps that align teams, processes, and capital."
              },
              {
                title: "AI enablement",
                text: "Deploy responsible AI systems that improve efficiency, speed, and decision quality across the organization."
              }
            ].map((card) => (
              <article key={card.title} className="rounded-3xl border border-white/10 bg-slate-900 p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-xl text-emerald-300 ring-1 ring-emerald-400/30">
                  •
                </div>
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-300">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="border-t border-white/10 bg-slate-900/70">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-300">Why Eminenture</p>
              <h3 className="mt-4 text-3xl font-bold text-white md:text-4xl">We connect vision to execution across the enterprise.</h3>
            </div>
            <div className="space-y-6 text-lg leading-8 text-slate-300">
              <p>
                From technology modernization to operating model redesign, our teams build practical strategies that help clients scale faster and operate with more confidence.
              </p>
              <p>
                The result is a more resilient business—one that adapts quickly, simplifies complexity, and drives sustainable growth.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <div className="text-xl font-semibold text-white">Eminenture</div>
            <div className="mt-2 text-sm text-slate-400">Turning enterprise complexity into confident momentum.</div>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-300">
            <a href="#solutions" className="hover:text-white">Solutions</a>
            <a href="#insights" className="hover:text-white">Insights</a>
            <a href="#about" className="hover:text-white">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
