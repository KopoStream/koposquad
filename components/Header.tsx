"use client";

import { useEffect, useState } from "react";

type HeaderProps = {
  activePage?: string;
};

type MenuSection =
  | "tiimi"
  | "tyokalut"
  | "palvelut"
  | "yhteiso"
  | "tietoa"
  | null;

export default function Header({ activePage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuSection>(null);

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

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveMenu(null);
  };

  const mainButtonClass =
    "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-black text-gray-300 transition-all duration-300 hover:bg-purple-500/10 hover:pl-5 hover:text-purple-300";

  const subLinkClass =
    "group flex items-center justify-between rounded-xl border border-transparent px-4 py-3.5 text-base font-bold text-gray-300 transition-all duration-300 hover:border-purple-500/15 hover:bg-purple-500/10 hover:pl-5 hover:text-purple-300";

  return (
    <>
      {/* YLÄPALKKI */}
      <nav className="fixed left-0 right-0 top-0 z-[70] border-b border-purple-500/20 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* VASEN */}
          <div className="flex items-center gap-4">
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

            <a href="/" className="text-3xl font-black tracking-tight">
              <span className="text-purple-500">KOPO</span>
              <span className="text-white">SQUAD</span>
            </a>
          </div>

          {/* OIKEA */}
          <div className="flex items-center gap-3">
            <a
              href="https://discord.gg/ZXgSS9v6ye"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl border border-purple-500/30 bg-purple-500/[0.07] px-5 py-2.5 text-sm font-black text-purple-300 transition hover:border-purple-400 hover:bg-purple-500/15 hover:text-white sm:block"
            >
              Discord
            </a>
          </div>
        </div>
      </nav>

      {/* BLUR / TUMMENNUS */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[80] bg-black/55 backdrop-blur-md transition-all duration-500 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* PÄÄVALIKKO */}
      <aside
        className={`fixed left-0 top-0 z-[90] h-screen w-[88vw] max-w-[410px] overflow-hidden border-r border-purple-500/25 bg-[linear-gradient(145deg,rgba(8,5,12,0.995),rgba(18,7,26,0.995))] shadow-[30px_0_100px_rgba(0,0,0,0.65)] transition-transform duration-500 ease-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HIMMEÄ KS */}
        <img
          src="/images/ks-logo.png.png"
          alt=""
          className="pointer-events-none absolute -bottom-16 -right-20 w-[300px] rotate-[-12deg] opacity-[0.035]"
        />

        {/* VIOLETTI HEHKU */}
        <div className="pointer-events-none absolute -left-40 top-[30%] h-[500px] w-[500px] rounded-full bg-purple-700/10 blur-[150px]" />

        <div className="relative z-10 flex h-full flex-col">
          {/* YLÄOSA */}
          <div className="flex items-center justify-between border-b border-white/10 px-7 py-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-purple-400">
                KOPOSQUAD
              </p>

              <p className="mt-1 text-lg font-black text-white">
                Päävalikko
              </p>
            </div>

            <button
              type="button"
              onClick={closeMenu}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/[0.06] text-2xl text-gray-300 transition duration-300 hover:rotate-90 hover:border-purple-400 hover:bg-purple-500/15 hover:text-white"
              aria-label="Sulje valikko"
            >
              ×
            </button>
          </div>

          {/* PÄÄLINKIT */}
          <div className="flex-1 overflow-y-auto px-7 py-8">
            <div className="mb-7">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                Pääsivut
              </p>

              <div className="space-y-1">
                <a
                  href="/"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-black text-white transition hover:bg-purple-500/10 hover:pl-5 hover:text-purple-300"
                >
                  Etusivu
                </a>

                <a
                  href="/#live"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-black text-gray-300 transition hover:bg-purple-500/10 hover:pl-5 hover:text-purple-300"
                >
                  Live
                </a>

                <button
                  type="button"
                  onClick={() => setActiveMenu("tiimi")}
                  className={`${mainButtonClass} ${
                    activeMenu === "tiimi"
                      ? "bg-purple-500/10 text-purple-300"
                      : ""
                  }`}
                >
                  <span>Tiimi</span>
                  <span className="text-purple-400">›</span>
                </button>

                <a
                  href="/#clips"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-black text-gray-300 transition hover:bg-purple-500/10 hover:pl-5 hover:text-purple-300"
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
                  className={`${mainButtonClass} ${
                    activeMenu === "tyokalut"
                      ? "bg-purple-500/10 text-purple-300"
                      : ""
                  }`}
                >
                  <span>Työkalut</span>
                  <span className="text-purple-400">›</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMenu("palvelut")}
                  className={`${mainButtonClass} ${
                    activeMenu === "palvelut"
                      ? "bg-purple-500/10 text-purple-300"
                      : ""
                  }`}
                >
                  <span>Palvelut</span>
                  <span className="text-purple-400">›</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMenu("yhteiso")}
                  className={`${mainButtonClass} ${
                    activeMenu === "yhteiso"
                      ? "bg-purple-500/10 text-purple-300"
                      : ""
                  }`}
                >
                  <span>Yhteisö</span>
                  <span className="text-purple-400">›</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMenu("tietoa")}
                  className={`${mainButtonClass} ${
                    activeMenu === "tietoa"
                      ? "bg-purple-500/10 text-purple-300"
                      : ""
                  }`}
                >
                  <span>Tietoa</span>
                  <span className="text-purple-400">›</span>
                </button>
              </div>
            </div>
          </div>

          {/* ALATEKSTI */}
          <div className="border-t border-white/10 px-7 py-6">
            <p className="text-xs leading-6 text-gray-600">
              Suomen kasvava striimaaja- ja sisällöntuottajayhteisö.
            </p>
          </div>
        </div>
      </aside>

      {/* TOINEN VALIKKOPANEELI */}
      <aside
        className={`fixed top-0 z-[89] h-screen w-[88vw] max-w-[430px] overflow-hidden border-r border-purple-500/20 bg-[linear-gradient(145deg,rgba(17,8,24,0.995),rgba(5,3,8,0.995))] shadow-[30px_0_100px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out ${
          menuOpen && activeMenu
            ? "left-[min(410px,88vw)] translate-x-0 opacity-100"
            : "pointer-events-none left-[min(410px,88vw)] -translate-x-10 opacity-0"
        }`}
      >
        <img
          src="/images/ks-logo.png.png"
          alt=""
          className="pointer-events-none absolute -bottom-16 -right-16 w-[250px] rotate-[12deg] opacity-[0.025]"
        />

        <div className="relative z-10 flex h-full flex-col">
          {/* ALAVALIKON OTSIKKO */}
          <div className="flex items-center gap-4 border-b border-white/10 px-7 py-6">
            <button
              type="button"
              onClick={() => setActiveMenu(null)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/[0.06] text-xl text-purple-300 transition hover:border-purple-400 hover:bg-purple-500/15 hover:text-white"
            >
              ‹
            </button>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">
                KOPOSQUAD
              </p>

              <h2 className="mt-1 text-xl font-black uppercase">
                {activeMenu === "tiimi" && "Tiimi"}
                {activeMenu === "tyokalut" && "Työkalut"}
                {activeMenu === "palvelut" && "Palvelut"}
                {activeMenu === "yhteiso" && "Yhteisö"}
                {activeMenu === "tietoa" && "Tietoa"}
              </h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-7 py-8">
            {/* TIIMI */}
            {activeMenu === "tiimi" && (
              <div className="space-y-2">
                <a href="/#tiimi" onClick={closeMenu} className={subLinkClass}>
                  <span>Kaikki jäsenet</span>
                  <span className="text-purple-500">→</span>
                </a>

                <a
                  href="/#koposquadtv"
                  onClick={closeMenu}
                  className={subLinkClass}
                >
                  <span>KOPOSQUADTV</span>
                  <span className="text-purple-500">→</span>
                </a>

                <a href="/#rekry" onClick={closeMenu} className={subLinkClass}>
                  <span>Hae mukaan</span>
                  <span className="text-purple-500">→</span>
                </a>
              </div>
            )}

            {/* TYÖKALUT */}
            {activeMenu === "tyokalut" && (
              <div className="space-y-2">
                <a href="/tools" className={subLinkClass}>
                  <span>Kaikki työkalut</span>
                  <span className="text-purple-500">→</span>
                </a>

                <a href="/tools" className={subLinkClass}>
                  <span>Striimausohjelmat</span>
                  <span className="text-purple-500">→</span>
                </a>

                <a href="/tools" className={subLinkClass}>
                  <span>Mobiilistriimaus / IRL</span>
                  <span className="text-purple-500">→</span>
                </a>

                <a href="/tools" className={subLinkClass}>
                  <span>Botit</span>
                  <span className="text-purple-500">→</span>
                </a>

                <a href="/tools" className={subLinkClass}>
                  <span>Chat & widgetit</span>
                  <span className="text-purple-500">→</span>
                </a>

                <a href="/tools" className={subLinkClass}>
                  <span>Sisällöntuotanto</span>
                  <span className="text-purple-500">→</span>
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
                  <a key={item} href="/palvelut" className={subLinkClass}>
                    <span>{item}</span>
                    <span className="text-purple-500">→</span>
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
                  className={subLinkClass}
                >
                  <span>Discord</span>
                  <span className="text-purple-500">↗</span>
                </a>

                <a
                  href="https://www.twitch.tv/koposquadtv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={subLinkClass}
                >
                  <span>KOPOSQUADTV</span>
                  <span className="text-purple-500">↗</span>
                </a>

                <a
                  href="https://koposquad-shop.fourthwall.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={subLinkClass}
                >
                  <span>KOPOSQUAD Merch</span>
                  <span className="text-purple-500">↗</span>
                </a>
              </div>
            )}

            {/* TIETOA */}
            {activeMenu === "tietoa" && (
              <div className="space-y-2">
                <a href="/tietoa" className={subLinkClass}>
                  <span>Mikä on KOPOSQUAD?</span>
                  <span className="text-purple-500">→</span>
                </a>

                <a href="/#uutiset" onClick={closeMenu} className={subLinkClass}>
                  <span>Uutiset</span>
                  <span className="text-purple-500">→</span>
                </a>

                <a href="/#liity" onClick={closeMenu} className={subLinkClass}>
                  <span>Liity mukaan</span>
                  <span className="text-purple-500">→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}