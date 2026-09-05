import Header from "../../components/Header";

export default function YhteystiedotPage() {
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
      <section className="relative z-10 border-b border-purple-500/15 px-6 pb-24 pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-purple-400/25 bg-purple-500/10 px-5 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.9)]" />

            <span className="text-[11px] font-black uppercase tracking-[0.35em] text-purple-300">
              KOPOSQUAD • VIRALLISET YHTEYSTIEDOT
            </span>
          </div>

          <h1 className="mt-7 text-5xl font-black uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            YHTEYS
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
              TIEDOT
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">
            Tältä sivulta löydät KOPOSQUADin viralliset yhteystiedot sekä
            ohjeet siihen, miten ja mitä kautta eri asioissa kannattaa olla
            yhteydessä.
          </p>

          <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-gray-500">
            KOPOSQUAD on striimaajista, sisällöntuottajista ja yhteisön
            jäsenistä rakentuva kokonaisuus. Yhteydenotto voi liittyä
            esimerkiksi yhteistyöhön, sponsorointiin, jäsenyyteen,
            KOPOSQUAD-palveluihin, sivustoon, tapahtumiin tai yleisiin
            kysymyksiin. Kaikki viralliset yhteydenotot käsitellään
            ensisijaisesti sähköpostitse.
          </p>
        </div>
      </section>

      {/* PÄÄYHTEYSTIEDOT */}
      <section className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">

            {/* SÄHKÖPOSTI */}
            <div className="relative overflow-hidden rounded-[32px] border border-purple-500/30 bg-gradient-to-br from-zinc-900/95 via-zinc-950 to-purple-950/25 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-10">
              <div className="pointer-events-none absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-purple-600/10 blur-[120px]" />

              <div className="relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                  Ensisijainen yhteydenottokanava
                </p>

                <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                  Sähköposti
                </h2>

                <p className="mt-5 text-lg leading-8 text-gray-300">
                  Sähköposti on paras ja virallisin tapa ottaa yhteyttä
                  KOPOSQUADiin. Samaa osoitetta voi käyttää sekä yleisiin
                  kysymyksiin että laajempiin yhteistyö- ja palveluasioihin.
                </p>

                <p className="mt-4 leading-7 text-gray-500">
                  Kun lähetät viestin, kerro mahdollisimman selkeästi kuka olet,
                  mitä asia koskee ja millaista vastausta tai yhteistyötä
                  tavoittelet. Jos yhteydenotto liittyy esimerkiksi
                  striimiin, YouTube-kanavaan, tapahtumaan tai yritykseen,
                  mukaan kannattaa lisätä myös tarvittavat linkit.
                </p>

                <p className="mt-4 leading-7 text-gray-500">
                  Mitä selkeämmin asia on kuvattu ensimmäisessä viestissä,
                  sitä nopeammin yhteydenotto voidaan käsitellä.
                </p>

                <a
                  href="mailto:koposquadtv@gmail.com"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl border border-purple-400/40 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 px-6 py-4 text-lg font-black text-purple-200 transition duration-300 hover:-translate-y-1 hover:border-purple-300 hover:from-purple-600/35 hover:to-fuchsia-600/35 hover:text-white hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]"
                >
                  koposquadtv@gmail.com
                </a>
              </div>
            </div>

            {/* DISCORD */}
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full bg-indigo-600/10 blur-[110px]" />

              <div className="relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-indigo-400">
                  Yhteisö ja keskustelu
                </p>

                <h2 className="mt-4 text-3xl font-black">
                  Discord
                </h2>

                <p className="mt-5 leading-8 text-gray-300">
                  Discord on hyvä vaihtoehto silloin, kun asia liittyy
                  KOPOSQUAD-yhteisöön, jäsenyyteen tai yleiseen keskusteluun.
                </p>

                <p className="mt-4 leading-7 text-gray-500">
                  Discordissa voi kysyä neuvoa, keskustella muiden kanssa
                  ja seurata yhteisön toimintaa. Viralliset yhteistyöt,
                  sponsorointi ja palvelutilaukset kannattaa kuitenkin
                  lähettää sähköpostitse.
                </p>

                <a
                  href="https://discord.gg/ZXgSS9v6ye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex rounded-2xl border border-indigo-400/30 bg-indigo-500/10 px-6 py-4 font-black text-indigo-300 transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-500/20 hover:text-white"
                >
                  Avaa KOPOSQUAD Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AIHEET */}
      <section className="relative z-10 border-y border-white/10 bg-white/[0.015] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
              Yhteydenotot
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              Missä asioissa voit ottaa yhteyttä?
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              KOPOSQUADiin voi olla yhteydessä monenlaisissa asioissa.
              Alla on koottuna yleisimmät yhteydenottojen aiheet sekä
              ohjeet siihen, mitä tietoja viestiin kannattaa sisällyttää.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">

            <div className="rounded-3xl border border-purple-500/15 bg-black/35 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-black text-white">
                Yhteistyö ja sponsorointi
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Yritykset, yhteisöt, tapahtumajärjestäjät ja muut toimijat
                voivat olla yhteydessä yhteistyöehdotuksissa,
                sponsoroinnissa, kampanjoissa ja muissa kaupallisissa
                yhteistyöasioissa.
              </p>

              <p className="mt-4 leading-7 text-gray-500">
                Viestissä kannattaa kertoa lyhyesti yhteistyön idea,
                aikataulu, mahdollinen kampanja, tavoitteet sekä se,
                millaista roolia KOPOSQUADilta toivotaan.
              </p>
            </div>

            <div className="rounded-3xl border border-purple-500/15 bg-black/35 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-black text-white">
                KOPOSQUAD-palvelut
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Palveluihin liittyvät yhteydenotot voivat koskea esimerkiksi
                striimioverlayta, grafiikkaa, emoteja, videoeditointia,
                striimaajan starttipakettia tai muita sivustolla tarjottavia
                palveluita.
              </p>

              <p className="mt-4 leading-7 text-gray-500">
                Kerro viestissä mahdollisimman tarkasti, mitä tarvitset,
                millainen tyyli sinulla on mielessä ja millä aikataululla
                työn olisi tarkoitus valmistua.
              </p>
            </div>

            <div className="rounded-3xl border border-purple-500/15 bg-black/35 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-black text-white">
                Jäsenyys ja hakemukset
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Jos haluat liittyä KOPOSQUADiin, käytä ensisijaisesti
                sivustolla olevaa hakemuslomaketta. Hakemuksessa kannattaa
                kertoa omasta sisällöstä, kanavista ja siitä, miksi haluat
                mukaan yhteisöön.
              </p>

              <p className="mt-4 leading-7 text-gray-500">
                Jos hakemuksen täyttämisestä tai jäsenyydestä jää kysyttävää,
                voit ottaa yhteyttä sähköpostitse tai Discordissa.
              </p>

              <a
                href="/#rekry"
                className="mt-5 inline-flex font-black text-purple-400 transition hover:text-purple-300"
              >
                Siirry hakemukseen →
              </a>
            </div>

            <div className="rounded-3xl border border-purple-500/15 bg-black/35 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-black text-white">
                Sivusto ja tekniset asiat
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Jos huomaat sivustolla virheen, toimimattoman linkin,
                vanhentuneen tiedon tai muun teknisen ongelman, siitä voi
                ilmoittaa suoraan sähköpostitse.
              </p>

              <p className="mt-4 leading-7 text-gray-500">
                Jos mahdollista, kerro viestissä millä sivulla ongelma näkyy
                ja mitä tapahtui. Kuvakaappaus voi auttaa ongelman
                selvittämisessä.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VASTAUSAIKA */}
      <section className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                Yhteydenottojen käsittely
              </p>

              <h2 className="mt-4 text-4xl font-black">
                Vastausajat
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-400">
                Yhteydenottoihin pyritään vastaamaan mahdollisimman pian.
                Vastausaika voi kuitenkin vaihdella yhteydenottojen määrän,
                asian laajuuden ja muiden käynnissä olevien tehtävien mukaan.
              </p>

              <p className="mt-4 leading-7 text-gray-500">
                Sama yhteydenotto kannattaa lähettää vain yhden kerran.
                Useaan kanavaan lähetetty sama viesti ei nopeuta käsittelyä.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-black">
                Hyvä yhteydenotto sisältää
              </h3>

              <div className="mt-6 space-y-4 text-gray-400">
                <p>• Nimesi tai käyttämäsi nimi</p>
                <p>• Selkeä kuvaus siitä, mitä asia koskee</p>
                <p>• Tarvittavat linkit tai kanavat</p>
                <p>• Mahdollinen aikataulu</p>
                <p>• Yhteistyö- tai palveluasioissa mahdollisimman tarkat lähtötiedot</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VASTUUHENKILÖ */}
      <section className="relative z-10 px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[32px] border border-purple-500/25 bg-gradient-to-br from-purple-950/20 via-zinc-950 to-zinc-950 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:p-10">
            <img
              src="/images/ks-logo.png.png"
              alt=""
              className="pointer-events-none absolute -right-10 top-1/2 hidden w-[280px] -translate-y-1/2 rotate-[-10deg] opacity-[0.04] md:block"
            />

            <div className="relative z-10 max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                Ylläpito ja vastuuhenkilö
              </p>

              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Veli-Pekka Koponen
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-400">
                KOPOSQUAD-sivuston ylläpidosta, sivuston sisällöstä sekä
                yleisistä yhteydenotoista vastaa Veli-Pekka Koponen.
              </p>

              <p className="mt-4 max-w-2xl leading-7 text-gray-500">
                KOPOSQUADiin liittyvät viralliset yhteydenotot käsitellään
                KOPOSQUADin sähköpostiosoitteen kautta.
              </p>

              <div className="mt-7 inline-flex rounded-xl border border-purple-500/20 bg-purple-500/[0.06] px-5 py-3 text-sm font-bold text-gray-400">
                KOPOSQUAD • Finland
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOPPU */}
      <section className="relative z-10 border-t border-white/10 bg-black/50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-4xl text-sm leading-7 text-gray-600">
            KOPOSQUAD pidättää oikeuden olla vastaamatta epäasiallisiin,
            häiritseviin tai toimintaan liittymättömiin yhteydenottoihin.
            Yhteystietoja käytetään ainoastaan KOPOSQUADiin liittyvien
            asioiden käsittelyyn.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-black px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-black text-white">
              KOPOSQUAD
            </p>

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