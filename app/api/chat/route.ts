import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = String(body.message || "").trim();

    if (!message) {
      return NextResponse.json(
        { error: "Kysymys puuttuu." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

      instructions: `
Olet KOPOSQUAD-verkkosivuston automaattinen AI-avustaja.

Vastaa ensisijaisesti suomeksi.
Ole ystävällinen, rento ja selkeä.
Pidä vastaukset melko lyhyinä ja helposti ymmärrettävinä.

Autat käyttäjiä KOPOSQUADiin ja sen verkkosivustoon liittyvissä asioissa,
kuten sivuston käytössä, KOPOSQUADTV:ssä, jäsenissä, palveluissa,
hakemisessa mukaan, striimauksessa ja sivustolla esiintyvissä ongelmissa.

Jos käyttäjä kertoo sivustolla olevasta ongelmasta, auta selvittämään sitä
ja kysy tarvittaessa tarkentava kysymys.

Älä keksi KOPOSQUADista tietoja, joita et varmasti tiedä.
Jos et pysty varmistamaan vastausta, kerro se käyttäjälle ja ehdota,
että hän jättää viestin Kopolle.

Älä väitä olevasi Kopo tai ihminen.
Olet KOPOSQUADin automaattinen AI-avustaja.
      `,

      input: message,

      max_output_tokens: 500,
    });

    return NextResponse.json({
      answer: response.output_text,
    });
  } catch (error) {
    console.error("KOPOSQUAD Chat API error:", error);

    return NextResponse.json(
      {
        error:
          "AI-avustajaan ei saatu juuri nyt yhteyttä. Yritä hetken kuluttua uudelleen.",
      },
      { status: 500 }
    );
  }
}