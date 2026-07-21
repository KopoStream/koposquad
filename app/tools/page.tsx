"use client";

import { useState } from "react";

type Tool = {
  name: string;
  description: string;
  price: "ILMAINEN" | "FREEMIUM" | "MAKSULLINEN";
  link: string;
  logo: string;
  logoImage?: string;
  buttonText: string;
  guideLink?: string;
};

type ToolCategory = {
  title: string;
  icon: string;
  tools: Tool[];
};

const categories: ToolCategory[] = [
  {
    title: "STRIIMAUSOHJELMAT",
    icon: "▣",
    tools: [
      {
        name: "OBS Studio",
        description:
          "Suosituin ilmainen striimausohjelma. Kevyt, tehokas ja täysin muokattavissa.",
        price: "ILMAINEN",
        link: "https://obsproject.com/",
        logo: "OBS",
        logoImage: "https://cdn.simpleicons.org/obsstudio/ffffff",
        buttonText: "Lataa OBS Studio",
      },
      {
        name: "Streamlabs Desktop",
        description:
          "Helppokäyttöinen striimausohjelma, jossa overlayt ja työkalut ovat samassa paikassa.",
        price: "ILMAINEN",
        link: "https://streamlabs.com/streamlabs-desktop",
        logo: "SL",
        logoImage: "https://cdn.simpleicons.org/streamlabs/ffffff",
        buttonText: "Lataa Streamlabs",
      },
      {
        name: "Twitch Studio",
        description:
          "Twitchin oma striimausohjelma uusille sisällöntuottajille ja aloittelijoille.",
        price: "ILMAINEN",
        link: "https://www.twitch.tv/broadcast/studio",
        logo: "TW",
        logoImage: "https://cdn.simpleicons.org/twitch/9146FF",
        buttonText: "Avaa Twitch Studio",
      },
    ],
  },
  {
    title: "BOTIT",
    icon: "♙",
    tools: [
      {
        name: "StreamElements",
        description:
          "Tehokas chatbot, hälytykset, overlayt ja kanavan hallintatyökalut.",
        price: "FREEMIUM",
        link: "https://streamelements.com/",
        logo: "SE",
        logoImage:
          "https://www.google.com/s2/favicons?domain=streamelements.com&sz=128",
        buttonText: "Avaa sivusto",
      },
      {
        name: "Streamlabs Cloudbot",
        description:
          "Monipuolinen chat-botti komentojen, moderoinnin ja kanavapisteiden hallintaan.",
        price: "FREEMIUM",
        link: "https://streamlabs.com/cloudbot",
        logo: "SC",
        logoImage: "https://cdn.simpleicons.org/streamlabs/ffffff",
        buttonText: "Avaa sivusto",
      },
      {
        name: "Nightbot",
        description:
          "Suosittu ja helppokäyttöinen chatbot Twitchiin ja YouTubeen.",
        price: "ILMAINEN",
        link: "https://nightbot.tv/",
        logo: "NB",
        logoImage:
          "https://www.google.com/s2/favicons?domain=nightbot.tv&sz=128",
        buttonText: "Avaa sivusto",
      },
      {
        name: "Streamer.bot",
        description:
          "Tehokas automaatio- ja tapahtumatyökalu Twitchiin, YouTubeen ja OBS:ään. Mahdollistaa monipuoliset komennot, tapahtumat ja integraatiot.",
        price: "ILMAINEN",
        link: "https://streamer.bot/",
        logo: "SB",
        logoImage:
          "https://www.google.com/s2/favicons?domain=streamer.bot&sz=128",
        buttonText: "Avaa sivusto",
      },
      {
        name: "Mix It Up",
        description:
          "Vuorovaikutteiset minipelit, komennot ja monipuoliset automaatiot striimeihin.",
        price: "ILMAINEN",
        link: "https://mixitupapp.com/",
        logo: "MI",
        logoImage:
          "https://www.google.com/s2/favicons?domain=mixitupapp.com&sz=128",
        buttonText: "Avaa sivusto",
      },
    ],
  },
  {
    title: "CHAT & WIDGETIT",
    icon: "▱",
    tools: [
      {
        name: "StreamElements",
        description:
          "Overlayt, hälytykset, widgetit, lahjoitukset ja paljon muuta.",
        price: "FREEMIUM",
        link: "https://streamelements.com/",
        logo: "SE",
        logoImage:
          "https://www.google.com/s2/favicons?domain=streamelements.com&sz=128",
        buttonText: "Avaa sivusto",
      },
      {
        name: "Streamlabs Alerts",
        description:
          "Tyylikkäät alertit, overlayt ja widgetit omalle kanavallesi.",
        price: "FREEMIUM",
        link: "https://streamlabs.com/alert-box",
        logo: "SA",
        logoImage: "https://cdn.simpleicons.org/streamlabs/ffffff",
        buttonText: "Avaa sivusto",
      },
      {
        name: "BetterTTV",
        description:
          "Lisäominaisuuksia Twitch-chattiin sekä enemmän yhteisön tekemiä emoteja.",
        price: "ILMAINEN",
        link: "https://betterttv.com/",
        logo: "BT",
        logoImage:
          "https://www.google.com/s2/favicons?domain=betterttv.com&sz=128",
        buttonText: "Avaa sivusto",
      },
      {
        name: "7TV",
        description:
          "Uudet emote-striimit, suuri emotevalikoima ja parempi chat-kokemus.",
        price: "ILMAINEN",
        link: "https://7tv.app/",
        logo: "7TV",
        logoImage:
          "https://www.google.com/s2/favicons?domain=7tv.app&sz=128",
        buttonText: "Avaa sivusto",
      },
    ],
  },
  {
    title: "SISÄLLÖNTUOTANTO",
    icon: "▰",
    tools: [
      {
        name: "DaVinci Resolve",
        description:
          "Ammattimainen videoeditointi, värikorjaukset, äänityökalut ja paljon muuta.",
        price: "ILMAINEN",
        link: "https://www.blackmagicdesign.com/products/davinciresolve",
        logo: "DR",
        logoImage:
          "https://www.google.com/s2/favicons?domain=blackmagicdesign.com&sz=128",
        buttonText: "Lataa DaVinci",
      },
      {
        name: "CapCut",
        description:
          "Helppo ja nopea videoeditori lyhyille videoille ja sosiaaliseen mediaan.",
        price: "ILMAINEN",
        link: "https://www.capcut.com/",
        logo: "CC",
        logoImage:
          "https://www.google.com/s2/favicons?domain=capcut.com&sz=128",
        buttonText: "Avaa sivusto",
      },
      {
        name: "Adobe Premiere Pro",
        description:
          "Ammattitason videoeditointi kaikenlaisille videoille ja projekteille.",
        price: "MAKSULLINEN",
        link: "https://www.adobe.com/products/premiere.html",
        logo: "PR",
        logoImage:
          "https://www.google.com/s2/favicons?domain=adobe.com&sz=128",
        buttonText: "Avaa sivusto",
      },
      {
        name: "Photoshop",
        description:
          "Kuvankäsittely, grafiikka, pikkukuvat, bannerit ja luovat projektit.",
        price: "MAKSULLINEN",
        link: "https://www.adobe.com/products/photoshop.html",
        logo: "PS",
        logoImage:
          "https://www.google.com/s2/favicons?domain=photoshop.adobe.com&sz=128",
        buttonText: "Avaa sivusto",
      },
      {
        name: "Canva",
        description:
          "Helppo työkalu grafiikoiden, bannereiden, videoiden ja kuvien tekemiseen.",
        price: "FREEMIUM",
        link: "https://www.canva.com/",
        logo: "CA",
        logoImage:
          "https://www.google.com/s2/favicons?domain=canva.com&sz=128",
        buttonText: "Avaa sivusto",
      },
    ],
  },
];

function priceClasses(price: Tool["price"]) {
  if (price === "ILMAINEN") {
    return "border-green-500/30 bg-green-500/15 text-green-300";
  }

  if (price === "MAKSULLINEN") {
    return "border-pink-500/30 bg-pink-500/15 text-pink-300";
  }

  return "border-blue-500/30 bg-blue-500/15 text-blue-300";
}

export default function ToolsPage() {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  function toggleCategory(categoryTitle: string) {
    setOpenCategories((current) =>
      current.includes(categoryTitle)
        ? current.filter((title) => title !== categoryTitle)
        : [...current, categoryTitle],
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
  {/* VASEMMAN REUNAN VALOT */}
  <div className="absolute -left-64 top-[8%] h-[700px] w-[700px] rounded-full bg-purple-700/25 blur-[190px]" />

  <div className="absolute -left-72 top-[48%] h-[650px] w-[650px] rounded-full bg-violet-700/18 blur-[200px]" />

  <div className="absolute -left-60 bottom-[-180px] h-[620px] w-[620px] rounded-full bg-fuchsia-700/14 blur-[190px]" />

  {/* OIKEAN REUNAN VALOT */}
  <div className="absolute -right-64 top-[18%] h-[720px] w-[720px] rounded-full bg-fuchsia-700/18 blur-[210px]" />

  <div className="absolute -right-72 top-[58%] h-[680px] w-[680px] rounded-full bg-purple-700/22 blur-[200px]" />

  <div className="absolute -right-64 bottom-[-220px] h-[650px] w-[650px] rounded-full bg-violet-600/16 blur-[190px]" />

  {/* KESKELLE ERITTÄIN HIMMEÄ VALO */}
  <div className="absolute left-1/2 top-[72%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-purple-800/10 blur-[220px]" />

  {/* REUNOJEN PYSTYSUORAT HEHKUVIIVAT */}
  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500/40 to-transparent shadow-[0_0_25px_rgba(168,85,247,0.6)]" />

  <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-fuchsia-500/30 to-transparent shadow-[0_0_25px_rgba(217,70,239,0.5)]" />

  {/* HIMMEÄ RUUDUKKO */}
  <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:56px_56px]" />

  {/* TUMMENNUS, JOTTA KESKIOSA PYSYY SELKEÄNÄ */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_58%,rgba(0,0,0,0.82)_100%)]" />
</div>

      <div className="relative z-10">
        <nav className="sticky top-0 z-50 border-b border-purple-500/20 bg-black/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <a href="/" className="text-3xl font-black tracking-tight">
              <span className="text-purple-500">KOPO</span>
              <span className="text-white">SQUAD</span>
            </a>

            <div className="hidden items-center gap-7 text-sm font-semibold md:flex">
              <a href="/" className="text-gray-300 transition hover:text-white">
                Etusivu
              </a>
              <a href="/#live" className="text-gray-300 transition hover:text-white">
                Live
              </a>
<a href="/#tiimi" className="text-gray-300 transition hover:text-white">
  Tiimi
</a>

<a href="/#clips" className="text-gray-300 transition hover:text-white">
  Clips
</a>
              <a
                href="/tools"
                className="font-black text-purple-400 transition hover:text-purple-300"
              >
                Työkalut
              </a>
              <a href="/#uutiset" className="text-gray-300 transition hover:text-white">
                Uutiset
              </a>
              <a href="/#liity" className="text-gray-300 transition hover:text-white">
                Liity
              </a>
              <a
                href="https://discord.gg/ZXgSS9v6ye"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-purple-400 transition hover:text-purple-300"
              >
                Discord
              </a>
            </div>

            <a
              href="/"
              className="rounded-xl border border-purple-500/40 px-4 py-2 text-sm font-black text-purple-300 transition hover:bg-purple-500/10 hover:text-white"
            >
              Takaisin
            </a>
          </div>
        </nav>

        <section className="relative border-b border-purple-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(126,34,206,0.34),transparent_38%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.15),rgba(88,28,135,0.18),rgba(0,0,0,0.74))]" />
          <div className="absolute -right-32 top-12 h-[440px] w-[440px] rounded-full bg-purple-700/35 blur-[150px]" />
          <div className="absolute -left-20 bottom-0 h-[280px] w-[280px] rounded-full bg-fuchsia-600/15 blur-[120px]" />

          <div className="relative mx-auto grid min-h-[540px] max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10">
              <p className="mb-5 text-sm font-black uppercase tracking-[0.32em] text-purple-400 sm:text-base">
                KOPOSQUAD CREATOR HUB
              </p>

              <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Kaikki työkalut
                <span className="mt-2 block bg-gradient-to-r from-purple-300 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                  striimaukseen
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
                Täältä löydät parhaat työkalut striimaamiseen,
                sisällöntuotantoon ja kanavasi kehittämiseen. Kaikki tärkeimmät
                palvelut yhdessä paikassa.
              </p>

              <a
                href="#tyokalut"
                className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-purple-400/60 bg-purple-600/15 px-7 py-4 font-black shadow-[0_0_35px_rgba(168,85,247,0.18)] transition hover:-translate-y-1 hover:bg-purple-600/30 hover:shadow-[0_0_45px_rgba(168,85,247,0.3)]"
              >
                <span className="text-xl text-purple-400">ϟ</span>
                Katso kaikki työkalut
              </a>
            </div>

<div className="relative flex min-h-[390px] items-center justify-center overflow-visible">
  {/* PEHMEÄT TAUSTAVALOT */}
  <div className="pointer-events-none absolute h-[430px] w-[430px] rounded-full bg-purple-600/20 blur-[155px]" />
  <div className="pointer-events-none absolute -right-10 top-8 h-[280px] w-[280px] rounded-full bg-fuchsia-500/14 blur-[145px]" />
  <div className="pointer-events-none absolute -left-10 bottom-8 h-[260px] w-[260px] rounded-full bg-violet-500/14 blur-[140px]" />

  {/* VALO LOGON ALLA – SELVÄSTI LOGON ALAPUOLELLA */}
  <div className="pointer-events-none absolute bottom-0 h-10 w-[68%] rounded-full bg-purple-400/20 blur-[30px]" />
  <div className="pointer-events-none absolute inset-x-14 bottom-2 h-px bg-gradient-to-r from-transparent via-purple-300/55 to-transparent shadow-[0_0_22px_rgba(192,132,252,0.55)]" />

  {/* KS-LOGO LIIKKUU HITAASTI LÄHEMMÄS JA KAUKEMMAS */}
  <div className="relative z-10 animate-[ksDepth_14s_ease-in-out_infinite] will-change-transform">
    <img
      src="/images/ks-logo.png.png"
      alt="KOPOSQUAD KS logo"
      className="w-full max-w-[540px] object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.12)] drop-shadow-[0_0_36px_rgba(168,85,247,0.45)] transition duration-500 hover:scale-[1.02]"
    />
  </div>
</div>
          </div>
        </section>

        <section id="tyokalut" className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-purple-900/10 blur-[180px]" />

          <div className="relative space-y-10">
            {categories.map((category, categoryIndex) => {
              const visibleLimit =
                category.title === "STRIIMAUSOHJELMAT" ? 3 : 4;
              const isOpen = openCategories.includes(category.title);
              const visibleTools = isOpen
                ? category.tools
                : category.tools.slice(0, visibleLimit);

              return (
                <section
                  key={category.title}
className="relative overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-br from-purple-950/30 via-zinc-950/80 to-black/50 p-5 shadow-[0_0_45px_rgba(126,34,206,0.12),0_20px_60px_rgba(0,0,0,0.4)] transition duration-500 hover:border-purple-400/40 hover:shadow-[0_0_60px_rgba(126,34,206,0.2),0_25px_70px_rgba(0,0,0,0.5)] sm:p-7"
                >
                  <div
                    className={`pointer-events-none absolute -top-28 h-72 w-72 rounded-full blur-[110px] ${
                      categoryIndex % 2 === 0
                        ? "-left-20 bg-purple-600/18"
                        : "-right-20 bg-fuchsia-600/14"
                    }`}
                  />

<div className="pointer-events-none absolute -left-24 top-1/2 h-80 w-48 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[100px]" />

<div className="pointer-events-none absolute -right-24 top-1/2 h-80 w-48 -translate-y-1/2 rounded-full bg-fuchsia-600/10 blur-[100px]" />

<div className="pointer-events-none absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

                  <div className="relative mb-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/50 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 text-xl font-black text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.2)]">
                        {category.icon}
                      </span>

                      <h2 className="text-xl font-black sm:text-2xl">
                        {category.title}
                      </h2>
                    </div>

                    {category.tools.length > visibleLimit && (
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.title)}
                        className="hidden rounded-lg border border-purple-500/20 bg-purple-500/5 px-3 py-2 text-sm font-bold text-purple-300 transition hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-white sm:block"
                      >
                        {isOpen
                          ? "Näytä vähemmän ↑"
                          : `Näytä kaikki (${category.tools.length}) →`}
                      </button>
                    )}
                  </div>

                  <div
                    className={`relative grid gap-5 ${
                      category.title === "STRIIMAUSOHJELMAT"
                        ? "md:grid-cols-2 xl:grid-cols-3"
                        : "md:grid-cols-2 xl:grid-cols-4"
                    }`}
                  >
                    {visibleTools.map((tool) => (
                      <article
                        key={`${category.title}-${tool.name}`}
className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-purple-500/25 bg-gradient-to-br from-zinc-900/95 via-purple-950/20 to-zinc-950/95 p-5 shadow-[0_0_25px_rgba(126,34,206,0.08),0_12px_35px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-2 hover:border-purple-400/70 hover:bg-gradient-to-br hover:from-purple-950/35 hover:via-zinc-950 hover:to-fuchsia-950/20 hover:shadow-[0_0_45px_rgba(126,34,206,0.3)]"                      >
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 transition duration-300 group-hover:opacity-100" />
                        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-purple-600/10 blur-[50px] transition duration-300 group-hover:bg-purple-500/20" />

                        <div className="relative flex items-start gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-500/20 via-purple-900/20 to-black p-3 text-lg font-black text-purple-200 shadow-[0_0_25px_rgba(168,85,247,0.18)] transition duration-300 group-hover:scale-110 group-hover:border-purple-300/70 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]">
                            {tool.logoImage ? (
                              <img
                                src={tool.logoImage}
                                alt={`${tool.name} logo`}
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              tool.logo
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="break-words pr-1 text-lg font-black leading-tight">
                              {tool.name}
                            </h3>

                            <span
                              className={`mt-3 inline-flex rounded-md border px-2 py-1 text-[9px] font-black ${priceClasses(
                                tool.price,
                              )}`}
                            >
                              {tool.price}
                            </span>
                          </div>
                        </div>

                        <p className="relative mt-5 flex-1 text-sm leading-6 text-gray-400">
                          {tool.description}
                        </p>

                        <div className="relative mt-6 grid grid-cols-2 gap-2">
                          <a
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 rounded-xl border border-purple-500/60 bg-purple-500/5 px-3 py-3 text-center text-xs font-black transition hover:bg-purple-600 hover:text-white sm:text-sm"
                          >
                            {tool.buttonText}
                            <span className="text-purple-300">↗</span>
                          </a>

                          {tool.guideLink ? (
                            <a
                              href={tool.guideLink}
                              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-center text-xs font-black text-gray-200 transition hover:border-purple-400/60 hover:bg-purple-500/10 hover:text-white sm:text-sm"
                            >
                              Katso opas
                              <span className="text-purple-300">→</span>
                            </a>
                          ) : (
                            <span className="flex cursor-not-allowed items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-xs font-black text-gray-600 sm:text-sm">
                              Opas tulossa
                            </span>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <section className="relative mt-20 overflow-hidden rounded-3xl border border-purple-500/50 bg-gradient-to-r from-purple-950/50 via-zinc-950 to-fuchsia-950/30 p-8 shadow-[0_0_55px_rgba(126,34,206,0.2)] sm:p-10">
            <div className="absolute -left-14 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-purple-600/30 blur-[70px]" />
            <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-fuchsia-600/15 blur-[70px]" />

            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="flex items-center gap-6">
                <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-purple-400/50 bg-purple-500/10 text-4xl text-purple-300 shadow-[0_0_35px_rgba(168,85,247,0.25)] sm:flex">
                  ⌘
                </div>

                <div>
                  <h2 className="text-2xl font-black uppercase sm:text-3xl">
                    Löydä lisää työkaluja
                  </h2>

                  <p className="mt-3 max-w-2xl leading-7 text-gray-400">
                    Tämä on vasta alkua. Lisää työkaluja, oppaita ja resursseja
                    päivitetään sivulle jatkuvasti.
                  </p>
                </div>
              </div>

              <a
                href="https://discord.gg/ZXgSS9v6ye"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-700 to-fuchsia-500 px-7 py-4 font-black shadow-[0_0_30px_rgba(168,85,247,0.25)] transition hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(217,70,239,0.4)]"
              >
                Ehdota työkalua
                <span>→</span>
              </a>
            </div>
          </section>
        </section>

        <footer className="border-t border-purple-500/20 bg-zinc-950/80 px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
            <div>
              <p className="text-2xl font-black">
                <span className="text-purple-500">KOPO</span>SQUAD
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Suomen kasvava striimaaja- ja sisällöntuottajayhteisö.
              </p>
            </div>

            <p className="text-sm text-gray-600">
              © 2026 KOPOSQUAD. Sivuston tekijä: Kopo
            </p>
          </div>
        </footer>
        <style jsx global>{`
          @keyframes ksDepth {
            0%,
            100% {
              transform: scale(0.985);
            }

            50% {
              transform: scale(1.025);
            }
          }
        `}</style>
      </div>
    </main>
  );
}