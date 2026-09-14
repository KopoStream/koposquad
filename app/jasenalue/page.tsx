"use client";

import Header from "@/components/Header";

const memberCards = [
  {
    title: "Striimivuorot",
    label: "VARAUKSET",
    text: "Varaa oma lähetysaikasi KOPOSQUADTV-kanavalle ja tarkista tulevat vuorot.",
    action: "Hallitse vuoroja",
    href: "#",
    featured: true,
  },
  {
    title: "KOPOSQUADTV",
    label: "VIRALLINEN KANAVA",
    text: "Kaikki tärkeät tiedot, käytännöt ja ohjeet KOPOSQUADTV-kanavalle.",
    action: "Avaa kanavatiedot",
    href: "#",
  },
  {
    title: "Overlayt",
    label: "STREAM MATERIAALIT",
    text: "Lataa KOPOSQUADTV:n viralliset overlayt omaan lähetykseesi.",
    action: "Selaa overlayta",
    href: "#",
  },
  {
    title: "Alertit",
    label: "STREAM ELEMENTIT",
    text: "Viralliset alertit ja muut lähetyksissä käytettävät stream-elementit.",
    action: "Avaa alertit",
    href: "#",
  },
  {
    title: "Grafiikat",
    label: "MEDIA",
    text: "Logot, kuvat ja muut KOPOSQUAD-jäsenille tarkoitetut materiaalit.",
    action: "Selaa grafiikoita",
    href: "#",
  },
  {
    title: "Ohjeet",
    label: "TUKI & ASETUKSET",
    text: "OBS-asetukset, Twitch-ohjeet ja muut KOPOSQUADTV:n käyttöohjeet.",
    action: "Lue ohjeet",
    href: "#",
  },
];

export default function JasenaluePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Header activePage="jasenalue" />

      {/* TAUSTA */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-56 top-28 h-[650px] w-[650px] rounded-full bg-purple-700/15 blur-[190px]" />
        <div className="absolute -right-56 top-[32%] h-[600px] w-[600px] rounded-full bg-fuchsia-700/10 blur-[190px]" />
        <div className="absolute bottom-[-240px] left-1/2 h-[550px] w-[1000px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[210px]" />

        <img
          src="/images/ks-logo.png.png"
          alt=""
          className="absolute right-[-135px] top-[180px] w-[560px] rotate-[-12deg] opacity-[0.022]"
        />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-6 lg:pt-40">
        {/* OTSIKKO */}
        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.36em] text-purple-400">
            KOPOSQUAD MEMBER AREA
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase tracking-[-0.035em] sm:text-5xl md:text-6xl">
            Jäsenalue
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            KOPOSQUAD-jäsenen oma paikka. Täältä löydät striimivuorot,
            KOPOSQUADTV:n materiaalit, ohjeet ja muut jäsenille tarkoitetut
            työkalut.
          </p>
        </div>

        {/* JÄSENALUEEN TERVETULO */}
        <div className="relative mb-7 overflow-hidden rounded-[28px] border border-purple-500/25 bg-gradient-to-br from-purple-500/[0.09] via-purple-500/[0.035] to-transparent p-7 shadow-[0_0_55px_rgba(168,85,247,0.08)] backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-600/15 blur-[90px]" />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-purple-300">
                JÄSENPANEELI
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Tervetuloa KOPOSQUADiin
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                Kaikki jäsenen tärkeimmät asiat yhdessä paikassa. Sivua
                kehitetään jatkuvasti ja uusia ominaisuuksia lisätään ajan
                myötä.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-green-400/15 bg-green-400/[0.05] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />

              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-300">
                Jäsenalue aktiivinen
              </span>
            </div>
          </div>
        </div>

        {/* KORTIT */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {memberCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className={`group relative min-h-[230px] overflow-hidden rounded-[26px] border p-6 transition-all duration-300 hover:-translate-y-1 ${
                card.featured
                  ? "border-purple-400/40 bg-gradient-to-br from-purple-500/[0.14] via-purple-500/[0.06] to-white/[0.025] shadow-[0_0_45px_rgba(168,85,247,0.10)]"
                  : "border-purple-500/20 bg-gradient-to-br from-white/[0.04] to-purple-500/[0.02] hover:border-purple-400/45 hover:bg-purple-500/[0.055]"
              }`}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-600/0 blur-[65px] transition-all duration-300 group-hover:bg-purple-600/15" />

              <div className="relative z-10 flex h-full flex-col">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.24em] text-purple-400">
                    {card.label}
                  </p>

                  <h3 className="mt-3 text-xl font-black text-white transition-colors duration-300 group-hover:text-purple-200">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {card.text}
                  </p>
                </div>

                <div className="mt-auto pt-7">
                  <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-purple-400">
                      {card.action}
                    </span>

                    <span className="text-lg text-purple-400 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* LISÄÄ TULOSSA */}
        <div className="relative mt-8 overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-7 sm:p-8">
          <div className="pointer-events-none absolute -left-16 bottom-[-80px] h-44 w-44 rounded-full bg-purple-700/10 blur-[70px]" />

          <div className="relative z-10">
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-purple-400">
              KEHITYKSESSÄ
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Lisää tulossa
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">
              Jäsenaluetta kehitetään jatkuvasti. Tänne voidaan myöhemmin lisätä
              uusia työkaluja, materiaaleja, tapahtumia, jäsenetuja ja muita
              KOPOSQUAD-jäsenille tarkoitettuja ominaisuuksia.
            </p>

            <div className="mt-5 h-px w-full bg-gradient-to-r from-purple-500/25 via-purple-500/10 to-transparent" />

            <p className="mt-4 text-[9px] font-black uppercase tracking-[0.18em] text-gray-600">
              Uusia ominaisuuksia lisätään myöhemmin
            </p>
          </div>
        </div>

        {/* ALATEKSTI */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/30" />

          <p className="text-center text-[8px] font-black uppercase tracking-[0.34em] text-gray-700">
            KOPOSQUAD · MEMBER SYSTEM
          </p>

          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/30" />
        </div>
      </section>
    </main>
  );
}