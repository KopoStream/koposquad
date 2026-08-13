import Link from "next/link";

type GuideStep = {
  title: string;
  text: string;
};

type ToolGuideProps = {
  name: string;
  nameHighlight?: string;
  price: "ILMAINEN" | "FREEMIUM" | "MAKSULLINEN";
  logoImage: string;
  downloadLink: string;
  downloadText: string;
  description: string;
  guideTitle: string;
  guideDescription: string;
  steps: GuideStep[];
};

export default function ToolGuide({
  name,
  nameHighlight,
  price,
  logoImage,
  downloadLink,
  downloadText,
  description,
  guideTitle,
  guideDescription,
  steps,
}: ToolGuideProps) {
  const normalName =
    nameHighlight && name.endsWith(nameHighlight)
      ? name.slice(0, -nameHighlight.length).trim()
      : name;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050008] text-white">

      {/* TAUSTAN VÄRIT */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050008]">
        <div className="absolute left-[-250px] top-[50px] h-[800px] w-[800px] rounded-full bg-purple-700/35 blur-[220px]" />
        <div className="absolute right-[-300px] top-[800px] h-[850px] w-[850px] rounded-full bg-blue-900/28 blur-[240px]" />
        <div className="absolute left-[-300px] top-[1800px] h-[900px] w-[900px] rounded-full bg-fuchsia-800/22 blur-[240px]" />
        <div className="absolute right-[-300px] top-[3000px] h-[900px] w-[900px] rounded-full bg-purple-700/24 blur-[240px]" />
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-purple-500/20 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="text-2xl font-black">
            <span className="text-purple-500">KOPO</span>
            <span className="text-white">SQUAD</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="rounded-xl border border-purple-500/40 px-5 py-2 text-sm font-bold transition hover:bg-purple-500/10"
            >
              ← Työkalut
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-zinc-700 px-5 py-2 text-sm font-bold transition hover:border-purple-500"
            >
              Etusivu
            </Link>
          </div>

        </div>
      </nav>

      {/* HIMMEÄT KS-LOGOT */}
      <img
        src="/images/ks-logo.png.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-[360px] z-[2] hidden w-[330px] -rotate-12 object-contain opacity-[0.055] lg:block"
      />

      <img
        src="/images/ks-logo.png.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-[1250px] z-[2] hidden w-[390px] rotate-12 object-contain opacity-[0.05] lg:block"
      />

      <img
        src="/images/ks-logo.png.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-[2300px] z-[2] hidden w-[380px] rotate-[8deg] object-contain opacity-[0.045] lg:block"
      />

      <img
        src="/images/ks-logo.png.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-[3250px] z-[2] hidden w-[370px] -rotate-[8deg] object-contain opacity-[0.05] lg:block"
      />

      {/* HERO */}
      <section className="relative z-0 overflow-hidden border-b border-purple-500/20 bg-[radial-gradient(circle_at_70%_35%,rgba(126,34,206,0.26),transparent_35%),linear-gradient(135deg,#050008_0%,#12001f_55%,#050008_100%)] px-6 py-24">

        <div className="relative z-10 mx-auto max-w-5xl">

          {/* ISO LOGO OIKEALLA */}
          <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="absolute inset-0 rounded-[36px] bg-purple-600/25 blur-[80px]" />

            <div className="relative flex h-72 w-72 items-center justify-center rounded-[36px] border border-purple-500/25 bg-gradient-to-br from-purple-950/55 via-black/70 to-blue-950/35 shadow-[0_0_80px_rgba(126,34,206,0.28)]">
              <img
                src={logoImage}
                alt={name}
                className="h-36 w-36 object-contain"
              />
            </div>
          </div>

          <p className="mb-4 text-sm font-black tracking-[0.35em] text-purple-400">
            KOPOSQUAD CREATOR HUB
          </p>

          <div className="mb-6 flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-500/40 bg-purple-500/10">
              <img
                src={logoImage}
                alt={name}
                className="h-11 w-11 object-contain"
              />
            </div>

            <div>
              <p
                className={`mb-2 text-sm font-bold ${
                  price === "ILMAINEN"
                    ? "text-green-400"
                    : price === "FREEMIUM"
                    ? "text-blue-400"
                    : "text-pink-400"
                }`}
              >
                {price}
              </p>

<h1
  className={`font-black ${
    name.length > 16
      ? "text-4xl md:text-5xl"
      : "text-5xl md:text-7xl"
  }`}
>
                {normalName}{" "}
                {nameHighlight && (
                  <span className="text-purple-500">
                    {nameHighlight}
                  </span>
                )}
              </h1>
            </div>

          </div>

          <p className="max-w-2xl text-lg leading-8 text-gray-400">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-purple-600 px-7 py-4 font-black transition hover:bg-purple-500"
            >
              {downloadText} ↗
            </a>

            <a
              href="#opas"
              className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-7 py-4 font-black transition hover:bg-purple-500/20"
            >
              Aloita opas ↓
            </a>

          </div>

        </div>
      </section>

      {/* OPAS */}
      <section
        id="opas"
        className="relative z-0 overflow-hidden border-y border-purple-500/10 bg-[linear-gradient(180deg,#050008_0%,#0b0012_45%,#050008_100%)] px-6 py-24"
      >

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-48 top-24 h-[720px] w-[720px] rounded-full bg-purple-700/20 blur-[190px]" />
          <div className="absolute -right-52 top-[850px] h-[760px] w-[760px] rounded-full bg-fuchsia-800/15 blur-[210px]" />
          <div className="absolute left-1/2 top-[1750px] h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-blue-900/14 blur-[220px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">

          <div className="mb-14">
            <p className="mb-3 text-sm font-black tracking-[0.3em] text-purple-400">
              ALOITTELIJAN OPAS
            </p>

            <h2 className="text-4xl font-black md:text-5xl">
              {guideTitle}
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">
              {guideDescription}
            </p>
          </div>

          <div className="space-y-6">

            {steps.map((step, index) => (
              <GuideCard
                key={step.title}
                number={String(index + 1).padStart(2, "0")}
                title={step.title}
              >
                {step.text}
              </GuideCard>
            ))}

          </div>

          {/* VALMIS */}
          <div className="mt-12 rounded-3xl border border-purple-400/40 bg-gradient-to-br from-purple-900/55 via-fuchsia-950/25 to-blue-950/35 p-10 text-center shadow-[0_0_90px_rgba(126,34,206,0.22)]">

            <p className="mb-3 text-sm font-black tracking-[0.3em] text-purple-400">
              VALMISTA
            </p>

            <h2 className="text-3xl font-black">
              {name.toUpperCase()} ON VALMIS KÄYTTÖÖN
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
              Perusasetukset ovat nyt kunnossa. Voit jatkaa ohjelmaan
              tutustumista ja rakentaa omat asetuksesi tarpeidesi mukaan.
            </p>

            <Link
              href="/tools"
              className="mt-7 inline-block rounded-xl bg-purple-600 px-7 py-4 font-black transition hover:bg-purple-500"
            >
              ← Takaisin työkaluihin
            </Link>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-purple-500/20 bg-black/35 px-6 py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-gray-500">

          <div className="font-black">
            <span className="text-purple-500">KOPO</span>
            <span className="text-white">SQUAD</span>
          </div>

          <span>© 2026 KOPOSQUAD</span>

        </div>
      </footer>

    </main>
  );
}

function GuideCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-br from-purple-950/40 via-[#0a0710] to-blue-950/18 p-8 shadow-[0_18px_55px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-purple-400/50">

      <div className="flex gap-6">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/40 bg-purple-500/10 font-black text-purple-400">
          {number}
        </div>

        <div>
          <h3 className="mb-3 text-xl font-black">
            {title}
          </h3>

          <div className="max-w-3xl leading-7 text-gray-400">
            {children}
          </div>
        </div>

      </div>

    </div>
  );
}