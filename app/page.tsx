"use client";

import { FormEvent, useEffect, useState } from "react";
import { members } from "./data/members";

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



export default function Home() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [twitchUsers, setTwitchUsers] = useState<TwitchUser[]>([]);

  const [koposquadTvStream, setKoposquadTvStream] =
    useState<Stream | null>(null);

  const [koposquadTvUser, setKoposquadTvUser] =
    useState<TwitchUser | null>(null);

  const [koposquadTvLoading, setKoposquadTvLoading] = useState(true);

  const [language, setLanguage] = useState<"fi" | "en">("fi");
  const [menuOpen, setMenuOpen] = useState(false);
const [activeMenu, setActiveMenu] = useState<
  "tiimi" | "tyokalut" | "palvelut" | "yhteiso" | "tietoa" | null
>(null);

  const [memberSearch, setMemberSearch] = useState("");
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showAllLiveMembers, setShowAllLiveMembers] = useState(false);

  const [memberFilter, setMemberFilter] = useState<
    | "all"
    | "streamer"
    | "content"
    | "moderator"
    | "videoeditor"
    | "graphic"
  >("all");

  const [clips, setClips] = useState<any[]>([]);
  const [clipsLoading, setClipsLoading] = useState(true);
  const [showAllClips, setShowAllClips] = useState(false);

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

useEffect(() => {
  async function fetchKoposquadTv() {
    try {
const response = await fetch("/api/live/koposquadtv", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("KOPOSQUADTV-tietojen hakeminen epäonnistui.");
      }

      const data = await response.json();

      setKoposquadTvStream(data.stream || null);
      setKoposquadTvUser(data.user || null);
    } catch {
      setKoposquadTvStream(null);
      setKoposquadTvUser(null);
    } finally {
      setKoposquadTvLoading(false);
    }
  }

  fetchKoposquadTv();

  const timer = setInterval(fetchKoposquadTv, 60000);

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

useEffect(() => {
  if (!menuOpen) {
    document.body.style.overflow = "";
    return;
  }

  document.body.style.overflow = "hidden";

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
      setActiveMenu(null);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [menuOpen]);

  return (
<main className="page-fade-in relative min-h-screen overflow-hidden bg-black text-white">
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -left-72 top-[22%] h-[900px] w-[650px] rounded-full bg-purple-700/14 blur-[220px]" />

    <div className="absolute -right-72 top-[48%] h-[950px] w-[700px] rounded-full bg-fuchsia-700/10 blur-[230px]" />

    <div className="absolute -left-64 top-[76%] h-[700px] w-[620px] rounded-full bg-violet-700/10 blur-[210px]" />

    <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500/25 to-transparent" />

    <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-fuchsia-500/20 to-transparent" />
  </div>

  <div className="relative z-10">

  </div>

{/* UUSI KOPOSQUAD NAV */}
<nav className="fixed left-0 right-0 top-0 z-[70] border-b border-purple-500/20 bg-black/85 backdrop-blur-xl">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

    {/* VASEN PUOLI */}
    <div className="flex items-center gap-5">
      <button
        type="button"
        onClick={() => {
          setMenuOpen(true);
          setActiveMenu(null);
        }}
        aria-label="Avaa valikko"
        className="group flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl border border-purple-500/25 bg-purple-500/[0.06] transition-all duration-300 hover:border-purple-400/60 hover:bg-purple-500/15"
      >
        <span className="h-[2px] w-5 rounded-full bg-white transition-all duration-300 group-hover:w-6 group-hover:bg-purple-300" />
        <span className="h-[2px] w-5 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-300" />
        <span className="h-[2px] w-5 rounded-full bg-white transition-all duration-300 group-hover:w-6 group-hover:bg-purple-300" />
      </button>

      <a href="#" className="text-3xl font-black tracking-tight">
        <span className="text-purple-500">KOPO</span>
        <span className="text-white">SQUAD</span>
      </a>
    </div>

    {/* OIKEA PUOLI */}
    <div className="flex items-center gap-3">
      <a
        href="https://discord.gg/ZXgSS9v6ye"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden rounded-xl border border-purple-500/30 bg-purple-500/[0.07] px-5 py-2.5 text-sm font-black text-purple-300 transition hover:border-purple-400 hover:bg-purple-500/15 hover:text-white sm:block"
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
        className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-2.5 text-sm font-black text-purple-300 transition hover:border-purple-400 hover:bg-purple-500/20 hover:text-white"
      >
        {language === "fi" ? "EN" : "FI"}
      </button>
    </div>
  </div>
</nav>

{/* MENUN TAUSTA / BLUR */}
<div
  onClick={() => {
    setMenuOpen(false);
    setActiveMenu(null);
  }}
  className={`fixed inset-0 z-[80] bg-black/55 backdrop-blur-md transition-all duration-500 ${
    menuOpen
      ? "pointer-events-auto opacity-100"
      : "pointer-events-none opacity-0"
  }`}
/>

{/* PÄÄVALIKKO */}
<aside
  className={`fixed left-0 top-0 z-[90] h-screen w-[88vw] max-w-[410px] border-r border-purple-500/25 bg-[linear-gradient(145deg,rgba(8,5,12,0.995),rgba(18,7,26,0.995))] shadow-[30px_0_100px_rgba(0,0,0,0.65)] transition-transform duration-500 ease-out ${
    menuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  {/* TAUSTA KS */}
  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="pointer-events-none absolute -bottom-16 -right-20 w-[300px] rotate-[-12deg] opacity-[0.035]"
  />

  <div className="relative z-10 flex h-full flex-col">

    {/* MENUN YLÄOSA */}
    <div className="flex items-center justify-between border-b border-white/10 px-7 py-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-purple-400">
          KOPOSQUAD
        </p>

        <p className="mt-1 text-lg font-black text-white">
          {language === "fi" ? "Päävalikko" : "Main menu"}
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          setMenuOpen(false);
          setActiveMenu(null);
        }}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/[0.06] text-2xl text-gray-300 transition duration-300 hover:rotate-90 hover:border-purple-400 hover:bg-purple-500/15 hover:text-white"
        aria-label="Sulje valikko"
      >
        ×
      </button>
    </div>

    {/* LINKIT */}
    <div className="flex-1 overflow-y-auto px-7 py-8">

      <div className="mb-7">
        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
          {language === "fi" ? "Pääsivut" : "Main"}
        </p>

        <div className="space-y-1">

          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-black text-white transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            {language === "fi" ? "Etusivu" : "Home"}
          </a>

          <a
            href="#live"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-black text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            Live
          </a>

          <button
            type="button"
            onClick={() => setActiveMenu("tiimi")}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-black text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            <span>{language === "fi" ? "Tiimi" : "Team"}</span>
            <span className="text-purple-400">›</span>
          </button>

          <a
            href="#clips"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-black text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            Clips
          </a>
        </div>
      </div>

      <div>
        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
          KOPOSQUAD
        </p>

        <div className="space-y-1">

          <button
            type="button"
            onClick={() => setActiveMenu("tyokalut")}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-black text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            <span>{language === "fi" ? "Työkalut" : "Tools"}</span>
            <span className="text-purple-400">›</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMenu("palvelut")}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-black text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            <span>{language === "fi" ? "Palvelut" : "Services"}</span>
            <span className="text-purple-400">›</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMenu("yhteiso")}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-black text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            <span>{language === "fi" ? "Yhteisö" : "Community"}</span>
            <span className="text-purple-400">›</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMenu("tietoa")}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-black text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            <span>{language === "fi" ? "Tietoa" : "About"}</span>
            <span className="text-purple-400">›</span>
          </button>
        </div>
      </div>
    </div>

    {/* ALAREUNA */}
    <div className="border-t border-white/10 px-7 py-6">
      <p className="text-xs leading-6 text-gray-600">
        Suomen kasvava striimaaja- ja sisällöntuottajayhteisö.
      </p>
    </div>
  </div>
</aside>

{/* TOINEN / TARKEMPI VALIKKO */}
<aside
  className={`fixed top-0 z-[89] h-screen w-[88vw] max-w-[430px] border-r border-purple-500/20 bg-[linear-gradient(145deg,rgba(14,8,20,0.995),rgba(5,3,8,0.995))] shadow-[30px_0_100px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out
  ${
    menuOpen && activeMenu
      ? "left-[min(410px,88vw)] translate-x-0 opacity-100"
      : "left-[min(410px,88vw)] -translate-x-10 pointer-events-none opacity-0"
  }`}
>
  <div className="flex h-full flex-col">

    <div className="flex items-center gap-4 border-b border-white/10 px-7 py-6">
      <button
        type="button"
        onClick={() => setActiveMenu(null)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/[0.06] text-xl text-purple-300 transition hover:bg-purple-500/15 hover:text-white"
      >
        ‹
      </button>

      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">
          KOPOSQUAD
        </p>

        <h2 className="mt-1 text-xl font-black uppercase">
          {activeMenu === "tiimi" && (language === "fi" ? "Tiimi" : "Team")}
          {activeMenu === "tyokalut" && (language === "fi" ? "Työkalut" : "Tools")}
          {activeMenu === "palvelut" && (language === "fi" ? "Palvelut" : "Services")}
          {activeMenu === "yhteiso" && (language === "fi" ? "Yhteisö" : "Community")}
          {activeMenu === "tietoa" && (language === "fi" ? "Tietoa" : "About")}
        </h2>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto px-7 py-8">

      {/* TIIMI */}
      {activeMenu === "tiimi" && (
        <div className="space-y-2">
          <a
            href="#tiimi"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            {language === "fi" ? "Kaikki jäsenet" : "All members"}
          </a>

          <a
            href="#koposquadtv"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            KOPOSQUADTV
          </a>

          <a
            href="#rekry"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            {language === "fi" ? "Hae mukaan" : "Apply"}
          </a>
        </div>
      )}

      {/* TYÖKALUT */}
      {activeMenu === "tyokalut" && (
        <div className="space-y-2">
          <a
            href="/tools"
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            {language === "fi" ? "Kaikki työkalut" : "All tools"}
          </a>

          <a
            href="/tools"
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            Streaming
          </a>

          <a
            href="/tools"
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            Editointi & grafiikka
          </a>
        </div>
      )}

      {/* PALVELUT */}
      {activeMenu === "palvelut" && (
        <div className="space-y-2">
          {[
            "Stream Overlay",
            "Emote-paketti",
            "Grafiikkapaketti",
            "Striimaajan starttipaketti",
            "Videoeditointi",
            "KOPOSQUAD Merch",
            "Member Jersey",
            "Member Kit",
            "KOPOSQUAD LAN",
          ].map((item) => (
            <a
              key={item}
              href="/palvelut"
              className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
            >
              <span>{item}</span>
              <span className="text-purple-500/70">→</span>
            </a>
          ))}
        </div>
      )}

      {/* YHTEISÖ */}
      {activeMenu === "yhteiso" && (
        <div className="space-y-2">
          <a
            href="https://discord.gg/ZXgSS9v6ye"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            Discord
          </a>

          <a
            href="https://www.twitch.tv/koposquadtv"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            KOPOSQUADTV
          </a>

          <a
            href="https://koposquad-shop.fourthwall.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            KOPOSQUAD Merch
          </a>
        </div>
      )}

      {/* TIETOA */}
      {activeMenu === "tietoa" && (
        <div className="space-y-2">
          <a
            href="/tietoa"
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            {language === "fi" ? "Mikä on KOPOSQUAD?" : "What is KOPOSQUAD?"}
          </a>

          <a
            href="#uutiset"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            {language === "fi" ? "Uutiset" : "News"}
          </a>

          <a
            href="#rekry"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-4 py-3 text-lg font-bold text-gray-300 transition hover:bg-purple-500/10 hover:text-purple-300"
          >
            {language === "fi" ? "Liity mukaan" : "Join"}
          </a>
        </div>
      )}
    </div>
  </div>
</aside>

{/* HERO */}

<section className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-purple-500/20 pt-24">
  {/* VANHA SAVUTAUSTA */}
  <img
    src="/images/hero-bg.png"
    alt=""
className="hero-slow-zoom pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-90"
  />

  {/* TUMMENNUS – TAUSTA JÄÄ SILTI NÄKYVIIN */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/55" />

  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(126,34,206,0.22),transparent_52%)]" />

  {/* PEHMEÄ KESKIVALON HOHDE */}
  <div className="pointer-events-none absolute left-1/2 top-[48%] h-[620px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[210px]" />
<div className="hero-moving-glow pointer-events-none absolute left-1/2 top-[48%] h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600/20 via-fuchsia-500/20 to-purple-700/20 blur-[150px]" />

  {/* REUNOJEN VÄRIVALOT */}
  <div className="pointer-events-none absolute -left-52 top-[20%] h-[520px] w-[520px] rounded-full bg-violet-700/15 blur-[180px]" />

  <div className="pointer-events-none absolute -right-52 top-[18%] h-[540px] w-[540px] rounded-full bg-fuchsia-700/12 blur-[190px]" />

  {/* HERO-SISÄLTÖ */}
  {/* ELÄVÄT KS-LOGOT TAUSTALLA */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">

  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="ks-drift-one absolute left-[6%] top-[18%] hidden w-[135px] rotate-[-18deg] object-contain opacity-[0.09] lg:block"
  />

  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="ks-drift-two absolute left-[18%] top-[62%] hidden w-[95px] rotate-[11deg] object-contain opacity-[0.07] lg:block"
  />

  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="ks-drift-three absolute left-[37%] top-[20%] hidden w-[75px] rotate-[-8deg] object-contain opacity-[0.055] xl:block"
  />

  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="ks-drift-four absolute right-[25%] top-[18%] hidden w-[90px] rotate-[16deg] object-contain opacity-[0.06] lg:block"
  />

  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="ks-drift-five absolute right-[9%] top-[50%] hidden w-[145px] rotate-[-14deg] object-contain opacity-[0.085] lg:block"
  />

  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="ks-drift-six absolute right-[32%] bottom-[12%] hidden w-[70px] rotate-[7deg] object-contain opacity-[0.05] xl:block"
  />

</div>
  {/* HIMMEÄT PARTIKKELIT */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  {[
    ["12%", "78%", "0s"],
    ["22%", "64%", "2s"],
    ["34%", "82%", "5s"],
    ["48%", "70%", "1s"],
    ["62%", "80%", "6s"],
    ["74%", "66%", "3s"],
    ["86%", "76%", "7s"],
  ].map(([left, top, delay], index) => (
    <span
      key={index}
      className="hero-particle absolute h-1.5 w-1.5 rounded-full bg-purple-300/50 shadow-[0_0_12px_rgba(216,180,254,0.55)]"
      style={{
        left,
        top,
        animationDelay: delay,
      }}
    />
  ))}
</div>
  <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-28 pt-20 text-center">
    <p className="text-sm font-black uppercase tracking-[0.65em] text-purple-300 sm:text-base">
      STREAM TEAM
    </p>

<div className="title-aura pointer-events-none absolute left-1/2 top-[46%] h-[320px] w-[760px] rounded-full bg-gradient-to-r from-purple-600/20 via-fuchsia-500/20 to-purple-600/20 blur-[120px]" />
    <h1 className="mt-7 text-6xl font-black uppercase leading-[0.86] tracking-[-0.05em] sm:text-7xl md:text-8xl lg:text-[9.5rem]">
      <span className="text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.22)]">
        KOPO
      </span>

<span className="squad-shine bg-[linear-gradient(110deg,#d8b4fe_0%,#a855f7_30%,#ffffff_45%,#d946ef_55%,#9333ea_80%,#d8b4fe_100%)] bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(168,85,247,0.45)]">
  SQUAD
</span>
    </h1>

    <p className="mt-8 max-w-3xl text-xl leading-8 text-gray-200 sm:text-2xl">
      {language === "fi"
        ? "Suomen kasvava striimaaja- ja sisällöntuottajayhteisö."
        : "Finland's growing community for streamers and content creators."}
    </p>

    {/* PÄÄPAINIKKEET */}
    <div className="mt-10 flex flex-wrap justify-center gap-4">
      <a
        href="#rekry"
        className="group relative inline-flex min-w-[300px] items-center justify-center overflow-hidden rounded-2xl border border-fuchsia-400/60 bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 px-9 py-4 text-lg font-black shadow-[0_0_38px_rgba(168,85,247,0.42)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_58px_rgba(217,70,239,0.55)]"
      >
        <span className="pointer-events-none absolute -left-20 top-0 h-full w-14 rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-[120%]" />

        <span className="relative">
          {language === "fi"
            ? "HAE MUKAAN KOPOSQUADIIN"
            : "APPLY TO JOIN KOPOSQUAD"}
        </span>
      </a>

      <a
        href="#live"
        className="inline-flex min-w-[170px] items-center justify-center rounded-2xl border border-purple-400/50 bg-black/45 px-8 py-4 text-lg font-black text-purple-100 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:bg-purple-500/15 hover:text-white"
      >
        {language === "fi" ? "Katso livet" : "Watch live"}
      </a>
    </div>

{/* SOMEPAINIKKEET */}
<div className="mt-8 flex flex-wrap justify-center gap-3">
  <a
    href="https://www.twitch.tv/kopostream"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-xl border border-purple-400/50 bg-purple-600/20 px-6 py-3 font-bold backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:bg-purple-600/45 hover:shadow-[0_0_25px_rgba(168,85,247,0.55)]"
  >
    Twitch
  </a>

  <a
    href="https://www.youtube.com/@KopoVlog"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-xl border border-red-400/50 bg-red-600/20 px-6 py-3 font-bold backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:bg-red-600/45 hover:shadow-[0_0_25px_rgba(239,68,68,0.55)]"
  >
    YouTube
  </a>

  <a
    href="https://www.instagram.com/kopovirallinen/"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-xl border border-pink-400/50 bg-pink-600/20 px-6 py-3 font-bold backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:bg-pink-600/45 hover:shadow-[0_0_25px_rgba(236,72,153,0.55)]"
  >
    Instagram
  </a>

  <a
    href="https://discord.gg/ZXgSS9v6ye"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-xl border border-indigo-400/50 bg-indigo-600/20 px-6 py-3 font-bold backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-600/45 hover:shadow-[0_0_25px_rgba(99,102,241,0.55)]"
  >
    Discord
  </a>
  <a
  href="https://koposquad-shop.fourthwall.com/"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-xl border border-fuchsia-400/60 bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 px-6 py-3 font-black text-purple-100 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300 hover:from-purple-600/55 hover:to-fuchsia-600/55 hover:text-white hover:shadow-[0_0_28px_rgba(217,70,239,0.45)]"
>
 {language === "fi" ? "Kauppa" : "Shop"}
</a>
</div>
  </div>

{/* PIENEMPI KS-KORISTE OIKEAAN ALAREUNAAN */}
<div className="group absolute bottom-16 right-8 z-10 hidden lg:block xl:right-16">

  {/* ISO HENGITTÄVÄ VIOLETTI HEHKU */}
  <div className="ks-glow-pulse pointer-events-none absolute inset-[-55px] rounded-full bg-purple-600/35 blur-[95px]" />

  {/* FUKSIA SISÄHEHKU */}
  <div className="pointer-events-none absolute inset-[-25px] rounded-full bg-fuchsia-500/20 blur-[55px]" />

  {/* VALO LOGON ALLA */}
  <div className="ks-glow-pulse pointer-events-none absolute -bottom-5 left-1/2 h-[22px] w-[150px] -translate-x-1/2 rounded-[100%] bg-purple-400/50 blur-[22px]" />

  {/* HIMMEÄ LEVEÄ VALOPINTA */}
  <div className="pointer-events-none absolute -bottom-8 left-1/2 h-[30px] w-[210px] -translate-x-1/2 rounded-[100%] bg-fuchsia-600/20 blur-[30px]" />

  {/* KS LOGO */}
  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="relative w-[180px] object-contain opacity-80
    drop-shadow-[0_18px_22px_rgba(0,0,0,0.75)]
    drop-shadow-[0_0_25px_rgba(168,85,247,0.75)]
    transition duration-500
    group-hover:scale-105
    group-hover:opacity-100
    group-hover:drop-shadow-[0_0_45px_rgba(217,70,239,0.95)]
    xl:w-[220px]"
  />

</div>

  {/* VIERITÄ ALAS */}
  <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
    <a
      href="#mika"
      className="arrow-float flex flex-col items-center text-white/65 transition hover:text-purple-300"
    >
      <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.45em] sm:text-xs">
        {language === "fi" ? "Vieritä alas" : "Scroll down"}
      </span>

      <span className="text-3xl">↓</span>
    </a>
  </div>
</section>

      {/* MIKÄ ON KOPOSQUAD */}

      <section
        id="mika"
        className="relative overflow-hidden border-t border-purple-500/10 bg-[linear-gradient(to_bottom,#020202,#08030d,#020202)] px-6 py-24"
      >
        <div className="ambient-glow absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[250px]" />
        <div className="pointer-events-none absolute -left-52 top-0 h-[700px] w-[700px] rounded-full bg-fuchsia-600/10 blur-[220px]" />
        <div className="pointer-events-none absolute -right-56 bottom-0 h-[650px] w-[650px] rounded-full bg-blue-600/10 blur-[220px]" />

        <div className="pointer-events-none absolute -left-20 top-20 hidden lg:block">
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="w-[300px] rotate-[-14deg] object-contain opacity-[0.045]"
          />
        </div>

        <div className="pointer-events-none absolute -right-20 bottom-6 hidden lg:block">
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="w-[250px] rotate-[14deg] object-contain opacity-[0.03]"
          />
        </div>

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

          <div className="polished-card relative mt-12 overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-zinc-900/95 via-zinc-950/95 to-purple-950/30 p-10 shadow-[0_0_50px_rgba(168,85,247,0.18)] backdrop-blur-xl transition duration-500 hover:border-purple-400/50 hover:shadow-[0_0_65px_rgba(168,85,247,0.24)]">
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
            <div className="group polished-card relative overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-br from-zinc-900 via-zinc-950 to-purple-950/30 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.38)] transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/70 hover:shadow-[0_0_55px_rgba(168,85,247,0.28)]">
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

            <div className="group polished-card relative overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-br from-zinc-900 via-zinc-950 to-purple-950/30 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.38)] transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/70 hover:shadow-[0_0_55px_rgba(168,85,247,0.28)]">
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

            <div className="group polished-card relative overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-br from-zinc-900 via-zinc-950 to-purple-950/30 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.38)] transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/70 hover:shadow-[0_0_55px_rgba(168,85,247,0.28)]">
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


{/* KOPOSQUAD TV */}

<section
  id="koposquadtv"
  className="relative overflow-hidden border-b border-t border-purple-500/15 bg-[linear-gradient(to_bottom,#020202,#0b0311,#020202)] px-4 py-24 sm:px-6"
>
  {/* TAUSTAVALOT */}

  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[280px]" />

  <div className="pointer-events-none absolute -left-56 top-10 h-[600px] w-[600px] rounded-full bg-fuchsia-700/10 blur-[210px]" />

  <div className="pointer-events-none absolute -right-56 bottom-0 h-[650px] w-[650px] rounded-full bg-violet-700/12 blur-[220px]" />

  {/* HIMMEÄ KS-LOGO */}

  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="pointer-events-none absolute -right-24 top-24 hidden w-[440px] rotate-[-10deg] object-contain opacity-[0.04] lg:block"
  />

  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="pointer-events-none absolute -left-20 bottom-10 hidden w-[320px] rotate-[12deg] object-contain opacity-[0.025] lg:block"
  />

  <div className="relative z-10 mx-auto max-w-7xl">
    {/* OTSIKKO */}

    <div className="text-center">
      <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-purple-400/30 bg-purple-500/10 px-5 py-2 backdrop-blur-xl">
        <span className="h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.9)]" />

        <span className="text-xs font-black uppercase tracking-[0.35em] text-purple-300">
          KOPOSQUAD OFFICIAL CHANNEL
        </span>
      </div>

      <h2 className="text-5xl font-black uppercase tracking-tight sm:text-6xl md:text-7xl">
        <span className="text-white">KOPOSQUAD</span>

        <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.45)]">
          TV
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl">
        {language === "fi"
          ? "Koposquadin virallinen Twitch-kanava yhteisön lähetyksille, tapahtumille ja yhteiselle sisällölle."
          : "The official Koposquad Twitch channel for community streams, events and shared content."}
      </p>
    </div>

    {/* LATAUS */}

    {koposquadTvLoading ? (
      <div className="mt-14 rounded-[32px] border border-purple-500/25 bg-white/[0.04] px-6 py-24 text-center shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-400" />

        <p className="mt-5 font-bold text-gray-400">
          {language === "fi"
            ? "Ladataan KOPOSQUADTV-kanavaa..."
            : "Loading the KOPOSQUADTV channel..."}
        </p>
      </div>
    ) : koposquadTvStream ? (
      /* LIVE-TILA */

      <div className="mt-14 overflow-hidden rounded-[32px] border border-red-500/35 bg-white/[0.05] shadow-[0_0_60px_rgba(239,68,68,0.12),0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* LIVE-YLÄPALKKI */}

        <div className="flex flex-col gap-5 border-b border-white/10 bg-gradient-to-r from-red-950/70 via-zinc-950 to-purple-950/80 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {koposquadTvUser?.profile_image_url ? (
              <div className="relative shrink-0">
<img
  src={koposquadTvUser.profile_image_url}
  alt={koposquadTvUser.display_name || "KopoSquadTV"}
  className="relative h-52 w-52 rounded-full border-4 border-purple-400/70 object-cover shadow-[0_0_25px_rgba(168,85,247,0.65),0_0_70px_rgba(126,34,206,0.45)] transition duration-500 hover:scale-[1.03] hover:border-purple-300 sm:h-60 sm:w-60"
/>

                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-zinc-950 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
              </div>
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-purple-400/40 bg-purple-500/10 text-xl font-black text-purple-300">
                KS
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />

                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                </span>

                <p className="text-sm font-black uppercase tracking-[0.25em] text-red-400">
                  {language === "fi"
                    ? "Lähetys käynnissä"
                    : "Live now"}
                </p>
              </div>

              <h3 className="mt-1 text-2xl font-black sm:text-3xl">
                KOPOSQUADTV
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-xl border border-white/10 bg-black/35 px-4 py-2 text-sm font-bold text-gray-300">
              👀 {koposquadTvStream.viewer_count}{" "}
              {language === "fi" ? "katsojaa" : "viewers"}
            </span>

            <a
              href="https://www.twitch.tv/koposquadtv"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-red-600 px-5 py-2 font-black text-white transition hover:scale-105 hover:bg-red-500"
            >
              {language === "fi"
                ? "Avaa Twitchissä"
                : "Open on Twitch"}
            </a>
          </div>
        </div>

        {/* TWITCH PLAYER JA CHAT */}

        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="aspect-video min-h-[350px] bg-black sm:min-h-[450px]">
            <iframe
              src={`https://player.twitch.tv/?channel=koposquadtv&parent=${window.location.hostname}&autoplay=true&muted=true`}
              title="KOPOSQUADTV Twitch-lähetys"
              className="h-full w-full"
              allowFullScreen
            />
          </div>

          <div className="h-[500px] border-t border-white/10 bg-zinc-950 lg:h-auto lg:border-l lg:border-t-0">
            <iframe
              src={`https://www.twitch.tv/embed/koposquadtv/chat?parent=${window.location.hostname}&darkpopout`}
              title="KOPOSQUADTV Twitch-chat"
              className="h-full min-h-[500px] w-full"
            />
          </div>
        </div>

        {/* LÄHETYKSEN TIEDOT */}

        <div className="border-t border-white/10 bg-black/45 p-6">
          <p className="text-lg font-black text-white sm:text-xl">
            {koposquadTvStream.title}
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {language === "fi"
              ? "Katso KOPOSQUADTV:n lähetystä ja osallistu Twitch-chattiin suoraan tältä sivulta."
              : "Watch KOPOSQUADTV and join the Twitch chat directly from this website."}
          </p>
        </div>
      </div>
    ) : (
      /* OFFLINE-TILA */

<div className="koposquadtv-reveal relative mt-14 overflow-hidden rounded-[32px] border border-purple-500/30 bg-gradient-to-br from-zinc-950/95 via-purple-950/35 to-zinc-950/95 shadow-[0_0_70px_rgba(126,34,206,0.18),0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[170px]" />

        <div className="relative z-10 grid items-center gap-10 px-6 py-12 md:px-10 lg:grid-cols-[280px_1fr] lg:px-14 lg:py-16">
          {/* KANAVAN KUVA */}

          <div className="mx-auto">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-purple-600/25 blur-[50px]" />

              {koposquadTvUser?.profile_image_url ? (
<img
  src={koposquadTvUser.profile_image_url}
  alt={koposquadTvUser.display_name || "KopoSquadTV"}
  className="relative h-52 w-52 rounded-full border-4 border-purple-400/70 object-cover shadow-[0_0_25px_rgba(168,85,247,0.65),0_0_70px_rgba(126,34,206,0.45)] transition duration-500 hover:scale-[1.03] hover:border-purple-300 sm:h-60 sm:w-60"
/>
              ) : (
                <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-4 border-purple-500/50 bg-purple-500/10 text-5xl font-black text-purple-300 shadow-[0_0_45px_rgba(168,85,247,0.35)] sm:h-60 sm:w-60">
                  KS
                </div>
              )}

<span
  title={language === "fi" ? "Kanava ei ole livenä" : "Channel is offline"}
  className="absolute bottom-5 right-5 h-5 w-5 rounded-full border-4 border-zinc-950 bg-zinc-600 shadow-[0_0_12px_rgba(0,0,0,0.8)]"
/>
            </div>
          </div>

          {/* OFFLINE-TEKSTI */}

          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-black/35 px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />

              <span className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                OFFLINE
              </span>
            </div>

<h3 className="mt-5 text-3xl font-black sm:text-4xl">
  {language === "fi"
    ? "KOPOSQUADTV ei ole juuri nyt livenä"
    : "KOPOSQUADTV is currently offline"}
</h3>

<p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
  {language === "fi"
    ? "Tälle kanavalle tulee Koposquadin yhteisiä lähetyksiä, tapahtumia, haastatteluja ja muuta yhteisön sisältöä. Seuraa kanavaa, jotta et missaa seuraavaa lähetystä."
    : "This channel will feature Koposquad community streams, events, interviews and other shared content. Follow the channel so you do not miss the next broadcast."}
</p>

<div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
  <a
    href="https://www.twitch.tv/koposquadtv"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-7 py-3 font-black text-white shadow-[0_0_30px_rgba(168,85,247,0.3)] transition duration-300 hover:scale-105 hover:from-purple-500 hover:to-fuchsia-500 hover:shadow-[0_0_45px_rgba(168,85,247,0.5)]"
  >
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M4.3 2 2.8 5.8v15.1h5.3V24l3.1-3.1h4.1L21.2 15V2H4.3Zm14.6 11.9-3.4 3.4h-4.8l-2.8 2.8v-2.8H5V4.2h13.9v9.7Zm-3.8-6.1v5.7h-2.2V7.8h2.2Zm-4.1 0v5.7H8.8V7.8H11Z" />
    </svg>

    <span>
      {language === "fi"
        ? "Seuraa Twitchissä"
        : "Follow on Twitch"}
    </span>
  </a>

  <a
    href="#live"
    className="inline-flex items-center justify-center gap-3 rounded-xl border border-purple-400/40 bg-black/40 px-7 py-3 font-black text-purple-200 transition duration-300 hover:scale-105 hover:border-purple-300 hover:bg-purple-500/15 hover:text-white"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path
        d="M12 5v14M6 13l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <span>
      {language === "fi"
        ? "Katso tiimin livet"
        : "Watch team streams"}
    </span>
  </a>
</div>
</div>
</div>

{/* ALAPALKKI */}

<div className="relative z-10 grid border-t border-white/10 bg-black/35 sm:grid-cols-3">
  <div className="border-b border-white/10 px-6 py-5 text-center sm:border-b-0 sm:border-r">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-400">
      {language === "fi" ? "Kanava" : "Channel"}
    </p>

    <p className="mt-2 font-bold text-white">KOPOSQUADTV</p>
  </div>

  <div className="border-b border-white/10 px-6 py-5 text-center sm:border-b-0 sm:border-r">
    <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-400">
      {language === "fi" ? "Seuraava lähetys" : "Next stream"}
    </p>

    <p className="mt-2 font-bold text-gray-300">
      {language === "fi"
        ? "Ilmoitetaan myöhemmin"
        : "To be announced"}
    </p>
  </div>

          <div className="px-6 py-5 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-400">
              {language === "fi" ? "Sisältö" : "Content"}
            </p>

            <p className="mt-2 font-bold text-gray-300">
              {language === "fi"
                ? "Yhteisölähetykset"
                : "Community streams"}
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
</section>

      {/* LIVE CENTER */}

      <section
        id="live"
        className="relative overflow-hidden border-t border-purple-500/10 bg-[linear-gradient(to_bottom,#020202,#08030d,#020202)] px-6 py-24"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[820px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/22 blur-[270px]" />
        <div className="pointer-events-none absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[180px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[560px] w-[560px] rounded-full bg-blue-600/10 blur-[220px]" />

        <div className="pointer-events-none absolute right-[-100px] top-24 hidden lg:block">
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="w-[320px] rotate-[12deg] object-contain opacity-[0.04]"
          />
        </div>

        <div className="pointer-events-none absolute left-[-90px] bottom-16 hidden lg:block">
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="w-[260px] rotate-[-12deg] object-contain opacity-[0.03]"
          />
        </div>

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

<div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
{[...members]
  .sort((a, b) => {
    const aLive = streams.some(
      (stream) => stream.user_login.toLowerCase() === a.twitch.toLowerCase()
    );

    const bLive = streams.some(
      (stream) => stream.user_login.toLowerCase() === b.twitch.toLowerCase()
    );

    if (aLive && !bLive) return -1;
    if (!aLive && bLive) return 1;

    return 0;
  })
.slice(0, showAllLiveMembers ? undefined : 15)
.map((member) => {
              const stream = streams.find(
                (item) => item.user_login === member.twitch
              );

              return (
                <div
                  key={member.name}
className={`group relative min-h-[165px] overflow-hidden rounded-[22px] border p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
                    stream
? "border-red-500/45 bg-[radial-gradient(circle_at_20%_0%,rgba(239,68,68,0.18),transparent_45%),linear-gradient(180deg,rgba(35,15,20,0.96),rgba(18,12,20,0.98))] shadow-[0_18px_55px_rgba(239,68,68,0.12)] hover:border-red-400/80 hover:shadow-[0_22px_70px_rgba(239,68,68,0.22)]"
: "border-purple-500/20 bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.16),transparent_45%),linear-gradient(180deg,rgba(28,20,34,0.96),rgba(16,12,20,0.98))] shadow-[0_18px_55px_rgba(0,0,0,0.40)] hover:border-purple-400/60 hover:shadow-[0_22px_70px_rgba(168,85,247,0.18)]"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/10 opacity-50" />

<img
  src="/images/ks-logo.png.png"
  alt=""
  className="pointer-events-none absolute right-[-30px] bottom-[-25px] w-[135px] rotate-[-10deg] object-contain opacity-[0.025] transition-all duration-500 group-hover:opacity-[0.05] group-hover:scale-105"
/>

                  <div className="relative z-10">
<div className="flex flex-col items-start">
<div className="min-w-0 w-full">
<h3 className="text-xl font-black">
  {member.name}
</h3>

<div className="mt-1.5">
  <span className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-2.5 py-1 text-[11px] font-bold text-purple-300">
    {member.role}
  </span>
</div>
                      </div>

                      {stream ? (
<div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-red-400/60 bg-red-500/15 px-3 py-1 shadow-[0_0_20px_rgba(239,68,68,0.28)]">
<span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />

<span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                          </span>

                          <span className="text-xs font-black text-red-400">
                            LIVE
                          </span>
                        </div>
                      ) : (
<div className="mt-2 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-black/45 px-3 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
<span className="h-2 w-2 rounded-full bg-gray-600" />

                          <span className="text-xs font-black text-gray-500">
                            OFFLINE
                          </span>
                        </div>
                      )}
                    </div>

                    {stream ? (
                      <>
<p className="mt-3 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-300">
  {stream.title}
</p>

<div className="mt-3 flex items-center justify-between gap-3">
<span className="text-xs font-bold text-gray-400">
                            👀 {stream.viewer_count} katsojaa
                          </span>

                          <a
                            href={`https://www.twitch.tv/${member.twitch}`}
                            target="_blank"
                            rel="noopener noreferrer"
className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-black transition hover:scale-105 hover:bg-red-500"
                          >
                            Katso
                          </a>
                        </div>
                      </>
                    ) : (
<p className="mt-3 text-xs leading-5 text-gray-500">
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

{members.length > 15 && (
  <div className="mt-8 flex justify-center">
    <button
      type="button"
      onClick={() => setShowAllLiveMembers((current) => !current)}
      className="inline-flex items-center justify-center rounded-xl border border-purple-500/40 bg-purple-500/10 px-8 py-4 font-black text-purple-200 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:bg-purple-500/20 hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.20)]"
    >
      {showAllLiveMembers
        ? language === "fi"
          ? "Näytä vähemmän ↑"
          : "Show less ↑"
        : language === "fi"
          ? `Näytä kaikki jäsenet (${members.length}) ↓`
          : `Show all members (${members.length}) ↓`}
    </button>
  </div>
)}

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
src={`https://player.twitch.tv/?channel=${streams[0].user_login}&parent=${window.location.hostname}&autoplay=true&muted=true`}
                      title={`${streams[0].user_name} Twitch-lähetys`}
                      className="h-full w-full"
                      allowFullScreen
                    />
                  </div>

                  <div className="h-[500px] border-t border-white/10 bg-zinc-950 lg:h-auto lg:border-l lg:border-t-0">
                    <iframe
src={`https://www.twitch.tv/embed/${streams[0].user_login}/chat?parent=${window.location.hostname}&darkpopout`}
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
              <div className="relative overflow-hidden rounded-[32px] border border-purple-500/25 bg-gradient-to-br from-zinc-950/95 via-purple-950/25 to-zinc-950/95 px-8 py-20 text-center shadow-[0_0_60px_rgba(126,34,206,0.16),0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl">
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
  className="relative overflow-hidden bg-zinc-950 px-4 py-24 sm:px-6"
>
<img
  src="/images/ks-logo.png.png"
  alt=""
  className="pointer-events-none absolute -right-20 top-20 hidden w-[430px] rotate-[-8deg] object-contain opacity-[0.045] blur-[0.3px] lg:block"
/>

  <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[180px]" />

  <div className="pointer-events-none absolute bottom-[-260px] left-[-180px] h-[600px] w-[600px] rounded-full bg-fuchsia-700/10 blur-[180px]" />

  <div className="pointer-events-none absolute bottom-[-260px] right-[-180px] h-[600px] w-[600px] rounded-full bg-purple-700/10 blur-[180px]" />

  <div className="relative z-10 mx-auto max-w-[1400px]">
    <div className="text-center">
      <h2 className="text-4xl font-black md:text-6xl">
        <span className="text-purple-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]">
          KOPOSQUAD
        </span>{" "}
        {language === "fi" ? "TIIMI" : "TEAM"}
      </h2>

      <p className="mt-3 text-lg text-gray-400">
        {language === "fi"
          ? "Striimaajat ja sisällöntuottajat"
          : "Streamers and content creators"}
      </p>
    </div>

          {/* HAKUKENTTÄ JA SUODATTIMET */}

<div className="mx-auto mt-10 flex max-w-6xl flex-col gap-4 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-950/20 via-white/[0.035] to-fuchsia-950/20 p-4 shadow-[0_15px_45px_rgba(0,0,0,0.35),0_0_30px_rgba(168,85,247,0.06)] backdrop-blur-xl xl:flex-row">
            <div className="relative xl:w-[390px]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M16.5 16.5L21 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="text"
                value={memberSearch}
                onChange={(event) => setMemberSearch(event.target.value)}
                placeholder={
                  language === "fi" ? "Hae jäsentä..." : "Search members..."
                }
className="w-full rounded-xl border border-purple-500/30 bg-black/50 py-3 pl-12 pr-4 text-white shadow-[inset_0_0_20px_rgba(168,85,247,0.03)] outline-none transition-all duration-300 placeholder:text-gray-500 hover:border-purple-400/50 focus:border-purple-400 focus:bg-purple-950/20 focus:shadow-[0_0_30px_rgba(168,85,247,0.18),inset_0_0_20px_rgba(168,85,247,0.06)]"
              />
            </div>

<div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-[0.9fr_1fr_1.35fr_1fr_1.1fr]">
              {[
                {
                  value: "all",
                  fi: "Kaikki",
                  en: "All",
                },
                {
                  value: "streamer",
                  fi: "Striimaajat",
                  en: "Streamers",
                },
                {
                  value: "content",
                  fi: "Sisällöntuottajat",
                  en: "Content Creators",
                },
                {
                  value: "moderator",
                  fi: "Moderaattorit",
                  en: "Moderators",
                },
                {
                  value: "videoeditor",
                  fi: "Videoeditoijat",
                  en: "Video Editors",
                },

              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() =>
                    setMemberFilter(
                      filter.value as
                        | "all"
                        | "streamer"
                        | "content"
                        | "moderator"
                        | "videoeditor"
                        | "graphic"
                    )
                  }
className={`relative overflow-hidden rounded-xl border px-2 py-3 text-sm font-black transition-all duration-300 ${
  memberFilter === filter.value
    ? "border-purple-300/70 bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 text-white shadow-[0_0_28px_rgba(168,85,247,0.28),inset_0_1px_0_rgba(255,255,255,0.18)]"
    : "border-white/15 bg-gradient-to-b from-white/[0.07] to-white/[0.025] text-gray-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-[2px] hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-white hover:shadow-[0_8px_25px_rgba(168,85,247,0.12)]"
}`}
                >
                  {language === "fi" ? filter.fi : filter.en}
                </button>
              ))}
            </div>
          </div>

          {/* JÄSENKORTIT */}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {members
              .filter((member) => member.twitch)
              .filter((member) => {
                const search = memberSearch.trim().toLowerCase();

                const roleCategory =
                  member.role.toLowerCase().includes("sisällöntuottaja")
                    ? "content"
                    : member.role.toLowerCase().includes("moderaattori")
                      ? "moderator"
                      : member.role.toLowerCase().includes("videoeditoija")
                        ? "videoeditor"
                        : member.role.toLowerCase().includes("graafikko")
                          ? "graphic"
                          : "streamer";

                const matchesSearch =
                  search === "" ||
                  member.name.toLowerCase().includes(search) ||
                  member.role.toLowerCase().includes(search) ||
                  member.twitch.toLowerCase().includes(search);

                const matchesFilter =
                  memberFilter === "all" || memberFilter === roleCategory;

return matchesSearch && matchesFilter;
})
.slice(
  0,
  showAllMembers ||
    memberSearch.trim() !== "" ||
    memberFilter !== "all"
    ? undefined
    : 15
)
.map((member) => {
                const stream = streams.find(
                  (item) =>
                    item.user_login.toLowerCase() ===
                    member.twitch.toLowerCase()
                );

                const isLive = Boolean(stream);

                return (
                  <a
                    key={member.name}
                    href={`/member/${member.twitch}`}
className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[24px] border border-purple-500/25 bg-[radial-gradient(circle_at_50%_5%,rgba(168,85,247,0.22),transparent_42%),linear-gradient(180deg,rgba(30,22,36,0.96)_0%,rgba(20,15,25,0.98)_55%,rgba(35,12,48,0.96)_100%)] px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_55px_rgba(0,0,0,0.45),0_0_30px_rgba(168,85,247,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-400/65 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_25px_70px_rgba(0,0,0,0.50),0_0_35px_rgba(168,85,247,0.20)]"
                  >
<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-fuchsia-500/5 opacity-70" />

<div className="pointer-events-none absolute left-1/2 top-0 h-[2px] w-[65%] -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-400 to-fuchsia-400 opacity-60 shadow-[0_0_18px_rgba(168,85,247,0.45)] transition-all duration-500 group-hover:w-[85%] group-hover:opacity-100 group-hover:shadow-[0_0_26px_rgba(217,70,239,0.7)]" />

<img
  src="/images/ks-logo.png.png"
  alt=""
className="pointer-events-none absolute right-[-28px] top-[115px] w-[180px] rotate-[-12deg] object-contain opacity-[0.028] transition-all duration-500 group-hover:opacity-[0.06] group-hover:scale-105"
/>

                    {isLive && (
                      <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-md border border-green-400/50 bg-green-500/10 px-2 py-1">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                        </span>

                        <span className="text-[10px] font-black uppercase text-green-400">
                          LIVE
                        </span>
                      </div>
                    )}

                    <div className="relative z-10 flex h-full flex-col items-center text-center">
                      <div className="relative">
                        <div className="rounded-full bg-gradient-to-br from-purple-400 via-fuchsia-500 to-purple-700 p-[2px] shadow-[0_0_28px_rgba(168,85,247,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]">
                          <img
                            src={getProfileImage(member.twitch)}
                            alt={member.name}
                            className="h-28 w-28 rounded-full bg-zinc-900 object-cover sm:h-32 sm:w-32"
                          />
                        </div>

                        <span
                          className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-zinc-950 ${
                            isLive
                              ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]"
                              : "bg-zinc-600"
                          }`}
                        />
                      </div>

<h3 className="mt-4 bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-2xl font-black tracking-tight text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.18)] transition-all duration-300 group-hover:drop-shadow-[0_0_18px_rgba(192,132,252,0.40)]">
  {member.name}
</h3>

<p className="mt-2 inline-flex items-center rounded-full border border-purple-400/40 bg-gradient-to-r from-purple-500/15 to-fuchsia-500/10 px-3.5 py-1 text-xs font-black text-purple-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_18px_rgba(168,85,247,0.12)] transition group-hover:border-purple-300/60 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(168,85,247,0.22)]">
  {member.role === "Perustaja / Striimaaja"
    ? language === "fi"
      ? "Perustaja / Striimaaja"
      : "Founder / Streamer"
    : member.role === "Striimaaja"
      ? language === "fi"
        ? "Striimaaja"
        : "Streamer"
      : member.role === "Moderaattori"
        ? language === "fi"
          ? "Moderaattori"
          : "Moderator"
        : member.role === "Sisällöntuottaja"
          ? language === "fi"
            ? "Sisällöntuottaja"
            : "Content Creator"
          : member.role}
</p>

<div className="mt-auto pt-5">
<span className="relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-purple-400/35 bg-gradient-to-r from-purple-600/20 via-fuchsia-600/15 to-purple-600/20 px-5 py-2.5 text-sm font-black text-purple-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-purple-300/70 group-hover:bg-purple-500/25 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.30)]">
    {language === "fi" ? "Avaa profiili" : "Open profile"}

    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </span>
</div>
</div>
</a>
);
})}

{/* NÄYTÄ KAIKKI JÄSENET / VÄHEMMÄN */}

{memberSearch.trim() === "" &&
  memberFilter === "all" &&
  members.filter((member) => member.twitch).length > 15 && (
    <div className="col-span-full flex justify-center py-5">
      <button
        type="button"
        onClick={() => setShowAllMembers((current) => !current)}
className="group inline-flex items-center justify-center gap-3 rounded-xl border border-purple-400/35 bg-gradient-to-r from-purple-600/15 via-fuchsia-600/10 to-purple-600/15 px-8 py-4 font-black text-purple-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/70 hover:bg-purple-500/20 hover:text-white hover:shadow-[0_0_28px_rgba(168,85,247,0.25),0_16px_35px_rgba(0,0,0,0.4)]"      >
        {showAllMembers
          ? language === "fi"
            ? "Näytä vähemmän ↑"
            : "Show less ↑"
          : language === "fi"
            ? `Näytä kaikki jäsenet (${members.filter((member) => member.twitch).length}) ↓`
            : `Show all members (${members.filter((member) => member.twitch).length}) ↓`}
      </button>
    </div>
  )}

            {/* VAPAAT PAIKAT */}

            {[
              {
                category: "content",
                fi: "Sisällöntuottaja",
                en: "Content Creator",
              },
              {
                category: "streamer",
                fi: "Striimaaja",
                en: "Streamer",
              },
              {
                category: "moderator",
                fi: "Moderaattori",
                en: "Moderator",
              },
              {
                category: "videoeditor",
                fi: "Videoeditoija",
                en: "Video Editor",
              },
              
            ]
              .filter((position) => {
                const search = memberSearch.trim().toLowerCase();

                const positionName =
                  language === "fi" ? position.fi : position.en;

                const matchesSearch =
                  search === "" ||
                  positionName.toLowerCase().includes(search) ||
                  "vapaa paikka".includes(search) ||
                  "open position".includes(search);

                const matchesFilter =
                  memberFilter === "all" ||
                  memberFilter === position.category;

                return matchesSearch && matchesFilter;
              })
              .map((position) => (
                <a
                  key={position.category}
                  href="#rekry"
className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[24px] border border-dashed border-purple-400/35 bg-[radial-gradient(circle_at_50%_10%,rgba(168,85,247,0.12),transparent_42%),linear-gradient(180deg,rgba(24,18,30,0.92)_0%,rgba(17,13,22,0.96)_100%)] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-300/70 hover:shadow-[0_24px_70px_rgba(168,85,247,0.18)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-fuchsia-500/5" />
<div className="absolute right-4 top-4 z-20 rounded-full border border-fuchsia-300/60 bg-gradient-to-r from-purple-600/90 to-fuchsia-600/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-[0_0_18px_rgba(217,70,239,0.35)]">
  {language === "fi" ? "Avoin paikka" : "Open position"}
</div>
                  <div className="relative z-10 flex h-full flex-col items-center text-center">
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-purple-500 bg-purple-500/[0.06] shadow-[0_0_28px_rgba(168,85,247,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.45)]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-16 w-16 text-purple-500"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="8"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />

                        <path
                          d="M4.5 21C4.8 16.5 7.2 14 12 14C16.8 14 19.2 16.5 19.5 21"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-zinc-950 bg-zinc-600" />
                    </div>

                    <h3 className="mt-4 text-2xl font-black text-white">
                      {language === "fi"
                        ? "Vapaa paikka"
                        : "Open position"}
                    </h3>

<p className="mt-2 inline-flex items-center rounded-full border border-purple-400/35 bg-purple-500/10 px-3.5 py-1 text-xs font-black text-purple-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_16px_rgba(168,85,247,0.10)]">
                      {language === "fi" ? position.fi : position.en}
                    </p>

<p className="mt-3 text-center text-sm leading-6 text-gray-400">
  {language === "fi"
    ? "Voisiko tämä paikka olla sinun?"
    : "Could this be your place?"}
</p>

                    <div className="mt-auto pt-5">
<span className="inline-flex items-center justify-center gap-3 rounded-xl border border-purple-400/35 bg-gradient-to-r from-purple-600/15 via-fuchsia-600/10 to-purple-600/15 px-5 py-2.5 text-sm font-black text-purple-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-purple-300/70 group-hover:bg-purple-500/20 group-hover:text-white group-hover:shadow-[0_0_24px_rgba(168,85,247,0.25)]">
                        {language === "fi" ? "Hae mukaan" : "Apply now"}

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
          </div>

          {/* EI HAKUTULOKSIA */}

          {members
            .filter((member) => member.twitch)
            .filter((member) => {
              const search = memberSearch.trim().toLowerCase();

              const roleCategory =
                member.role.toLowerCase().includes("sisällöntuottaja")
                  ? "content"
                  : member.role.toLowerCase().includes("moderaattori")
                    ? "moderator"
                    : member.role.toLowerCase().includes("videoeditoija")
                      ? "videoeditor"
                      : member.role.toLowerCase().includes("graafikko")
                        ? "graphic"
                        : "streamer";

              return (
                (search === "" ||
                  member.name.toLowerCase().includes(search) ||
                  member.role.toLowerCase().includes(search) ||
                  member.twitch.toLowerCase().includes(search)) &&
                (memberFilter === "all" || memberFilter === roleCategory)
              );
            }).length === 0 &&
            memberSearch.trim() !== "" && (
              <div className="mt-8 rounded-2xl border border-purple-500/20 bg-white/[0.03] p-8 text-center">
                <p className="text-lg font-bold text-gray-300">
                  {language === "fi"
                    ? "Haulla ei löytynyt jäsentä."
                    : "No member matched your search."}
                </p>
              </div>
            )}

          {/* LIITY MUKAAN -BANNERI */}

          <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-950/50 via-zinc-950 to-purple-950/40 px-6 py-6 shadow-[0_0_45px_rgba(168,85,247,0.14)] md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-purple-500/40 bg-purple-500/10 text-4xl font-black text-purple-400">
                +
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">
                  {language === "fi"
                    ? "Liity osaksi KOPOSQUADIA!"
                    : "Become part of KOPOSQUAD!"}
                </h3>

                <p className="mt-1 text-gray-400">
                  {language === "fi"
                    ? "Etsimme jatkuvasti uusia striimaajia ja sisällöntuottajia mukaan tiimiin."
                    : "We are always looking for new streamers and content creators to join the team."}
                </p>
              </div>
            </div>

            <a
              href="#rekry"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 font-black text-white shadow-[0_0_28px_rgba(168,85,247,0.3)] transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-fuchsia-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.55)]"
            >
              {language === "fi" ? "HAE MUKAAN" : "APPLY NOW"}
              <span>→</span>
            </a>
          </div>
        </div>
      </section>



{/* CLIPS */}

<section
  id="clips"
  className="relative overflow-hidden border-y border-purple-500/10 bg-[linear-gradient(180deg,#050008_0%,#0b0012_45%,#050008_100%)] px-6 py-24"
>
  {/* TAUSTAN HEHKUT */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-52 top-20 h-[700px] w-[700px] rounded-full bg-purple-700/25 blur-[220px]" />
    <div className="absolute -right-52 top-[500px] h-[700px] w-[700px] rounded-full bg-blue-900/20 blur-[220px]" />
    <div className="absolute left-1/2 bottom-[-250px] h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-fuchsia-900/15 blur-[240px]" />
  </div>

  {/* HIMMEÄT KS-LOGOT */}
  <img
    src="/images/ks-logo.png.png"
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute -left-24 top-[260px] hidden w-[360px] -rotate-12 object-contain opacity-[0.045] lg:block"
  />

  <img
    src="/images/ks-logo.png.png"
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute -right-24 bottom-[220px] hidden w-[380px] rotate-12 object-contain opacity-[0.04] lg:block"
  />

  <div className="relative z-10 mx-auto max-w-[1500px]">
    {/* OTSIKKO */}
    <div className="text-center">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
        KOPOSQUAD CREATOR HUB
      </p>

      <h2 className="mt-4 text-4xl font-black md:text-5xl">
        KOPOSQUAD <span className="text-purple-500">CLIPS</span>
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400 md:text-lg">
        {language === "fi"
          ? "Katso tiimin parhaat Twitch-klipit yhdestä paikasta."
          : "Watch the best Twitch clips from the team in one place."}
      </p>
    </div>

    {/* KLIPIT */}
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
      {clipsLoading ? (
        <p className="col-span-full text-center text-gray-400">
          {language === "fi" ? "Ladataan klippejä..." : "Loading clips..."}
        </p>
      ) : clips.length === 0 ? (
        <p className="col-span-full text-center text-gray-400">
          {language === "fi"
            ? "Klippejä ei löytynyt tällä hetkellä."
            : "No clips found right now."}
        </p>
      ) : (
        (showAllClips ? clips : clips.slice(0, 15)).map((clip, index) => (
          <article
            key={`${clip.id || "clip"}-${index}`}
            className="group overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/25 via-zinc-900 to-blue-950/10 shadow-[0_0_20px_rgba(168,85,247,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.20)]"
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
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/15 transition group-hover:bg-black/30">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-xl shadow-lg transition group-hover:scale-110 group-hover:border-purple-400/50">
                    ▶
                  </span>
                </div>
              </div>
            </a>

            <div className="p-4">
              <h3 className="line-clamp-2 min-h-[40px] text-sm font-black leading-5">
                {clip.title}
              </h3>

              <p className="mt-2 truncate text-xs font-bold text-purple-400">
                {clip.broadcaster_name}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                {clip.view_count}{" "}
                {language === "fi" ? "katselukertaa" : "views"}
              </p>

              <a
                href={clip.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full rounded-lg bg-purple-600 px-3 py-2.5 text-center text-xs font-black transition hover:bg-purple-500"
              >
                {language === "fi" ? "Katso Twitchissä" : "Watch on Twitch"}
              </a>
            </div>
          </article>
        ))
      )}
    </div>

    {/* NÄYTÄ KAIKKI / VÄHEMMÄN */}
    {!clipsLoading && clips.length > 15 && (
      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => setShowAllClips((current) => !current)}
          className="inline-flex items-center justify-center rounded-xl border border-purple-500/40 bg-purple-500/10 px-8 py-4 font-black text-purple-200 transition hover:border-purple-400 hover:bg-purple-500/20 hover:text-white"
        >
          {showAllClips
            ? language === "fi"
              ? "Näytä vähemmän ↑"
              : "Show less ↑"
            : language === "fi"
            ? `Näytä kaikki klipit (${clips.length}) ↓`
            : `Show all clips (${clips.length}) ↓`}
        </button>
      </div>
    )}
  </div>
</section>


{/* KOPOSQUAD CREATIVE */}

<section className="relative overflow-hidden border-y border-purple-500/15 bg-[linear-gradient(180deg,#020202_0%,#100018_45%,#050008_100%)] px-6 py-24">
  {/* TAUSTAN VÄRIT */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute left-1/2 top-1/2 h-[760px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/25 blur-[240px]" />
    <div className="absolute -left-48 top-[-40px] h-[620px] w-[620px] rounded-full bg-fuchsia-600/16 blur-[210px]" />
    <div className="absolute -right-56 bottom-[-100px] h-[700px] w-[700px] rounded-full bg-violet-600/16 blur-[220px]" />

    <div className="absolute left-[15%] top-[10%] h-[260px] w-[260px] rounded-full bg-purple-400/10 blur-[120px]" />
    <div className="absolute right-[20%] top-[20%] h-[240px] w-[240px] rounded-full bg-fuchsia-400/10 blur-[120px]" />
  </div>

<div className="relative z-10 mx-auto mb-10 max-w-6xl text-center">
  <p className="text-[11px] font-black uppercase tracking-[0.38em] text-purple-400">
    KOPOSQUAD CREATIVE
  </p>

  <h2 className="mt-4 text-4xl font-black uppercase sm:text-5xl">
    LUO JOTAIN{" "}
    <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
      OMAN NÄKÖISTÄSI
    </span>
  </h2>

  <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-400">
    Visuaalisia palveluita striimaajille ja sisällöntuottajille, 
    suunniteltuna juuri sinun kanavasi ympärille.
  </p>
</div>

  {/* TAUSTAN KS LOGOT */}
  <img
    src="/images/ks-logo.png.png"
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute -left-24 top-1/2 hidden w-[360px] -translate-y-1/2 rotate-[13deg] object-contain opacity-[0.035] lg:block"
  />

  <img
    src="/images/ks-logo.png.png"
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute -right-24 top-1/2 hidden w-[430px] -translate-y-1/2 rotate-[-12deg] object-contain opacity-[0.055] lg:block"
  />

  <div className="relative z-10 mx-auto max-w-6xl">

    {/* YLÄTAGI */}
    <div className="mb-7 flex justify-center">
      <div className="inline-flex items-center gap-3 rounded-full border border-purple-400/35 bg-purple-500/10 px-5 py-2 backdrop-blur-xl shadow-[0_0_25px_rgba(168,85,247,0.18)]">
        <span className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_14px_rgba(232,121,249,0.95)]" />

        <span className="text-[10px] font-black uppercase tracking-[0.34em] text-purple-200">
          KOPOSQUAD CREATIVE
        </span>
      </div>
    </div>

    {/* PÄÄKORTTI */}
    <div className="group relative overflow-hidden rounded-[34px] border border-purple-400/35 bg-[linear-gradient(135deg,rgba(88,28,135,0.48)_0%,rgba(24,10,35,0.97)_38%,rgba(5,5,7,0.98)_72%,rgba(64,8,90,0.55)_100%)] shadow-[0_0_90px_rgba(147,51,234,0.22),0_35px_100px_rgba(0,0,0,0.55)]">

      {/* KORTIN SISÄHEHKUT */}
      <div className="pointer-events-none absolute -left-24 top-[-80px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/18 blur-[130px]" />
      <div className="pointer-events-none absolute right-[15%] top-[-120px] h-[420px] w-[420px] rounded-full bg-purple-500/18 blur-[140px]" />

      {/* YLÄREUNAN VALO */}
      <div className="pointer-events-none absolute left-[8%] right-[8%] top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300/80 to-transparent" />

      {/* KORTIN ISO KS */}
      <img
        src="/images/ks-logo.png.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-12 w-[340px] rotate-[-12deg] object-contain opacity-[0.055] transition duration-700 group-hover:scale-105 group-hover:opacity-[0.075]"
      />

      <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center xl:grid-cols-[minmax(0,1fr)_440px]">

        {/* VASEN PUOLI */}
        <div className="relative min-w-0">

          <div className="mb-5 inline-flex rounded-lg border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.24em] text-fuchsia-200">
            Creative Services
          </div>

<h2 className="max-w-[680px] font-black uppercase leading-[0.92] tracking-[-0.035em]">
            {language === "fi" ? (
              <>
                <span className="block text-4xl sm:text-5xl lg:text-[3.15rem] xl:text-[3.5rem]">
                  Tee kanavastasi
                </span>

                <span className="mt-1 block bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-500 bg-clip-text text-4xl text-transparent drop-shadow-[0_0_28px_rgba(217,70,239,0.32)] sm:text-5xl lg:text-[3.15rem] xl:text-[3.5rem]">
                  oman näköisesi
                </span>
              </>
            ) : (
              <>
                <span className="block text-4xl sm:text-5xl lg:text-[3.15rem] xl:text-[3.5rem]">
                  Make your channel
                </span>

                <span className="mt-1 block bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-500 bg-clip-text text-4xl text-transparent drop-shadow-[0_0_28px_rgba(217,70,239,0.32)] sm:text-5xl lg:text-[3.15rem] xl:text-[3.5rem]">
                  look like you
                </span>
              </>
            )}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
            {language === "fi"
              ? "KOPOSQUAD Creative rakentaa striimaajille ja sisällöntuottajille persoonallisia visuaalisia kokonaisuuksia. Ei valmista massapohjaa – ilme suunnitellaan oman kanavasi tyylin ja toiveiden ympärille."
              : "KOPOSQUAD Creative builds personal visual identities for streamers and content creators. No generic mass-produced templates – the design is built around your channel, style and ideas."}
          </p>

          {/* OMINAISUUSKORTIT */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="relative overflow-hidden rounded-2xl border border-purple-400/25 bg-purple-500/[0.08] p-4 backdrop-blur-xl">
              <img
                src="/images/ks-logo.png.png"
                alt=""
                className="pointer-events-none absolute -right-6 -bottom-7 w-[90px] rotate-[-10deg] opacity-[0.07]"
              />

              <p className="relative text-[9px] font-black uppercase tracking-[0.18em] text-purple-300">
                01
              </p>

              <p className="relative mt-2 text-sm font-black text-white">
                Custom-design
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-fuchsia-400/25 bg-fuchsia-500/[0.07] p-4 backdrop-blur-xl">
              <img
                src="/images/ks-logo.png.png"
                alt=""
                className="pointer-events-none absolute -right-6 -bottom-7 w-[90px] rotate-[10deg] opacity-[0.06]"
              />

              <p className="relative text-[9px] font-black uppercase tracking-[0.18em] text-fuchsia-300">
                02
              </p>

              <p className="relative mt-2 text-sm font-black text-white">
                {language === "fi"
                  ? "Henkilökohtainen"
                  : "Personal design"}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.06] p-4 backdrop-blur-xl">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">
                03
              </p>

              <p className="mt-2 text-sm font-black text-white">
                {language === "fi"
                  ? "Turvallinen maksu"
                  : "Secure payment"}
              </p>
            </div>
          </div>

          <a
            href="/palvelut"
            className="group/button relative mt-9 inline-flex items-center justify-center overflow-hidden rounded-xl border border-fuchsia-300/30 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 px-9 py-4 text-sm font-black uppercase tracking-[0.11em] text-white shadow-[0_0_38px_rgba(168,85,247,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(217,70,239,0.52)]"
          >
            <span className="pointer-events-none absolute -left-20 top-0 h-full w-14 rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover/button:left-[120%]" />

            <span className="relative">
              {language === "fi"
                ? "Katso kaikki palvelut →"
                : "View all services →"}
            </span>
          </a>
        </div>

        {/* OIKEA TUOTEKORTTI */}
        <div className="relative min-w-0">

          {/* HEHKU KORTIN TAKANA */}
          <div className="pointer-events-none absolute inset-8 rounded-full bg-purple-600/30 blur-[90px]" />

          <div className="group/product relative overflow-hidden rounded-[28px] border border-fuchsia-400/30 bg-[linear-gradient(160deg,rgba(62,20,82,0.88),rgba(8,5,12,0.98)_50%,rgba(17,8,24,0.98))] p-7 shadow-[0_0_55px_rgba(168,85,247,0.16),0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">

            {/* TUOTEKORTIN KS */}
            <img
              src="/images/ks-logo.png.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-12 w-[190px] rotate-[-12deg] object-contain opacity-[0.08] transition duration-500 group-hover/product:scale-110 group-hover/product:opacity-[0.12]"
            />

            <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-fuchsia-400 via-purple-500 to-transparent" />

            <div className="relative z-10 flex items-center justify-between gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-fuchsia-300">
                {language === "fi"
                  ? "Nyt tilattavissa"
                  : "Available now"}
              </p>

              <span className="rounded-full border border-emerald-400/35 bg-emerald-400/[0.09] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.08)]">
                {language === "fi"
                  ? "Tilattavissa"
                  : "Available"}
              </span>
            </div>

            <div className="relative z-10 mt-7">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/10 shadow-[0_0_25px_rgba(168,85,247,0.16)]">
                  <img
                    src="/images/ks-logo.png.png"
                    alt=""
                    className="w-9 object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-3xl font-black uppercase leading-tight text-white">
                    Stream Overlay
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {language === "fi"
                      ? "Täysi visuaalinen overlay-paketti oman striimisi ilmeen rakentamiseen."
                      : "A complete visual overlay package for building the identity of your stream."}
                  </p>
                </div>
              </div>
            </div>

            {/* SISÄLTÖLISTA */}
            <div className="relative z-10 mt-7 grid grid-cols-2 gap-2">
              {[
                "Starting Soon",
                "BRB",
                "Ending",
                "Kamera-overlay",
                "Alertit",
                "Gameplay",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-purple-400/15 bg-black/30 px-3 py-2 text-[11px] font-bold text-gray-300"
                >
                  <span className="mr-2 text-purple-400">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-7 flex items-end justify-between border-t border-purple-400/20 pt-6">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-purple-300">
                  {language === "fi" ? "Hinta" : "Price"}
                </p>

<div className="mt-3">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-gray-500 line-through decoration-fuchsia-400/70 decoration-2">
                      99,99 €
                    </span>

                    <span className="rounded-full border border-fuchsia-400/35 bg-fuchsia-500/12 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-fuchsia-300 shadow-[0_0_18px_rgba(217,70,239,0.14)]">
                      ALE -40 %
                    </span>
                  </div>

                  <div className="relative inline-flex items-center">
                    <div className="pointer-events-none absolute -inset-x-5 -inset-y-3 animate-pulse rounded-2xl bg-fuchsia-500/20 blur-2xl" />
                    <div className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-2xl bg-purple-400/10 blur-lg" />

                    <p className="relative whitespace-nowrap text-5xl font-black tracking-[-0.045em] text-white drop-shadow-[0_0_20px_rgba(192,132,252,0.55)]">
                      59,99 €
                    </p>
                  </div>

                  <div className="mt-2 h-px w-[150px] bg-gradient-to-r from-fuchsia-400/85 via-purple-400/50 to-transparent shadow-[0_0_14px_rgba(217,70,239,0.5)]" />
                </div>
              </div>

              <div className="rounded-xl border border-purple-400/20 bg-purple-500/[0.06] px-3 py-2 text-right">
                <p className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-500">
                  KOPOSQUAD
                </p>
                <p className="mt-1 text-xs font-black text-purple-300">
                  CREATIVE
                </p>
              </div>
            </div>

            <a
              href="/palvelut"
              className="relative z-10 mt-7 flex w-full items-center justify-center rounded-xl border border-fuchsia-400/35 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 px-5 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-purple-100 transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300 hover:bg-fuchsia-500/20 hover:text-white hover:shadow-[0_0_30px_rgba(217,70,239,0.20)]"
            >
              {language === "fi"
                ? "Tutustu Stream Overlayhin →"
                : "Explore Stream Overlay →"}
            </a>

          </div>
        </div>

      </div>

      {/* ALAREUNAN VALOJUOVA */}
      <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
    </div>
  </div>
</section>


{/* ROADMAP */}

<section
  id="roadmap"
  className="relative overflow-hidden bg-black px-6 py-24"
>
  {/* TAUSTAN KS-LOGO */}
  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="pointer-events-none absolute -left-20 top-1/2 hidden w-[420px] -translate-y-1/2 rotate-[8deg] object-contain opacity-[0.04] lg:block"
  />

  {/* TAUSTAN HEHKUT */}
  <div className="pointer-events-none absolute left-1/2 top-20 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[260px]" />

  <div className="pointer-events-none absolute bottom-0 right-[-250px] h-[550px] w-[550px] rounded-full bg-blue-900/10 blur-[220px]" />

  <div className="relative z-10 mx-auto max-w-6xl">
    {/* OTSIKKO */}
    <div className="text-center">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
        {language === "fi" ? "Kehityksen seuranta" : "Development progress"}
      </p>

      <h2 className="mt-4 text-4xl font-black uppercase sm:text-5xl">
        <span className="text-purple-500">KOPOSQUADIN</span>{" "}
        {language === "fi" ? "TAVOITTEET" : "GOALS"}
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-zinc-400 md:text-lg">
        {language === "fi"
          ? "Tästä näet, mitä olemme jo saaneet aikaan ja mitä KOPOSQUADille suunnitellaan seuraavaksi."
          : "See what we have already achieved and what is planned next for KOPOSQUAD."}
      </p>
    </div>

    {/* TAVOITEKORTIT */}
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      {[
        {
          fiTitle: "KOPOSQUAD perustettu",
          enTitle: "KOPOSQUAD founded",
          fiDescription:
            "Yhteisön ensimmäinen pohja, nimi ja toimintasuunnitelma on rakennettu.",
          enDescription:
            "The foundation, name and initial plan for the community have been created.",
          status: "completed",
        },
        {
          fiTitle: "Verkkosivusto julkaistu",
          enTitle: "Website launched",
          fiDescription:
            "KOPOSQUADin verkkosivusto on julkaistu ja sitä kehitetään jatkuvasti.",
          enDescription:
            "The KOPOSQUAD website has been launched and is continuously developed.",
          status: "completed",
        },
        {
          fiTitle: "Jäsenprofiilit julkaistu",
          enTitle: "Member profiles launched",
          fiDescription:
            "Jäsenille on rakennettu omat profiilisivut sisältöineen ja kanavalinkkeineen.",
          enDescription:
            "Dedicated profile pages with content and channel links have been created for members.",
          status: "completed",
        },
        {
          fiTitle: "10 aktiivista tekijää",
          enTitle: "10 active creators",
          fiDescription:
            "Ensimmäinen merkittävä jäsenmäärätavoite on saavutettu.",
          enDescription:
            "The first major membership milestone has been achieved.",
          status: "completed",
        },
        {
          fiTitle: "KOPOSQUADTV avattu",
          enTitle: "KOPOSQUADTV launched",
          fiDescription:
            "Yhteisön yhteinen Twitch-kanava on avattu tulevia lähetyksiä varten.",
          enDescription:
            "The community Twitch channel has been launched for future broadcasts.",
          status: "completed",
        },
        {
  fiTitle: "KOPOSQUAD Merch julkaistu",
  enTitle: "KOPOSQUAD Merch launched",
  fiDescription:
    "KOPOSQUADin virallinen merch-kauppa on avattu ja ensimmäinen tuotevalikoima julkaistu.",
  enDescription:
    "The official KOPOSQUAD merch store has launched with its first product collection.",
  status: "completed",
},
        {
          fiTitle: "Twitch Affiliate KOPOSQUADTV:lle",
          enTitle: "Twitch Affiliate for KOPOSQUADTV",
          fiDescription:
            "Kanavan ensimmäinen suuri kasvutavoite mahdollistaa yhteisön toiminnan kehittämisen.",
          enDescription:
            "The channel's first major growth milestone will help develop community activities.",
          status: "completed",
        },
        {
          fiTitle: "Ensimmäinen yhteistyökumppani",
          enTitle: "First collaboration partner",
          fiDescription:
            "Etsimme ensimmäistä yhteistyökumppania tukemaan yhteisön kasvua ja tulevaa toimintaa.",
          enDescription:
            "We are looking for our first collaboration partner to support the community's growth.",
          status: "progress",
        },
        {
          fiTitle: "1 000 Discord-jäsentä",
          enTitle: "1,000 Discord members",
          fiDescription:
            "Kasvatamme Discordista aktiivista kohtaamispaikkaa jäsenille, katsojille ja uusille tekijöille.",
          enDescription:
            "We are growing Discord into an active meeting place for members, viewers and creators.",
          status: "progress",
        },
        {
          fiTitle: "1 000 Twitch-seuraajaa",
          enTitle: "1,000 Twitch followers",
          fiDescription:
            "KOPOSQUADTV-kanavan seuraajamäärää kasvatetaan yhteisön yhteisillä lähetyksillä.",
          enDescription:
            "The KOPOSQUADTV audience is being grown through shared community broadcasts.",
          status: "progress",
        },

        {
          fiTitle: "Ensimmäinen KOPOSQUAD-miitti",
          enTitle: "First KOPOSQUAD meetup",
          fiDescription:
            "Järjestetään jäsenille ensimmäinen yhteinen tapaaminen ja mahdollisuus tutustua kasvotusten.",
          enDescription:
            "The first community meetup will give members a chance to meet in person.",
status: "future",
        },
        {
          fiTitle: "Jäsenten omat KOPOSQUAD-paidat",
          enTitle: "Personal KOPOSQUAD shirts",
          fiDescription:
            "Aktiivisille jäsenille tehdään tulevaisuudessa omat paidat heidän nimimerkeillään.",
          enDescription:
            "Active members will receive personal shirts featuring their creator names.",
          status: "future",
        },
{
  fiTitle: "KOPOSQUAD Giveaway",
  enTitle: "KOPOSQUAD Giveaway",
  fiDescription:
    "Tulevaisuudessa järjestetään yhteisölle isompi arvonta, jossa katsojilla ja jäsenillä on mahdollisuus voittaa palkintoja.",
  enDescription:
    "A larger community giveaway is planned for the future, giving viewers and members a chance to win prizes.",
  status: "future",
},
        {
          fiTitle: "Assembly tai Vectorama",
          enTitle: "Assembly or Vectorama",
          fiDescription:
            "Tavoitteena on osallistua yhdessä suureen peli- tai verkkotapahtumaan.",
          enDescription:
            "The goal is to attend a major gaming or digital event together.",
          status: "future",
        },
      ].map((goal, index) => {
        const completed = goal.status === "completed";
        const progress = goal.status === "progress";
        const coming = goal.status === "coming";

        const statusText =
          language === "fi"
            ? completed
              ? "Valmis"
              : progress
                ? "Työn alla"
                : coming
                  ? "Tulossa"
                  : "Tulevaisuudessa"
            : completed
              ? "Completed"
              : progress
                ? "In progress"
                : coming
                  ? "Coming soon"
                  : "Future";

        return (
          <article
            key={goal.fiTitle}
            className={`group relative overflow-hidden rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 ${
              completed
                ? "border-green-500/30 bg-green-500/[0.06] hover:border-green-400/50"
                : progress
                  ? "border-purple-500/30 bg-purple-500/[0.06] hover:border-purple-400/50"
                  : "border-white/10 bg-white/[0.035] hover:border-purple-500/35 hover:bg-purple-500/[0.05]"
            }`}
          >
            <div className="flex items-start gap-5">
              {/* NUMERO TAI VALMIS-MERKKI */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-lg font-black ${
                  completed
                    ? "border-green-400/40 bg-green-500/15 text-green-300"
                    : progress
                      ? "border-purple-400/40 bg-purple-500/15 text-purple-300"
                      : "border-purple-500/25 bg-purple-500/10 text-purple-300"
                }`}
              >
                {completed ? "✓" : index + 1}
              </div>

              <div className="min-w-0 flex-1">
                {/* OTSIKKO JA TILA */}
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-black uppercase leading-snug text-white">
                    {language === "fi" ? goal.fiTitle : goal.enTitle}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                      completed
                        ? "bg-green-500/15 text-green-300"
                        : progress
                          ? "bg-purple-500/15 text-purple-300"
                          : coming
                            ? "bg-fuchsia-500/10 text-fuchsia-300"
                            : "bg-white/[0.07] text-zinc-400"
                    }`}
                  >
                    {statusText}
                  </span>
                </div>

                {/* KUVAUS */}
                <p className="mt-3 text-sm leading-7 text-zinc-400 md:text-base">
                  {language === "fi"
                    ? goal.fiDescription
                    : goal.enDescription}
                </p>
              </div>
            </div>

            {/* HIENO HIMMEÄ KORISTEHEHKU */}
            <div
              className={`pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full blur-[70px] transition duration-300 ${
                completed
                  ? "bg-green-500/10"
                  : progress
                    ? "bg-purple-500/15"
                    : "bg-purple-500/5 group-hover:bg-purple-500/10"
              }`}
            />
          </article>
        );
      })}
    </div>
  </div>
</section>



{/* UUTISET / AJANKOHTAISTA */}

<section
  id="uutiset"
  className="relative overflow-hidden border-y border-purple-500/10 bg-[linear-gradient(180deg,#050008_0%,#09000f_50%,#03040a_100%)] px-6 py-24"
>
  {/* TAUSTAN HEHKUT */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-48 top-20 h-[650px] w-[650px] rounded-full bg-purple-700/20 blur-[220px]" />
    <div className="absolute -right-48 bottom-0 h-[650px] w-[650px] rounded-full bg-blue-700/15 blur-[220px]" />
    <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-900/10 blur-[240px]" />
  </div>

  {/* HIMMEÄT KS-LOGOT */}
  <img
    src="/images/ks-logo.png.png"
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute -left-20 top-28 hidden w-[330px] -rotate-12 object-contain opacity-[0.04] lg:block"
  />

  <img
    src="/images/ks-logo.png.png"
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute -right-20 bottom-20 hidden w-[360px] rotate-12 object-contain opacity-[0.035] lg:block"
  />

  <div className="relative z-10 mx-auto max-w-6xl">

    {/* OTSIKKO */}
    <div className="text-center">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
        KOPOSQUAD
      </p>

      <h2 className="mt-3 text-4xl font-black md:text-5xl">
        {language === "fi" ? (
          <>
            <span className="text-white">AJAN</span>
            <span className="text-purple-500">KOHTAISTA</span>
          </>
        ) : (
          <>
            <span className="text-white">LATEST </span>
            <span className="text-purple-500">NEWS</span>
          </>
        )}
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
        {language === "fi"
          ? "Seuraa KOPOSQUADin uusimpia päivityksiä, yhteisön kehitystä, projekteja ja tulevia tapahtumia."
          : "Follow the latest KOPOSQUAD updates, community development, projects and upcoming events."}
      </p>
    </div>

    {/* PÄÄUUTINEN */}
    <div className="relative mt-14 overflow-hidden rounded-3xl border border-purple-500/40 bg-gradient-to-br from-purple-950/60 via-zinc-950 to-blue-950/30 p-8 shadow-[0_0_50px_rgba(168,85,247,0.12)] md:p-10">

      <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-purple-600/15 blur-[100px]" />

      <div className="relative z-10 max-w-3xl">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-purple-300">
            {language === "fi" ? "UUTTA" : "NEW"}
          </span>

          <span className="text-xs font-bold text-gray-500">
            13.08.2026
          </span>
        </div>

        <h3 className="text-3xl font-black md:text-4xl">
          {language === "fi"
            ? "KOPOSQUAD CREATOR HUB ON AVATTU"
            : "KOPOSQUAD CREATOR HUB IS NOW OPEN"}
        </h3>

        <p className="mt-5 max-w-2xl leading-7 text-gray-300">
          {language === "fi"
            ? "KOPOSQUAD Creator Hub kokoaa striimaajien ja sisällöntuottajien hyödylliset työkalut ja oppaat yhteen paikkaan. Ensimmäiset oppaat ovat nyt saatavilla ja lisää sisältöä rakennetaan jatkuvasti."
            : "KOPOSQUAD Creator Hub brings useful tools and guides for streamers and content creators together in one place. The first guides are now available and more content is being added continuously."}
        </p>

        <a
          href="/tools"
          className="mt-7 inline-flex items-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-black transition hover:bg-purple-500"
        >
          {language === "fi"
            ? "Tutustu Creator Hubiin →"
            : "Explore Creator Hub →"}
        </a>
      </div>
    </div>

    {/* PIENEMMÄT UUTISET */}
    <div className="mt-6 grid gap-6 md:grid-cols-3">

      {/* KOPOSQUAD KASVAA */}
      <article className="group rounded-3xl border border-purple-500/25 bg-gradient-to-br from-purple-950/30 via-zinc-900/90 to-zinc-950 p-7 transition duration-300 hover:-translate-y-1 hover:border-purple-500/60">

        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-purple-400">
            YHTEISÖ
          </span>

          <span className="text-xs text-gray-500">
            13.08.2026
          </span>
        </div>

        <h3 className="text-2xl font-black">
          {language === "fi"
            ? "KOPOSQUAD KASVAA"
            : "KOPOSQUAD IS GROWING"}
        </h3>

        <p className="mt-4 leading-7 text-gray-400">
          {language === "fi"
            ? "Yhteisöön liittyy uusia tekijöitä ja KOPOSQUADia rakennetaan jatkuvasti suuremmaksi. Tavoitteena on tuoda erilaisia sisällöntuottajia yhteen ja rakentaa aktiivinen yhteisö."
            : "New creators are joining the community as KOPOSQUAD continues to grow. The goal is to bring different creators together and build an active community."}
        </p>

        <a
          href="#tiimi"
          className="mt-6 inline-block text-sm font-black text-purple-400 transition group-hover:text-purple-300"
        >
          {language === "fi" ? "Tutustu tiimiin →" : "Meet the team →"}
        </a>
      </article>

      {/* KOPOSQUADTV */}
      <article className="group rounded-3xl border border-pink-500/25 bg-gradient-to-br from-pink-950/20 via-zinc-900/90 to-zinc-950 p-7 transition duration-300 hover:-translate-y-1 hover:border-pink-500/60">

        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-pink-400">
            TWITCH
          </span>

          <span className="text-xs text-gray-500">
            13.08.2026
          </span>
        </div>

        <h3 className="text-2xl font-black text-white">
          KOPOSQUADTV
        </h3>

        <p className="mt-4 leading-7 text-gray-400">
          {language === "fi"
            ? "KOPOSQUADin yhteinen Twitch-kanava tarjoaa jäsenille mahdollisuuden pitää omia lähetyksiä sekä osallistua yhteisliveihin, tapahtumiin ja muihin yhteisiin projekteihin."
            : "KOPOSQUAD's shared Twitch channel gives members the opportunity to host their own streams and participate in collaborative broadcasts, events and other projects."}
        </p>

        <a
          href="https://www.twitch.tv/koposquadtv"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-black text-pink-400 transition group-hover:text-pink-300"
        >
          {language === "fi"
            ? "Avaa KOPOSQUADTV →"
            : "Open KOPOSQUADTV →"}
        </a>
      </article>

      {/* TULEVAT PROJEKTIT */}
      <article className="group rounded-3xl border border-blue-500/25 bg-gradient-to-br from-blue-950/30 via-zinc-900/90 to-zinc-950 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/60">

        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
            {language === "fi" ? "TULEVAISUUS" : "FUTURE"}
          </span>

          <span className="text-xs text-gray-500">
            13.08.2026
          </span>
        </div>

        <h3 className="text-2xl font-black">
          {language === "fi"
            ? "TULEVAT PROJEKTIT"
            : "UPCOMING PROJECTS"}
        </h3>

        <p className="mt-4 leading-7 text-gray-400">
          {language === "fi"
            ? "KOPOSQUADille suunnitellaan yhteisiä projekteja, tapahtumia, miittejä ja tulevia yhteistyökuvioita. Uusista suunnitelmista kerrotaan täällä niiden edetessä."
            : "KOPOSQUAD is planning collaborative projects, events, meetups and future partnerships. New plans will be announced here as they develop."}
        </p>

        <span className="mt-6 inline-block text-sm font-black text-blue-400">
          {language === "fi" ? "Lisää tulossa..." : "More coming..."}
        </span>
      </article>

    </div>
  </div>
</section>



{/* REKRYTOINTI */}

<section
  id="rekry"
  className="relative overflow-hidden border-t border-purple-500/10 bg-zinc-950 px-6 py-24"
>
  {/* REKRYTOINNIN TAUSTAVALOT */}
  <div className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[250px]" />

  <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-violet-700/15 blur-[190px]" />

  <div className="pointer-events-none absolute -right-40 bottom-[-120px] h-[580px] w-[580px] rounded-full bg-fuchsia-700/12 blur-[210px]" />

  {/* HIMMEÄ KS-LOGO REKRYTOINNIN TAUSTALLA */}
  <div className="pointer-events-none absolute -right-24 top-20 hidden lg:block">
    <div className="absolute inset-0 scale-75 bg-purple-600/15 blur-[90px]" />

    <img
      src="/images/ks-logo.png.png"
      alt=""
      className="relative w-[430px] rotate-[-8deg] object-contain opacity-[0.045]"
    />
  </div>

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
className="group relative overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-br from-zinc-900 via-zinc-950 to-purple-950/30 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/70 hover:shadow-[0_0_40px_rgba(168,85,247,0.20)]"
        >
          <h3 className="text-3xl font-bold text-purple-400">
            {item.title}
          </h3>

          <p className="mt-4 leading-relaxed text-gray-400">
            {item.text}
          </p>
        </div>
      ))}

<div className="group relative overflow-hidden rounded-3xl border border-fuchsia-400/40 bg-gradient-to-br from-purple-700 via-purple-800 to-fuchsia-800 p-8 shadow-[0_0_45px_rgba(168,85,247,0.35)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_55px_rgba(217,70,239,0.45)]">
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
  className="relative overflow-hidden border-t border-purple-500/20 bg-black px-6 py-24"
>
  {/* HAKEMUSOSION TAUSTAVALOT */}
  <div className="pointer-events-none absolute inset-0 bg-purple-900/15 blur-3xl" />

  <div className="pointer-events-none absolute -left-52 bottom-[-120px] h-[600px] w-[600px] rounded-full bg-purple-700/22 blur-[210px]" />

  <div className="pointer-events-none absolute -right-52 top-[-120px] h-[580px] w-[580px] rounded-full bg-fuchsia-700/14 blur-[210px]" />

  {/* KS-LOGO VASEMMALLE */}
  <div className="pointer-events-none absolute left-[4%] top-1/2 hidden -translate-y-1/2 lg:block">
    <div className="absolute inset-0 scale-75 bg-purple-600/20 blur-[100px]" />

    <img
      src="/images/ks-logo.png.png"
      alt=""
      className="relative w-[320px] rotate-[7deg] object-contain opacity-[0.065]"
    />
  </div>

  {/* LOMAKE KESKELLÄ */}
  <div className="relative z-10 mx-auto max-w-4xl rounded-3xl border border-purple-500/35 bg-gradient-to-br from-zinc-900/95 via-zinc-950/95 to-purple-950/35 p-10 shadow-[0_0_60px_rgba(126,34,206,0.18)] backdrop-blur-xl">
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

<footer className="relative overflow-hidden border-t border-purple-500/20 bg-zinc-950 py-12 text-center">
  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-[150px]" />

  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="pointer-events-none absolute -right-14 top-1/2 hidden w-[260px] -translate-y-1/2 rotate-[-8deg] object-contain opacity-[0.035] md:block"
  />

  <h2 className="relative z-10 text-4xl font-black">
    <span className="text-purple-500">K</span>
    OPOSQUAD
  </h2>

  <p className="relative z-10 mt-4 text-lg text-gray-400">
    {language === "fi"
      ? "Suomen kasvava striimaaja- ja sisällöntuottajatiimi"
      : "Finland's growing team of streamers and content creators"}
  </p>

  <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-5">
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

  {/* FOOTER-LINKIT */}
  <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-8 text-sm font-semibold text-gray-500">
    <a
      href="/yhteystiedot"
      className="transition duration-300 hover:text-purple-300"
    >
      {language === "fi" ? "Yhteystiedot" : "Contact"}
    </a>

    <span className="hidden text-purple-500/40 sm:inline">•</span>

    <a
      href="/kayttoehdot"
      className="transition duration-300 hover:text-purple-300"
    >
      {language === "fi" ? "Käyttöehdot" : "Terms of Service"}
    </a>

    <span className="hidden text-purple-500/40 sm:inline">•</span>

    <a
      href="/tietosuoja"
      className="transition duration-300 hover:text-purple-300"
    >
      {language === "fi" ? "Tietosuojaseloste" : "Privacy Policy"}
    </a>

    <span className="hidden text-purple-500/40 sm:inline">•</span>

    <a
      href="/ukk"
      className="transition duration-300 hover:text-purple-300"
    >
      {language === "fi" ? "UKK" : "FAQ"}
    </a>
  </div>

  <p className="relative z-10 mt-10 text-gray-500">
    © 2026 KOPOSQUAD
  </p>

  <p className="relative z-10 mt-3 text-sm text-gray-600">
    {language === "fi"
      ? "Sivuston tekijä: Kopo"
      : "Website created by Kopo"}
  </p>
</footer>

    </main>
  );
}