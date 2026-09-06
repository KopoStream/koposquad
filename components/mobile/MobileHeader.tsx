"use client";

import { useEffect, useState } from "react";

type MobileMenuSection =
  | "tiimi"
  | "tyokalut"
  | "palvelut"
  | "yhteiso"
  | "tietoa"
  | null;

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MobileMenuSection>(null);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveMenu(null);
  };

  return (
    <>
      {/* MOBIILIN YLÄPALKKI */}
      <nav className="fixed left-0 right-0 top-0 z-[70] border-b border-purple-500/20 bg-black/90 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(true);
                setActiveMenu(null);
              }}
              aria-label="Avaa valikko"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[4px] rounded-xl border border-purple-500/30 bg-purple-500/[0.07]"
            >
              <span className="h-[2px] w-5 rounded-full bg-white" />
              <span className="h-[2px] w-5 rounded-full bg-white" />
              <span className="h-[2px] w-5 rounded-full bg-white" />
            </button>

            <a href="/" className="text-xl font-black tracking-tight">
              <span className="text-purple-500">KOPO</span>
              <span className="text-white">SQUAD</span>
            </a>
          </div>

          <a
            href="https://discord.gg/ZXgSS9v6ye"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-purple-500/30 bg-purple-500/[0.07] px-4 py-2 text-xs font-black text-purple-300"
          >
            Discord
          </a>
        </div>
      </nav>

      {/* TUMMENNUS */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[80] bg-black/65 backdrop-blur-sm transition-all duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* MOBIILIVALIKKO */}
      <aside
        className={`fixed left-0 top-0 z-[90] h-screen w-full overflow-hidden border-r border-purple-500/25 bg-[linear-gradient(145deg,rgba(8,5,12,0.995),rgba(18,7,26,0.995))] transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <img
          src="/images/ks-logo.png.png"
          alt=""
          className="pointer-events-none absolute -bottom-20 -right-20 w-[280px] rotate-[-12deg] opacity-[0.035]"
        />

        <div className="relative z-10 flex h-full flex-col">
          {/* YLÄOSA */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">
                KOPOSQUAD
              </p>

              <h2 className="mt-1 text-xl font-black text-white">
                {activeMenu === null && "Päävalikko"}
                {activeMenu === "tiimi" && "Tiimi"}
                {activeMenu === "tyokalut" && "Työkalut"}
                {activeMenu === "palvelut" && "Palvelut"}
                {activeMenu === "yhteiso" && "Yhteisö"}
                {activeMenu === "tietoa" && "Tietoa"}
              </h2>
            </div>

            <button
              type="button"
              onClick={closeMenu}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/[0.06] text-2xl text-gray-300"
            >
              ×
            </button>
          </div>

          {/* SISÄLTÖ */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {activeMenu === null && (
              <div className="space-y-2">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                  Pääsivut
                </p>

                <a
                  href="/"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3.5 text-lg font-black text-white"
                >
                  Etusivu
                </a>

                <a
                  href="/#live"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3.5 text-lg font-black text-gray-300"
                >
                  Live
                </a>

                <button
                  type="button"
                  onClick={() => setActiveMenu("tiimi")}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-black text-gray-300"
                >
                  <span>Tiimi</span>
                  <span className="text-purple-400">›</span>
                </button>

                <a
                  href="/#clips"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3.5 text-lg font-black text-gray-300"
                >
                  Clips
                </a>

                <p className="mb-3 mt-7 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                  KOPOSQUAD
                </p>

                <button
                  type="button"
                  onClick={() => setActiveMenu("tyokalut")}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-black text-gray-300"
                >
                  <span>Työkalut</span>
                  <span className="text-purple-400">›</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMenu("palvelut")}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-black text-gray-300"
                >
                  <span>Palvelut</span>
                  <span className="text-purple-400">›</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMenu("yhteiso")}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-black text-gray-300"
                >
                  <span>Yhteisö</span>
                  <span className="text-purple-400">›</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMenu("tietoa")}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-black text-gray-300"
                >
                  <span>Tietoa</span>
                  <span className="text-purple-400">›</span>
                </button>
              </div>
            )}

            {/* TIIMI */}
            {activeMenu === "tiimi" && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveMenu(null)}
                  className="mb-5 flex items-center gap-3 rounded-xl px-4 py-3 font-black text-purple-300"
                >
                  <span>‹</span>
                  <span>Takaisin</span>
                </button>

                <a
                  href="/#tiimi"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3.5 font-bold text-gray-300"
                >
                  Kaikki jäsenet
                </a>

                <a
                  href="/#koposquadtv"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3.5 font-bold text-gray-300"
                >
                  KOPOSQUADTV
                </a>

                <a
                  href="/#rekry"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3.5 font-bold text-gray-300"
                >
                  Hae mukaan
                </a>
              </div>
            )}

            {/* TYÖKALUT */}
            {activeMenu === "tyokalut" && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveMenu(null)}
                  className="mb-5 flex items-center gap-3 rounded-xl px-4 py-3 font-black text-purple-300"
                >
                  <span>‹</span>
                  <span>Takaisin</span>
                </button>

                {[
                  "Kaikki työkalut",
                  "Striimausohjelmat",
                  "Mobiilistriimaus / IRL",
                  "Botit",
                  "Chat & widgetit",
                  "Sisällöntuotanto",
                ].map((item) => (
                  <a
                    key={item}
                    href="/tools"
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-3.5 font-bold text-gray-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}

            {/* PALVELUT */}
            {activeMenu === "palvelut" && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveMenu(null)}
                  className="mb-5 flex items-center gap-3 rounded-xl px-4 py-3 font-black text-purple-300"
                >
                  <span>‹</span>
                  <span>Takaisin</span>
                </button>

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
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-3.5 font-bold text-gray-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}

            {/* YHTEISÖ */}
            {activeMenu === "yhteiso" && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveMenu(null)}
                  className="mb-5 flex items-center gap-3 rounded-xl px-4 py-3 font-black text-purple-300"
                >
                  <span>‹</span>
                  <span>Takaisin</span>
                </button>

                <a
                  href="https://discord.gg/ZXgSS9v6ye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl px-4 py-3.5 font-bold text-gray-300"
                >
                  Discord
                </a>

                <a
                  href="https://www.twitch.tv/koposquadtv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl px-4 py-3.5 font-bold text-gray-300"
                >
                  KOPOSQUADTV
                </a>

                <a
                  href="https://koposquad-shop.fourthwall.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl px-4 py-3.5 font-bold text-gray-300"
                >
                  KOPOSQUAD Merch
                </a>
              </div>
            )}

            {/* TIETOA */}
            {activeMenu === "tietoa" && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveMenu(null)}
                  className="mb-5 flex items-center gap-3 rounded-xl px-4 py-3 font-black text-purple-300"
                >
                  <span>‹</span>
                  <span>Takaisin</span>
                </button>

                <a
                  href="/tietoa"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3.5 font-bold text-gray-300"
                >
                  Mikä on KOPOSQUAD?
                </a>

                <a
                  href="/#uutiset"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3.5 font-bold text-gray-300"
                >
                  Uutiset
                </a>

                <a
                  href="/#rekry"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3.5 font-bold text-gray-300"
                >
                  Liity mukaan
                </a>
              </div>
            )}
          </div>

          {/* ALAREUNA */}
          <div className="border-t border-white/10 px-6 py-5">
            <p className="text-xs leading-6 text-gray-600">
              Suomen kasvava striimaaja- ja sisällöntuottajayhteisö.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}