import { NextRequest, NextResponse } from "next/server";

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

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.TWITCH_CLIENT_ID;

    if (!clientId) {
      throw new Error("TWITCH_CLIENT_ID puuttuu.");
    }

    const searchParams = request.nextUrl.searchParams;
    const usersParameter = searchParams.get("users") || "";

    const usernames = usersParameter
      .split(",")
      .map((username) => username.trim().toLowerCase())
      .filter(Boolean);

    if (usernames.length === 0) {
      return NextResponse.json({
        data: [],
        users: [],
      });
    }

    const accessToken = await getAccessToken();

    const streamParameters = usernames
      .map((username) => `user_login=${encodeURIComponent(username)}`)
      .join("&");

    const userParameters = usernames
      .map((username) => `login=${encodeURIComponent(username)}`)
      .join("&");

    const headers = {
      "Client-ID": clientId,
      Authorization: `Bearer ${accessToken}`,
    };

    const [streamsResponse, usersResponse] = await Promise.all([
      fetch(`https://api.twitch.tv/helix/streams?${streamParameters}`, {
        headers,
        cache: "no-store",
      }),
      fetch(`https://api.twitch.tv/helix/users?${userParameters}`, {
        headers,
        cache: "no-store",
      }),
    ]);

    if (!streamsResponse.ok || !usersResponse.ok) {
      throw new Error("Twitch-tietojen hakeminen epäonnistui.");
    }

    const streamsData = await streamsResponse.json();
    const usersData = await usersResponse.json();

    return NextResponse.json({
      data: streamsData.data || [],
      users: usersData.data || [],
    });
  } catch (error) {
    console.error("Twitch API -virhe:", error);

    return NextResponse.json(
      {
        data: [],
        users: [],
        error: "Twitch-tietojen hakeminen epäonnistui.",
      },
      { status: 500 }
    );
  }
}