"use client";

import { FormEvent, useEffect, useState } from "react";

type Stream = {
  user_name: string;
  user_login: string;
  title: string;
  viewer_count: number;
};

type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
};

const members = [
  {
    name: "Kopo",
    role: "Perustaja / Striimaaja",
    twitch: "kopostream",
  },
  {
    name: "Sanzzuuu",
    role: "Striimaaja",
    twitch: "sanzzuuu",
  },
  {
    name: "Kinkki",
    role: "Striimaaja",
    twitch: "ytkimo3",
  },
  {
    name: "Burdeni",
    role: "Striimaaja",
    twitch: "burdeni",
  },
  {
    name: "HKBLUE88",
    role: "Striimaaja",
    twitch: "hkblue88",
  },
  {
    name: "Vapaa paikka",
    role: "Sisällöntuottaja",
    twitch: "",
  },
];

export default function Home() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [twitchUsers, setTwitchUsers] = useState<TwitchUser[]>([]);
  const [language, setLanguage] = useState<"fi" | "en">("fi");

  const [clips, setClips] = useState<any[]>([]);
  const [clipsLoading, setClipsLoading] = useState(true);

  const [applicationForm, setApplicationForm] = useState({
    name: "",
    channel: "",
    discord: "",
    message: "",
  });

  const [applicationStatus, setApplicationStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [applicationError, setApplicationError] = useState("");

async function handleApplicationSubmit(
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  setApplicationStatus("sending");
  setApplicationError("");

  try {
const response = await fetch("/api/live/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationForm),
    });

    const responseText = await response.text();

    let data: {
      success?: boolean;
      error?: string;
    } = {};

    if (responseText) {
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          response.status === 404
            ? "Hakemusreittiä /api/apply ei löydy. Tarkista, että tiedosto on app/api/apply/route.ts."
            : `Palvelin palautti virheellisen vastauksen. Virhekoodi: ${response.status}.`
        );
      }
    }

    if (!response.ok) {
      throw new Error(
        data.error ||
          (language === "fi"
            ? `Hakemuksen lähettäminen epäonnistui. Virhekoodi: ${response.status}.`
            : `Sending the application failed. Error code: ${response.status}.`)
      );
    }

    setApplicationStatus("success");

    setApplicationForm({
      name: "",
      channel: "",
      discord: "",
      message: "",
    });
  } catch (error) {
    setApplicationStatus("error");

    setApplicationError(
      error instanceof Error
        ? error.message
        : language === "fi"
          ? "Hakemuksen lähettäminen epäonnistui."
          : "Sending the application failed."
    );
  }
}

useEffect(() => {
  async function checkLive() {
    try {
      const twitchUsernames = members
        .filter((member) => member.twitch)
        .map((member) => member.twitch)
        .join(",");

      const response = await fetch(
        `/api/live?users=${encodeURIComponent(twitchUsernames)}`
      );

      if (!response.ok) {
        throw new Error("Live-tietojen hakeminen epäonnistui.");
      }

      const data = await response.json();

      setStreams(data.data || []);
      setTwitchUsers(data.users || []);
    } catch {
      setStreams([]);
      setTwitchUsers([]);
    }
  }

  checkLive();

  const timer = setInterval(checkLive, 60000);

  return () => clearInterval(timer);
}, []);

const getProfileImage = (twitch: string) => {
  if (!twitch) {
    return "/members/default.jpg";
  }

  const twitchUser = twitchUsers.find(
    (user) => user.login.toLowerCase() === twitch.toLowerCase()
  );

  return twitchUser?.profile_image_url || "/members/default.jpg";
};


  useEffect(() => {
    async function fetchClips() {
      try {
        const response = await fetch("/api/live/clips");

        if (!response.ok) {
          throw new Error("Klippien hakeminen epäonnistui.");
        }

        const data = await response.json();

        setClips(data.data || []);
      } catch {
        setClips([]);
      } finally {
        setClipsLoading(false);
      }
    }

    fetchClips();
  }, []);

  return (
    <main className="page-fade-in min-h-screen bg-black text-white">
      {/* NAV */}

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-purple-500/20 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-3xl font-black">
            <span className="text-purple-500">K</span>
            OPOSQUAD
          </h1>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-gray-300 transition hover:text-purple-400"
            >
              {language === "fi" ? "Etusivu" : "Home"}
            </a>

            <a
              href="#live"
              className="text-gray-300 transition hover:text-purple-400"
            >
              Live
            </a>

            <a
              href="#clips"
              className="text-gray-300 transition hover:text-purple-400"
            >
              Clips
            </a>

            <a
              href="#tiimi"
              className="text-gray-300 transition hover:text-purple-400"
            >
              {language === "fi" ? "Tiimi" : "Team"}
            </a>

            <a
              href="#uutiset"
              className="text-gray-300 transition hover:text-purple-400"
            >
              {language === "fi" ? "Uutiset" : "News"}
            </a>

            <a
              href="#liity"
              className="text-gray-300 transition hover:text-purple-400"
            >
              {language === "fi" ? "Liity" : "Join"}
            </a>

            <a
              href="https://discord.gg/ZXgSS9v6ye"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-purple-400 transition hover:text-purple-300"
            >
              Discord
            </a>

            <button
              type="button"
              onClick={() =>
                setLanguage((currentLanguage) =>
                  currentLanguage === "fi" ? "en" : "fi"
                )
              }
              className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-2 font-black text-purple-300 transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:bg-purple-500/20 hover:text-white"
              aria-label={
                language === "fi"
                  ? "Vaihda sivusto englanniksi"
                  : "Switch website to Finnish"
              }
            >
              {language === "fi" ? "EN" : "FI"}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="animate-hero pointer-events-none absolute inset-0 h-full w-full scale-110 select-none object-cover opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />

        <div className="slow-float absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700 opacity-20 blur-[220px]" />

        <div className="relative z-10 -mt-28 px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[14px] text-purple-400">
            STREAM TEAM
          </p>

          <h1 className="mt-6 text-8xl font-black uppercase leading-none md:text-[9rem] lg:text-[10rem]">
            <span className="text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.35)]">
              KOPO
            </span>

            <span className="text-purple-500 drop-shadow-[0_0_55px_rgba(168,85,247,0.95)]">
              SQUAD
            </span>
          </h1>

<p className="mt-8 text-2xl text-gray-200">
  {language === "fi"
    ? "Suomen kasvava striimaajatiimi"
    : "Finland's growing streaming team"}
</p>

          <div className="mt-10">
            <a
              href="#rekry"
              className="button-glow inline-block rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-10 py-4 text-xl font-black shadow-[0_0_30px_rgba(168,85,247,0.45)] transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-fuchsia-500"
            >
{language === "fi"
  ? "HAE MUKAAN KOPOSQUADIIN"
  : "APPLY TO JOIN KOPOSQUAD"}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <a
              href="https://www.twitch.tv/kopostream"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-purple-600 px-8 py-4 font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-purple-500"
            >
              Twitch
            </a>

            <a
              href="https://www.youtube.com/@KopoVlog"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-red-600 px-8 py-4 font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-500"
            >
              YouTube
            </a>

            <a
              href="https://www.instagram.com/kopovirallinen/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-pink-600 px-8 py-4 font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-pink-500"
            >
              Instagram
            </a>

            <a
              href="https://discord.gg/ZXgSS9v6ye"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-indigo-600 px-8 py-4 font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-indigo-500"
            >
              Discord
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <a
            href="#mika"
            className="arrow-float flex flex-col items-center text-white/80 transition-all duration-300 hover:text-purple-400"
          >
<span className="mb-2 text-xs uppercase tracking-[5px]">
  {language === "fi" ? "Vieritä alas" : "Scroll down"}
</span>

            <span className="text-4xl">↓</span>
          </a>
        </div>
      </section>

      {/* MIKÄ ON KOPOSQUAD */}

      <section
        id="mika"
        className="relative overflow-hidden bg-black px-6 py-24"
      >
        <div className="absolute left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-700 opacity-20 blur-[250px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <h2 className="text-center text-5xl font-black">
            <span className="text-purple-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]">
{language === "fi" ? "MIKÄ ON" : "WHAT IS"}
            </span>{" "}
            KOPOSQUAD?
          </h2>

<p className="mt-5 text-center text-xl text-gray-400">
  {language === "fi"
    ? "Striimaaja- ja sisällöntuottajayhteisö, jossa jokainen voi kehittyä"
    : "A community for streamers and content creators where everyone can grow"}
</p>

          <div className="mt-12 rounded-3xl border border-purple-500/30 bg-zinc-900 p-10 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
<p className="text-center text-xl leading-relaxed text-gray-300">
  {language === "fi" ? (
    <>
      Koposquad on suomalainen striimaaja- ja sisällöntuottajayhteisö,
      joka yhdistää tekijöitä, rakentaa yhteistyötä ja tarjoaa
      mahdollisuuden kasvaa yhdessä.
      <br /><br />
      Mukaan voivat liittyä niin kokeneet sisällöntuottajat kuin myös
      uudet tekijät, jotka ovat vasta aloittamassa omaa striimi- tai
      sisällöntuotantouraansa.
      <br /><br />
      Tavoitteena on luoda yhteisö, jossa tekijät voivat saada
      näkyvyyttä, jakaa kokemuksia, tehdä yhteistyötä ja kehittää omaa
      sisältöään.
    </>
  ) : (
    <>
      Koposquad is a Finnish community for streamers and content creators,
      bringing creators together to collaborate and grow.
      <br /><br />
      Both experienced creators and newcomers are welcome to join and
      develop their streaming or content creation journey.
      <br /><br />
      Our goal is to build a community where creators can gain visibility,
      collaborate with others and improve their content together.
    </>
  )}
</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-zinc-900 p-8 shadow-lg transition hover:border-purple-500">
              <div className="absolute inset-0 bg-purple-600 opacity-10 blur-3xl" />

              <div className="relative z-10">
<h3 className="text-3xl font-bold text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
  {language === "fi" ? "STRIIMAAMINEN" : "STREAMING"}
</h3>

<p className="mt-4 leading-relaxed text-gray-400">
  {language === "fi"
    ? "Koposquad tarjoaa yhteisön striimaajille, jotka haluavat kehittää lähetyksiään, löytää uusia katsojia ja saada tukea matkan aikana."
    : "Koposquad provides a community for streamers who want to improve their broadcasts, reach new viewers and receive support along the way."}
</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-zinc-900 p-8 shadow-lg transition hover:border-purple-500">
              <div className="absolute inset-0 bg-purple-600 opacity-10 blur-3xl" />

              <div className="relative z-10">
<h3 className="text-3xl font-bold text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
  {language === "fi" ? "KEHITYS" : "GROWTH"}
</h3>

<p className="mt-4 leading-relaxed text-gray-400">
  {language === "fi"
    ? "Jokainen tekijä aloittaa jostain. Koposquad haluaa auttaa uusia ja kokeneita tekijöitä kehittämään sisältöä ja löytämään oman tyylinsä."
    : "Every creator starts somewhere. Koposquad helps both new and experienced creators improve their content and find their own style."}
</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-zinc-900 p-8 shadow-lg transition hover:border-purple-500">
              <div className="absolute inset-0 bg-purple-600 opacity-10 blur-3xl" />

              <div className="relative z-10">
<h3 className="text-3xl font-bold text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
  {language === "fi" ? "YHTEISÖ" : "COMMUNITY"}
</h3>

<p className="mt-4 leading-relaxed text-gray-400">
  {language === "fi"
    ? "Koposquad rakentuu ihmisistä. Tarkoituksena on luoda paikka, jossa tekijät voivat verkostoitua, tehdä yhteistyötä ja kasvaa yhdessä."
    : "Koposquad is built around people. The goal is to create a place where creators can connect, collaborate and grow together."}
</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* LIVE CENTER */}

      <section
        id="live"
        className="relative overflow-hidden bg-black px-6 py-24"
      >
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[260px]" />

        <div className="absolute left-0 top-20 h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[180px]" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[200px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />

                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
              </span>

<span className="text-sm font-black uppercase tracking-[4px] text-red-400">
  {language === "fi" ? "Live Center" : "Live Center"}
</span>
            </div>

            <h2 className="text-5xl font-black md:text-6xl">
<span className="text-purple-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]">
  KOPOSQUAD
</span>{" "}
{language === "fi" ? "TIIMI" : "TEAM"}
              LIVE
            </h2>

<p className="mt-5 text-xl text-gray-400">
  {language === "fi"
    ? "Katso Koposquadin lähetyksiä ja seuraa, kuka on juuri nyt livenä"
    : "Watch Koposquad streams and see who is currently live"}
</p>
          </div>

          {/* JÄSENTEN LIVE-KORTIT */}

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member) => {
              const stream = streams.find(
                (item) => item.user_login === member.twitch
              );

              return (
                <div
                  key={member.name}
                  className={`group relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${
                    stream
                      ? "border-red-500/40 bg-red-500/[0.07] shadow-[0_20px_60px_rgba(239,68,68,0.15)] hover:border-red-400 hover:shadow-[0_25px_80px_rgba(239,68,68,0.25)]"
                      : "border-white/10 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:border-purple-500/50 hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/10 opacity-50" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black">
                          {member.name}
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-purple-400">
                          {member.role}
                        </p>
                      </div>

                      {stream ? (
                        <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />

                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                          </span>

                          <span className="text-xs font-black text-red-400">
                            LIVE
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 rounded-full border border-gray-700 bg-black/30 px-3 py-1">
                          <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />

                          <span className="text-xs font-black text-gray-500">
                            OFFLINE
                          </span>
                        </div>
                      )}
                    </div>

                    {stream ? (
                      <>
                        <p className="mt-5 line-clamp-2 min-h-[48px] text-gray-300">
                          {stream.title}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm font-bold text-gray-400">
                            👀 {stream.viewer_count} katsojaa
                          </span>

                          <a
                            href={`https://www.twitch.tv/${member.twitch}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black transition hover:scale-105 hover:bg-red-500"
                          >
                            Katso
                          </a>
                        </div>
                      </>
                    ) : (
                      <p className="mt-5 text-sm text-gray-500">
{language === "fi"
  ? "Lähetys ei ole tällä hetkellä käynnissä."
  : "This channel is currently offline."}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* TWITCH PLAYER JA CHAT */}

          <div className="mt-16">
            {streams.length > 0 ? (
              <div className="overflow-hidden rounded-[32px] border border-purple-500/30 bg-white/[0.05] shadow-[0_30px_100px_rgba(168,85,247,0.2)] backdrop-blur-xl">
                <div className="flex flex-col gap-4 border-b border-white/10 bg-gradient-to-r from-purple-950/80 via-zinc-950 to-red-950/60 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10">
                      <span className="relative flex h-4 w-4">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />

                        <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500" />
                      </span>
                    </div>

                    <div>
<p className="text-sm font-black uppercase tracking-[3px] text-red-400">
  {language === "fi" ? "Lähetys käynnissä" : "Live now"}
</p>

                      <h3 className="mt-1 text-2xl font-black">
                        {streams[0].user_name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
<span className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm font-bold text-gray-300">
  👀 {streams[0].viewer_count} {language === "fi" ? "katsojaa" : "viewers"}
</span>

                    <a
                      href={`https://www.twitch.tv/${streams[0].user_login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-purple-600 px-5 py-2 font-black transition hover:scale-105 hover:bg-purple-500"
                    >
{language === "fi" ? "Avaa Twitchissä" : "Open on Twitch"}
                    </a>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_360px]">
                  <div className="aspect-video min-h-[400px] bg-black">
                    <iframe
                      src={`https://player.twitch.tv/?channel=${streams[0].user_login}&parent=localhost`}
                      title={`${streams[0].user_name} Twitch-lähetys`}
                      className="h-full w-full"
                      allowFullScreen
                    />
                  </div>

                  <div className="h-[500px] border-t border-white/10 bg-zinc-950 lg:h-auto lg:border-l lg:border-t-0">
                    <iframe
                      src={`https://www.twitch.tv/embed/${streams[0].user_login}/chat?parent=localhost&darkpopout`}
                      title={`${streams[0].user_name} Twitch-chat`}
                      className="h-full min-h-[500px] w-full"
                    />
                  </div>
                </div>

                <div className="border-t border-white/10 bg-black/40 p-6">
                  <p className="text-lg font-bold text-white">
                    {streams[0].title}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
{language === "fi"
  ? "Voit katsoa lähetystä ja käyttää Twitch-chattia poistumatta sivulta."
  : "Watch the stream and use Twitch chat without leaving the website."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-[32px] border border-purple-500/20 bg-white/[0.05] px-8 py-20 text-center shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[130px]" />

                <div className="relative z-10">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10 text-4xl shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                    📡
                  </div>

                  <h3 className="mt-7 text-3xl font-black">
{language === "fi"
  ? "Kukaan ei ole tällä hetkellä livenä"
  : "Nobody is live right now"}
                  </h3>

<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
  {language === "fi"
    ? "Live Player ja Twitch-chat ilmestyvät tähän automaattisesti, kun joku Koposquadin jäsenistä aloittaa lähetyksen."
    : "The Live Player and Twitch chat will appear here automatically when a Koposquad member starts streaming."}
</p>

                  <a
                    href="https://www.twitch.tv/kopostream"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-block rounded-xl bg-purple-600 px-7 py-3 font-black transition hover:scale-105 hover:bg-purple-500"
                  >
{language === "fi" ? "Avaa Twitch" : "Open Twitch"}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* TIIMI */}

      <section
        id="tiimi"
        className="relative overflow-hidden bg-zinc-950 px-6 py-24"
      >
        <div className="absolute left-1/2 top-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[250px]" />

        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[160px]" />

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[160px]" />

        <div className="relative z-10">
          <h2 className="text-center text-5xl font-black">
            <span className="text-purple-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]">
              KOPOSQUAD
            </span>{" "}
            TIIMI
          </h2>

          <p className="mt-4 text-center text-xl text-gray-400">
{language === "fi"
  ? "Striimaajat ja sisällöntuottajat"
  : "Streamers and Content Creators"}
          </p>

          <div className="mx-auto mt-14 max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {members.map((member) => (
                <div
                  key={member.name}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:border-purple-400/70 hover:bg-white/[0.09] hover:shadow-[0_25px_80px_rgba(168,85,247,0.25)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/10 opacity-60" />

                  <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-purple-500/20 blur-[80px] transition-all duration-700 group-hover:left-0 group-hover:top-0 group-hover:bg-purple-500/30" />

                  <div className="pointer-events-none absolute -bottom-24 -right-24 h-52 w-52 rounded-full bg-fuchsia-500/10 blur-[90px] transition-all duration-700 group-hover:-bottom-10 group-hover:-right-10 group-hover:bg-fuchsia-500/20" />

                  <div className="relative mb-6 flex justify-center">
                    <div className="rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-700 p-[3px] shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:shadow-[0_0_55px_rgba(168,85,247,0.75)]">
<img
  src={getProfileImage(member.twitch)}
  alt={member.name}
  className="h-36 w-36 rounded-full bg-zinc-900 object-cover transition-all duration-500 group-hover:scale-[1.04]"
/>
                    </div>

                    <div className="absolute bottom-1 right-[calc(50%-70px)] h-5 w-5 rounded-full border-4 border-zinc-900 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-center text-3xl font-black transition-all duration-300 group-hover:text-purple-300 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                    {member.name === "Vapaa paikka"
  ? language === "fi"
    ? "Vapaa paikka"
    : "Open Position"
  : member.name}
                    </h3>

                    <p className="mt-2 text-center font-bold text-purple-400">
{member.role === "Perustaja / Striimaaja"
  ? language === "fi"
    ? "Perustaja / Striimaaja"
    : "Founder / Streamer"
  : member.role === "Striimaaja"
  ? language === "fi"
    ? "Striimaaja"
    : "Streamer"
  : member.role === "Sisällöntuottaja"
  ? language === "fi"
    ? "Sisällöntuottaja"
    : "Content Creator"
  : member.role}
                    </p>

                    {member.twitch ? (
                      <div className="flex justify-center">
                        <a
                          href={`https://www.twitch.tv/${member.twitch}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-purple-400/20 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 font-bold shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-fuchsia-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.55)]"
                        >
                          Twitch
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </a>
                      </div>
                    ) : (
                      <p className="mt-6 text-center text-sm font-semibold text-gray-500">
{language === "fi"
  ? "Paikka avoinna"
  : "Position available"}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <a
                href="#rekry"
                className="group relative flex min-h-[330px] items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-purple-500/40 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:border-purple-400 hover:bg-purple-500/10 hover:shadow-[0_25px_80px_rgba(168,85,247,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-fuchsia-500/10" />

                <div className="relative z-10 text-center text-gray-400">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10 text-6xl font-black text-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 group-hover:rotate-90 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:shadow-[0_0_45px_rgba(168,85,247,0.5)]">
                    +
                  </div>

                  <p className="mt-5 text-2xl font-black text-white">
{language === "fi"
  ? "Uusi jäsen"
  : "New member"}
                  </p>

                  <p className="mt-2 text-sm">
{language === "fi"
  ? "Tule mukaan Koposquadiin"
  : "Join Koposquad"}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>



{/* CLIPS */}

<section
  id="clips"
  className="py-24 px-6 bg-zinc-950 relative overflow-hidden"
>

  <div className="absolute left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-700 blur-[220px] opacity-20 rounded-full"></div>

  <div className="relative z-10">

<h2 className="text-5xl font-black text-center">
  KOPOSQUAD CLIPS
</h2>

<p className="text-center text-gray-400 mt-4 text-xl">
  {language === "fi"
    ? "Katso tiimin parhaat Twitch-klipit yhdestä paikasta."
    : "Watch the best Twitch clips from the team in one place."}
</p>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-14">

{clipsLoading ? (
  <p className="col-span-full text-center text-gray-400">
    {language === "fi" ? "Ladataan klippejä..." : "Loading clips..."}
  </p>
) : (
  clips.map((clip) => (

    <div
      key={clip}
      className="bg-zinc-900 border border-purple-500/20 rounded-3xl overflow-hidden hover:border-purple-500 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.12)]"
    >

<a
  href={clip.url}
  target="_blank"
  rel="noopener noreferrer"
  className="block"
>
  <div className="aspect-video bg-black overflow-hidden relative">

    <img
      src={clip.thumbnail_url}
      alt={clip.title}
      className="h-full w-full object-cover transition duration-300 hover:scale-105"
    />

    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
      <span className="text-6xl drop-shadow-lg">
        ▶
      </span>
    </div>

  </div>
</a>

<div className="p-6">

  <h3 className="text-xl font-bold line-clamp-2 min-h-[56px]">
    {clip.title}
  </h3>

  <p className="text-purple-400 mt-2 font-bold">
    {clip.broadcaster_name}
  </p>

  <p className="text-gray-400 mt-3">
    {clip.view_count} {language === "fi" ? "katselukertaa" : "views"}
  </p>

  <a
    href={clip.url}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-6 block w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-bold transition text-center"
  >
    {language === "fi" ? "Katso Twitchissä" : "Watch on Twitch"}
  </a>

</div>

    </div>

  ))
)}
</div>

  </div>

</section>



{/* ROADMAP */}

<section
  id="roadmap"
  className="py-24 px-6 bg-black relative overflow-hidden"
>

  <div className="absolute left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-700 blur-[260px] opacity-20 rounded-full"></div>

  <div className="relative z-10">

<h2 className="text-5xl font-black text-center">
  <span className="text-purple-500">KOPOSQUAD</span> ROADMAP
</h2>

<p className="text-center text-gray-400 mt-5 text-xl max-w-3xl mx-auto">
  {language === "fi"
    ? "Koposquad on vasta alussa. Tavoitteena on rakentaa Suomen yksi aktiivisimmista striimaaja- ja sisällöntuottajayhteisöistä."
    : "Koposquad is only getting started. Our goal is to build one of Finland's most active communities for streamers and content creators."}
</p>

<div className="max-w-4xl mx-auto mt-16 space-y-6">

  <div className="bg-zinc-900 border border-green-500/40 rounded-3xl p-6 shadow-[0_0_35px_rgba(34,197,94,0.15)]">
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold">
{language === "fi" ? "Sivusto luotu" : "Website launched"}
      </h3>

      <span className="text-green-400 font-bold">
{language === "fi" ? "✓ VALMIS" : "✓ COMPLETED"}
      </span>
    </div>
  </div>

  <div className="bg-zinc-900 border border-green-500/40 rounded-3xl p-6 shadow-[0_0_35px_rgba(34,197,94,0.15)]">
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold">
{language === "fi" ? "Ensimmäiset jäsenet" : "First members"}
      </h3>

      <span className="text-green-400 font-bold">
{language === "fi" ? "✓ VALMIS" : "✓ COMPLETED"}
      </span>
    </div>
  </div>

  <div className="bg-zinc-900 border border-purple-500/40 rounded-3xl p-6 shadow-[0_0_35px_rgba(168,85,247,0.15)]">
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold">
{language === "fi" ? "10 aktiivista tekijää" : "10 active creators"}
      </h3>

      <span className="text-purple-400 font-bold">
{language === "fi" ? "TYÖN ALLA" : "IN PROGRESS"}
      </span>
    </div>
  </div>

  <div className="bg-zinc-900 border border-purple-500/40 rounded-3xl p-6 shadow-[0_0_35px_rgba(168,85,247,0.15)]">
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold">
{language === "fi"
  ? "Ensimmäinen yhteistyökumppani"
  : "First collaboration partner"}
      </h3>

      <span className="text-purple-400 font-bold">
{language === "fi" ? "TYÖN ALLA" : "IN PROGRESS"}
      </span>
    </div>
  </div>

  <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 hover:border-purple-500 transition">
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold">
{language === "fi" ? "1 000 Discord-jäsentä" : "1,000 Discord members"}
      </h3>

      <span className="text-gray-400 font-bold">
{language === "fi" ? "TULOSSA" : "COMING SOON"}
      </span>
    </div>
  </div>

  <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 hover:border-purple-500 transition">
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold">
        KOPOSQUAD Merch
      </h3>

      <span className="text-gray-400 font-bold">
{language === "fi" ? "TULOSSA" : "COMING SOON"}
      </span>
    </div>
  </div>

  <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 hover:border-purple-500 transition">
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold">
{language === "fi" ? "Oma KOPOSQUAD-tapahtuma" : "KOPOSQUAD event"}
      </h3>

      <span className="text-gray-400 font-bold">
{language === "fi" ? "TULEVAISUUDESSA" : "IN THE FUTURE"}
      </span>
    </div>
  </div>

</div>

  </div>

</section>

{/* UUTISET */}

<section
  id="uutiset"
  className="relative overflow-hidden bg-zinc-950 px-6 py-24"
>
  <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-600 opacity-20 blur-[220px]" />

  <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-purple-700 opacity-20 blur-[200px]" />

  <div className="relative z-10">
    <h2 className="text-center text-5xl font-black">
<span className="text-purple-500">
  {language === "fi" ? "UUTISET" : "NEWS"}
</span>
    </h2>

<p className="mt-5 text-center text-xl text-gray-400">
  {language === "fi"
    ? "Viimeisimmät tapahtumat, julkaisut ja tulevat projektit"
    : "Latest events, releases and upcoming projects"}
</p>

    <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
      <div className="rounded-3xl border border-purple-500/30 bg-zinc-900 p-8 transition hover:-translate-y-2 hover:border-purple-500">
<h3 className="text-3xl font-bold text-purple-400">
  {language === "fi" ? "Uusia sisältöjä tulossa" : "New content coming"}
</h3>

<p className="mt-4 text-gray-400">
  {language === "fi"
    ? "KOPOSQUAD tuo tulevaisuudessa lisää sisältöä, tapahtumia ja yhteisön aktiviteetteja."
    : "KOPOSQUAD will bring more content, events and community activities in the future."}
</p>
      </div>

      <div className="rounded-3xl border border-pink-500/30 bg-zinc-900 p-8 transition hover:-translate-y-2 hover:border-pink-500">
<h3 className="text-3xl font-bold text-pink-400">
  {language === "fi" ? "Tulevat striimit" : "Upcoming streams"}
</h3>

<p className="mt-4 text-gray-400">
  {language === "fi"
    ? "Seuraa tulevia lähetyksiä ja katso, milloin Koposquad on livenä."
    : "Follow upcoming broadcasts and see when Koposquad is live."}
</p>
      </div>

      <div className="rounded-3xl border border-blue-500/30 bg-zinc-900 p-8 transition hover:-translate-y-2 hover:border-blue-500">
<h3 className="text-3xl font-bold text-blue-400">
  {language === "fi" ? "KOPOSQUAD-projektit" : "KOPOSQUAD projects"}
</h3>

<p className="mt-4 text-gray-400">
  {language === "fi"
    ? "Uusia projekteja, yhteistyökuvioita ja suurempia suunnitelmia on tulossa."
    : "New projects, collaborations and bigger plans are on the way."}
</p>
      </div>
    </div>
  </div>
</section>



{/* REKRYTOINTI */}

<section
  id="rekry"
  className="relative overflow-hidden bg-zinc-950 px-6 py-24"
>
  <div className="absolute left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-700 opacity-20 blur-[250px]" />

  <div className="relative z-10 mx-auto max-w-6xl">
    <h2 className="text-center text-5xl font-black">
      <span className="text-purple-500">
        {language === "fi" ? "REKRYTOINTI" : "RECRUITMENT"}
      </span>
    </h2>

    <p className="mx-auto mt-5 max-w-3xl text-center text-xl text-gray-400">
      {language === "fi"
        ? "Haluatko mukaan rakentamaan Koposquadin tulevaisuutta? Etsimme jatkuvasti uusia tekijöitä yhteisöömme."
        : "Would you like to help build the future of Koposquad? We are always looking for new creators to join our community."}
    </p>

    <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: language === "fi" ? "Striimaajat" : "Streamers",
          text:
            language === "fi"
              ? "Twitch-, Kick- tai YouTube-striimaajat. Seuraajamäärällä ei ole väliä."
              : "Twitch, Kick and YouTube streamers. Your follower count does not matter.",
        },
        {
          title:
            language === "fi" ? "Sisällöntuottajat" : "Content Creators",
          text:
            language === "fi"
              ? "YouTube-, TikTok-, Instagram- ja muut sisällöntuottajat ovat tervetulleita."
              : "YouTube, TikTok, Instagram and other content creators are welcome.",
        },
        {
          title: language === "fi" ? "Videoeditoijat" : "Video Editors",
          text:
            language === "fi"
              ? "Haluatko auttaa videoiden editoinnissa tai shorts-sisällön tekemisessä?"
              : "Would you like to help edit videos or create short-form content?",
        },
        {
          title: language === "fi" ? "Graafikot" : "Graphic Designers",
          text:
            language === "fi"
              ? "Overlayt, logot, bannerit, thumbnailit ja muu visuaalinen suunnittelu."
              : "Overlays, logos, banners, thumbnails and other visual design.",
        },
        {
          title: language === "fi" ? "Moderaattorit" : "Moderators",
          text:
            language === "fi"
              ? "Discord- ja Twitch-moderaattoreita auttamaan yhteisön rakentamisessa."
              : "Discord and Twitch moderators to help build the community.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-3xl border border-purple-500/30 bg-zinc-900 p-8 transition hover:border-purple-500"
        >
          <h3 className="text-3xl font-bold text-purple-400">
            {item.title}
          </h3>

          <p className="mt-4 leading-relaxed text-gray-400">
            {item.text}
          </p>
        </div>
      ))}

      <div className="rounded-3xl bg-gradient-to-br from-purple-700 to-purple-900 p-8 shadow-[0_0_45px_rgba(168,85,247,0.35)]">
        <h3 className="text-3xl font-black">
          {language === "fi" ? "Sinä?" : "You?"}
        </h3>

        <p className="mt-4 leading-relaxed text-white/90">
          {language === "fi"
            ? "Vaikka et sopisi mihinkään yllä olevista, voit silti hakea mukaan. Etsimme ennen kaikkea motivoituneita tekijöitä."
            : "Even if none of the roles above fit you, you can still apply. Above all, we are looking for motivated people."}
        </p>
      </div>
    </div>

    <div className="mt-14 rounded-3xl border border-purple-500/30 bg-zinc-900 p-10 text-center">
      <h3 className="text-4xl font-black">
        {language === "fi"
          ? "Seuraajamäärällä ei ole väliä."
          : "Your follower count does not matter."}
      </h3>

      <p className="mx-auto mt-5 max-w-3xl text-xl text-gray-400">
        {language === "fi"
          ? "Jokainen suuri sisällöntuottaja on joskus aloittanut nollasta. Koposquadissa tärkeintä ovat motivaatio, aktiivisuus ja halu kehittyä yhdessä muiden kanssa."
          : "Every successful creator once started from zero. At Koposquad, motivation, activity and the desire to grow together are what matter most."}
      </p>

      <a
        href="#liity"
        className="mt-8 inline-block rounded-2xl bg-purple-600 px-10 py-4 text-lg font-bold transition hover:bg-purple-700"
      >
        {language === "fi" ? "Hae mukaan" : "Apply now"}
      </a>
    </div>
  </div>
</section>

{/* HAKEMUSLOMAKE */}

<section
  id="liity"
  className="relative overflow-hidden px-6 py-24"
>
  <div className="absolute inset-0 bg-purple-900/20 blur-3xl" />

  <div className="relative mx-auto max-w-4xl rounded-3xl border border-purple-900/50 bg-zinc-900 p-10 shadow-2xl">
    <h2 className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-5xl font-black text-transparent">
      {language === "fi" ? "LIITY KOPOSQUADIIN" : "JOIN KOPOSQUAD"}
    </h2>

    <p className="mt-4 text-lg text-gray-400">
      {language === "fi"
        ? "Haluatko mukaan kasvavaan striimaaja- ja sisällöntuottajatiimiin? Lähetä hakemus ja kerro meille itsestäsi."
        : "Would you like to join a growing team of streamers and content creators? Send an application and tell us about yourself."}
    </p>

    <form onSubmit={handleApplicationSubmit}>
      <input
        type="text"
        required
        maxLength={100}
        value={applicationForm.name}
        onChange={(event) =>
          setApplicationForm({
            ...applicationForm,
            name: event.target.value,
          })
        }
        className="mt-8 w-full rounded-xl border border-purple-800 bg-black/70 p-4 outline-none transition focus:border-purple-400"
        placeholder={language === "fi" ? "Nimi" : "Name"}
      />

      <input
        type="text"
        required
        maxLength={300}
        value={applicationForm.channel}
        onChange={(event) =>
          setApplicationForm({
            ...applicationForm,
            channel: event.target.value,
          })
        }
        className="mt-4 w-full rounded-xl border border-purple-800 bg-black/70 p-4 outline-none transition focus:border-purple-400"
        placeholder="Twitch / YouTube"
      />

      <input
        type="text"
        required
        maxLength={100}
        value={applicationForm.discord}
        onChange={(event) =>
          setApplicationForm({
            ...applicationForm,
            discord: event.target.value,
          })
        }
        className="mt-4 w-full rounded-xl border border-purple-800 bg-black/70 p-4 outline-none transition focus:border-purple-400"
        placeholder="Discord"
      />

      <textarea
        required
        maxLength={2000}
        value={applicationForm.message}
        onChange={(event) =>
          setApplicationForm({
            ...applicationForm,
            message: event.target.value,
          })
        }
        className="mt-4 h-40 w-full resize-none rounded-xl border border-purple-800 bg-black/70 p-4 outline-none transition focus:border-purple-400"
        placeholder={
          language === "fi"
            ? "Kerro itsestäsi ja miksi haluaisit mukaan"
            : "Tell us about yourself and why you would like to join"
        }
      />

      <button
        type="submit"
        disabled={applicationStatus === "sending"}
        className="mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-4 font-bold shadow-lg shadow-purple-600/30 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {applicationStatus === "sending"
          ? language === "fi"
            ? "Lähetetään..."
            : "Sending..."
          : language === "fi"
            ? "Lähetä hakemus"
            : "Send application"}
      </button>

      {applicationStatus === "success" && (
        <p className="mt-5 rounded-xl border border-green-500/40 bg-green-500/10 p-4 font-bold text-green-400">
          {language === "fi"
            ? "Hakemus lähetettiin onnistuneesti!"
            : "Application sent successfully!"}
        </p>
      )}

      {applicationStatus === "error" && (
        <p className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 p-4 font-bold text-red-400">
          {applicationError}
        </p>
      )}
    </form>
  </div>
</section>






{/* FOOTER */}

<footer className="border-t border-zinc-800 bg-zinc-950 py-12 text-center">
  <h2 className="text-4xl font-black">
    <span className="text-purple-500">K</span>
    OPOSQUAD
  </h2>

  <p className="mt-4 text-lg text-gray-400">
    {language === "fi"
      ? "Suomen kasvava striimaaja- ja sisällöntuottajatiimi"
      : "Finland's growing team of streamers and content creators"}
  </p>

  <div className="mt-8 flex flex-wrap justify-center gap-5">
    <a
      href="https://www.twitch.tv/kopostream"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl bg-purple-600 px-6 py-3 font-bold transition hover:bg-purple-500"
    >
      Twitch
    </a>

    <a
      href="https://www.youtube.com/@KopoVlog"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
    >
      YouTube
    </a>

    <a
      href="https://www.instagram.com/kopovirallinen/"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl bg-pink-600 px-6 py-3 font-bold transition hover:bg-pink-500"
    >
      Instagram
    </a>

    <a
      href="https://discord.gg/ZXgSS9v6ye"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl bg-indigo-600 px-6 py-3 font-bold transition hover:bg-indigo-500"
    >
      Discord
    </a>
  </div>

  <p className="mt-10 text-gray-500">
    © 2026 KOPOSQUAD
  </p>

  <p className="mt-3 text-sm text-gray-600">
    {language === "fi"
      ? "Sivuston tekijä: Kopo"
      : "Website created by Kopo"}
  </p>
      </footer>
    </main>
  );
}