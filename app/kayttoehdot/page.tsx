import Header from "../../components/Header";

export default function KayttoehdotPage() {
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
              KOPOSQUAD • KÄYTTÖEHDOT
            </span>
          </div>

          <h1 className="mt-7 text-5xl font-black uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            KÄYTTÖ
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
              EHDOT
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">
            Näissä käyttöehdoissa kerrotaan KOPOSQUAD-sivuston,
            palveluiden ja tilausten käyttöön liittyvistä yleisistä
            ehdoista.
          </p>

          <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-gray-500">
            Tutustuthan ehtoihin ennen KOPOSQUADin maksullisen palvelun
            tilaamista. Palvelun tilaamalla asiakas vahvistaa tutustuneensa
            tilaukseen sovellettaviin ehtoihin.
          </p>

          <div className="mt-8 inline-flex rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-gray-500">
            Päivitetty 6.9.2026
          </div>
        </div>
      </section>

      {/* EHDOT */}
      <section className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-6">

          {/* 01 */}
          <div className="rounded-[30px] border border-purple-500/20 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-purple-950/10 p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              01 • Yleistä
            </p>

            <h2 className="mt-4 text-3xl font-black">
              KOPOSQUAD ja näiden ehtojen soveltaminen
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Näitä käyttöehtoja sovelletaan KOPOSQUAD-verkkosivuston
                käyttöön sekä soveltuvin osin KOPOSQUADin kautta
                tarjottaviin palveluihin ja asiakastilauksiin.
              </p>

              <p>
                KOPOSQUAD tarjoaa yhteisöön ja sisällöntuotantoon liittyvää
                sisältöä sekä erilaisia luovia palveluita. Palveluvalikoima,
                hinnat ja saatavuus voivat muuttua ajan myötä.
              </p>

              <p>
                Yksittäiseen tilaukseen voidaan lisäksi sopia erikseen
                tarkemmista ehdoista, aikataulusta, hinnasta ja työn
                sisällöstä. Erikseen sovitut tilauskohtaiset ehdot
                täydentävät näitä yleisiä ehtoja.
              </p>
            </div>
          </div>

          {/* 02 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              02 • Palvelut
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Luovat ja räätälöidyt palvelut
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                KOPOSQUAD voi tarjota esimerkiksi striimioverlayhin,
                grafiikkaan, emoteihin, videoeditointiin,
                sisällöntuotantoon ja muihin digitaalisiin toteutuksiin
                liittyviä palveluita.
              </p>

              <p>
                Suuri osa töistä toteutetaan asiakkaan toiveiden perusteella
                yksilöllisesti. Työn tarkka sisältö, laajuus ja mahdolliset
                lisäpalvelut sovitaan ennen työn aloittamista.
              </p>

              <p>
                KOPOSQUAD voi kieltäytyä toimeksiannosta esimerkiksi silloin,
                jos työn toteuttamiseen ei ole riittäviä lähtötietoja,
                aikataulu ei ole realistinen tai pyydetty sisältö ei sovellu
                toteutettavaksi.
              </p>
            </div>
          </div>

          {/* 03 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              03 • Tilaaminen
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Tilauksen tekeminen
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Asiakkaan tulee antaa tilausta varten riittävät ja
                mahdollisimman oikeat tiedot. Näihin voivat kuulua
                esimerkiksi työn käyttötarkoitus, toivottu tyyli,
                tarvittavat tekstit, kuvat, logot, värit, tiedostomuodot ja
                toivottu aikataulu.
              </p>

              <p>
                Tilaus katsotaan hyväksytyksi, kun työn sisällöstä,
                hinnasta ja toteutuksesta on sovittu asiakkaan kanssa.
                Pelkkä yhteydenotto tai tarjouspyyntö ei vielä velvoita
                asiakasta tilaamaan eikä KOPOSQUADia toteuttamaan työtä.
              </p>
            </div>
          </div>

          {/* 04 */}
          <div className="rounded-[30px] border border-purple-500/20 bg-purple-500/[0.035] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              04 • Hinta ja maksaminen
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Hinnat sovitaan ennen työn aloittamista
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Palvelun hinta määräytyy työn laajuuden, vaativuuden ja
                sovittujen ominaisuuksien perusteella. Asiakkaalle
                ilmoitetaan hinta tai hinnan määräytymisperuste ennen työn
                aloittamista.
              </p>

              <p>
                Jos asiakas pyytää työn aikana alkuperäisen toimeksiannon
                ulkopuolisia merkittäviä lisäyksiä tai muutoksia, niistä
                voidaan sopia erillinen lisähinta ennen lisätyön tekemistä.
              </p>

              <p>
                Maksutapa ja maksun ajankohta sovitaan tilauksen yhteydessä.
                Työn toimittaminen voidaan tarvittaessa edellyttää maksun
                vastaanottamista sovitulla tavalla.
              </p>
            </div>
          </div>

          {/* 05 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              05 • Asiakkaan materiaalit
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Kuvat, logot, videot ja muu aineisto
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Asiakas vastaa siitä, että hänellä on oikeus käyttää ja
                toimittaa KOPOSQUADille tilauksen toteuttamiseen tarvittavat
                kuvat, videot, logot, musiikit, tekstit ja muut materiaalit.
              </p>

              <p>
                KOPOSQUAD ei lähtökohtaisesti vastaa asiakkaan toimittaman
                materiaalin tekijänoikeuksista, tavaramerkeistä tai muista
                kolmansien osapuolten oikeuksista.
              </p>

              <p>
                Asiakas vastaa myös toimittamiensa tietojen ja materiaalien
                oikeellisuudesta. Virheellinen tai puutteellinen
                lähtömateriaali voi vaikuttaa työn lopputulokseen tai
                toimitusaikaan.
              </p>
            </div>
          </div>

          {/* 06 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              06 • Muutokset
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Korjaukset ja muutostoiveet
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Työn aikana asiakkaalla voi olla mahdollisuus esittää
                kohtuullisia muutostoiveita sovitun työn laajuuden
                puitteissa.
              </p>

              <p>
                Pienet korjaukset voivat sisältyä sovittuun hintaan.
                Laajat muutokset, kokonaan uuden suunnan tekeminen tai
                alkuperäisen toimeksiannon ulkopuoliset lisätyöt voidaan
                hinnoitella erikseen.
              </p>

              <p>
                Mahdollisista lisäkustannuksista sovitaan asiakkaan kanssa
                ennen maksullisen lisätyön tekemistä.
              </p>
            </div>
          </div>

          {/* 07 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              07 • Toimitus
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Toimitusajat ja valmistuminen
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Toimitusaika riippuu työn laajuudesta, palvelusta,
                työtilanteesta ja siitä, kuinka nopeasti tarvittavat
                lähtötiedot saadaan asiakkaalta.
              </p>

              <p>
                Mahdollinen arvioitu valmistumisaika ilmoitetaan
                tilauskohtaisesti. Jos työn valmistumiseen vaikuttaa
                odottamaton viivästys, asiakkaalle pyritään ilmoittamaan
                siitä mahdollisimman pian.
              </p>
            </div>
          </div>

          {/* 08 */}
          <div className="rounded-[30px] border border-purple-500/20 bg-purple-500/[0.035] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              08 • Peruutukset
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Peruutukset ja yksilöllisesti toteutetut työt
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Peruutuksiin ja mahdolliseen peruuttamisoikeuteen
                sovelletaan kulloinkin voimassa olevaa pakottavaa
                kuluttajansuojalainsäädäntöä.
              </p>

              <p>
                Monet KOPOSQUADin palveluista valmistetaan asiakkaan
                yksilöllisten toiveiden perusteella tai niiden toteuttaminen
                aloitetaan asiakkaan pyynnöstä ennen normaalin
                peruuttamisajan päättymistä. Tällaisissa tilanteissa
                peruuttamisoikeus voi lain sallimissa tilanteissa olla
                rajoitettu tai päättyä.
              </p>

              <p>
                Mahdolliset peruutukset käsitellään tapauskohtaisesti
                tilauksen vaiheen, tehdyn työn ja sovellettavan
                lainsäädännön perusteella.
              </p>
            </div>
          </div>

          {/* 09 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              09 • Virheet
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Virheestä ilmoittaminen
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Jos toimitetussa työssä on sovittuun toteutukseen nähden
                virhe tai selkeä tekninen ongelma, asiakkaan tulee ottaa
                yhteyttä mahdollisimman pian virheen havaitsemisen jälkeen.
              </p>

              <p>
                Tilanne tarkistetaan ja mahdollinen virhe pyritään
                korjaamaan kohtuullisessa ajassa. Pelkkä asiakkaan
                mieltymyksen muuttuminen työn valmistumisen jälkeen ei
                sellaisenaan tarkoita, että palvelussa olisi virhe.
              </p>
            </div>
          </div>

          {/* 10 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              10 • Käyttöoikeudet
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Valmiiden töiden käyttäminen
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Asiakas saa käyttää valmista työtä siihen tarkoitukseen,
                johon se on tilattu, ellei tilauksen yhteydessä ole
                sovittu muuta.
              </p>

              <p>
                Tekijänoikeuksien, lähdetiedostojen, jälleenmyyntioikeuden,
                edelleenluovutuksen tai muiden laajempien oikeuksien
                siirtymisestä voidaan tarvittaessa sopia erikseen.
              </p>

              <p>
                Asiakas ei saa jälleenmyydä tai esittää KOPOSQUADin tekemää
                työtä omana suunnittelutyönään ilman erillistä sopimusta.
              </p>
            </div>
          </div>

          {/* 11 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              11 • Sivuston käyttö
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Sivuston sisältö ja saatavuus
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                KOPOSQUAD pyrkii pitämään sivuston tiedot ajantasaisina ja
                palvelun toiminnassa, mutta sivuston keskeytymätöntä tai
                täysin virheetöntä toimintaa ei voida taata.
              </p>

              <p>
                Sivuston sisältöä, rakennetta, palveluita ja ominaisuuksia
                voidaan kehittää, päivittää, lisätä tai poistaa tarpeen
                mukaan.
              </p>
            </div>
          </div>

          {/* 12 */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              12 • Ehtojen muutokset
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Käyttöehtojen päivittäminen
            </h2>

            <div className="mt-6 space-y-4 leading-8 text-gray-400">
              <p>
                Näitä käyttöehtoja voidaan päivittää, jos KOPOSQUADin
                toiminta, palvelut tai lainsäädännön vaatimukset muuttuvat.
              </p>

              <p>
                Sivulla näkyvä päivityspäivämäärä kertoo, milloin ehtoja on
                viimeksi päivitetty.
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
                13 • Yhteystiedot
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Kysyttävää käyttöehdoista?
              </h2>

              <p className="mt-6 leading-8 text-gray-400">
                Jos sinulla on kysyttävää näistä käyttöehdoista,
                palvelutilauksesta tai omaan tilaukseesi sovellettavista
                ehdoista, ota yhteyttä ennen tilauksen tekemistä.
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