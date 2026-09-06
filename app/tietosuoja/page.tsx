import Header from "../../components/Header";

export default function TietosuojaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Header />

      {/* TAUSTA */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-[900px] w-[1200px] -translate-x-1/2 rounded-full bg-purple-700/15 blur-[280px]" />
        <div className="absolute -left-72 top-[38%] h-[760px] w-[760px] rounded-full bg-fuchsia-700/10 blur-[250px]" />
        <div className="absolute -right-72 bottom-0 h-[820px] w-[820px] rounded-full bg-violet-700/10 blur-[260px]" />

        <img
          src="/images/ks-logo.png.png"
          alt=""
          className="absolute -right-28 top-[18%] hidden w-[520px] rotate-[-12deg] opacity-[0.025] lg:block"
        />

        <img
          src="/images/ks-logo.png.png"
          alt=""
          className="absolute -left-24 bottom-[8%] hidden w-[360px] rotate-[12deg] opacity-[0.018] lg:block"
        />
      </div>

      {/* HERO */}
      <section className="relative z-10 border-b border-purple-500/15 px-6 pb-24 pt-52">
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-purple-400/25 bg-purple-500/10 px-5 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.9)]" />

            <span className="text-[11px] font-black uppercase tracking-[0.35em] text-purple-300">
              KOPOSQUAD • TIETOSUOJASELOSTE
            </span>
          </div>

          <h1 className="mt-7 text-5xl font-black uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            TIETOSUOJA
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
              SELOSTE
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">
            Tässä tietosuojaselosteessa kerrotaan, millaisia henkilötietoja
            KOPOSQUAD voi käsitellä, mihin niitä käytetään ja millaisia
            oikeuksia sinulla on.
          </p>

          <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-gray-500">
            KOPOSQUAD pyrkii käsittelemään henkilötietoja vain siinä
            laajuudessa kuin sivuston, yhteydenottojen, hakemusten ja
            palveluiden toteuttaminen sitä edellyttää.
          </p>

          <div className="mt-8 inline-flex rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-gray-500">
            Päivitetty 6.9.2026
          </div>
        </div>
      </section>

      {/* SISÄLTÖ */}
      <section className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-6">

          {/* 01 */}
          <div className="rounded-[30px] border border-purple-500/20 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-purple-950/10 p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              01 • Rekisterinpitäjä
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Kuka vastaa henkilötietojen käsittelystä?
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                KOPOSQUADin verkkosivustoon ja sen kautta tapahtuvaan
                henkilötietojen käsittelyyn liittyvissä asioissa
                yhteyshenkilönä toimii:
              </p>

              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.04] p-6">
                <p className="font-black text-white">
                  Veli-Pekka Koponen
                </p>

                <p className="mt-2 text-gray-400">
                  KOPOSQUAD
                </p>

                <a
                  href="mailto:koposquadtv@gmail.com"
                  className="mt-2 inline-block font-bold text-purple-400 transition hover:text-purple-300"
                >
                  koposquadtv@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* 02 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              02 • Käsiteltävät tiedot
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Mitä tietoja voidaan kerätä?
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                KOPOSQUAD voi käsitellä tietoja, jotka käyttäjä itse
                toimittaa esimerkiksi yhteydenoton, jäsenhakemuksen tai
                palvelupyynnön yhteydessä.
              </p>

              <p>
                Tällaisia tietoja voivat olla esimerkiksi nimi,
                käyttäjänimi, Twitch- tai YouTube-kanavan osoite,
                Discord-tunnus, sähköpostiosoite sekä käyttäjän itse
                kirjoittaman viestin sisältö.
              </p>

              <p>
                Palvelutilauksen yhteydessä voidaan käsitellä lisäksi
                tilauksen toteuttamisen kannalta tarpeellisia tietoja,
                kuten asiakkaan toimittamia tekstejä, kuvia, logoja,
                videoita tai muita materiaaleja.
              </p>
            </div>
          </div>

          {/* 03 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              03 • Tietojen käyttötarkoitus
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Mihin henkilötietoja käytetään?
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Henkilötietoja voidaan käyttää yhteydenottoihin
                vastaamiseen, KOPOSQUAD-jäsenhakemusten käsittelyyn,
                palvelupyyntöjen ja tilausten toteuttamiseen sekä
                yhteisön toimintaan liittyvään viestintään.
              </p>

              <p>
                Tietoja voidaan käyttää myös väärinkäytösten ehkäisemiseen,
                sivuston turvallisuuden ylläpitämiseen sekä mahdollisten
                teknisten ongelmien selvittämiseen.
              </p>

              <p>
                Henkilötietoja ei käytetä tarkoituksiin, jotka ovat
                ristiriidassa alkuperäisen käyttötarkoituksen kanssa ilman
                asianmukaista perustetta.
              </p>
            </div>
          </div>

          {/* 04 */}
          <div className="rounded-[30px] border border-purple-500/20 bg-purple-500/[0.035] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              04 • Käsittelyn peruste
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Miksi tietoja voidaan käsitellä?
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Henkilötietojen käsittely voi perustua esimerkiksi
                käyttäjän omaan yhteydenottoon, käyttäjän pyyntöön,
                sopimuksen valmisteluun tai toteuttamiseen, suostumukseen
                tai KOPOSQUADin oikeutettuun etuun silloin, kun
                lainsäädäntö sen sallii.
              </p>

              <p>
                Käsittelyn peruste riippuu siitä, missä yhteydessä tiedot
                on toimitettu ja mihin niitä tarvitaan.
              </p>
            </div>
          </div>

          {/* 05 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              05 • Tietojen lähteet
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Mistä tiedot saadaan?
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Suurin osa henkilötiedoista saadaan suoraan käyttäjältä
                itseltään tämän täyttäessä lomakkeen, lähettäessä
                sähköpostia tai ottaessa muuten yhteyttä KOPOSQUADiin.
              </p>

              <p>
                Sivustolla voidaan näyttää myös julkisesti saatavilla olevia
                tietoja esimerkiksi Twitch-palvelusta, kuten
                striimaajan käyttäjänimi, profiilikuva, lähetyksen tila,
                lähetyksen otsikko tai katsojamäärä.
              </p>
            </div>
          </div>

          {/* 06 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              06 • Tietojen säilyttäminen
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Kuinka kauan tietoja säilytetään?
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Henkilötietoja pyritään säilyttämään vain niin kauan kuin
                niiden käyttötarkoitus edellyttää tai kuin niiden
                säilyttäminen on tarpeellista lakisääteisten velvoitteiden
                täyttämiseksi.
              </p>

              <p>
                Esimerkiksi hakemukseen tai yhteydenottoon liittyviä tietoja
                voidaan säilyttää niin kauan kuin asian käsittely sitä
                edellyttää.
              </p>

              <p>
                Tarpeettomiksi muuttuneet henkilötiedot voidaan poistaa tai
                anonymisoida.
              </p>
            </div>
          </div>

          {/* 07 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              07 • Tietojen luovuttaminen
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Luovutetaanko tietoja eteenpäin?
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Henkilötietoja ei lähtökohtaisesti myydä kolmansille
                osapuolille.
              </p>

              <p>
                Tietoja voidaan kuitenkin käsitellä sellaisten
                palveluntarjoajien kautta, joita tarvitaan esimerkiksi
                verkkosivuston ylläpitämiseen, viestintään tai palveluiden
                toteuttamiseen.
              </p>

              <p>
                Tietoja voidaan lisäksi luovuttaa, jos siihen on
                lakisääteinen velvollisuus tai viranomaisen lainmukainen
                pyyntö.
              </p>
            </div>
          </div>

          {/* 08 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              08 • Ulkopuoliset palvelut
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Twitch, Discord, YouTube ja muut palvelut
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                KOPOSQUAD-sivusto sisältää linkkejä ja integraatioita
                ulkopuolisiin palveluihin, kuten Twitchiin, Discordiin,
                YouTubeen, Instagramiin ja KOPOSQUADin verkkokauppaan.
              </p>

              <p>
                Kun käyttäjä siirtyy ulkopuoliseen palveluun, kyseisen
                palvelun oma tietosuojakäytäntö ja käyttöehdot voivat tulla
                sovellettaviksi.
              </p>

              <p>
                KOPOSQUAD ei hallitse kolmansien osapuolten palveluiden
                tietojenkäsittelyä.
              </p>
            </div>
          </div>

          {/* 09 */}
          <div className="rounded-[30px] border border-purple-500/20 bg-purple-500/[0.035] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              09 • Tietoturva
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Miten tietoja suojataan?
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Henkilötietoja pyritään suojaamaan asianmukaisin teknisin
                ja organisatorisin keinoin luvattomalta käytöltä,
                muuttamiselta, häviämiseltä ja luovuttamiselta.
              </p>

              <p>
                Henkilötietoihin pyritään rajaamaan pääsy vain sellaisille
                henkilöille ja palveluille, joille tietojen käsittely on
                tarpeellista.
              </p>
            </div>
          </div>

          {/* 10 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              10 • Käyttäjän oikeudet
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Mitä oikeuksia sinulla on?
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Sovellettavan tietosuojalainsäädännön mukaisesti
                rekisteröidyllä voi olla oikeus saada tietoa omien
                henkilötietojensa käsittelystä sekä pyytää pääsyä itseään
                koskeviin tietoihin.
              </p>

              <p>
                Rekisteröidyllä voi olla oikeus pyytää virheellisten
                tietojen oikaisemista, tietojen poistamista, käsittelyn
                rajoittamista tai vastustaa tietojen käsittelyä
                sovellettavan lainsäädännön mukaisesti.
              </p>

              <p>
                Jos käsittely perustuu suostumukseen, suostumuksen voi
                lähtökohtaisesti peruuttaa milloin tahansa. Peruuttaminen
                ei vaikuta ennen peruuttamista suoritetun käsittelyn
                lainmukaisuuteen.
              </p>
            </div>
          </div>

          {/* 11 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              11 • Valitusoikeus
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Tietosuojaan liittyvät erimielisyydet
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Jos käyttäjä katsoo, että hänen henkilötietojaan on
                käsitelty tietosuojalainsäädännön vastaisesti, hänellä voi
                olla oikeus tehdä valitus toimivaltaiselle
                tietosuojaviranomaiselle.
              </p>

              <p>
                Toivomme kuitenkin, että mahdollisissa epäselvissä
                tilanteissa otat ensin yhteyttä KOPOSQUADiin, jotta asia
                voidaan selvittää.
              </p>
            </div>
          </div>

          {/* 12 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              12 • Selosteen muutokset
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Tietosuojaselosteen päivittäminen
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Tätä tietosuojaselostetta voidaan päivittää, jos
                KOPOSQUADin toiminta, sivuston ominaisuudet, käytettävät
                palvelut tai lainsäädännön vaatimukset muuttuvat.
              </p>

              <p>
                Sivun yläosassa näkyvä päivämäärä kertoo, milloin
                tietosuojaselostetta on viimeksi päivitetty.
              </p>
            </div>
          </div>

          {/* 13 */}
          <div className="relative overflow-hidden rounded-[30px] border border-purple-500/30 bg-gradient-to-br from-purple-950/25 via-zinc-950 to-zinc-950 p-8 backdrop-blur-xl sm:p-10">
            <img
              src="/images/ks-logo.png.png"
              alt=""
              className="pointer-events-none absolute -right-10 top-1/2 hidden w-[250px] -translate-y-1/2 rotate-[-10deg] opacity-[0.035] md:block"
            />

            <div className="relative z-10 max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
                13 • Yhteydenotot
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Tietosuojaan liittyvä kysymys?
              </h2>

              <p className="mt-6 leading-8 text-gray-400">
                Jos haluat kysyä henkilötietojesi käsittelystä tai käyttää
                tietosuojaan liittyviä oikeuksiasi, voit ottaa yhteyttä
                sähköpostitse.
              </p>

              <a
                href="mailto:koposquadtv@gmail.com"
                className="mt-7 inline-flex rounded-2xl border border-purple-400/40 bg-purple-500/10 px-6 py-4 font-black text-purple-300 transition hover:border-purple-300 hover:bg-purple-500/20 hover:text-white"
              >
                koposquadtv@gmail.com
              </a>

              <p className="mt-6 text-sm leading-7 text-gray-500">
                KOPOSQUAD • Veli-Pekka Koponen • Finland
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-black px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-black text-white">KOPOSQUAD</p>

            <p className="mt-1 text-sm text-gray-600">
              © 2026 KOPOSQUAD
            </p>
          </div>

          <a
            href="/"
            className="text-sm font-black text-purple-400 transition hover:text-purple-300"
          >
            ← Takaisin etusivulle
          </a>
        </div>
      </footer>
    </main>
  );
}