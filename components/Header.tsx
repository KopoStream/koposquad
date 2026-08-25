"use client";

type HeaderProps = {
  activePage?: string;
};

export default function Header({ activePage = "" }: HeaderProps) {
  const linkClass = (page: string) =>
    activePage === page
      ? "font-black text-purple-400 transition hover:text-purple-300"
      : "text-gray-300 transition hover:text-purple-300";

  return (
    <nav className="sticky top-0 z-50 border-b border-purple-500/20 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="text-3xl font-black tracking-tight">
          <span className="text-purple-500">KOPO</span>
          <span className="text-white">SQUAD</span>
        </a>

        <div className="hidden items-center gap-6 text-sm font-semibold md:flex">
          <a href="/" className={linkClass("etusivu")}>
            Etusivu
          </a>

          <a href="/#live" className={linkClass("live")}>
            Live
          </a>

          <a href="/#tiimi" className={linkClass("tiimi")}>
            Tiimi
          </a>

          <a href="/#clips" className={linkClass("clips")}>
            Clips
          </a>

          <a href="/tools" className={linkClass("tyokalut")}>
            Työkalut
          </a>

          <a href="/tietoa" className={linkClass("tietoa")}>
            Tietoa
          </a>

          <a href="/#uutiset" className={linkClass("uutiset")}>
            Uutiset
          </a>

          <a href="/#liity" className={linkClass("liity")}>
            Liity
          </a>

          <a href="/palvelut" className={linkClass("palvelut")}>
            Palvelut
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
  );
}