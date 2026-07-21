"use client";

import { useEffect, useState } from "react";

type Stream = {
  user_login: string;
  user_name: string;
  title: string;
  viewer_count: number;
};

type TwitchClip = {
  id: string;
  title: string;
  url: string;
  thumbnail_url: string;
  broadcaster_name: string;
  broadcaster_id?: string;
  view_count: number;
};

const twitchUsername = "kopostream";

export default function KopoProfilePage() {
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [streamTitle, setStreamTitle] = useState("");
  const [liveLoading, setLiveLoading] = useState(true);

  const [clips, setClips] = useState<TwitchClip[]>([]);
  const [clipsLoading, setClipsLoading] = useState(true);

  useEffect(() => {
    async function checkLive() {
      try {
        const response = await fetch(
          `/api/live?users=${twitchUsername}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Live-tietojen hakeminen epäonnistui.");
        }

        const data: { data?: Stream[] } = await response.json();

        const stream = data.data?.find(
          (item) => item.user_login.toLowerCase() === "kopostream"
        );

        if (stream) {
          setIsLive(true);
          setViewerCount(stream.viewer_count || 0);
          setStreamTitle(stream.title || "");
        } else {
          setIsLive(false);
          setViewerCount(0);
          setStreamTitle("");
        }
      } catch {
        setIsLive(false);
        setViewerCount(0);
        setStreamTitle("");
      } finally {
        setLiveLoading(false);
      }
    }

    checkLive();

    const timer = window.setInterval(checkLive, 60000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
  async function fetchClips() {
    try {
      const response = await fetch("/api/live/clips", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Klippien hakeminen epäonnistui.");
      }

      const data: { data?: TwitchClip[] } = await response.json();

      const kopoClips = (data.data || [])
        .filter(
          (clip) =>
            clip.broadcaster_name.toLowerCase() === "kopo" ||
            clip.broadcaster_name.toLowerCase() === "kopostream"
        )
        .slice(0, 3);

      setClips(kopoClips);
    } catch {
      setClips([]);
    } finally {
      setClipsLoading(false);
    }
  }

    fetchClips();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-72 top-[8%] h-[720px] w-[720px] rounded-full bg-purple-700/18 blur-[210px]" />
        <div className="absolute -right-72 top-[34%] h-[760px] w-[760px] rounded-full bg-fuchsia-700/12 blur-[230px]" />
        <div className="absolute -left-64 top-[68%] h-[680px] w-[680px] rounded-full bg-violet-700/12 blur-[220px]" />
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent shadow-[0_0_24px_rgba(168,85,247,0.45)]" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-fuchsia-500/20 to-transparent shadow-[0_0_24px_rgba(217,70,239,0.35)]" />
      </div>

      <div className="relative z-10">
      {/* YLÄVALIKKO */}

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-purple-500/20 bg-black/85 backdrop-blur-xl">
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

            <a href="/tools" className="text-gray-300 transition hover:text-purple-300">
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
        </div>
      </nav>

      {/* PROFIILIN YLÄOSA */}

      <section className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-24 pt-32">
        <div className="pointer-events-none absolute -right-24 top-28 hidden lg:block">
          <div className="absolute inset-0 scale-75 bg-purple-600/18 blur-[95px]" />
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="relative w-[520px] rotate-[-7deg] object-contain opacity-[0.055]"
          />
        </div>

        <div className="pointer-events-none absolute left-[38%] top-24 h-[420px] w-[620px] rounded-full bg-purple-700/10 blur-[170px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-fuchsia-700/[0.08] blur-[150px]" />
        <a
          href="/#tiimi"
          className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[2px] text-purple-400 transition hover:text-purple-300"
        >
          <span className="text-xl">←</span>
          Takaisin tiimiin
        </a>

        <div className="relative mt-10 grid items-start gap-10 rounded-[32px] border border-purple-500/15 bg-gradient-to-br from-purple-950/20 via-black/35 to-fuchsia-950/10 p-6 shadow-[0_0_55px_rgba(126,34,206,0.10)] backdrop-blur-sm lg:grid-cols-[380px_1fr] lg:p-8">
          {/* PROFIILIKUVA */}

          <div className="flex flex-col items-center">
            <div className="relative rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-700 p-[4px] shadow-[0_0_70px_rgba(168,85,247,0.35)]">
              <div className="overflow-hidden rounded-full bg-black p-[6px]">
                <img
                  src="/members/kopo.png.png"
                  alt="Kopo"
                  className="h-[360px] w-[360px] rounded-full object-cover object-[center_35%]"
                />
              </div>

              {isLive && (
                <span className="absolute bottom-8 right-5 h-8 w-8 rounded-full border-[6px] border-black bg-green-500 shadow-[0_0_25px_rgba(34,197,94,0.9)]" />
              )}
            </div>

            {liveLoading ? (
              <div className="mt-6 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3">
                <span className="h-3 w-3 animate-pulse rounded-full bg-gray-500" />

                <span className="font-black uppercase tracking-[2px] text-gray-400">
                  Tarkistetaan liveä
                </span>
              </div>
            ) : isLive ? (
              <div className="mt-6 flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>

                <span className="font-black uppercase tracking-[2px]">
                  Livenä nyt
                </span>
              </div>
            ) : (
              <div className="mt-6 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-gray-600" />

                <span className="font-black uppercase tracking-[2px] text-gray-400">
                  Ei livenä
                </span>
              </div>
            )}
          </div>

          {/* PROFIILITIEDOT */}

          <div className="lg:pt-4">
            <p className="text-sm font-black uppercase tracking-[6px] text-purple-400">
              KOPOSQUAD-JÄSEN
            </p>

            <h1 className="mt-4 text-6xl font-black uppercase md:text-8xl">
              KOPO
            </h1>

            <p className="mt-4 text-2xl font-black text-purple-400">
              Perustaja / Striimaaja
            </p>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
              Moi! Mä oon Kopo, KOPOSQUADin perustaja. Tavoitteena on
              rakentaa Suomen kovin ja positiivisin striimaaja- ja
              sisällöntuottajayhteisö. Teen sisältöä Twitchiin, YouTubeen ja
              sosiaaliseen mediaan. Tehdään yhdessä jotain isoa.
            </p>

            {/* SOMEPAINIKKEET */}

            <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a
href={`https://www.twitch.tv/${twitchUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl border border-purple-500/50 bg-purple-600 px-6 py-4 font-black transition hover:-translate-y-1 hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.45)]"
              >
                TWITCH
              </a>

              <a
                href="https://www.youtube.com/@KopoVlog"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl border border-red-500/40 bg-white/[0.04] px-6 py-4 font-black transition hover:-translate-y-1 hover:border-red-500 hover:bg-red-500/10"
              >
                YOUTUBE
              </a>

              <a
                href="https://www.instagram.com/kopovirallinen/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl border border-pink-500/40 bg-white/[0.04] px-6 py-4 font-black transition hover:-translate-y-1 hover:border-pink-500 hover:bg-pink-500/10"
              >
                INSTAGRAM
              </a>

              <a
                href="https://www.tiktok.com/@koposplayer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] px-6 py-4 font-black transition hover:-translate-y-1 hover:border-white/50 hover:bg-white/10"
              >
                TIKTOK
              </a>

              <a
                href="https://discord.gg/ZXgSS9v6ye"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl border border-indigo-500/40 bg-white/[0.04] px-6 py-4 font-black transition hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-500/10"
              >
                DISCORD
              </a>


            </div>

            {/* TWITCH LIVE / OFFLINE */}

            {liveLoading ? (
              <div className="mt-6 flex max-w-3xl items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-5 text-lg font-black text-gray-400">
                Tarkistetaan Twitch-tilaa...
              </div>
            ) : isLive ? (
              <div className="mt-6 max-w-3xl rounded-2xl border border-green-500/20 bg-green-500/[0.06] p-5">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                  </span>

                  <p className="font-black text-green-400">
                    LIVE NYT TWITCHISSÄ
                  </p>
                </div>

                <p className="mt-3 line-clamp-2 text-gray-300">
                  {streamTitle || "Lähetys on käynnissä"}
                </p>

                <p className="mt-2 text-sm font-bold text-gray-400">
                  {viewerCount} katsojaa
                </p>

                <a
href={`https://www.twitch.tv/${twitchUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 px-8 py-4 text-lg font-black transition hover:scale-[1.02]"
                >
                  KATSO LÄHETYSTÄ TWITCHISSÄ
                  <span className="text-2xl">→</span>
                </a>
              </div>
            ) : (
              <a
href={`https://www.twitch.tv/${twitchUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex max-w-3xl items-center justify-center gap-4 rounded-2xl border border-purple-500/30 bg-white/[0.04] px-8 py-5 text-xl font-black transition hover:scale-[1.02] hover:border-purple-400 hover:bg-purple-500/10"
              >
                AVAA TWITCH-KANAVA
                <span className="text-3xl">→</span>
              </a>
            )}

            {/* PIENET TIEDOT */}

            <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-black uppercase tracking-[3px] text-gray-500">
                  Rooli
                </p>

                <p className="mt-2 text-xl font-black">Perustaja</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-black uppercase tracking-[3px] text-gray-500">
                  Maa
                </p>

                <p className="mt-2 text-xl font-black">Suomi</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-black uppercase tracking-[3px] text-gray-500">
                  Pääpelit
                </p>

                <p className="mt-2 text-lg font-black">
                  CS2, Valorant ja Warzone
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-black uppercase tracking-[3px] text-gray-500">
                  Sisältö
                </p>

                <p className="mt-2 text-lg font-black">
                  Striimit, vlogit, IRL ja reaktiot
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


{/* LIVE PLAYER */}
<section className="relative overflow-hidden border-t border-purple-500/20 bg-[radial-gradient(circle_at_center,rgba(126,34,206,0.26),transparent_48%),linear-gradient(to_bottom,#08030d,#000000)] px-6 py-24">
  <div className="pointer-events-none absolute -right-20 top-10 hidden lg:block">
    <img
      src="/images/ks-logo.png.png"
      alt=""
      className="w-[420px] rotate-[8deg] object-contain opacity-[0.035]"
    />
  </div>
  <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[180px]" />

  <div className="relative z-10 mx-auto max-w-7xl">
    <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-black uppercase tracking-[5px] text-purple-400">
          KOPOSQUAD LIVE
        </p>

        <h2 className="mt-3 text-4xl font-black sm:text-5xl">
          KATSO LÄHETYSTÄ
        </h2>
      </div>

      {isLive ? (
        <div className="flex items-center gap-3 rounded-full border border-red-500/40 bg-red-500/10 px-5 py-3">
          <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />

          <span className="text-sm font-black uppercase tracking-[3px] text-red-400">
            Live nyt
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-zinc-500" />

          <span className="text-sm font-black uppercase tracking-[3px] text-zinc-400">
            Offline
          </span>
        </div>
      )}
    </div>

    {isLive ? (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_400px]">
        <div className="overflow-hidden rounded-3xl border border-purple-500/30 bg-zinc-950 shadow-[0_0_60px_rgba(147,51,234,0.18)]">
          <div className="aspect-video w-full">
            <iframe
src={`https://player.twitch.tv/?channel=${twitchUsername}&parent=localhost`}
              title="KopoStream Twitch-lähetys"
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </div>

        <div className="h-[650px] overflow-hidden rounded-3xl border border-purple-500/30 bg-white shadow-[0_0_60px_rgba(147,51,234,0.12)] lg:h-auto">
          <iframe
src={`https://www.twitch.tv/embed/${twitchUsername}/chat?parent=localhost`}
            title="KopoStream Twitch-chat"
            className="h-full min-h-[650px] w-full"
          />
        </div>
      </div>
    ) : (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-10 text-center shadow-[0_0_60px_rgba(147,51,234,0.12)] sm:p-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/10" />

        <div className="relative z-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10">
            <span className="h-5 w-5 rounded-full bg-zinc-500" />
          </div>

          <h3 className="mt-8 text-3xl font-black">
            KOPOSTREAM EI OLE JUURI NYT LIVENÄ
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
            Katso sillä välin uusimmat Twitch-klipit tai siirry kanavalle
            seuraamaan, milloin seuraava lähetys alkaa.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#clips"
              className="rounded-xl bg-purple-600 px-7 py-4 font-black transition hover:bg-purple-500"
            >
              KATSO UUSIMMAT KLIPIT
            </a>

            <a
href={`https://www.twitch.tv/${twitchUsername}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-black transition hover:bg-white/10"
            >
              AVAA TWITCH-KANAVA
            </a>
          </div>
        </div>
      </div>
    )}
  </div>
</section>



      {/* VIIMEISIMMÄT TWITCH-KLIPIT */}

<section
  id="clips"
  className="relative overflow-hidden border-t border-purple-500/20 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.24),transparent_42%),linear-gradient(to_bottom,#0b0411,#030303)] px-6 py-24"
>
        <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-purple-700/14 blur-[180px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-fuchsia-700/10 blur-[190px]" />

        <div className="pointer-events-none absolute -right-20 top-16 hidden lg:block">
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="w-[420px] rotate-[7deg] object-contain opacity-[0.04]"
          />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/15 blur-[220px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[5px] text-purple-400">
                KOPOSTREAM
              </p>

              <h2 className="mt-3 text-4xl font-black md:text-5xl">
                VIIMEISIMMÄT TWITCH-KLIPIT
              </h2>

              <p className="mt-4 text-lg text-gray-400">
                Katso Kopon uusimmat Twitch-klipit.
              </p>
            </div>

            <a
href={`https://www.twitch.tv/${twitchUsername}/clips`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 px-6 py-3 font-black text-purple-300 transition hover:border-purple-400 hover:bg-purple-500/20 hover:text-white"
            >
              KAIKKI KLIPIT
            </a>
          </div>

          {clipsLoading ? (
            <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center">
              <p className="font-bold text-gray-400">
                Ladataan Twitch-klippejä...
              </p>
            </div>
          ) : clips.length > 0 ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {clips.map((clip) => (
                <article
                  key={clip.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/60 hover:shadow-[0_25px_70px_rgba(168,85,247,0.18)]"
                >
                  <a
                    href={clip.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <img
                        src={clip.thumbnail_url}
                        alt={clip.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/10">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/60 text-3xl backdrop-blur">
                          ▶
                        </span>
                      </div>

                      <div className="absolute bottom-4 right-4 rounded-lg bg-black/80 px-3 py-1 text-sm font-black">
                        {clip.view_count} katselua
                      </div>
                    </div>
                  </a>

                  <div className="p-6">
                    <h3 className="line-clamp-2 min-h-[56px] text-xl font-black">
                      {clip.title}
                    </h3>

                    <p className="mt-3 font-bold text-purple-400">
                      {clip.broadcaster_name}
                    </p>

                    <a
                      href={clip.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center justify-center rounded-xl bg-purple-600 px-5 py-3 font-black transition hover:bg-purple-500"
                    >
                      KATSO TWITCHISSÄ
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center">
              <h3 className="text-2xl font-black">
                Klippejä ei löytynyt
              </h3>

              <p className="mt-3 text-gray-400">
                Kopon Twitch-klipit ilmestyvät tähän automaattisesti.
              </p>
            </div>
          )}
        </div>
      </section>
      </div>
    </main>
  );
}