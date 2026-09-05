import Link from "next/link";
import Header from "../../components/Header";

export default function TietoaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
<Header />
      {/* TAUSTAN HEHKUT */}
      <div className="pointer-events-none absolute left-[-280px] top-[80px] h-[800px] w-[800px] rounded-full bg-purple-700/30 blur-[190px]" />

      <div className="pointer-events-none absolute right-[-300px] top-[650px] h-[850px] w-[850px] rounded-full bg-blue-800/25 blur-[210px]" />

      <div className="pointer-events-none absolute left-[-320px] top-[1500px] h-[850px] w-[850px] rounded-full bg-fuchsia-800/20 blur-[220px]" />

      <div className="pointer-events-none absolute right-[-300px] top-[2450px] h-[900px] w-[900px] rounded-full bg-purple-700/25 blur-[230px]" />

      <div className="pointer-events-none absolute left-[-300px] top-[3550px] h-[850px] w-[850px] rounded-full bg-blue-900/25 blur-[220px]" />

      <div className="pointer-events-none absolute right-[-300px] top-[4550px] h-[850px] w-[850px] rounded-full bg-fuchsia-900/20 blur-[220px]" />

      <div className="pointer-events-none absolute bottom-[100px] left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-purple-800/25 blur-[220px]" />

      {/* HIMMEÄT KS-LOGOT */}
      <img
        src="/images/ks-logo.png.png"
        alt=""
        className="pointer-events-none absolute left-[-80px] top-[130px] w-[280px] rotate-[-12deg] opacity-[0.035]"
      />

      <img
        src="/images/ks-logo.png.png"
        alt=""
        className="pointer-events-none absolute right-[-70px] top-[900px] w-[300px] rotate-[12deg] opacity-[0.035]"
      />

      <img
        src="/images/ks-logo.png.png"
        alt=""
        className="pointer-events-none absolute bottom-[250px] left-[-90px] w-[310px] rotate-[-8deg] opacity-[0.03]"
      />

      {/* HERO */}
      <section className="relative z-10 px-6 pb-20 pt-32">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-purple-400">
            Tietoa yhteisöstä
          </p>

          <h1 className="text-4xl font-black uppercase leading-tight sm:text-5xl md:text-7xl">
            Mikä KOPOSQUAD
            <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              oikeastaan on?
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
            KOPOSQUAD ei ole pelkkä striimaajatiimi. Rakennamme
            suomalaista sisällöntuottajayhteisöä, jossa tekijät voivat
            kasvaa, verkostoitua ja rakentaa yhdessä jotain suurempaa.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#liity"
              className="rounded-xl bg-purple-600 px-8 py-4 text-sm font-black uppercase tracking-wider transition hover:bg-purple-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.45)]"
            >
              Hae mukaan
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-zinc-300 transition hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white"
            >
              Takaisin etusivulle
            </Link>
          </div>
        </div>
      </section>

      {/* PÄÄTEKSTI */}
      <section className="relative z-10 px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-purple-500/35 bg-gradient-to-br from-purple-950/35 via-white/[0.04] to-blue-950/25 p-7 shadow-[0_30px_100px_rgba(88,28,135,0.18)] backdrop-blur-xl md:p-12">
          <h2 className="text-3xl font-black uppercase md:text-4xl">
            Mikä KOPOSQUAD oikeastaan on?
          </h2>

          <div className="mt-7 space-y-6 text-base leading-8 text-zinc-300 md:text-lg">
            <p>
              Moni on viime aikoina kysellyt, mikä KOPOSQUADin idea
              oikein on. Lyhyesti sanottuna KOPOSQUAD ei ole pelkkä
              striimaajatiimi, vaan tavoitteena on rakentaa suomalainen
              sisällöntuottajayhteisö ja ajan myötä organisaatio, jossa
              jäsenet voivat kasvaa ja rakentaa omaa tekemistään yhdessä.
            </p>

            <p>
              KOPOSQUAD kasvaa jatkuvasti, ja tavoitteena on rakentaa
              mahdollisimman monipuolinen yhteisö, johon mahtuu
              striimaajia, sisällöntuottajia, videoeditoijia,
              moderaattoreita sekä muita tekijöitä.
            </p>

            <p>
              Tarkoituksena on luoda paikka, jossa jäsenet voivat kehittää
              omaa tekemistään, löytää uusia yhteistyökumppaneita ja olla
              mukana rakentamassa jotain suurempaa aivan alusta lähtien.
              Mukaan haetaan jatkuvasti uusia tekijöitä, ja tulevaisuudessa
              tavoitteena on saada mukaan myös tunnetumpia
              sisällöntuottajia vahvistamaan yhteisöä.
            </p>
          </div>
        </div>
      </section>

      {/* KOPOSQUADTV */}
      <section className="relative z-10 px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-purple-500/35 bg-gradient-to-br from-purple-950/40 via-white/[0.045] to-black p-8 shadow-[0_20px_70px_rgba(126,34,206,0.12)] backdrop-blur-xl md:p-10">
            <div className="mb-6 inline-flex rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-black uppercase tracking-widest text-purple-300">
              Yhteinen Twitch-kanava
            </div>

            <h2 className="text-3xl font-black uppercase md:text-4xl">
              KOPOSQUADTV
            </h2>

            <div className="mt-6 space-y-5 leading-8 text-zinc-300">
              <p>
                KOPOSQUADTV tulee olemaan tärkeä osa tätä kokonaisuutta.
                Tarkoituksena on, että yhteisön jäsenet pääsevät vuorotellen
                striimaamaan yhteiselle Twitch-kanavalle.
              </p>

              <p>
                Kun kanava saavuttaa Twitch Affiliation ja myöhemmin kasvaa
                siitä eteenpäin, tavoitteena on käyttää mahdolliset tuotot
                koko yhteisön hyväksi.
              </p>
            </div>

            <a
              href="https://www.twitch.tv/koposquadtv"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-xl bg-purple-600 px-6 py-3 font-black uppercase tracking-wide transition hover:bg-purple-500"
            >
              Avaa KOPOSQUADTV
            </a>
          </div>

          <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/35 via-purple-950/30 to-black p-8 shadow-[0_20px_70px_rgba(30,64,175,0.10)] backdrop-blur-xl md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-purple-400">
              Yhteisön tarkoitus
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase md:text-4xl">
              Kasvetaan yhdessä
            </h2>

            <p className="mt-6 leading-8 text-zinc-300">
              KOPOSQUADin tarkoituksena ei ole vain kerätä tekijöitä saman
              nimen alle. Tavoitteena on rakentaa yhteisö, jossa jäsenet
              auttavat toisiaan, jakavat osaamistaan, tekevät yhteistyötä
              ja saavat enemmän mahdollisuuksia kehittää omaa sisältöään.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Striimaajat",
                "Sisällöntuottajat",
                "Videoeditoijat",
                "Moderaattorit",
                "Muut tekijät",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-bold text-zinc-300"
                >
                  <span className="mr-2 text-purple-400">◆</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TAPAHTUMAT JA PAIDAT */}
<section className="relative z-10 border-y border-purple-500/10 bg-gradient-to-b from-purple-950/10 via-blue-950/10 to-transparent px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-purple-400">
              Tulevaisuus
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase md:text-5xl">
              Pitkän aikavälin suunnitelmat
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Yhteiset miitit",
                text: "Tavoitteena on järjestää KOPOSQUAD-miittejä, joissa jäsenet pääsevät tapaamaan toisensa kasvotusten.",
              },
              {
                title: "Mökkiviikonloput",
                text: "Yhteisiä viikonloppuja, tekemistä, pelaamista, sisältöä ja yhteisön vahvistamista.",
              },
              {
                title: "Lanit",
                text: "Jäsenille suunnattuja yhteisiä peli- ja striimaustapahtumia.",
              },
              {
                title: "Assembly ja Vectorama",
                text: "Tavoitteena on osallistua yhdessä suuriin peli- ja verkkotapahtumiin.",
              },
              {
                title: "Tuotot yhteisön hyväksi",
                text: "Mahdollisia yhteisön tuottoja käytetään jäsenille järjestettäviin tapahtumiin ja toimintaan.",
              },
              {
                title: "Omat KOPOSQUAD-paidat",
                text: "Tulevaisuuden tavoitteena on tehdä aktiivisille jäsenille paidat omilla nimimerkeillä.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="group rounded-2xl border border-purple-500/15 bg-gradient-to-br from-purple-950/20 via-white/[0.035] to-blue-950/10 p-7 transition duration-300 hover:-translate-y-1 hover:border-purple-500/45 hover:bg-purple-500/[0.08] hover:shadow-[0_18px_55px_rgba(126,34,206,0.14)]"
              >
                <div className="mb-5 h-1 w-14 rounded-full bg-purple-500 transition-all duration-300 group-hover:w-24" />

                <h3 className="text-xl font-black uppercase text-purple-300">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MIKSI LIITTYÄ KOPOSQUADIIN */}
<section className="relative z-10 bg-gradient-to-b from-transparent via-purple-950/15 to-blue-950/10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          {/* OTSIKKO */}
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
              Enemmän kuin pelkkä tiimi
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase md:text-5xl">
              Miksi liittyä{" "}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                KOPOSQUADiin?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-zinc-400 md:text-lg">
              KOPOSQUADissa et ole mukana vain nimellisesti. Tavoitteena on
              rakentaa yhteisö, jossa jäsenet voivat saada tukea, näkyvyyttä,
              uusia kontakteja ja mahdollisuuksia kehittää omaa tekemistään.
            </p>
          </div>

          {/* KORTIT */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
{[
  {
    number: "01",
    title: "Löydä tekijöitä ympärillesi",
    description:
      "Löydä striimeihin vieraita, pelikavereita, videoeditoijia, moderaattoreita ja muita tekijöitä, joiden kanssa voit toteuttaa uusia ideoita.",
  },
  {
    number: "02",
    title: "Saat palautetta tekemiseesi",
    description:
      "Voit pyytää muilta jäseniltä mielipiteitä esimerkiksi striimistäsi, videoistasi, kanavastasi ja uusista sisältöideoistasi.",
  },
  {
    number: "03",
    title: "Sisältösi voidaan nostaa esille",
    description:
      "Aktiivisten jäsenten kanavia, julkaisuja ja projekteja voidaan esitellä KOPOSQUADin sivustolla sekä yhteisön kanavissa.",
  },
  {
    number: "04",
    title: "Tee yhteistyötä muiden kanssa",
    description:
      "Järjestä yhteislähetyksiä, haasteita, turnauksia, videoita tai muita projekteja yhdessä yhteisön muiden jäsenten kanssa.",
  },
  {
    number: "05",
    title: "Hyödynnä muiden osaamista",
    description:
      "Yhteisössä eri tekijät osaavat eri asioita. Voit saada apua esimerkiksi editointiin, tekniikkaan, kanavan kehittämiseen ja sisällön suunnitteluun.",
  },
  {
    number: "06",
    title: "Vaikuta yhteisön tulevaisuuteen",
    description:
      "Aktiiviset jäsenet voivat ehdottaa uusia ideoita, tapahtumia, projekteja ja kehityskohteita sekä osallistua niiden toteuttamiseen.",
  },
].map((item) => (
              <article
                key={item.number}
                className="group relative overflow-hidden rounded-2xl border border-purple-500/15 bg-gradient-to-br from-zinc-950 via-purple-950/15 to-blue-950/10 p-7 transition duration-300 hover:-translate-y-1 hover:border-purple-500/45 hover:bg-purple-500/[0.08] hover:shadow-[0_18px_55px_rgba(126,34,206,0.14)]"
              >
                {/* NUMERO */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black tracking-[0.25em] text-purple-400">
                    {item.number}
                  </span>

                  <div className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_18px_rgba(168,85,247,0.9)]" />
                </div>

                {/* KORTIN SISÄLTÖ */}
                <h3 className="mt-7 text-xl font-black uppercase text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {item.description}
                </p>

                {/* ALAREUNAN VIOLETTI VIIVA */}
                <div className="mt-7 h-[2px] w-14 bg-gradient-to-r from-purple-500 to-transparent transition-all duration-300 group-hover:w-28" />

                {/* HIMMEÄ HEHKU */}
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-purple-600/0 blur-[70px] transition duration-300 group-hover:bg-purple-600/15" />
              </article>
            ))}
          </div>

          {/* KOPOSQUADTV-LISÄNOSTO */}
          <div className="relative mt-8 overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-r from-purple-950/50 via-zinc-950 to-blue-950/30 p-8 md:p-10">
            <div className="pointer-events-none absolute right-[-90px] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-600/15 blur-[100px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-purple-400">
                  Yhteinen kanava
                </p>

                <h3 className="mt-3 text-2xl font-black uppercase md:text-3xl">
                  Jäsenten sisältöä KOPOSQUADTV:llä
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  KOPOSQUADTV:n tarkoituksena on tarjota jäsenille yhteinen
                  kanava, jossa eri tekijät voivat järjestää lähetyksiä,
                  esitellä omaa sisältöään ja rakentaa kanavaa yhdessä koko
                  yhteisön hyväksi.
                </p>
              </div>

              <a
                href="https://www.twitch.tv/koposquadtv"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-xl border border-purple-500/40 bg-purple-600 px-7 py-4 text-sm font-black uppercase tracking-wider transition hover:bg-purple-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]"
              >
                Tutustu KOPOSQUADTV:hen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LOPPU */}
      <section className="relative z-10 px-6 pb-28 pt-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/50 via-black to-blue-950/40 p-8 text-center shadow-[0_0_80px_rgba(126,34,206,0.18)] md:p-14">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
            Tämä on vasta alku
          </p>

          <h2 className="mt-5 text-3xl font-black uppercase md:text-5xl">
            Rakennetaan tulevaisuutta yhdessä
          </h2>

          <div className="mx-auto mt-7 max-w-3xl space-y-5 leading-8 text-zinc-300">
            <p>
              KOPOSQUAD on vielä alkutaipaleellaan, ja sivusto sekä koko
              yhteisö kehittyvät jatkuvasti. Olemme rakentaneet vahvan
              pohjan, jonka päälle toimintaa voidaan laajentaa askel
              kerrallaan.
            </p>

            <p>
              Tavoitteena ei ole kasvaa nopeasti hinnalla millä hyvänsä,
              vaan rakentaa yhteisö, josta jokainen jäsen voi olla aidosti
              ylpeä.
            </p>

            <p>
              KOPOSQUADin tavoitteena on rakentaa yhteisö, jossa tehdään
              asioita yhdessä, autetaan toisia, luodaan uusia
              mahdollisuuksia ja kehitetään suomalaista striimaus- ja
              sisällöntuottajakulttuuria pitkälle tulevaisuuteen.
            </p>
          </div>

          <Link
            href="/#liity"
            className="mt-10 inline-flex rounded-xl bg-purple-600 px-9 py-4 font-black uppercase tracking-wider transition hover:bg-purple-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.45)]"
          >
            Hae mukaan KOPOSQUADiin
          </Link>
        </div>
      </section>
    </main>
  );
}