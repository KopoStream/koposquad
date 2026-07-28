import { NextResponse } from "next/server";

async function getAccessToken() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Twitch-tunnukset puuttuvat.");
  }

  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    {
      method: "POST",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Twitch-tokenin hakeminen epäonnistui.");
  }

  const data = await response.json();

  return data.access_token;
}

export async function GET() {
  try {
    const clientId = process.env.TWITCH_CLIENT_ID;

    if (!clientId) {
      throw new Error("Twitch Client ID puuttuu.");
    }

    const accessToken = await getAccessToken();

    const headers = {
      "Client-ID": clientId,
      Authorization: `Bearer ${accessToken}`,
    };

    const username = "koposquadtv";

    const userResponse = await fetch(
      `https://api.twitch.tv/helix/users?login=${username}`,
      {
        headers,
        cache: "no-store",
      }
    );

    if (!userResponse.ok) {
      throw new Error("Twitch-käyttäjän hakeminen epäonnistui.");
    }

    const userData = await userResponse.json();
    const user = userData.data?.[0] || null;

    const streamResponse = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${username}`,
      {
        headers,
        cache: "no-store",
      }
    );

    if (!streamResponse.ok) {
      throw new Error("Twitch-lähetyksen hakeminen epäonnistui.");
    }

    const streamData = await streamResponse.json();
    const stream = streamData.data?.[0] || null;

    return NextResponse.json({
      user,
      stream,
    });
  } catch (error) {
    console.error("KOPOSQUADTV API ERROR:", error);

    return NextResponse.json(
      {
        user: null,
        stream: null,
        error: "KOPOSQUADTV-tietojen hakeminen epäonnistui.",
      },
      {
        status: 500,
      }
    );
  }
}