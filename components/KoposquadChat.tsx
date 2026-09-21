"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Sender = "bot" | "user";
type Stage =
  | "main"
  | "about"
  | "join"
  | "services"
  | "tv"
  | "helpful"
  | "afterHelpful"
  | "rating"
  | "feedback"
  | "contact"
  | "finished";

type Message = {
  id: number;
  sender: Sender;
  text: string;
  typing?: boolean;
};

type Choice = {
  label: string;
  action: () => void | Promise<void>;
  secondary?: boolean;
};

export default function KoposquadChat() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<Stage>("main");
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [chatHintVisible, setChatHintVisible] = useState(false);
  const [chatHintDismissed, setChatHintDismissed] = useState(false);
  const [ratingStats, setRatingStats] = useState<number[]>([0, 0, 0, 0, 0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Moi! 👋 Olen KOPOSQUADin automaattinen avustaja. Miten voin auttaa?",
    },
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(10);

  const nextId = () => ++idRef.current;

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => window.setTimeout(resolve, ms));

  const addUserMessage = (text: string) => {
    setMessages((current) => [
      ...current,
      { id: nextId(), sender: "user", text },
    ]);
  };

  const addBotMessageAnimated = async (text: string) => {
    const typingId = nextId();

    setMessages((current) => [
      ...current,
      { id: typingId, sender: "bot", text: "", typing: true },
    ]);

    await sleep(650);

    setMessages((current) =>
      current.map((message) =>
        message.id === typingId
          ? { ...message, typing: false, text: "" }
          : message
      )
    );

    const messageId = typingId;
    const step = text.length > 170 ? 4 : text.length > 90 ? 3 : 2;

    for (let i = 0; i < text.length; i += step) {
      const partial = text.slice(0, Math.min(i + step, text.length));

      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? { ...message, text: partial }
            : message
        )
      );

      await sleep(12);
    }
  };

  const addExchange = async (question: string, answer: string) => {
    addUserMessage(question);
    await sleep(180);
    await addBotMessageAnimated(answer);
  };

  useEffect(() => {
    if (open || chatHintDismissed) {
      setChatHintVisible(false);
      return;
    }

    const showTimer = window.setTimeout(() => setChatHintVisible(true), 1400);
    const hideTimer = window.setTimeout(() => setChatHintVisible(false), 10000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [open, chatHintDismissed]);

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => setVisible(true), 10);
      return () => window.clearTimeout(timer);
    }
    setVisible(false);
  }, [open]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("koposquad-chat-ratings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          parsed.length === 5 &&
          parsed.every((value) => typeof value === "number")
        ) {
          setRatingStats(parsed);
        }
      }
    } catch {
      // Local rating history is optional.
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      const area = scrollAreaRef.current;
      if (!area) return;

      area.scrollTo({
        top: area.scrollHeight,
        behavior: "smooth",
      });
    }, 90);

    return () => window.clearTimeout(timer);
  }, [messages, stage, open]);

  const closeChat = () => {
    setVisible(false);
    window.setTimeout(() => setOpen(false), 250);
  };

  const toggleChat = () => {
    if (open) {
      closeChat();
    } else {
      setChatHintDismissed(true);
      setChatHintVisible(false);
      setOpen(true);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: nextId(),
        sender: "bot",
        text: "Moi! 👋 Olen KOPOSQUADin automaattinen avustaja. Miten voin auttaa?",
      },
    ]);
    setStage("main");
    setInput("");
    setHoverRating(0);
  };

  const chooseTopic = async (label: string, answer: string, next: Stage) => {
    setStage("finished");
    await addExchange(label, answer);
    setStage(next);
  };

  const answerThenAskHelp = async (label: string, answer: string) => {
    setStage("finished");
    await addExchange(label, `${answer} Oliko tästä apua?`);
    setStage("helpful");
  };

  const backToMain = async () => {
    setStage("finished");
    await addExchange(
      "Kysy toinen asia",
      "Totta kai! Valitse alta aihe, jossa voin auttaa."
    );
    setStage("main");
  };

  const handleHelpful = async (yes: boolean) => {
    if (yes) {
      setStage("finished");
      await addExchange(
        "Kyllä 👍",
        "Hienoa, että tästä oli apua! 😊 Haluatko kysyä vielä jotain muuta vai päätetäänkö keskustelu tähän?"
      );
      setStage("afterHelpful");
    } else {
      setStage("finished");
      await addExchange(
        "Ei",
        "Selvä — yritetään paremmin. Kerro omin sanoin, mitä haluaisit tietää, tai voit jättää viestin Kopolle."
      );
      setStage("feedback");
    }
  };

  const openRating = () => {
    setHoverRating(0);
    setRatingOpen(true);
  };

  const handleRating = async (stars: number) => {
    const updated = [...ratingStats];
    updated[stars - 1] += 1;
    setRatingStats(updated);

    try {
      window.localStorage.setItem(
        "koposquad-chat-ratings",
        JSON.stringify(updated)
      );
    } catch {
      // Rating still works even if localStorage is unavailable.
    }

    setRatingOpen(false);
    setStage("finished");
    await addExchange(
      `${stars}/5 tähteä`,
      `Kiitos palautteesta! ${"⭐".repeat(stars)} Arviosi auttaa kehittämään KOPOSQUAD Chatia.`
    );
    setStage("finished");
    setHoverRating(0);
  };

  const handleContact = async () => {
    setStage("finished");
    await addExchange(
      "Jätä viesti Kopolle",
      "Henkilökohtainen viestitoiminto on tulossa pian. Siinä voit jättää viestin suoraan Kopolle ja jatkaa samaa keskustelua, kun Kopo vastaa. Haluatko jatkaa nyt automaattisen avustajan kanssa?"
    );
    setStage("contact");
  };

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = input.trim();
    if (!text) return;

    setInput("");
    setStage("finished");
    addUserMessage(text);

    const typingId = nextId();

    setMessages((current) => [
      ...current,
      { id: typingId, sender: "bot", text: "", typing: true },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: messages
            .filter((message) => !message.typing)
            .slice(-12)
            .map((message) => ({
              role: message.sender === "user" ? "user" : "assistant",
              content: message.text,
            })),
        }),
      });

      const data = await response.json();

      setMessages((current) =>
        current.filter((message) => message.id !== typingId)
      );

      if (!response.ok) {
        throw new Error(data.error || "AI-vastaus epäonnistui.");
      }

      await addBotMessageAnimated(
        data.answer || "En saanut muodostettua vastausta juuri nyt."
      );

      setStage("helpful");
    } catch (error) {
      console.error("KOPOSQUAD Chat error:", error);

      setMessages((current) =>
        current.filter((message) => message.id !== typingId)
      );

      await addBotMessageAnimated(
        "En saanut juuri nyt yhteyttä AI-avustajaan. Yritä hetken kuluttua uudelleen tai jätä viesti Kopolle."
      );

      setStage("feedback");
    }
  };

  let choices: Choice[] = [];

  if (stage === "main") {
    choices = [
      {
        label: "Mikä on KOPOSQUAD?",
        action: () =>
          chooseTopic(
            "Mikä on KOPOSQUAD?",
            "KOPOSQUAD on suomalainen striimaaja- ja sisällöntuottajayhteisö. Tarkoituksena on tuoda tekijöitä yhteen, auttaa toisiamme kehittymään ja rakentaa yhdessä näkyvyyttä, sisältöä ja uusia projekteja. Mitä haluaisit tietää lisää?",
            "about"
          ),
      },
      {
        label: "Haluan hakea mukaan",
        action: () =>
          chooseTopic(
            "Haluan hakea mukaan",
            "Mahtavaa! KOPOSQUADiin voivat hakea niin uudet kuin kokeneemmatkin striimaajat ja sisällöntuottajat. Pelkkä seuraajamäärä ei ratkaise. Mitä haluaisit tietää hakemisesta?",
            "join"
          ),
      },
      {
        label: "KOPOSQUAD-palvelut",
        action: () =>
          chooseTopic(
            "KOPOSQUAD-palvelut",
            "KOPOSQUADin palvelut on suunnattu erityisesti striimaajille ja sisällöntuottajille. Mistä haluaisit kuulla lisää?",
            "services"
          ),
      },
      {
        label: "KOPOSQUADTV",
        action: () =>
          chooseTopic(
            "KOPOSQUADTV",
            "KOPOSQUADTV on tiimin yhteinen Twitch-kanava, jossa jäsenet voivat striimata ja tehdä yhteistä sisältöä. Mitä haluaisit tietää siitä?",
            "tv"
          ),
      },
      {
        label: "✉️ Jätä viesti Kopolle",
        action: handleContact,
        secondary: true,
      },
    ];
  }

  if (stage === "about") {
    choices = [
      {
        label: "Mitä jäsenet tekevät?",
        action: () =>
          answerThenAskHelp(
            "Mitä jäsenet tekevät?",
            "Jäsenet tekevät omia striimejä ja sisältöjä, verkostoituvat muiden tekijöiden kanssa ja voivat osallistua yhteisiin projekteihin sekä KOPOSQUADTV:n sisältöön."
          ),
      },
      {
        label: "Voiko uusi striimaaja liittyä?",
        action: () =>
          answerThenAskHelp(
            "Voiko uusi striimaaja liittyä?",
            "Kyllä. KOPOSQUAD ei ole tarkoitettu vain valmiiksi isoille tekijöille, vaan mukaan voivat hakea myös uudemmat tekijät."
          ),
      },
      {
        label: "Miten haen mukaan?",
        action: () =>
          chooseTopic(
            "Miten haen mukaan?",
            "Hakemuksen voi tehdä KOPOSQUADin Liity-osion kautta. Mitä haluaisit tietää hakemisesta?",
            "join"
          ),
      },
      { label: "Takaisin päävalikkoon", action: backToMain, secondary: true },
    ];
  }

  if (stage === "join") {
    choices = [
      {
        label: "Kenelle KOPOSQUAD sopii?",
        action: () =>
          answerThenAskHelp(
            "Kenelle KOPOSQUAD sopii?",
            "Se sopii striimaajille ja sisällöntuottajille, jotka haluavat kehittyä, verkostoitua ja tehdä asioita yhdessä muiden tekijöiden kanssa."
          ),
      },
      {
        label: "Tarvitseeko olla iso striimaaja?",
        action: () =>
          answerThenAskHelp(
            "Tarvitseeko olla iso striimaaja?",
            "Ei tarvitse. Seuraajamäärä yksin ei ratkaise, vaan olennaisempaa on oma tekeminen, motivaatio ja halu olla mukana yhteisössä."
          ),
      },
      {
        label: "Mitä jäsenyys sisältää?",
        action: () =>
          answerThenAskHelp(
            "Mitä jäsenyys sisältää?",
            "Jäsenyyden ideana on yhteisö, verkostoituminen, muiden tekijöiden osaamisen hyödyntäminen, yhteiset projektit ja mahdollisuus tehdä sisältöä myös KOPOSQUADTV:n kautta."
          ),
      },
      {
        label: "Haluan tehdä hakemuksen",
        action: () =>
          answerThenAskHelp(
            "Haluan tehdä hakemuksen",
            "Hyvä! Hakemuksen löydät KOPOSQUAD-sivuston Liity-osiosta."
          ),
      },
      { label: "Takaisin päävalikkoon", action: backToMain, secondary: true },
    ];
  }

  if (stage === "services") {
    choices = [
      {
        label: "Mitä palveluita löytyy?",
        action: () =>
          answerThenAskHelp(
            "Mitä palveluita löytyy?",
            "Palveluissa on sisällöntuottajille tarkoitettuja toteutuksia, kuten stream-grafiikkaa, overlay-ratkaisuja, emote- ja grafiikkapaketteja sekä muita sisältöön liittyviä palveluita."
          ),
      },
      {
        label: "Mistä näen hinnat?",
        action: () =>
          answerThenAskHelp(
            "Mistä näen hinnat?",
            "Ajantasaiset palvelut ja hinnat löytyvät KOPOSQUADin Palvelut-sivulta."
          ),
      },
      {
        label: "Voinko pyytää oman toteutuksen?",
        action: () =>
          answerThenAskHelp(
            "Voinko pyytää oman toteutuksen?",
            "Tavoitteena on lisätä palveluihin myös tarjouspyyntö omalle toteutukselle, jolloin voit kertoa tarkemmin mitä tarvitset."
          ),
      },
      { label: "Takaisin päävalikkoon", action: backToMain, secondary: true },
    ];
  }

  if (stage === "tv") {
    choices = [
      {
        label: "Kuka siellä striimaa?",
        action: () =>
          answerThenAskHelp(
            "Kuka siellä striimaa?",
            "KOPOSQUADTV on yhteinen tiimikanava, joten siellä voivat striimata KOPOSQUADin jäsenet sovittujen vuorojen ja yhteisten sisältöjen mukaan."
          ),
      },
      {
        label: "Mitä sisältöä siellä tulee?",
        action: () =>
          answerThenAskHelp(
            "Mitä sisältöä siellä tulee?",
            "Sisältö voi vaihdella jäsenen ja lähetyksen mukaan. Tarkoituksena on tehdä yhteistä KOPOSQUAD-sisältöä ja antaa jäsenille mahdollisuus näkyä tiimin yhteisellä kanavalla."
          ),
      },
      {
        label: "Voinko päästä sinne striimaamaan?",
        action: () =>
          answerThenAskHelp(
            "Voinko päästä sinne striimaamaan?",
            "KOPOSQUADTV on tarkoitettu KOPOSQUADin jäsenille. Jos haluat mukaan toimintaan, voit aloittaa hakemalla KOPOSQUADiin."
          ),
      },
      { label: "Takaisin päävalikkoon", action: backToMain, secondary: true },
    ];
  }

  if (stage === "helpful") {
    choices = [
      { label: "Kyllä 👍", action: () => handleHelpful(true) },
      { label: "Ei", action: () => handleHelpful(false), secondary: true },
      { label: "Kysy toinen asia", action: backToMain, secondary: true },
    ];
  }

  if (stage === "afterHelpful") {
    choices = [
      {
        label: "Kysy vielä jotain",
        action: backToMain,
      },
      {
        label: "Päätä keskustelu",
        action: async () => {
          setStage("finished");
          await addExchange(
            "Päätä keskustelu",
            "Kiitos keskustelusta! 💜 Ennen kuin lopetetaan, haluaisitko antaa chatille arvosanan?"
          );
          setStage("rating");
          openRating();
        },
        secondary: true,
      },
    ];
  }

  if (stage === "feedback") {
    choices = [
      { label: "✉️ Jätä viesti Kopolle", action: handleContact },
      { label: "Kysy toinen aihe", action: backToMain, secondary: true },
    ];
  }

  if (stage === "contact") {
    choices = [
      {
        label: "💬 Jatka keskustelua",
        action: async () => {
          setStage("finished");
          await addExchange(
            "Jatka keskustelua",
            "Totta kai! 😊 Mistä haluaisit jutella seuraavaksi?"
          );
          setStage("main");
        },
      },
      {
        label: "← Takaisin päävalikkoon",
        action: backToMain,
        secondary: true,
      },
    ];
  }

  if (stage === "finished") {
    choices = [{ label: "Aloita uusi keskustelu", action: resetChat }];
  }

  const showInput =
    stage !== "rating" && stage !== "finished";

  return (
    <>
      {open && (
        <div
          className={`fixed bottom-24 right-5 z-[9999] flex max-h-[min(680px,calc(100vh-120px))] w-[390px] max-w-[calc(100vw-40px)] flex-col overflow-hidden rounded-3xl border border-purple-500/30 bg-[#09070d] shadow-[0_20px_80px_rgba(0,0,0,0.75)] transition-all duration-300 ease-out ${
            visible
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-5 scale-[0.96] opacity-0"
          }`}
        >
          <div className="relative shrink-0 overflow-hidden border-b border-purple-500/20 bg-gradient-to-r from-purple-950 to-[#0b0710] px-5 py-5">
            <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-purple-500/20 blur-3xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-500/10 p-1.5">
                  <img
                    src="/images/ks-logo.png.png"
                    alt="KOPOSQUAD"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <p className="font-black text-white">KOPOSQUAD Chat</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="text-xs text-zinc-400">
                      Automaattinen avustaja
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={closeChat}
                className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-zinc-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Sulje chat"
              >
                ×
              </button>
            </div>
          </div>

          <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-5">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] px-4 py-3 text-sm leading-6 ${
                      message.sender === "user"
                        ? "rounded-2xl rounded-tr-md border border-purple-400/30 bg-purple-600/20 text-white"
                        : "rounded-2xl rounded-tl-md border border-white/[0.06] bg-white/[0.05] text-zinc-200"
                    }`}
                  >
                    {message.typing ? (
                      <span className="flex h-6 items-center gap-1.5">
                        {[0, 1, 2].map((dot) => (
                          <span
                            key={dot}
                            className="h-2 w-2 animate-bounce rounded-full bg-purple-300"
                            style={{ animationDelay: `${dot * 120}ms` }}
                          />
                        ))}
                      </span>
                    ) : (
                      <span className="animate-[fadeIn_.22s_ease-out]">
                        {message.text}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>



            {choices.length > 0 && (
              <div className="mt-5 grid gap-2">
                <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  {stage === "main"
                    ? "Valitse aihe"
                    : stage === "helpful"
                    ? "Oliko tästä apua?"
                    : stage === "afterHelpful"
                    ? "Mitä haluat tehdä?"
                    : stage === "finished"
                    ? "Mitä seuraavaksi?"
                    : stage === "contact"
                    ? "Mitä haluat tehdä?"
                    : "Jatka keskustelua"}
                </p>

                {choices.map((choice) => (
                  <button
                    key={choice.label}
                    onClick={choice.action}
                    className={`rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                      choice.secondary
                        ? "border border-white/10 bg-white/[0.03] text-zinc-300 hover:border-purple-400/40 hover:bg-white/[0.06] hover:text-white"
                        : "border border-purple-500/20 bg-purple-500/[0.07] text-zinc-200 hover:border-purple-400/50 hover:bg-purple-500/[0.13] hover:text-white"
                    }`}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {ratingOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden rounded-3xl bg-black/35 px-5 backdrop-blur-md">
              <div className="relative w-full max-w-[340px] animate-[ratingPop_.35s_cubic-bezier(.2,.9,.2,1.15)] overflow-hidden rounded-3xl border border-purple-400/35 bg-[#0c0711]/95 p-6 shadow-[0_0_55px_rgba(147,51,234,0.35)]">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-600/25 blur-3xl" />

                <div className="relative text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/10">
                    <img
                      src="/images/ks-logo.png.png"
                      alt="KOPOSQUAD"
                      className="h-10 w-10 object-contain"
                    />
                  </div>

                  <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-300">
                    KOPOSQUAD Chat
                  </p>

                  <h3 className="mt-2 text-xl font-black text-white">
                    Miten onnistuimme?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Anna keskustelulle 1–5 tähteä.
                  </p>

                  <div className="mt-6 flex justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-4xl transition duration-200 hover:-translate-y-2 hover:scale-125"
                        aria-label={`${star} tähteä`}
                      >
                        <span
                          className={`drop-shadow-[0_0_12px_rgba(250,204,21,0.25)] transition ${
                            star <= hoverRating
                              ? "text-yellow-300"
                              : "text-zinc-700"
                          }`}
                        >
                          ★
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setRatingOpen(false);
                      setStage("finished");
                    }}
                    className="mt-6 text-xs font-bold text-zinc-500 transition hover:text-white"
                  >
                    Ohita arviointi
                  </button>
                </div>
              </div>
            </div>
          )}

          {showInput ? (
            <form
              onSubmit={handleSend}
              className="shrink-0 border-t border-white/[0.06] bg-[#070509] p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  type="text"
                  placeholder={
                    stage === "feedback"
                      ? "Kerro miten voisin auttaa paremmin..."
                      : "Kirjoita viesti..."
                  }
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/50"
                />

                <button
                  type="submit"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-600 text-lg text-white transition hover:bg-purple-500"
                  aria-label="Lähetä viesti"
                >
                  ↑
                </button>
              </div>

              <p className="mt-2 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-700">
                KOPOSQUAD • Automaattinen chat
              </p>
            </form>
          ) : (
            <div className="shrink-0 border-t border-white/[0.06] bg-[#070509] px-4 py-3 text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-700">
                KOPOSQUAD • Automaattinen chat
              </p>
            </div>
          )}
        </div>
      )}

      {!open && (
        <button
          type="button"
          onClick={toggleChat}
          onMouseEnter={() => setChatHintVisible(true)}
          onMouseLeave={() => {
            if (chatHintDismissed) setChatHintVisible(false);
          }}
          className={`fixed bottom-7 right-[96px] z-[9998] hidden min-w-[220px] origin-bottom-right rounded-2xl border border-purple-400/25 bg-[#0d0912]/95 px-4 py-3 text-left shadow-[0_16px_50px_rgba(0,0,0,0.55),0_0_30px_rgba(147,51,234,0.14)] backdrop-blur-xl transition-all duration-500 sm:block ${
            chatHintVisible
              ? "pointer-events-auto translate-x-0 scale-100 opacity-100"
              : "pointer-events-none translate-x-3 scale-[0.96] opacity-0"
          }`}
          aria-label="Avaa KOPOSQUAD Chat"
        >
          <span className="absolute -right-2 bottom-5 h-4 w-4 rotate-45 border-r border-t border-purple-400/25 bg-[#0d0912]" />
          <span className="relative block text-sm font-black text-white">
            👋 Moi! Kuinka voin auttaa?
          </span>
          <span className="relative mt-1 block text-xs text-zinc-400">
            Kysy KOPOSQUADista
          </span>
        </button>
      )}

      <button
        onClick={toggleChat}
        onMouseEnter={() => {
          if (!open) setChatHintVisible(true);
        }}
        onMouseLeave={() => {
          if (!open && chatHintDismissed) setChatHintVisible(false);
        }}
        className={`group fixed bottom-5 right-5 z-[9999] flex h-16 w-16 items-center justify-center rounded-full border border-purple-400/40 bg-gradient-to-br from-purple-600 to-purple-950 shadow-[0_0_35px_rgba(147,51,234,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(168,85,247,0.5)] ${
          !open ? "animate-[chatFloat_3.4s_ease-in-out_infinite]" : ""
        }`}
        aria-label={open ? "Sulje KOPOSQUAD Chat" : "Avaa KOPOSQUAD Chat"}
      >
        {open ? (
          <span className="text-2xl font-bold text-white">×</span>
        ) : (
          <img
            src="/images/ks-logo.png.png"
            alt="KOPOSQUAD"
            className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
          />
        )}

        {!open && (
          <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-[#09070d] bg-green-400" />
        )}
      </button>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes chatFloat {
          0%,
          100% {
            transform: translateY(0);
            box-shadow: 0 0 35px rgba(147, 51, 234, 0.35);
          }
          50% {
            transform: translateY(-6px);
            box-shadow: 0 0 48px rgba(168, 85, 247, 0.52);
          }
        }

        @keyframes ratingPop {
          0% {
            opacity: 0;
            transform: scale(0.78) translateY(24px);
          }
          70% {
            opacity: 1;
            transform: scale(1.035) translateY(-3px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}