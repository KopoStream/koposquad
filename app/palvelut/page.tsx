"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";

const services = [
{
  category: "CUSTOM DESIGN",
  title: "Stream Overlay",
  description:
    "Täysin oman kanavasi tyyliin suunniteltu overlay-kokonaisuus. Valitse kuvallinen tai animoitu tyyli – värit, grafiikat, nimi ja yleisilme rakennetaan toiveidesi mukaan.",

  price: "59,99 €",
  oldPrice: "99,99 €",
  discount: "-40 %",
  offer: true,

  status: "",
  accent:
    "from-purple-500/20 via-fuchsia-500/10 to-transparent",
  glow: "bg-purple-600/25",

  features: [
    "Starting Soon -ruutu",
    "BRB-ruutu",
    "Ending-ruutu",
    "Gameplay / kamera-overlay",
    "Kuvallinen tai animoitu toteutus",
    "Oma väriteema ja tyyli",
    "2 korjauskierrosta",
  ],
  detailsTitle: "Mitä Stream Overlay tarkoittaa?",
  detailsIntro:
    "Stream Overlay on kanavallesi suunniteltu visuaalinen kokonaisuus. Toteutus tehdään sinun tyylisi, värien ja toiveiden mukaan eikä valmiista massapohjasta.",
  details: [
    "Kuvallinen tai animoitu toteutus",
    "Starting Soon, BRB ja Ending -ruudut",
    "Gameplay- ja kamera-overlay",
    "Värit, fontit ja tunnelma kanavasi mukaan",
    "Omat logot ja grafiikat voidaan huomioida",
    "Toteutus sopivaan resoluutioon ja käyttötarkoitukseen",
    "2 sovittua korjauskierrosta",
  ],
  detailsNote:
    "Tilauksen yhteydessä kerrot mahdollisimman tarkasti millaisen tyylin haluat. Jos et vielä tiedä tarkkaa lopputulosta, suunnitellaan suunta yhdessä.",
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
    detailsTitle: "Mitä Emote-paketti tarkoittaa?",
    detailsIntro:
      "Emote-paketissa suunnitellaan kanavallesi omia emoteja ideasi, hahmosi, ilmeesi tai brändisi pohjalta.",
    details: [
      "Oma idea tai hahmo lähtökohdaksi",
      "Twitchiin sopivat emote-koot",
      "Discord-käyttö huomioituna",
      "Läpinäkyvät PNG-tiedostot",
      "Värimaailma kanavasi mukaan",
      "Mahdollisuus rakentaa yhtenäinen emote-sarja",
    ],
    detailsNote:
      "Emotet suunnitellaan tilaajan toiveiden mukaan. Tarkempi määrä, tyyli ja hinta vahvistetaan ennen työn aloittamista.",
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
    detailsTitle: "Mitä Grafiikkapaketti tarkoittaa?",
    detailsIntro:
      "Grafiikkapaketilla rakennetaan kanavalle yhtenäinen visuaalinen ilme eri alustoille ilman että jokainen kuva näyttää eri sarjalta.",
    details: [
      "Bannerit eri alustoille",
      "Profiilikuva tai kanavakuva",
      "Twitch-paneelit",
      "Somegrafiikat",
      "Yhtenäiset värit ja fontit",
      "Kanavasi nimen ja brändin huomiointi",
    ],
    detailsNote:
      "Paketin tarkka sisältö sovitaan ennen työn aloittamista sen mukaan mitä kanavia ja grafiikoita tarvitset.",
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
    detailsTitle: "Mitä Starttipaketti tarkoittaa?",
    detailsIntro:
      "Starttipaketti on henkilökohtaista apua striimin rakentamiseen ja asetusten kuntoon laittamiseen alusta lähtien.",
    details: [
      "OBS- tai Streamlabs-asetukset",
      "Mikrofonin ja äänen perussäädöt",
      "Twitchin tärkeät asetukset",
      "Overlayt ja alertit käyttöön",
      "Kuvanlaadun ja bittivirran läpikäynti",
      "Henkilökohtainen opastus vaihe vaiheelta",
    ],
    detailsNote:
      "Tarkoitus ei ole vain antaa ohjetta, vaan käydä asetukset yhdessä läpi niin että tiedät myös itse mitä on tehty.",
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
    detailsTitle: "Mitä Tarrat-palvelu tarkoittaa?",
    detailsIntro:
      "Tarravalikoimaan on tarkoitus tuoda KOPOSQUAD-aiheisia designeja ja myöhemmin myös omalla nimellä tai grafiikalla tehtäviä vaihtoehtoja.",
    details: [
      "KOPOSQUAD-designit",
      "Useita kokoja suunnitteilla",
      "Custom-vaihtoehdot myöhemmässä vaiheessa",
      "Fyysinen toimitus",
    ],
    detailsNote:
      "Tämä palvelu on vielä rakenteilla. Materiaalit, koot, hinnat ja toimitustavat ilmoitetaan ennen avaamista.",
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
    detailsTitle: "Mitä Paidat & merch tarkoittaa?",
    detailsIntro:
      "KOPOSQUAD-merchiin on tarkoitus rakentaa oma pieni tuotevalikoima yhteisön visuaalisella tyylillä.",
    details: [
      "KOPOSQUAD-paidat",
      "Hupparit myöhemmässä vaiheessa",
      "Muita tuotteita suunnitteilla",
      "Mahdollisia erikoiseriä",
    ],
    detailsNote:
      "Merch on vielä suunnitteluvaiheessa. Tuotteet, hinnat, koot ja toimitustavat julkaistaan myöhemmin.",
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
    "Stream Overlay avataan ensimmäisenä tilattavaksi. Muut palvelut viimeistellään ja avataan myöhemmin.",
  ],
  [
    "Voinko kertoa itse millaisen overlayn haluan?",
    "Kyllä. Custom-palveluissa tilauksen yhteydessä kysytään tyyli, värit, kanavan nimi, mahdolliset logot ja muut toiveet.",
  ],
  [
    "Näkyykö hinta jo nyt?",
    "Stream Overlayn avaushinta näkyy jo sivulla. Muiden palveluiden hinnat julkaistaan myöhemmin.",
  ],
  [
    "Miten digitaalinen tuote toimitetaan?",
    "Valmiit tiedostot toimitetaan sovitulla tavalla digitaalisesti, kun työ on hyväksytty.",
  ],
];

export default function PalvelutPage() {
  const [selectedService, setSelectedService] =
    useState<(typeof services)[number] | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedOverlayItems, setSelectedOverlayItems] = useState<string[]>([]);
  const [orderSending, setOrderSending] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStep, setPaymentStep] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState<FormData | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const paypalContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!paymentStep || !pendingOrderData) return;

const clientId = process.env.NEXT_PUBLIC_PAYPAL_LIVE_CLIENT_ID;

    if (!clientId) {
      setOrderStatus("PayPal Client ID puuttuu .env.local-tiedostosta.");
      return;
    }

    let cancelled = false;

    const renderButtons = async () => {
      try {
        let paypal = (window as any).paypal;

        if (!paypal) {
          const existingScript = document.querySelector<HTMLScriptElement>(
            'script[data-koposquad-paypal="true"]'
          );

          if (existingScript) {
            await new Promise<void>((resolve, reject) => {
              if ((window as any).paypal) {
                resolve();
                return;
              }

              existingScript.addEventListener("load", () => resolve(), {
                once: true,
              });
              existingScript.addEventListener(
                "error",
                () => reject(new Error("PayPal SDK:n lataus epäonnistui.")),
                { once: true }
              );
            });
          } else {
            await new Promise<void>((resolve, reject) => {
              const script = document.createElement("script");
              script.src =
                `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
                  clientId
                )}&currency=EUR&intent=capture`;
              script.async = true;
              script.dataset.koposquadPaypal = "true";
              script.onload = () => resolve();
              script.onerror = () =>
                reject(new Error("PayPal SDK:n lataus epäonnistui."));
              document.body.appendChild(script);
            });
          }

          paypal = (window as any).paypal;
        }

        if (cancelled || !paypalContainerRef.current || !paypal) return;

        paypalContainerRef.current.innerHTML = "";

        await paypal
          .Buttons({
            style: {
              layout: "vertical",
              shape: "rect",
              label: "paypal",
            },

            createOrder: async () => {
              setOrderStatus("Luodaan PayPal-maksua...");

              const response = await fetch("/api/paypal/create-order", {
                method: "POST",
              });

              const data = await response.json();

              if (!response.ok || !data?.id) {
                throw new Error(
                  data?.error || "PayPal-maksun luominen epäonnistui."
                );
              }

              return data.id;
            },

            onApprove: async (data: { orderID: string }) => {
              try {
                setOrderSending(true);
                setOrderStatus("Vahvistetaan PayPal-maksua...");

                const captureResponse = await fetch(
                  "/api/paypal/capture-order",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      orderID: data.orderID,
                    }),
                  }
                );

                const captureData = await captureResponse.json();

                if (
                  !captureResponse.ok ||
                  captureData?.status !== "COMPLETED"
                ) {
                  throw new Error(
                    captureData?.error ||
                      "PayPal-maksun vahvistaminen epäonnistui."
                  );
                }

                setOrderStatus(
                  "Maksu onnistui. Lähetetään tilausta sähköpostiin..."
                );

                const orderData = new FormData();

                pendingOrderData.forEach((value, key) => {
                  orderData.append(key, value);
                });

                orderData.append("paypalOrderId", data.orderID);
                orderData.append(
                  "paypalCaptureId",
                  String(captureData?.captureId || "")
                );

                const orderResponse = await fetch("/api/order", {
                  method: "POST",
                  body: orderData,
                });

                const orderResult = await orderResponse.json();

                if (!orderResponse.ok) {
                  throw new Error(
                    orderResult?.error ||
                      "Maksu onnistui, mutta tilauksen sähköpostin lähetys epäonnistui."
                  );
                }

                setOrderStatus("");
                setPaymentSuccess(true);

                setSelectedOverlayItems([]);
                setPendingOrderData(null);
                setPaymentStep(false);
              } catch (error) {
                setOrderStatus(
                  error instanceof Error
                    ? error.message
                    : "Maksun käsittelyssä tapahtui virhe."
                );
              } finally {
                setOrderSending(false);
              }
            },

            onCancel: () => {
              setOrderStatus(
                "PayPal-maksu peruutettiin. Voit yrittää uudelleen."
              );
            },

            onError: (error: unknown) => {
              console.error("PayPal error:", error);
              setOrderStatus(
                "PayPal-maksussa tapahtui virhe. Yritä uudelleen."
              );
            },
          })
          .render(paypalContainerRef.current);
      } catch (error) {
        setOrderStatus(
          error instanceof Error
            ? error.message
            : "PayPal-maksuvaiheen lataaminen epäonnistui."
        );
      }
    };

    renderButtons();

    return () => {
      cancelled = true;
      if (paypalContainerRef.current) {
        paypalContainerRef.current.innerHTML = "";
      }
    };
  }, [paymentStep, pendingOrderData]);

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
                Stream Overlay tilattavissa
              </div>
            </div>
          </div>
        </section>

{/* PALVELUT */
<section
  id="palvelut"
  className="relative overflow-hidden px-6 py-24"
>
  {/* TAUSTAN HIMMEÄT KS-LOGOT */}
  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="pointer-events-none absolute -left-28 top-[18%] hidden w-[360px] rotate-[-12deg] object-contain opacity-[0.025] lg:block"
  />

  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="pointer-events-none absolute -right-28 top-[58%] hidden w-[390px] rotate-[12deg] object-contain opacity-[0.025] lg:block"
  />

  <div className="pointer-events-none absolute left-1/2 top-[45%] h-[850px] w-[1100px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[240px]" />
  <div className="pointer-events-none absolute -left-40 top-[38%] h-[420px] w-[420px] rounded-full bg-fuchsia-700/10 blur-[150px]" />
  <div className="pointer-events-none absolute -right-40 top-[72%] h-[420px] w-[420px] rounded-full bg-violet-700/10 blur-[150px]" />
  <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />

  <div className="relative mx-auto max-w-7xl">
    {/* OTSIKKO */}
    <div className="text-center">
      <div className="mx-auto mb-5 flex w-fit items-center gap-3 rounded-full border border-purple-400/25 bg-purple-500/[0.06] px-4 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.9)]" />
        <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
          KOPOSQUAD CREATIVE
        </p>
      </div>

      <h2 className="text-4xl font-black uppercase md:text-6xl">
        Valitse mitä tarvitset
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
        Jokainen palvelu rakennetaan asiakkaan omien tarpeiden ja toiveiden
        mukaan. Stream Overlay on ensimmäisenä tilattavissa avaustarjouksella.
      </p>

      <div className="mx-auto mt-8 h-px max-w-3xl bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </div>

    {/* PALVELUKORTIT */}
    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service, index) => (
        <article
          key={service.title}
          className={`group relative flex min-h-[575px] flex-col overflow-hidden rounded-[30px] border p-8 transition-all duration-300 hover:-translate-y-2 ${
            service.title === "Stream Overlay"
              ? "border-fuchsia-400/35 bg-[linear-gradient(145deg,rgba(47,21,60,0.98),rgba(9,6,12,0.99))] shadow-[0_24px_80px_rgba(168,85,247,0.16)] hover:border-fuchsia-300/60 hover:shadow-[0_30px_95px_rgba(217,70,239,0.22)]"
              : "border-purple-500/25 bg-[linear-gradient(145deg,rgba(31,18,39,0.97),rgba(8,6,11,0.99))] shadow-[0_20px_60px_rgba(0,0,0,0.45)] hover:border-purple-400/60 hover:shadow-[0_28px_90px_rgba(168,85,247,0.18)]"
          }`}
        >
          {/* YLÄHEHKU */}
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b ${service.accent}`}
          />

          <div
            className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full ${service.glow} blur-[85px] transition duration-500 group-hover:scale-125`}
          />

          {/* HIMMEÄ KS LOGO */}
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="pointer-events-none absolute -right-12 top-[110px] w-[200px] rotate-[-12deg] object-contain opacity-[0.028] transition duration-500 group-hover:opacity-[0.05]"
          />

          {/* ISO NUMERO TAUSTALLA */}
          <span className="pointer-events-none absolute -right-2 top-5 text-[112px] font-black leading-none text-white/[0.025]">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* KULMAKORISTEET */}
          <div className="pointer-events-none absolute left-0 top-0 h-24 w-24">
            <div className="absolute left-0 top-0 h-px w-16 bg-gradient-to-r from-purple-400/70 to-transparent" />
            <div className="absolute left-0 top-0 h-16 w-px bg-gradient-to-b from-purple-400/70 to-transparent" />
          </div>

          <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24">
            <div className="absolute bottom-0 right-0 h-px w-16 bg-gradient-to-l from-fuchsia-400/50 to-transparent" />
            <div className="absolute bottom-0 right-0 h-16 w-px bg-gradient-to-t from-fuchsia-400/50 to-transparent" />
          </div>

          {/* YLÄRIVI */}
          <div className="relative flex items-start justify-between gap-5">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.32em] text-purple-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="mt-3 text-xs font-black uppercase tracking-[0.25em] text-purple-300">
                {service.category}
              </p>
            </div>

            {service.status && (
              <span className="shrink-0 rounded-full border border-purple-400/35 bg-purple-500/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.13em] text-purple-200 shadow-[0_0_18px_rgba(168,85,247,0.10)] backdrop-blur-xl">
                {service.status}
              </span>
            )}
          </div>

          {service.title === "Stream Overlay" && (
            <div className="relative mt-5 flex w-fit items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">
                Tilattavissa
              </span>
            </div>
          )}

          {/* NIMI */}
<h3
  className={`relative mt-7 font-black uppercase leading-[1.05] ${
    service.title === "Grafiikkapaketti"
      ? "text-[26px] md:text-[28px]"
      : "text-3xl md:text-[34px]"
  }`}
>
            {service.title}
          </h3>

          {/* KORISTEVIIVA */}
          <div className="relative mt-6 flex items-center gap-3">
            <div className="h-[2px] w-14 bg-gradient-to-r from-purple-500 to-fuchsia-500" />
            <div className="h-1.5 w-1.5 rotate-45 bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.7)]" />
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          {/* KUVAUS */}
          <p className="relative mt-6 min-h-[105px] text-[15px] leading-7 text-gray-400">
            {service.description}
          </p>

{/* SISÄLTÖ */}
<div className="relative mt-7 overflow-hidden rounded-2xl border border-purple-500/15 bg-black/25 p-5 shadow-[inset_0_0_35px_rgba(168,85,247,0.035)]">

  {/* HIMMEÄ KS SISÄLTÖBOKSIN TAUSTALLA */}
  <img
    src="/images/ks-logo.png.png"
    alt=""
    className="pointer-events-none absolute -right-8 bottom-[-30px] w-[135px] rotate-[-12deg] object-contain opacity-[0.025]"
  />

  {/* HIMMEÄ VIOLETTI HEHKU */}
  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-600/10 blur-[55px]" />

  {/* YLÄREUNAN VÄRIVIIVA */}
  <div className="pointer-events-none absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

  <p className="relative mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-gray-500">
    Palveluun kuuluu
  </p>

  <div className="relative grid gap-3">
    {service.features.map((feature) => (
      <div
        key={feature}
        className="group/item flex items-center gap-3 rounded-lg px-1 py-0.5 text-sm text-gray-300 transition hover:bg-purple-500/[0.04]"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-purple-400/35 bg-purple-500/10 text-[10px] font-black text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.08)]">
          ✓
        </span>

        <span className="transition group-hover/item:text-white">
          {feature}
        </span>
      </div>
    ))}
  </div>

  {/* ALAREUNAN PIENI DESIGN-YKSITYISKOHTA */}
  <div className="relative mt-5 flex items-center gap-2">
    <div className="h-px w-8 bg-purple-500/40" />
    <div className="h-1 w-1 rotate-45 bg-purple-400/60" />
    <div className="h-px w-14 bg-gradient-to-r from-purple-500/25 to-transparent" />
  </div>

</div>

          {/* PALVELUN TYYPPI */}
          <div className="relative mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-purple-400/20 bg-purple-500/[0.07] px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-purple-300">
              {index === 4 || index === 5
                ? "Fyysinen tuote"
                : index === 3
                ? "Henkilökohtainen"
                : "Digitaalinen"}
            </span>

            {index < 4 && (
              <span className="rounded-full border border-fuchsia-400/15 bg-fuchsia-500/[0.05] px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-fuchsia-200">
                {index === 3 ? "Online" : "Custom"}
              </span>
            )}
          </div>

          {/* ALAOSA */}
          <div className="relative mt-auto pt-8">
            <div className="border-t border-purple-500/15 pt-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
                    Hinta
                  </p>

{service.offer ? (
  <div className="mt-2">
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-lg font-bold text-gray-500 line-through">
        {service.oldPrice}
      </span>

      <span className="rounded-lg border border-fuchsia-400/40 bg-fuchsia-500/10 px-2.5 py-1 text-xs font-black text-fuchsia-300 shadow-[0_0_16px_rgba(217,70,239,0.15)]">
        {service.discount}
      </span>
    </div>

    <p className="mt-1 bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-300 bg-clip-text text-4xl font-black text-transparent">
      {service.price}
    </p>

    <div className="mt-4 rounded-xl border border-purple-500/20 bg-black/30 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-500">
            Avaustarjous
          </p>

          <p className="mt-1 text-xs font-bold text-purple-200">
            Voimassa rajoitetun ajan
          </p>
        </div>


      </div>
    </div>
  </div>
) : (
  <p className="mt-2 text-3xl font-black text-purple-300">
    {service.price}
  </p>
)}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  aria-label={`Lisätiedot palvelusta ${service.title}`}
                  className="group/more hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/[0.07] shadow-[0_0_18px_rgba(168,85,247,0.08)] transition hover:-translate-y-0.5 hover:border-purple-300/60 hover:bg-purple-500/[0.14] hover:shadow-[0_0_26px_rgba(168,85,247,0.18)] sm:flex"
                  title="Lisätiedot"
                >
                  <span className="text-lg font-black text-purple-300 transition group-hover/more:translate-x-0.5 group-hover/more:text-white">
                    →
                  </span>
                </button>
              </div>

              {service.title === "Stream Overlay" ? (
                <button
                  type="button"
                  onClick={() => {
                    setPaymentSuccess(false);
                    setOrderStatus("");
                    setOrderOpen(true);
                  }}
                  className="mt-6 w-full rounded-xl border border-fuchsia-400/45 bg-gradient-to-r from-purple-600/80 to-fuchsia-600/70 px-5 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_0_28px_rgba(168,85,247,0.20)] transition hover:-translate-y-0.5 hover:border-fuchsia-300/70 hover:shadow-[0_0_38px_rgba(217,70,239,0.28)]"
                >
                  Tilaa Stream Overlay
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-6 w-full cursor-not-allowed rounded-xl border border-purple-500/30 bg-[linear-gradient(90deg,rgba(126,34,206,0.14),rgba(192,38,211,0.08))] px-5 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-purple-300 opacity-80 shadow-[inset_0_0_20px_rgba(168,85,247,0.04)]"
                >
                  Tilaus avautuu pian
                </button>
              )}
            </div>
          </div>

          {/* KORTIN ALAOSAN HIMMEÄ VÄRI */}
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[92%] -translate-x-1/2 rounded-full bg-purple-600/[0.13] blur-[85px]" />

          {/* HIMMEÄ KS ALAKULMASSA */}
          <img
            src="/images/ks-logo.png.png"
            alt=""
            className="pointer-events-none absolute -bottom-12 -left-10 w-[170px] rotate-[12deg] object-contain opacity-[0.024] transition duration-500 group-hover:opacity-[0.04]"
          />

          {/* ALAREUNAN HEHKU */}
          <div className="pointer-events-none absolute inset-x-16 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
        </article>
      ))}
    </div>
  </div>
</section>

/* PALVELUT RAKENTEILLA */}
        <section className="relative overflow-hidden border-y border-purple-500/15 bg-[linear-gradient(110deg,rgba(88,28,135,0.20),rgba(3,1,5,0.98),rgba(112,26,117,0.16))] px-6 py-16">
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
                Muut palvelut ovat vielä
                <span className="ml-2 bg-gradient-to-r from-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
                  rakenteilla.
                </span>
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-gray-400">
                Stream Overlay on ensimmäinen avattu palvelu. Muita palvelupaketteja, hintoja ja tilausjärjestelmää viimeistellään parhaillaan.
                Loput palvelut avataan vaiheittain, kun kokonaisuus on valmis.
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
              Stream Overlay nyt tilattavissa
            </h2>

            <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
              Ensimmäinen KOPOSQUAD Creative -palvelu on avattu.
              Muut palvelupaketit ja tilausjärjestelmän seuraavat vaiheet valmistuvat vähitellen.
            </p>

            <div className="relative mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-purple-400/30 bg-black/35 px-5 py-2 text-sm font-black uppercase tracking-[0.15em] text-purple-300">
              <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.8)]" />
              Tilattavissa
            </div>
          </div>
        </section>

        {/* PALVELUN LISÄTIEDOT - MODAALI */}
        {selectedService && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <div
              className="relative my-auto w-full max-w-3xl overflow-hidden rounded-[32px] border border-purple-400/35 bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.20),transparent_42%),linear-gradient(145deg,rgba(24,12,31,0.99),rgba(5,3,8,0.99))] p-6 shadow-[0_0_100px_rgba(126,34,206,0.30)] sm:p-8 md:p-10"
              onClick={(event) => event.stopPropagation()}
            >
              {/* MODAALIN TAUSTAELEMENTIT */}
              <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-fuchsia-600/15 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-32 -left-28 h-72 w-72 rounded-full bg-purple-700/15 blur-[100px]" />

              <img
                src="/images/ks-logo.png.png"
                alt=""
                className="pointer-events-none absolute -right-14 bottom-[-20px] w-[260px] rotate-[-12deg] object-contain opacity-[0.035]"
              />

              {/* SULJE */}
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/30 bg-black/40 text-xl font-black text-purple-200 transition hover:border-purple-300/60 hover:bg-purple-500/10 hover:text-white"
                aria-label="Sulje lisätiedot"
              >
                ×
              </button>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 pr-14">
                  <span className="rounded-full border border-purple-400/25 bg-purple-500/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-purple-300">
                    {selectedService.category}
                  </span>

                  <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-fuchsia-200">
                    Lisätiedot
                  </span>
                </div>

                <h2 className="mt-6 max-w-2xl text-3xl font-black uppercase leading-[1.05] sm:text-4xl md:text-5xl">
                  {selectedService.detailsTitle}
                </h2>

                <div className="mt-6 flex items-center gap-3">
                  <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-fuchsia-500" />
                  <div className="h-1.5 w-1.5 rotate-45 bg-purple-300 shadow-[0_0_10px_rgba(216,180,254,0.8)]" />
                  <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
                </div>

                <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
                  {selectedService.detailsIntro}
                </p>

                <div className="mt-8 rounded-2xl border border-purple-500/20 bg-black/30 p-5 sm:p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-purple-300">
                    Tarkemmin palvelusta
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {selectedService.details.map((detail) => (
                      <div
                        key={detail}
                        className="flex items-start gap-3 rounded-xl border border-purple-500/10 bg-purple-500/[0.035] px-4 py-3 text-sm leading-6 text-gray-300"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-purple-400/35 bg-purple-500/10 text-[10px] font-black text-purple-200">
                          ✓
                        </span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-fuchsia-500/15 bg-fuchsia-500/[0.035] p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-fuchsia-300">
                    Hyvä tietää
                  </p>
                  <p className="mt-3 leading-7 text-gray-400">
                    {selectedService.detailsNote}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-purple-500/20 bg-purple-500/[0.035] p-4">
                  <p className="text-sm leading-6 text-gray-400">
                    Stream Overlay -tilaus avautuu omassa tilauslomakkeessaan, jossa tiedot tarkistetaan ennen maksua.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="rounded-xl border border-purple-500/30 bg-black/30 px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-purple-200 transition hover:border-purple-300/50 hover:bg-purple-500/[0.08]"
                  >
                    Sulje
                  </button>

                  {selectedService.title === "Stream Overlay" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedService(null);
                        setOrderOpen(true);
                      }}
                      className="rounded-xl border border-fuchsia-400/45 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_0_28px_rgba(168,85,247,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_0_38px_rgba(217,70,239,0.30)]"
                    >
                      Tilaa Stream Overlay
                    </button>
                  ) : (
                    <span className="rounded-xl border border-purple-500/20 bg-purple-500/[0.05] px-5 py-3 text-center text-xs font-black uppercase tracking-[0.10em] text-purple-300">
                      Tilaus avautuu myöhemmin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STREAM OVERLAY - TILAUSMODAALI */}
        {orderOpen && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/85 px-4 py-8 backdrop-blur-md animate-[fadeIn_180ms_ease-out]"
            onClick={() => {
              setOrderOpen(false);
              setPaymentStep(false);
              setPendingOrderData(null);
              setOrderStatus("");
              setPaymentSuccess(false);
            }}
          >
            <form
              className="relative my-auto w-full max-w-4xl overflow-hidden rounded-[32px] border border-fuchsia-400/35 bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.22),transparent_42%),linear-gradient(145deg,rgba(24,12,31,0.995),rgba(5,3,8,0.995))] p-6 shadow-[0_0_110px_rgba(126,34,206,0.32)] sm:p-8 md:p-10 animate-[modalPop_220ms_cubic-bezier(0.16,1,0.3,1)]"
              onClick={(event) => event.stopPropagation()}
              onSubmit={async (event) => {
                event.preventDefault();

                if (selectedOverlayItems.length === 0) {
                  setOrderStatus(
                    "Valitse vähintään yksi overlay-pakettiin kuuluva kohta."
                  );
                  return;
                }

                try {
                  const form = event.currentTarget;
                  const formData = new FormData(form);

                  selectedOverlayItems.forEach((item) => {
                    formData.append("overlayItems", item);
                  });

                  setPendingOrderData(formData);
                  setPaymentStep(true);
                  setOrderStatus(
                    "Tiedot tarkistettu. Valitse alta PayPal-maksutapa jatkaaksesi."
                  );
                } catch (error) {
                  setOrderStatus(
                    error instanceof Error
                      ? error.message
                      : "Maksuvaiheen avaaminen epäonnistui."
                  );
                }
              }}
            >
              <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-fuchsia-600/15 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-32 -left-28 h-72 w-72 rounded-full bg-purple-700/15 blur-[100px]" />

              <img
                src="/images/ks-logo.png.png"
                alt=""
                className="pointer-events-none absolute -right-14 bottom-[-25px] w-[280px] rotate-[-12deg] object-contain opacity-[0.035]"
              />

              <button
                type="button"
                onClick={() => {
                  setOrderOpen(false);
                  setPaymentStep(false);
                  setPendingOrderData(null);
                  setOrderStatus("");
                  setPaymentSuccess(false);
                  setPaymentSuccess(false);
                }}
                className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/30 bg-black/40 text-xl font-black text-purple-200 transition hover:rotate-90 hover:border-purple-300/60 hover:bg-purple-500/10 hover:text-white"
                aria-label="Sulje tilaus"
              >
                ×
              </button>

              <div className="relative z-10">
                {paymentSuccess ? (
                  <div className="mx-auto flex min-h-[560px] max-w-2xl flex-col items-center justify-center py-10 text-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/35 bg-emerald-400/[0.08] shadow-[0_0_55px_rgba(52,211,153,0.18)]">
                      <span className="text-5xl font-black text-emerald-300">✓</span>
                    </div>

                    <p className="mt-8 text-[11px] font-black uppercase tracking-[0.34em] text-emerald-300">
                      Maksu onnistui
                    </p>

                    <h2 className="mt-4 text-3xl font-black uppercase leading-[1.05] sm:text-4xl md:text-5xl">
                      Tilaus vastaanotettu
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-400">
Kiitos tilauksestasi! Maksu on vahvistettu onnistuneesti ja tilauksesi
on vastaanotettu.
                    </p>

<div className="mt-8 w-full rounded-2xl border border-purple-500/20 bg-purple-500/[0.035] p-5">
  <p className="text-sm leading-6 text-gray-400">
    Seuraavaksi käymme tilauksesi tiedot ja toiveet läpi. Olemme sinuun
    yhteydessä antamiesi yhteystietojen kautta, kun työn toteutus aloitetaan.
  </p>
</div>

                    <button
                      type="button"
                      onClick={() => {
                        setOrderOpen(false);
                        setPaymentStep(false);
                        setPendingOrderData(null);
                        setOrderStatus("");
                        setPaymentSuccess(false);
                      }}
                      className="mt-8 w-full rounded-xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/20 via-purple-600/35 to-fuchsia-600/30 px-7 py-4 text-sm font-black uppercase tracking-[0.10em] text-white shadow-[0_0_32px_rgba(52,211,153,0.10)] transition hover:-translate-y-0.5 hover:border-emerald-300/50 hover:shadow-[0_0_42px_rgba(168,85,247,0.20)]"
                    >
                      Palaa palveluihin
                    </button>
                  </div>
                ) : (
                  <>
                <div className="flex flex-wrap items-center gap-3 pr-14">
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.20em] text-emerald-300">
                    ● Tilattavissa
                  </span>
                  <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-fuchsia-200">
                    Avaustarjous -40 %
                  </span>
                </div>

                <p className="mt-6 text-xs font-black uppercase tracking-[0.30em] text-purple-400">
                  KOPOSQUAD CREATIVE
                </p>

                <h2 className="mt-3 text-3xl font-black uppercase leading-[1.05] sm:text-4xl md:text-5xl">
                  Stream Overlay -tilaus
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400">
                  Kerro kanavastasi ja siitä, millaisen overlay-kokonaisuuden haluat.
                  Näiden tietojen pohjalta tilaus voidaan käydä läpi ennen työn aloittamista.
                </p>

                <div className="mt-7 flex flex-wrap items-end gap-3 rounded-2xl border border-purple-500/20 bg-black/30 p-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.24em] text-gray-500">
                      Avaushinta
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-base font-bold text-gray-500 line-through">
                        99,99 €
                      </span>

                      <span className="rounded-lg border border-fuchsia-400/40 bg-fuchsia-500/10 px-2.5 py-1 text-xs font-black text-fuchsia-300">
                        -40 %
                      </span>
                    </div>

                    <p className="mt-1 bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-300 bg-clip-text text-4xl font-black text-transparent">
                      59,99 €
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                      Nimi *
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Nimesi"
                      className="mt-2 w-full rounded-xl border border-purple-500/25 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-purple-500/[0.04]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                      Sähköposti *
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="sinun@email.fi"
                      className="mt-2 w-full rounded-xl border border-purple-500/25 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-purple-500/[0.04]"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                      Kanavan nimi / linkki *
                    </span>
                    <input
                      type="text"
                      name="channel"
                      required
                      placeholder="Esim. Twitch-, YouTube- tai Kick-kanavasi"
                      className="mt-2 w-full rounded-xl border border-purple-500/25 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-purple-500/[0.04]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                      Toteutustapa *
                    </span>
                    <select
                      name="implementation"
                      defaultValue=""
                      required
                      className="mt-2 w-full rounded-xl border border-purple-500/25 bg-[#09060c] px-4 py-3.5 text-white outline-none transition focus:border-purple-400/60"
                    >
                      <option value="" disabled>
                        Valitse toteutustapa
                      </option>
                      <option>Kuvallinen overlay</option>
                      <option>Animoitu overlay</option>
                      <option>En ole vielä varma</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                      Väriteema *
                    </span>
                    <input
                      type="text"
                      name="colorTheme"
                      required
                      placeholder="Esim. violetti / musta"
                      className="mt-2 w-full rounded-xl border border-purple-500/25 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-purple-500/[0.04]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                      Discord-käyttäjänimi *
                    </span>
                    <input
                      type="text"
                      name="discord"
                      required
                      placeholder="Esim. kopo123"
                      className="mt-2 w-full rounded-xl border border-purple-500/25 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-purple-500/[0.04]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                      Pääasiallinen alusta *
                    </span>
                    <select
                      name="platform"
                      defaultValue=""
                      required
                      className="mt-2 w-full rounded-xl border border-purple-500/25 bg-[#09060c] px-4 py-3.5 text-white outline-none transition focus:border-purple-400/60"
                    >
                      <option value="" disabled>
                        Valitse alusta
                      </option>
                      <option>Twitch</option>
                      <option>YouTube</option>
                      <option>Kick</option>
                      <option>Muu</option>
                    </select>
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                      Logo ja muu materiaali
                      <span className="ml-2 text-gray-500">(vapaaehtoinen)</span>
                    </span>

                    <div className="mt-2 rounded-2xl border border-dashed border-purple-400/30 bg-purple-500/[0.035] p-5 transition hover:border-purple-300/50 hover:bg-purple-500/[0.05]">
                      <input
                        type="file"
                        name="materials"
                        multiple
                        accept="image/*,.zip,.rar,.psd,.svg"
                        className="block w-full text-sm text-gray-400 file:mr-4 file:rounded-xl file:border-0 file:bg-purple-500/15 file:px-4 file:py-2.5 file:font-black file:text-purple-200 hover:file:bg-purple-500/25"
                      />

                      <p className="mt-3 text-xs leading-6 text-gray-500">
                        Voit lisätä esimerkiksi logon, hahmon, kuvia tai muuta materiaalia,
                        jota haluat käyttää overlayn suunnittelussa.
                      </p>
                    </div>
                  </label>

                  <div className="sm:col-span-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                      Mitä haluat overlay-pakettiin? *
                    </span>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {[
                        "Starting Soon -ruutu",
                        "BRB-ruutu",
                        "Ending-ruutu",
                        "Gameplay-overlay",
                        "Kamera-overlay",
                        "Alerttien tyyli",
                      ].map((item) => {
                        const checked = selectedOverlayItems.includes(item);

                        return (
                          <label
                            key={item}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                              checked
                                ? "border-fuchsia-400/40 bg-fuchsia-500/[0.08] text-white"
                                : "border-purple-500/15 bg-purple-500/[0.035] text-gray-300 hover:border-purple-400/35 hover:bg-purple-500/[0.06]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                setSelectedOverlayItems((current) =>
                                  current.includes(item)
                                    ? current.filter((value) => value !== item)
                                    : [...current, item]
                                )
                              }
                              className="h-4 w-4 accent-purple-500"
                            />
                            <span>{item}</span>
                          </label>
                        );
                      })}
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      Valitse vähintään yksi kohta.
                    </p>
                  </div>

                  <label className="block sm:col-span-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                      Millaisen overlayn haluat? *
                    </span>

                    <textarea
                      name="description"
                      rows={5}
                      required
                      minLength={15}
                      placeholder="Kerro tyylistä, väreistä, teksteistä, tunnelmasta ja muista toiveista mahdollisimman tarkasti..."
                      className="mt-2 w-full resize-y rounded-xl border border-purple-500/25 bg-black/40 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-purple-500/[0.04]"
                    />
                  </label>
                </div>

                <div className="mt-7 rounded-2xl border border-purple-500/20 bg-purple-500/[0.035] p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-purple-300">
                    Ennen tilausta
                  </p>

                  <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-300">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      value="yes"
                      required
                      className="mt-1 h-4 w-4 shrink-0 accent-purple-500"
                    />
                    <span>
                      Olen tarkistanut antamani tiedot ja ymmärrän, että työ tehdään
                      antamieni toiveiden pohjalta. Hyväksyn tilauksen sisällön ja sen,
                      että työn tarkemmat yksityiskohdat voidaan varmistaa ennen työn aloittamista.
                    </span>
                  </label>
                </div>

                {orderStatus && (
                  <div className="mt-6 rounded-xl border border-purple-400/25 bg-purple-500/[0.05] px-4 py-3 text-sm text-purple-100">
                    {orderStatus}
                  </div>
                )}

                {paymentStep && pendingOrderData && (
                  <div className="mt-7 rounded-2xl border border-fuchsia-400/25 bg-black/35 p-5">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-purple-300">
                          Maksuvaihe
                        </p>
                        <p className="mt-2 text-sm leading-6 text-gray-400">
                          Maksettava summa:
                          <strong className="ml-2 text-white">59,99 €</strong>
                        </p>
                      </div>

<span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-emerald-300">
  Turvallinen maksu
</span>
                    </div>

                    <div
                      ref={paypalContainerRef}
                      className="min-h-[48px] overflow-hidden rounded-xl"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentStep(false);
                        setPendingOrderData(null);
                        setOrderStatus("");
                      }}
                      className="mt-4 w-full rounded-xl border border-purple-500/25 bg-purple-500/[0.04] px-4 py-3 text-xs font-black uppercase tracking-[0.08em] text-purple-200 transition hover:border-purple-300/50 hover:bg-purple-500/[0.08]"
                    >
                      Takaisin muokkaamaan tilausta
                    </button>
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderOpen(false);
                      setPaymentStep(false);
                      setPendingOrderData(null);
                      setOrderStatus("");
                    }}
                    className="rounded-xl border border-purple-500/30 bg-black/30 px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-purple-200 transition hover:border-purple-300/50 hover:bg-purple-500/[0.08]"
                  >
                    Peruuta
                  </button>

                  {!paymentStep && (
                    <button
                      type="submit"
                      disabled={orderSending}
                      className="rounded-xl border border-fuchsia-400/45 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-7 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_0_28px_rgba(168,85,247,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_0_38px_rgba(217,70,239,0.30)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {orderSending ? "Käsitellään..." : "Jatka maksuun"}
                    </button>
                  )}
                </div>
                  </>
                )}
              </div>

              <style jsx global>{`
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }

                @keyframes modalPop {
                  from {
                    opacity: 0;
                    transform: translateY(24px) scale(0.96);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                  }
                }
              `}</style>
            </form>
          </div>
        )}

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