"use client";

import { useState } from "react";
import Header from "../../components/Header";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "Mikä KOPOSQUAD on?",
    answer:
      "KOPOSQUAD on suomalainen striimaaja- ja sisällöntuottajayhteisö, jonka tarkoituksena on yhdistää tekijöitä, rakentaa yhteistyötä ja auttaa jäseniä kehittämään omaa sisältöään.",
  },
  {
    question: "Kuka voi hakea mukaan KOPOSQUADiin?",
    answer:
      "Mukaan voivat hakea niin uudet kuin kokeneemmatkin striimaajat ja sisällöntuottajat. Tärkeintä on halu kehittää omaa tekemistä, osallistua yhteisöön ja toimia muiden jäsenten kanssa hyvässä hengessä.",
  },
  {
    question: "Maksaako KOPOSQUAD-jäsenyys?",
    answer:
      "KOPOSQUAD-jäsenyyteen hakeminen ei itsessään tarkoita maksullisen jäsenyyden ostamista. Mahdolliset erilliset jäsenille suunnatut tuotteet, tapahtumat tai palvelut hinnoitellaan erikseen.",
  },
  {
    question: "Miten KOPOSQUADiin haetaan?",
    answer:
      "Voit lähettää hakemuksen KOPOSQUAD-sivuston hakulomakkeen kautta. Hakemuksessa kannattaa kertoa omasta kanavasta, sisällöstä, tavoitteista ja siitä, miksi haluaisit mukaan yhteisöön.",
  },
  {
    question: "Mitä tapahtuu hakemuksen lähettämisen jälkeen?",
    answer:
      "Hakemus käydään läpi ja hakijaan voidaan olla yhteydessä lisätietojen tai jatkokeskustelun vuoksi. Hakemuksen lähettäminen ei automaattisesti tarkoita hyväksymistä jäseneksi.",
  },
  {
    question: "Mikä KOPOSQUADTV on?",
    answer:
      "KOPOSQUADTV on yhteisön yhteinen Twitch-kanava. KOPOSQUADin jäsenet voivat sovittujen käytäntöjen mukaisesti striimata kanavalla ja osallistua yhteisiin lähetyksiin.",
  },
  {
    question: "Miten KOPOSQUADTV:n striimivuorot sovitaan?",
    answer:
      "Striimivuorot sovitaan KOPOSQUADin jäsenille tarkoitetussa yhteisön sisäisessä kanavassa. Tarkoituksena on pitää vuorot selkeinä ja välttää päällekkäisiä lähetyksiä.",
  },
  {
    question: "Mitä palveluita KOPOSQUAD tarjoaa?",
    answer:
      "Palveluihin voi kuulua esimerkiksi stream overlay -toteutuksia, emote-paketteja, grafiikkapaketteja, striimaajan starttipaketteja, videoeditointia sekä muita sisällöntuotantoon liittyviä toteutuksia.",
  },
  {
    question: "Ovatko palvelut valmiita paketteja vai räätälöityjä?",
    answer:
      "Monet palveluista toteutetaan asiakkaan toiveiden perusteella. Työn tarkka sisältö, tyyli, laajuus, hinta ja aikataulu sovitaan ennen työn aloittamista.",
  },
  {
    question: "Miten palvelun voi tilata?",
    answer:
      "Palvelusta voi ottaa yhteyttä KOPOSQUADiin sähköpostitse tai palvelusivulla ilmoitetulla tavalla. Yhteydenotossa kannattaa kertoa mahdollisimman tarkasti, mitä tarvitset.",
  },
  {
    question: "Paljonko KOPOSQUADin palvelut maksavat?",
    answer:
      "Hinta riippuu työn laajuudesta, vaativuudesta ja tarvittavista ominaisuuksista. Tarkempi hinta tai hinnan määräytymisperuste sovitaan asiakkaan kanssa ennen työn aloittamista.",
  },
  {
    question: "Voiko valmiiseen työhön pyytää muutoksia?",
    answer:
      "Kohtuullisia muutostoiveita voidaan tehdä sovitun työn laajuuden puitteissa. Laajat muutokset tai kokonaan alkuperäisen toimeksiannon ulkopuoliset lisätyöt voidaan hinnoitella erikseen.",
  },
  {
    question: "Miten nopeasti tilaus valmistuu?",
    answer:
      "Toimitusaika riippuu työn laajuudesta, työtilanteesta ja siitä, kuinka nopeasti tarvittavat materiaalit saadaan asiakkaalta. Arvioitu aikataulu sovitaan tilauskohtaisesti.",
  },
  {
    question: "Voinko käyttää omaa logoa, kuvaa tai muuta materiaalia tilauksessa?",
    answer:
      "Kyllä. Asiakas voi toimittaa omia materiaaleja työn toteuttamista varten, mutta asiakkaan vastuulla on varmistaa, että hänellä on oikeus käyttää ja toimittaa kyseisiä materiaaleja.",
  },
  {
    question: "Missä KOPOSQUADin merch-kauppa sijaitsee?",
    answer:
      "KOPOSQUADin viralliseen merch-kauppaan pääsee sivuston Kauppa-linkistä. Kaupassa voi olla vaatteita, asusteita ja muita KOPOSQUAD-tuotteita.",
  },
  {
    question: "Kuka hoitaa merch-tuotteiden maksut ja toimitukset?",
    answer:
      "Merch-kaupan maksaminen, tilauksen käsittely ja toimitukseen liittyvät käytännöt tapahtuvat kauppa-alustan kautta. Kaupassa näkyvät ajantasaiset tuote-, maksu- ja toimitustiedot.",
  },
  {
    question: "Mitä ovat Member Jersey ja Member Kit?",
    answer:
      "Ne ovat KOPOSQUAD-jäsenille suunniteltuja tulevia tuotteita. Member Jersey on jäsenelle personoitava KOPOSQUAD-paita ja Member Kit erillinen jäsenpaketti. Tarkemmat tiedot julkaistaan myöhemmin.",
  },
  {
    question: "Mikä KOPOSQUAD LAN on?",
    answer:
      "KOPOSQUAD LAN on suunnitteilla oleva jäsenille tarkoitettu tapahtuma- tai LAN-konsepti. Tarkemmat tiedot osallistumisesta, mahdollisista maksuista ja järjestelyistä julkaistaan myöhemmin.",
  },
  {
    question: "Miten otan yhteyttä KOPOSQUADiin?",
    answer:
      "Virallinen yhteyssähköposti on koposquadtv@gmail.com. Yhteyttä voi ottaa esimerkiksi yhteistyöstä, jäsenyydestä, palveluista, sivustosta tai muista KOPOSQUADiin liittyvistä asioista.",
  },
  {
    question: "En löytänyt vastausta kysymykseeni. Mitä teen?",
    answer:
      "Voit lähettää viestin sähköpostitse osoitteeseen koposquadtv@gmail.com. Kerro viestissä mahdollisimman selkeästi, mihin asiaan tarvitset apua.",
  },
];

export default function UkkPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
              KOPOSQUAD • USEIN KYSYTYT KYSYMYKSET
            </span>
          </div>

          <h1 className="mt-7 text-5xl font-black uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            USEIN KYSYTYT{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
              KYSYMYKSET
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">
            Täältä löydät vastauksia yleisimpiin KOPOSQUADia, jäsenyyttä,
            palveluita, KOPOSQUADTV:tä ja kauppaa koskeviin kysymyksiin.
          </p>

          <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-gray-500">
            Klikkaa kysymystä nähdäksesi vastauksen.
          </p>
        </div>
      </section>

      {/* UKK */}
      <section className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
                UKK
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Mitä haluaisit tietää?
              </h2>
            </div>

            <div className="hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-gray-500 sm:block">
              {faqItems.length} kysymystä
            </div>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.question}
                  className={`overflow-hidden rounded-[24px] border backdrop-blur-xl transition-all duration-300 ${
                    isOpen
                      ? "border-purple-500/40 bg-purple-500/[0.055] shadow-[0_0_35px_rgba(168,85,247,0.08)]"
                      : "border-white/10 bg-white/[0.025] hover:border-purple-500/25"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex((current) =>
                        current === index ? null : index
                      )
                    }
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                  >
                    <div className="flex items-start gap-5">
                      <span className="mt-1 text-xs font-black tracking-[0.2em] text-purple-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="text-lg font-black leading-7 text-white sm:text-xl">
                        {item.question}
                      </h3>
                    </div>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/25 bg-purple-500/[0.06] text-2xl font-light text-purple-300 transition duration-300 ${
                        isOpen ? "rotate-45 bg-purple-500/15" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-white/[0.07] px-6 pb-7 pt-6 sm:px-8">
                        <p className="max-w-4xl pl-0 leading-8 text-gray-400 sm:pl-10">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* YHTEYDENOTTO */}
          <div className="relative mt-12 overflow-hidden rounded-[30px] border border-purple-500/30 bg-gradient-to-br from-purple-950/25 via-zinc-950 to-zinc-950 p-8 backdrop-blur-xl sm:p-10">
            <img
              src="/images/ks-logo.png.png"
              alt=""
              className="pointer-events-none absolute -right-10 top-1/2 hidden w-[250px] -translate-y-1/2 rotate-[-10deg] opacity-[0.035] md:block"
            />

            <div className="relative z-10 max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
                Eikö vastausta löytynyt?
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Kysy suoraan KOPOSQUADilta
              </h2>

              <p className="mt-6 leading-8 text-gray-400">
                Jos kysymykseesi ei löytynyt vastausta tältä sivulta, voit
                ottaa yhteyttä sähköpostitse.
              </p>

              <a
                href="mailto:koposquadtv@gmail.com"
                className="mt-7 inline-flex rounded-2xl border border-purple-400/40 bg-purple-500/10 px-6 py-4 font-black text-purple-300 transition hover:border-purple-300 hover:bg-purple-500/20 hover:text-white"
              >
                koposquadtv@gmail.com
              </a>
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