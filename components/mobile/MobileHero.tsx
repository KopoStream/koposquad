"use client";

type MobileHeroProps = {
  language: "fi" | "en";
};

export default function MobileHero({ language }: MobileHeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-purple-500/20 bg-black pt-20 md:hidden">
      {/* TAUSTAKUVA */}
      <img
        src="/images/hero-bg.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-95"
      />

      {/* TUMMENNUS */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/65" />

      {/* HEHKUT */}
      <div className="pointer-events-none absolute -left-36 top-[18%] h-[340px] w-[340px] rounded-full bg-violet-600/30 blur-[120px]" />

      <div className="pointer-events-none absolute -right-36 top-[28%] h-[360px] w-[360px] rounded-full bg-fuchsia-600/25 blur-[130px]" />

      <div className="pointer-events-none absolute left-1/2 top-[45%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[140px]" />

      {/* HIMMEÄT KS-LOGOT */}
      <img
        src="/images/ks-logo.png.png"
        alt=""
className="pointer-events-none absolute -left-6 top-[18%] w-[95px] opacity-[0.06] animate-[ksDriftOne_19s_ease-in-out_infinite]"
      />

      <img
        src="/images/ks-logo.png.png"
        alt=""
className="pointer-events-none absolute -right-8 top-[42%] w-[120px] opacity-[0.055] animate-[ksDriftFive_26s_ease-in-out_infinite]"
      />

      <img
        src="/images/ks-logo.png.png"
        alt=""
className="pointer-events-none absolute bottom-[13%] left-[10%] w-[70px] opacity-[0.04] animate-[ksDriftSix_31s_ease-in-out_infinite]"
      />

      {/* SISÄLTÖ */}
      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-5 pb-28 pt-16 text-center">
        <p className="text-xs font-black uppercase tracking-[0.6em] text-purple-300">
          STREAM TEAM
        </p>

        <h1 className="mt-7 whitespace-nowrap text-[3.35rem] font-black uppercase leading-[0.88] tracking-[-0.06em]">
          <span className="text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.18)]">
            KOPO
          </span>

<span className="squad-shine bg-[linear-gradient(110deg,#d8b4fe_0%,#a855f7_32%,#ffffff_46%,#d946ef_58%,#9333ea_82%,#d8b4fe_100%)] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            SQUAD
          </span>
        </h1>

        <p className="mt-8 max-w-[360px] text-[1.05rem] leading-7 text-gray-200">
          {language === "fi"
            ? "Suomen kasvava striimaaja- ja sisällöntuottajayhteisö."
            : "Finland's growing community for streamers and content creators."}
        </p>

        {/* PÄÄNAPIT */}
        <div className="mt-9 flex w-full flex-col items-center gap-4">
          <a
            href="#rekry"
            className="group relative flex w-full max-w-[360px] items-center justify-center overflow-hidden rounded-2xl border border-fuchsia-400/60 bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 px-6 py-4 text-base font-black shadow-[0_0_32px_rgba(168,85,247,0.42)]"
          >
            <span className="pointer-events-none absolute -left-20 top-0 h-full w-14 rotate-12 bg-white/20 blur-md" />

            <span className="relative">
              {language === "fi"
                ? "HAE MUKAAN KOPOSQUADIIN"
                : "APPLY TO JOIN KOPOSQUAD"}
            </span>
          </a>

          <a
            href="#live"
            className="flex min-w-[170px] items-center justify-center rounded-2xl border border-purple-400/50 bg-black/45 px-8 py-4 text-base font-black text-purple-100 backdrop-blur-md"
          >
            {language === "fi" ? "Katso livet" : "Watch live"}
          </a>
        </div>

        {/* SOMEPAINIKKEET */}
        <div className="mt-8 grid w-full max-w-[360px] grid-cols-2 gap-3">
          <a
            href="https://www.twitch.tv/kopostream"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-purple-400/50 bg-purple-600/20 px-4 py-3 font-bold backdrop-blur-md"
          >
            Twitch
          </a>

          <a
            href="https://www.youtube.com/@KopoVlog"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-red-400/50 bg-red-600/20 px-4 py-3 font-bold backdrop-blur-md"
          >
            YouTube
          </a>

          <a
            href="https://www.instagram.com/kopovirallinen/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-pink-400/50 bg-pink-600/20 px-4 py-3 font-bold backdrop-blur-md"
          >
            Instagram
          </a>

          <a
            href="https://discord.gg/ZXgSS9v6ye"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-indigo-400/50 bg-indigo-600/20 px-4 py-3 font-bold backdrop-blur-md"
          >
            Discord
          </a>

          <a
            href="https://koposquad-shop.fourthwall.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 mx-auto w-[55%] rounded-xl border border-fuchsia-400/60 bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 px-4 py-3 font-black text-purple-100 backdrop-blur-md"
          >
            {language === "fi" ? "Kauppa" : "Shop"}
          </a>
        </div>
      </div>

      {/* VIERITÄ ALAS */}
      <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
        <a
          href="#mika"
          className="flex flex-col items-center text-white/65"
        >
          <span className="mb-2 text-[9px] font-bold uppercase tracking-[0.4em]">
            {language === "fi" ? "Vieritä alas" : "Scroll down"}
          </span>

          <span className="text-3xl">↓</span>
        </a>
      </div>
    </section>
  );
}