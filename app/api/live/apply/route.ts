import { NextResponse } from "next/server";

type ApplicationBody = {
  name?: string;
  channel?: string;
  discord?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "DISCORD_WEBHOOK_URL puuttuu .env.local-tiedostosta.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ApplicationBody;

    const name = body.name?.trim();
    const channel = body.channel?.trim();
    const discord = body.discord?.trim();
    const message = body.message?.trim();

    if (!name || !channel || !discord || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Täytä kaikki hakemuksen kentät.",
        },
        { status: 400 }
      );
    }

    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "KOPOSQUAD Hakemukset",
        embeds: [
          {
            title: "Uusi KOPOSQUAD-hakemus",
            color: 10181046,
            fields: [
              {
                name: "Nimi / käyttäjänimi",
                value: name,
              },
              {
                name: "Twitch / YouTube",
                value: channel,
              },
              {
                name: "Discord",
                value: discord,
              },
              {
                name: "Hakemus",
                value: message,
              },
            ],
            footer: {
              text: "KOPOSQUAD-verkkosivun hakemuslomake",
            },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!discordResponse.ok) {
      const discordError = await discordResponse.text();

      console.error(
        "Discord-webhook-virhe:",
        discordResponse.status,
        discordError
      );

      return NextResponse.json(
        {
          success: false,
          error: `Discordiin lähettäminen epäonnistui (${discordResponse.status}).`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Hakemusreitin virhe:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Hakemuksen lähettäminen epäonnistui palvelimella.",
      },
      { status: 500 }
    );
  }
}