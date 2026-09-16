import Header from "../../components/Header";

const categories = [
  "Kaikki",
  "KOPOSQUAD",
  "Yhteisö",
  "KOPOSQUADTV",
  "Projektit",
  "Tapahtumat",
];

export default function UutisetPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020203] text-white">
      <Header activePage="uutiset" />

      {/* TYÖN ALLA -ILMOITUS */}
      <section className="relative z-20 mt-16 overflow-hidden border-b border-purple-500/20 bg-[#08050d] md:mt-20">
        <div className="mx-auto flex min-h-12 max-w-7xl items-center justify-center gap-3 px-6 py-3 text-center">
          <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400 shadow-[0_0_14px_rgba(192,132,252,0.9)]" />
          <span className="text-xs font-black uppercase tracking-[0.18em] text-purple-300 sm:text-sm">
            Uutiset-sivu on työn alla — julkaistaan pian
          </span>
        </div>
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-purple-500/15 px-6 pb-16 pt-32 md:pb-20 md:pt-36">
        {/* TAUSTA */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(126,34,206,0.22),transparent_38%)]" />
        <div className="pointer-events-none absolute -left-48 top-0 h-[600px] w-[600px] rounded-full bg-fuchsia-700/10 blur-[200px]" />
        <div className="pointer-events-none absolute -right-48 top-0 h-[600px] w-[600px] rounded-full bg-blue-700/10 blur-[210px]" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.35))]" />

        {/* TAUSTALOGOT */}
        <img
          src="/images/ks-logo.png.png"
          alt=""
          className="pointer-events-none absolute -left-20 top-20 hidden w-[340px] -rotate-12 opacity-[0.035] lg:block"
        />

        <img
          src="/images/ks-logo.png.png"
          alt=""
          className="pointer-events-none absolute -right-16 top-24 hidden w-[320px] rotate-12 opacity-[0.03] lg:block"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <a
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-purple-300"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Takaisin etusivulle
          </a>

          <div className="mx-auto mt-12 max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-purple-500/20 bg-purple-500/[0.06] px-4 py-2 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_14px_rgba(192,132,252,0.9)]" />

              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-300">
                KOPOSQUAD NEWS
              </span>
            </div>

            <h1 className="text-5xl font-black uppercase tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="text-white">AJAN</span>
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
                KOHTAISTA
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              Uusimmat KOPOSQUAD-uutiset, projektit, tapahtumat ja yhteisön
              kuulumiset yhdessä paikassa.
            </p>
          </div>

          {/* KATEGORIAT */}
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                  index === 0
                    ? "border-purple-400/60 bg-purple-500/20 text-white shadow-[0_0_24px_rgba(168,85,247,0.15)]"
                    : "border-white/10 bg-white/[0.025] text-zinc-400 hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* UUTISET - TYÖN ALLA */}
      <section className="relative px-6 py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[650px] w-[1000px] -translate-x-1/2 rounded-full bg-purple-900/[0.10] blur-[240px]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[32px] border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-zinc-950/80 to-black px-8 py-16 text-center shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-600/15 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[140px]" />

            <img
              src="/images/ks-logo.png.png"
              alt=""
              className="pointer-events-none absolute -bottom-24 -right-16 w-[360px] -rotate-12 opacity-[0.035]"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-purple-500/25 bg-purple-500/[0.08] px-4 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400 shadow-[0_0_14px_rgba(192,132,252,0.9)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-300">
                  Kehityksessä
                </span>
              </div>

              <h2 className="mt-7 text-4xl font-black uppercase tracking-tight sm:text-5xl">
                Uutiset ovat työn alla
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
                Rakennamme KOPOSQUADille uutta ajankohtaissivua, josta löydät
                jatkossa uusimmat uutiset, projektit, tapahtumat ja yhteisön
                kuulumiset yhdestä paikasta.
              </p>

              <div className="mx-auto mt-8 h-px max-w-sm bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

              <p className="mt-7 text-sm font-black uppercase tracking-[0.25em] text-zinc-500">
                Julkaistaan pian
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}