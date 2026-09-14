"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import { createClient } from "@/lib/supabase/client";

export default function KirjauduPage() {
  const router = useRouter();
  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

const loginEmail = `${username.toLowerCase().trim()}@koposquad.local`;

const { error } = await supabase.auth.signInWithPassword({
  email: loginEmail,
  password,
});

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/jasenalue");
    router.refresh();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Header activePage="kirjaudu" />

      {/* TAUSTA */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-52 top-[12%] h-[620px] w-[620px] rounded-full bg-purple-700/15 blur-[190px]" />

        <div className="absolute -right-52 top-[24%] h-[580px] w-[580px] rounded-full bg-fuchsia-700/10 blur-[180px]" />

        <div className="absolute bottom-[-260px] left-1/2 h-[520px] w-[950px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[210px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(126,34,206,0.08),transparent_55%)]" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-16 pt-28">
        <div className="w-full max-w-lg">
          {/* YLÄOSA */}
          <div className="mb-8 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/[0.07] px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400 shadow-[0_0_14px_rgba(192,132,252,0.8)]" />

              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-purple-300">
                Jäsenalue aukeamassa
              </span>
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.36em] text-purple-400">
              KOPOSQUAD MEMBER AREA
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Kirjaudu
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-400">
              KOPOSQUADin jäsenalue on rakenteilla. Jäsenet saavat omat
              tunnuksensa, kun alue avataan käyttöön.
            </p>
          </div>

          {/* KIRJAUTUMISLAATIKKO */}
          <div className="relative overflow-hidden rounded-[30px] border border-purple-500/25 bg-[linear-gradient(145deg,rgba(15,8,22,0.92),rgba(5,3,8,0.96))] p-6 shadow-[0_0_80px_rgba(126,34,206,0.14),0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-600/10 blur-[70px]" />

            <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-fuchsia-600/5 blur-[80px]" />

            <div className="relative z-10">
              {/* PIENI STATUS-OSA */}
              <div className="mb-7 rounded-2xl border border-purple-500/20 bg-purple-500/[0.045] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-purple-300">
                  Jäsenkirjautuminen
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Kirjautuminen otetaan käyttöön vaiheittain. Tunnuksia ei
                  jaeta vielä ennen jäsenalueen virallista avausta.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                    Käyttäjänimi
                  </span>

                  <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    placeholder="Käyttäjänimi"
                    className="mt-2 w-full rounded-xl border border-purple-500/20 bg-black/45 px-4 py-3.5 text-white outline-none placeholder:text-gray-600 transition focus:border-purple-400/70 focus:bg-black/60"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-[0.20em] text-purple-300">
                    Salasana
                  </span>

                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    placeholder="Salasana"
                    className="mt-2 w-full rounded-xl border border-purple-500/20 bg-black/45 px-4 py-3.5 text-white outline-none placeholder:text-gray-600 transition focus:border-purple-400/70 focus:bg-black/60"
                  />
                </label>

                {errorMessage && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-2 w-full overflow-hidden rounded-xl border border-purple-400/40 bg-gradient-to-r from-purple-700/30 via-purple-600/25 to-fuchsia-700/25 px-5 py-3.5 text-sm font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-purple-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {loading ? "Kirjaudutaan..." : "Kirjaudu jäsenalueelle"}
                  </span>

                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
              </form>

              <div className="mt-7 border-t border-white/10 pt-5 text-center">
                <p className="text-xs leading-5 text-gray-500">
                  Tunnukset annetaan vain KOPOSQUADin jäsenille jäsenalueen
                  avaamisen yhteydessä.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-gray-700">
            KOPOSQUAD • MEMBER SYSTEM
          </p>
        </div>
      </section>
    </main>
  );
}