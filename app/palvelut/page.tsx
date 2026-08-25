import Header from "../../components/Header";

const services = [
  {
    category: "CUSTOM DESIGN",
    title: "Stream Overlay",
    description:
      "Täysin oman kanavasi tyyliin suunniteltu overlay-kokonaisuus. Värit, grafiikat, nimi ja yleisilme rakennetaan toiveidesi mukaan.",
    price: "Hinta tulossa",
    status: "TULOSSA",
    accent:
      "from-purple-500/20 via-fuchsia-500/10 to-transparent",
    glow: "bg-purple-600/25",
    features: [
      "Starting Soon -ruutu",
      "BRB-ruutu",
      "Ending-ruutu",
      "Gameplay / kamera-overlay",
      "Oma väriteema ja tyyli",
      "2 korjauskierrosta",
    ],
  },
  {
    category: "TWITCH & DISCORD",
    title: "Emote-paketti",
    description:
      "Oman ideasi, hahmosi tai kanavasi tyylin pohjalta suunniteltuja emoteja Twitchiin ja Discordiin.",
    price: "Hinta tulossa",
    status: "TULOSSA",
    accent:
      "from-fuchsia-500/20 via-purple-500/10 to-transparent",
    glow: "bg-fuchsia-600/20",
    features: [
      "Custom-emotet",
      "Twitch-yhteensopivat koot",
      "Discord-käyttö",
      "Läpinäkyvä PNG",
      "Oma tyyli ja värit",
    ],
  },
  {
    category: "KANAVAN ILME",
    title: "Grafiikkapaketti",
    description:
      "Kanavasi visuaalinen ilme kuntoon yhdellä paketilla. Sopii Twitchiin, YouTubeen ja muihin somekanaviin.",
    price: "Hinta tulossa",
    status: "TULOSSA",
    accent:
      "from-violet-500/20 via-blue-500/10 to-transparent",
    glow: "bg-violet-600/20",
    features: [
      "Banneri",
      "Profiilikuva",
      "Twitch-paneelit",
      "Somegrafiikat",
      "Yhtenäinen visuaalinen tyyli",
    ],
  },
  {
    category: "HENKILÖKOHTAINEN APU",
    title: "Striimaajan starttipaketti",
    description:
      "Henkilökohtaista apua striimin rakentamiseen alusta asti. Käydään yhdessä läpi asetukset ja ensimmäiseen lähetykseen valmistautuminen.",
    price: "Hinta tulossa",
    status: "TULOSSA",
    accent:
      "from-purple-500/20 via-indigo-500/10 to-transparent",
    glow: "bg-indigo-600/20",
    features: [
      "OBS / Streamlabs -asetukset",
      "Mikrofoni ja ääni",
      "Twitch-asetukset",
      "Overlayt ja alertit",
      "Kuvanlaadun optimointi",
      "Henkilökohtainen opastus",
    ],
  },
  {
    category: "FYYSISET TUOTTEET",
    title: "Tarrat",
    description:
      "KOPOSQUAD-henkisiä tarroja sekä myöhemmin mahdollisuus tilata omalla nimellä tai grafiikalla tehtyjä tarroja.",
    price: "Hinta tulossa",
    status: "TULOSSA MYÖHEMMIN",
    accent:
      "from-fuchsia-500/15 via-purple-500/10 to-transparent",
    glow: "bg-fuchsia-600/15",
    features: [
      "KOPOSQUAD-designit",
      "Custom-designit myöhemmin",
      "Useita kokoja",
      "Fyysinen toimitus",
    ],
  },
  {
    category: "KOPOSQUAD MERCH",
    title: "Paidat & merch",
    description:
      "KOPOSQUAD-vaatteita ja muita tuotteita. Merch-valikoimaa rakennetaan myöhemmässä vaiheessa.",
    price: "Hinta tulossa",
    status: "TULOSSA MYÖHEMMIN",
    accent:
      "from-purple-500/20 via-zinc-500/5 to-transparent",
    glow: "bg-purple-600/18",
    features: [
      "KOPOSQUAD-paidat",
      "Hupparit myöhemmin",
      "Muut tuotteet",
      "Erikoiserät",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Valitse palvelu",
    text: "Valitse overlay, grafiikkapaketti, emotet tai henkilökohtainen opastus.",
  },
  {
    number: "02",
    title: "Kerro toiveesi",
    text: "Täytä lomake ja kerro mahdollisimman tarkasti millaisen lopputuloksen haluat.",
  },
  {
    number: "03",
    title: "Vahvista tilaus",
    text: "Saat tilauksen sisällön ja hinnan tarkistettavaksi ennen työn aloittamista.",
  },
  {
    number: "04",
    title: "Saat valmiin työn",
    text: "Työ tehdään sovitun tyylin mukaan ja toimitetaan digitaalisesti.",
  },
];

const benefits = [
  {
    title: "Oma tyyli",
    text: "Värit, tunnelma ja ulkoasu rakennetaan sinun kanavasi ympärille.",
  },
  {
    title: "Henkilökohtainen palvelu",
    text: "Tilauksesta voidaan keskustella ennen työn aloittamista.",
  },
  {
    title: "Korjaukset",
    text: "Sovittuihin paketteihin voidaan sisällyttää korjauskierroksia.",
  },
  {
    title: "Suomalainen palvelu",
    text: "Palvelu ja kommunikointi hoidetaan suomeksi.",
  },
];

const faqs = [
  [
    "Milloin palvelut avautuvat?",
    "Palvelut ovat vielä valmistelussa. Tilaaminen avataan, kun tilauslomake, maksaminen ja toimitusprosessi ovat valmiina.",
  ],
  [
    "Voinko kertoa itse millaisen overlayn haluan?",
    "Kyllä. Custom-palveluissa tilauksen yhteydessä kysytään tyyli, värit, kanavan nimi, mahdolliset logot ja muut toiveet.",
  ],
  [
    "Näkyykö hinta jo nyt?",
    "Ei vielä. Kaikki hinnat julkaistaan vasta, kun palvelupaketit ja tilausprosessi ovat täysin valmiina.",
  ],
  [
    "Miten digitaalinen tuote toimitetaan?",
    "Valmiit tiedostot toimitetaan sovitulla tavalla digitaalisesti, kun työ on hyväksytty.",
  ],
];

export default function PalvelutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030104] text-white">
      {/* KIINTEÄ TAUSTA */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-72 top-[5%] h-[780px] w-[780px] rounded-full bg-purple-700/20 blur-[220px]" />
        <div className="absolute -right-72 top-[28%] h-[820px] w-[820px] rounded-full bg-fuchsia-700/14 blur-[235px]" />
        <div className="absolute -left-64 top-[58%] h-[720px] w-[720px] rounded-full bg-violet-700/12 blur-[220px]" />
        <div className="absolute -right-64 top-[78%] h-[760px] w-[760px] rounded-full bg-purple-800/12 blur-[230px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:58px_58px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.18)_52%,rgba(0,0,0,0.86)_100%)]" />
      </div>

      <div className="relative z-10">
        <Header activePage="palvelut" />

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-purple-500/20 px-6 py-28 md:py-32">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/22 blur-[190px]" />
          <div className="pointer-events-none absolute left-1/2 top-[58%] h-20 w-[700px] -translate-x-1/2 rounded-full bg-fuchsia-500/12 blur-[65px]" />

          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="pointer-events-none absolute -right-16 top-10 hidden w-[430px] rotate-[-12deg] object-contain opacity-[0.045] lg:block"
          />

          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="pointer-events-none absolute -left-24 bottom-[-80px] hidden w-[360px] rotate-[12deg] object-contain opacity-[0.03] lg:block"
          />

          <div className="relative mx-auto max-w-7xl text-center">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-purple-400/30 bg-purple-500/10 px-5 py-2 shadow-[0_0_30px_rgba(168,85,247,0.12)] backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_14px_rgba(192,132,252,0.9)]" />
              <span className="text-xs font-black uppercase tracking-[0.32em] text-purple-300">
                KOPOSQUAD CREATIVE
              </span>
            </div>

            <h1 className="mx-auto max-w-5xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Tee kanavastasi
              <span className="mt-3 block bg-gradient-to-r from-purple-300 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.25)]">
                oman näköisesi
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
              Custom-overlayt, emote-grafiikat, kanavan visuaalinen ilme ja
              henkilökohtainen striimausopastus samasta paikasta.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#palvelut"
                className="rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 font-black uppercase shadow-[0_0_35px_rgba(168,85,247,0.3)] transition hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(217,70,239,0.45)]"
              >
                Katso palvelut ↓
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-purple-400/30 bg-black/35 px-6 py-4 font-bold text-purple-200 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.8)]" />
                Palvelut avautuvat pian
              </div>
            </div>
          </div>
        </section>

        {/* PALVELUT */}
        <section
          id="palvelut"
          className="relative overflow-hidden px-6 py-24"
        >
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="pointer-events-none absolute -left-28 top-[16%] hidden w-[360px] rotate-[-12deg] object-contain opacity-[0.025] lg:block"
          />

          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="pointer-events-none absolute -right-24 top-[58%] hidden w-[390px] rotate-[13deg] object-contain opacity-[0.028] lg:block"
          />

          <div className="pointer-events-none absolute left-1/2 top-[40%] h-[850px] w-[1100px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[240px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
                KOPOSQUAD CREATIVE
              </p>

              <h2 className="mt-4 text-4xl font-black uppercase md:text-6xl">
                Valitse mitä tarvitset
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
                Jokainen työ tehdään asiakkaan oman tyylin ja toiveiden mukaan.
                Hinnat julkaistaan vasta, kun tilausjärjestelmä on täysin valmis.
              </p>

              <div className="mx-auto mt-8 h-px max-w-3xl bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="group relative flex min-h-[690px] flex-col overflow-hidden rounded-[30px] border border-purple-500/25 bg-[linear-gradient(180deg,rgba(27,18,34,0.97),rgba(8,6,11,0.99))] p-7 pt-16 shadow-[0_22px_70px_rgba(0,0,0,0.48)] transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/60 hover:shadow-[0_28px_90px_rgba(168,85,247,0.18)]"
                >
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b ${service.accent}`}
                  />

                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full ${service.glow} blur-[70px] transition duration-500 group-hover:scale-125`}
                  />

                  <div className="absolute right-5 top-5 z-20 rounded-full border border-purple-400/40 bg-black/35 px-3 py-1 text-[9px] font-black uppercase tracking-[0.13em] text-purple-200 shadow-[0_0_18px_rgba(168,85,247,0.15)] backdrop-blur-xl">
                    {service.status}
                  </div>

                  {/* KS PREVIEW */}
                  <div className="relative mb-7 flex h-[185px] items-center justify-center overflow-hidden rounded-2xl border border-purple-500/25 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),rgba(0,0,0,0.70)_67%)] shadow-[inset_0_0_45px_rgba(168,85,247,0.08)]">
                    <div className="pointer-events-none absolute h-[170px] w-[170px] rounded-full bg-purple-600/20 blur-[60px]" />
                    <div className="pointer-events-none absolute inset-x-10 bottom-2 h-px bg-gradient-to-r from-transparent via-purple-400/55 to-transparent" />

                    <img
                      src="/images/ks-logo.png.png"
                      alt=""
                      className="relative h-[130px] w-[130px] object-contain opacity-50 drop-shadow-[0_0_32px_rgba(168,85,247,0.6)] transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
                    />
                  </div>

                  <p className="text-xs font-black uppercase tracking-[0.28em] text-purple-400">
                    {service.category}
                  </p>

                  <h3 className="mt-3 text-3xl font-black uppercase leading-tight">
                    {service.title}
                  </h3>

                  <p className="mt-4 min-h-[112px] leading-7 text-gray-400">
                    {service.description}
                  </p>

                  <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 text-sm text-gray-300"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-purple-400/35 bg-purple-500/10 text-[10px] font-black text-purple-300">
                          ✓
                        </span>

                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8">
                    <div className="border-t border-purple-500/15 pt-6">
                      <p className="text-3xl font-black text-purple-300">
                        {service.price}
                      </p>

                      <button
                        type="button"
                        disabled
                        className="mt-6 w-full cursor-not-allowed rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 px-5 py-3.5 text-sm font-black uppercase tracking-wide text-purple-300 opacity-80"
                      >
                        Tilaus avautuu pian
                      </button>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-14 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
                </article>
              ))}
            </div>
          </div>
        </section>

{/* PALVELUT RAKENTEILLA */}
        <section className="relative overflow-hidden border-y border-purple-500/15 bg-[linear-gradient(110deg,rgba(88,28,135,0.12),rgba(3,1,5,0.98),rgba(112,26,117,0.08))] px-6 py-16">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-[150px]" />

          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="pointer-events-none absolute -right-16 top-1/2 hidden w-[300px] -translate-y-1/2 rotate-[-10deg] object-contain opacity-[0.025] lg:block"
          />

          <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-[28px] border border-purple-500/20 bg-black/30 px-8 py-9 backdrop-blur-xl md:flex-row md:px-10">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.34em] text-purple-400">
                KOPOSQUAD CREATIVE
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase md:text-3xl">
                Palvelut ovat vielä
                <span className="ml-2 bg-gradient-to-r from-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
                  rakenteilla.
                </span>
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-gray-400">
                Viimeistelemme parhaillaan palvelupaketteja, hintoja ja tilausjärjestelmää.
                Tilaaminen avataan, kun kokonaisuus on valmis.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-full border border-purple-400/30 bg-purple-500/[0.07] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-purple-300">
              <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_14px_rgba(192,132,252,0.9)]" />
              Tulossa pian
            </div>
          </div>
        </section>

        {/* MITEN TILAAMINEN TOIMII */}
        <section className="relative overflow-hidden border-b border-purple-500/15 bg-purple-950/10 px-6 py-24">
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="pointer-events-none absolute -left-20 top-1/2 hidden w-[380px] -translate-y-1/2 rotate-[-14deg] object-contain opacity-[0.04] lg:block"
          />

          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="pointer-events-none absolute -right-24 bottom-[-90px] hidden w-[340px] rotate-[12deg] object-contain opacity-[0.03] lg:block"
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
                Helppo prosessi
              </p>

              <h2 className="mt-4 text-4xl font-black uppercase md:text-5xl">
                Miten tilaaminen toimii?
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="group relative flex min-h-[255px] flex-col overflow-hidden rounded-3xl border border-purple-500/25 bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.16),transparent_45%),linear-gradient(180deg,rgba(18,12,22,0.96),rgba(7,5,10,0.98))] p-7 shadow-[0_16px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:shadow-[0_20px_60px_rgba(168,85,247,0.12)]"
                >
                  <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-purple-600/10 blur-[55px] transition duration-300 group-hover:bg-purple-600/20" />

                  <span className="relative text-sm font-black tracking-[0.25em] text-purple-400">
                    {step.number}
                  </span>

                  <h3 className="relative mt-6 text-xl font-black uppercase">
                    {step.title}
                  </h3>

                  <p className="relative mt-4 leading-7 text-gray-400">
                    {step.text}
                  </p>

                  <div className="relative mt-auto pt-7">
                    <div className="h-[2px] w-12 bg-gradient-to-r from-purple-500 to-transparent transition-all duration-300 group-hover:w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MIKSI */}
        <section className="relative overflow-hidden px-6 py-24">
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="pointer-events-none absolute -right-24 top-1/2 hidden w-[420px] -translate-y-1/2 rotate-[-11deg] object-contain opacity-[0.025] lg:block"
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
                  Suunniteltu sisällöntuottajille
                </p>

                <h2 className="mt-5 max-w-[640px] text-4xl font-black uppercase leading-[1.05] md:text-5xl">
                  Ei valmista
                  <span className="block text-purple-400">
                    massatuotanto-
                    <br />
                    pohjaa.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
                  Tavoitteena on tehdä grafiikat sinun kanavasi ympärille eikä
                  vain vaihtaa nimeä valmiiseen pohjaan.
                </p>

                <div className="mt-8 h-px max-w-md bg-gradient-to-r from-purple-500/70 to-transparent" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="group relative min-h-[190px] overflow-hidden rounded-2xl border border-purple-500/20 bg-[linear-gradient(145deg,rgba(62,28,82,0.20),rgba(0,0,0,0.5))] p-7 transition duration-300 hover:-translate-y-1 hover:border-purple-400/45"
                  >
                    <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-purple-600/10 blur-[50px] transition group-hover:bg-purple-600/20" />

                    <h3 className="relative text-lg font-black uppercase text-purple-300">
                      {benefit.title}
                    </h3>

                    <p className="relative mt-4 leading-7 text-gray-400">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative overflow-hidden border-t border-purple-500/15 bg-[linear-gradient(to_bottom,rgba(88,28,135,0.05),transparent)] px-6 py-24">
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="pointer-events-none absolute -left-28 bottom-[-90px] hidden w-[360px] rotate-[12deg] object-contain opacity-[0.025] lg:block"
          />

          <div className="relative mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
                FAQ
              </p>

              <h2 className="mt-4 text-4xl font-black uppercase">
                Usein kysyttyä
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {faqs.map(([question, answer]) => (
                <div
                  key={question}
                  className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-black/40 p-6 backdrop-blur-xl transition duration-300 hover:border-purple-400/45 hover:bg-purple-500/[0.04]"
                >
                  <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-purple-500 via-fuchsia-500/70 to-transparent opacity-60" />

                  <h3 className="text-lg font-black">{question}</h3>

                  <p className="mt-3 leading-7 text-gray-400">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOPPU */}
        <section className="relative overflow-hidden px-6 pb-28 pt-8">
          <div className="pointer-events-none absolute left-1/2 bottom-0 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/12 blur-[170px]" />

          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[34px] border border-purple-500/35 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.18),transparent_50%),linear-gradient(110deg,rgba(65,20,95,0.72),rgba(9,7,12,0.96),rgba(72,20,82,0.58))] p-10 text-center shadow-[0_0_80px_rgba(126,34,206,0.20)] md:p-14">
            <img
              src="/images/ks-logo.png.png"
              alt=""
              className="pointer-events-none absolute right-[-70px] top-1/2 w-[260px] -translate-y-1/2 rotate-[-12deg] object-contain opacity-[0.035]"
            />

            <p className="relative text-sm font-black uppercase tracking-[0.35em] text-purple-400">
              KOPOSQUAD CREATIVE
            </p>

            <h2 className="relative mt-5 text-3xl font-black uppercase md:text-5xl">
              Ensimmäiset palvelut tulossa pian
            </h2>

            <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
              Rakennamme parhaillaan tilausjärjestelmää, viimeistelemme
              palvelupaketteja ja teemme maksamisesta mahdollisimman selkeän.
            </p>

            <div className="relative mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-purple-400/30 bg-black/35 px-5 py-2 text-sm font-black uppercase tracking-[0.15em] text-purple-300">
              <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.8)]" />
              Tulossa
            </div>
          </div>
        </section>

        <footer className="border-t border-purple-500/20 bg-black/80 px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
            <div>
              <p className="text-2xl font-black">
                <span className="text-purple-500">KOPO</span>SQUAD
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Suomen kasvava striimaaja- ja sisällöntuottajayhteisö.
              </p>
            </div>

            <p className="text-sm text-gray-600">
              © 2026 KOPOSQUAD. Sivuston tekijä: Kopo
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}