"use client";

import Link from "next/link";

export default function OBSStudioGuide() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050008] text-white">

{/* TAUSTA */}
<div className="fixed inset-0 -z-10 overflow-hidden bg-[#050008]">
  <div className="absolute left-[-250px] top-[50px] h-[800px] w-[800px] rounded-full bg-purple-700/35 blur-[220px]" />

  <div className="absolute right-[-300px] top-[800px] h-[850px] w-[850px] rounded-full bg-blue-900/28 blur-[240px]" />

  <div className="absolute left-[-300px] top-[1800px] h-[900px] w-[900px] rounded-full bg-fuchsia-800/22 blur-[240px]" />

  <div className="absolute right-[-300px] top-[3000px] h-[900px] w-[900px] rounded-full bg-purple-700/24 blur-[240px]" />

  <div className="absolute bottom-[-200px] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-blue-900/22 blur-[250px]" />
</div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-purple-500/20 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="text-2xl font-black">
            <span className="text-purple-500">KOPO</span>
            <span className="text-white">SQUAD</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="rounded-xl border border-purple-500/40 px-5 py-2 text-sm font-bold transition hover:bg-purple-500/10"
            >
              ← Työkalut
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-zinc-700 px-5 py-2 text-sm font-bold transition hover:border-purple-500"
            >
              Etusivu
            </Link>
          </div>

        </div>
      </nav>

      {/* HIMMEÄT KS-LOGOT – näkyvät taustojen päällä, sisällön alla */}
      <img
        src="/images/ks-logo.png.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-[360px] z-[2] hidden w-[330px] -rotate-12 object-contain opacity-[0.055] lg:block"
      />

      <img
        src="/images/ks-logo.png.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-[1250px] z-[2] hidden w-[390px] rotate-12 object-contain opacity-[0.05] lg:block"
      />

      <img
        src="/images/ks-logo.png.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-[2300px] z-[2] hidden w-[380px] rotate-[8deg] object-contain opacity-[0.045] lg:block"
      />

      <img
        src="/images/ks-logo.png.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-[3250px] z-[2] hidden w-[370px] -rotate-[8deg] object-contain opacity-[0.05] lg:block"
      />

      {/* HERO */}
<section className="relative z-0 overflow-hidden border-b border-purple-500/20 bg-[radial-gradient(circle_at_70%_35%,rgba(126,34,206,0.26),transparent_35%),linear-gradient(135deg,#050008_0%,#12001f_55%,#050008_100%)] px-6 py-24">

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[180px]" />

        <div className="relative z-10 mx-auto max-w-5xl">

          <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="absolute inset-0 rounded-[36px] bg-purple-600/25 blur-[80px]" />
            <div className="relative flex h-72 w-72 items-center justify-center rounded-[36px] border border-purple-500/25 bg-gradient-to-br from-purple-950/55 via-black/70 to-blue-950/35 shadow-[0_0_80px_rgba(126,34,206,0.28)] backdrop-blur-xl">
              <img
                src="https://cdn.simpleicons.org/obsstudio/ffffff"
                alt="OBS Studio"
                className="h-36 w-36 object-contain drop-shadow-[0_0_32px_rgba(168,85,247,0.45)]"
              />
            </div>
          </div>

          <p className="mb-4 text-sm font-black tracking-[0.35em] text-purple-400">
            KOPOSQUAD CREATOR HUB
          </p>

          <div className="mb-6 flex items-center gap-5">

<div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-500/40 bg-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.18)]">
  <img
    src="https://cdn.simpleicons.org/obsstudio/ffffff"
    alt="OBS Studio"
    className="h-11 w-11 object-contain"
  />
</div>

            <div>
              <p className="mb-2 text-sm font-bold text-green-400">
                ILMAINEN
              </p>

              <h1 className="text-5xl font-black md:text-7xl">
                OBS <span className="text-purple-500">STUDIO</span>
              </h1>
            </div>

          </div>

          <p className="max-w-2xl text-lg leading-8 text-gray-400">
            Tässä oppaassa käydään läpi OBS Studion käyttöönotto
            ensimmäisestä käynnistyksestä aina valmiiseen
            Twitch- tai YouTube-lähetykseen asti.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="https://obsproject.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-purple-600 px-7 py-4 font-black transition hover:bg-purple-500"
            >
              Lataa OBS Studio ↗
            </a>

            <a
              href="#opas"
              className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-7 py-4 font-black transition hover:bg-purple-500/20"
            >
              Aloita opas ↓
            </a>

          </div>

        </div>
      </section>

      {/* OPAS */}
      <section id="opas" className="relative z-0 overflow-hidden border-y border-purple-500/10 bg-[linear-gradient(180deg,#050008_0%,#0b0012_45%,#050008_100%)] px-6 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-48 top-24 h-[720px] w-[720px] rounded-full bg-purple-700/20 blur-[190px]" />
          <div className="absolute -right-52 top-[850px] h-[760px] w-[760px] rounded-full bg-fuchsia-800/15 blur-[210px]" />
          <div className="absolute left-1/2 top-[1750px] h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-blue-900/14 blur-[220px]" />
          <div className="absolute -left-48 bottom-24 h-[720px] w-[720px] rounded-full bg-purple-800/18 blur-[200px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">

          <div className="mb-14">
            <p className="mb-3 text-sm font-black tracking-[0.3em] text-purple-400">
              ALOITTELIJAN OPAS
            </p>

            <h2 className="text-4xl font-black md:text-5xl">
              OBS STUDION KÄYTTÖÖNOTTO
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">
              Jos OBS Studio ei ole sinulle ennestään tuttu, ei haittaa.
              Käydään tärkeimmät asiat läpi vaihe vaiheelta.
            </p>
          </div>

          <div className="space-y-6">

            {/* 01 */}
            <GuideCard
              number="01"
              title="LATAA JA ASENNA OBS STUDIO"
            >
              Mene OBS Studion viralliselle verkkosivulle ja lataa
              käyttöjärjestelmällesi sopiva versio. OBS Studio on saatavilla
              Windowsille, macOS:lle ja Linuxille.
            </GuideCard>

            {/* 02 */}
            <GuideCard
              number="02"
              title="AUTOMAATTINEN MÄÄRITYS"
            >
              Ensimmäisellä käynnistyskerralla OBS voi avata automaattisen
              määritystoiminnon. Valitse vaihtoehto, jossa OBS optimoidaan
              ensisijaisesti striimaamista varten. Ohjelma auttaa valitsemaan
              alustavat video- ja lähetysasetukset tietokoneesi ja
              verkkoyhteytesi perusteella.
            </GuideCard>

            {/* 03 */}
            <GuideCard
              number="03"
              title="YHDISTÄ STRIIMAUSPALVELU"
            >
              Avaa OBS:n asetukset ja siirry Lähetys-kohtaan. Valitse
              käyttämäsi palvelu, esimerkiksi Twitch tai YouTube. Yhdistä
              tilisi palvelun tarjoamalla kirjautumistavalla tai käytä
              palvelusi tarjoamaa lähetysavainta.
            </GuideCard>

            {/* 04 */}
            <GuideCard
              number="04"
              title="LUO ENSIMMÄINEN SKENE"
            >
              Skene määrittää sen, mitä katsojat näkevät lähetyksessäsi.
              Voit tehdä esimerkiksi peliskeneen, Just Chatting -näkymän,
              aloitusruudun ja taukoruudun. Luo uusi skene OBS:n
              Skene-osiosta.
            </GuideCard>

            {/* 05 */}
            <GuideCard
              number="05"
              title="LISÄÄ LÄHTEET"
            >
              Lisää skeneen tarvitsemasi lähteet. Pelin kaappaamiseen voit
              käyttää Game Capture -lähdettä, näytön näyttämiseen Display
              Capturea ja kameralle Video Capture Device -lähdettä.
              Tarvittaessa voit lisätä myös kuvia, tekstiä ja
              selainlähteitä.
            </GuideCard>

            {/* 06 */}
            <GuideCard
              number="06"
              title="TARKISTA MIKROFONI JA ÄÄNET"
            >
              Tarkista OBS:n Audio Mixeristä, että mikrofonisi ja
              tietokoneen äänet näkyvät oikein. Puhu normaalilla
              äänenvoimakkuudella ja varmista, ettei ääni jatkuvasti osu
              mittarin punaiseen alueeseen.
            </GuideCard>

            {/* 07 */}
            <GuideCard
              number="07"
              title="VIDEOASETUKSET"
            >
              Avaa Asetukset → Video. Valitse pohjaresoluutioksi näyttösi
              tai käyttämäsi canvas-resoluutio. Lähetyksen resoluutio ja FPS
              kannattaa valita tietokoneen suorituskyvyn, internet-yhteyden
              ja käyttämäsi striimauspalvelun mukaan.
            </GuideCard>

            {/* 08 */}
            <GuideCard
              number="08"
              title="TEE TESTILÄHETYS"
            >
              Ennen ensimmäistä varsinaista striimiä tarkista kuva,
              mikrofoni, peliäänet, kamera ja mahdolliset overlayt.
              Lyhyt testilähetys tai tallennus auttaa huomaamaan
              mahdolliset ongelmat ennen kuin aloitat oikean lähetyksen.
            </GuideCard>

            {/* 09 */}
            <GuideCard
              number="09"
              title="ALOITA STRIIMAAMINEN"
            >
              Kun kaikki näyttää ja kuulostaa oikealta, olet valmis.
              Tarkista vielä striimauspalvelusta lähetyksen otsikko,
              kategoria ja muut tarvittavat tiedot ja käynnistä lähetys
              OBS:n Aloita lähetys -painikkeesta.
            </GuideCard>

          </div>

          {/* VALMIS */}
          <div className="mt-12 rounded-3xl border border-purple-400/40 bg-gradient-to-br from-purple-900/55 via-fuchsia-950/25 to-blue-950/35 p-10 text-center shadow-[0_0_90px_rgba(126,34,206,0.22)]">

            <p className="mb-3 text-sm font-black tracking-[0.3em] text-purple-400">
              VALMISTA
            </p>

            <h2 className="text-3xl font-black">
              OBS STUDIO ON VALMIS STRIIMAAMISEEN
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
              Kun perusasetukset ovat kunnossa, voit seuraavaksi rakentaa
              omat skenet, overlayt, alertit ja muut kanavasi elementit.
            </p>

            <Link
              href="/tools"
              className="mt-7 inline-block rounded-xl bg-purple-600 px-7 py-4 font-black transition hover:bg-purple-500"
            >
              ← Takaisin työkaluihin
            </Link>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-purple-500/20 bg-black/35 px-6 py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-gray-500">
          <div className="font-black">
            <span className="text-purple-500">KOPO</span>
            <span className="text-white">SQUAD</span>
          </div>

          <span>© 2026 KOPOSQUAD</span>
        </div>
      </footer>

    </main>
  );
}

function GuideCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-br from-purple-950/40 via-[#0a0710] to-blue-950/18 p-8 shadow-[0_18px_55px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:shadow-[0_24px_70px_rgba(126,34,206,0.16)]">

      <div className="flex gap-6">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/40 bg-purple-500/10 font-black text-purple-400">
          {number}
        </div>

        <div>
          <h3 className="mb-3 text-xl font-black">
            {title}
          </h3>

          <div className="max-w-3xl leading-7 text-gray-400">
            {children}
          </div>
        </div>

      </div>

    </div>
  );
}