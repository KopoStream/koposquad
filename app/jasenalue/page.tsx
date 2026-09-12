"use client";

import Header from "@/components/Header";

const memberCards = [
  {
    title: "Striimivuorot",
    text: "Varaa oma lähetysaikasi KOPOSQUADTV-kanavalle.",
    href: "#",
  },
  {
    title: "KOPOSQUADTV",
    text: "Ohjeet ja tiedot yhteisön viralliselle Twitch-kanavalle.",
    href: "#",
  },
  {
    title: "Overlayt",
    text: "Lataa KOPOSQUADTV:n viralliset stream-overlayt.",
    href: "#",
  },
  {
    title: "Alertit",
    text: "Viralliset alertit ja muut stream-elementit.",
    href: "#",
  },
  {
    title: "Grafiikat",
    text: "Logot, kuvat ja muut jäsenille tarkoitetut materiaalit.",
    href: "#",
  },
  {
    title: "Ohjeet",
    text: "OBS-asetukset ja muut KOPOSQUADTV:n käyttöohjeet.",
    href: "#",
  },
];

export default function JasenaluePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Header activePage="jasenalue" />

      {/* TAUSTA */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-52 top-32 h-[600px] w-[600px] rounded-full bg-purple-700/15 blur-[180px]" />
        <div className="absolute -right-52 top-[35%] h-[560px] w-[560px] rounded-full bg-fuchsia-700/10 blur-[180px]" />
        <div className="absolute bottom-[-220px] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[190px]" />

        <img
          src="/images/ks-logo.png.png"
          alt=""
          className="absolute right-[-120px] top-[120px] w-[520px] rotate-[-12deg] opacity-[0.025]"
        />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6">
        <div className="mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-purple-400">
            KOPOSQUAD MEMBER AREA
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase sm:text-5xl md:text-6xl">
            Jäsenalue
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400">
            Täältä löydät KOPOSQUADTV:n striimivuorot, overlayt, alertit,
            grafiikat ja muut jäsenille tarkoitetut materiaalit.
          </p>
        </div>

        <div className="mb-8 rounded-[26px] border border-purple-500/25 bg-purple-500/[0.05] p-6 shadow-[0_0_45px_rgba(168,85,247,0.08)] backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-300">
            Tervetuloa
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Tervetuloa KOPOSQUADin jäsenalueelle
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Jäsentunnistus lisätään seuraavassa vaiheessa. Tämän sivun sisältö
            muuttuu myöhemmin henkilökohtaiseksi kirjautuneelle jäsenelle.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {memberCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-[24px] border border-purple-500/20 bg-white/[0.035] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/55 hover:bg-purple-500/[0.07] hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-purple-600/10 blur-[50px]" />

              <div className="relative z-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/25 bg-purple-500/[0.08]">
                  <img
                    src="/images/ks-logo.png.png"
                    alt=""
                    className="h-7 w-7 object-contain opacity-80"
                  />
                </div>

                <h3 className="text-xl font-black text-white transition group-hover:text-purple-200">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {card.text}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-400">
                    Avaa
                  </span>

                  <span className="text-lg text-purple-400 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}