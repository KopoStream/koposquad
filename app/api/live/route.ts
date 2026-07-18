import { NextRequest, NextResponse } from "next/server";

const defaultUsernames = ["kopostream", "sanzzuuu", "kinkki03"];

async function getAccessToken() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Twitch-tunnukset puuttuvat.");
  }

  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${encodeURIComponent(
      clientId
    )}&client_secret=${encodeURIComponent(
      clientSecret
    )}&grant_type=client_credentials`,
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

    const usersParameter = request.nextUrl.searchParams.get("users");

    const usernames = usersParameter
      ? usersParameter
          .split(",")
          .map((username) => username.trim().toLowerCase())
          .filter(Boolean)
      : defaultUsernames;

    const uniqueUsernames = [...new Set(usernames)].slice(0, 100);

    if (uniqueUsernames.length === 0) {
      return NextResponse.json({
        data: [],
        users: [],
      });
    }

    const accessToken = await getAccessToken();

    const streamParameters = uniqueUsernames
      .map((username) => `user_login=${encodeURIComponent(username)}`)
      .join("&");

    const userParameters = uniqueUsernames
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

    if (!streamsResponse.ok) {
      const errorText = await streamsResponse.text();
      console.error("Twitch streams -virhe:", errorText);

      throw new Error("Twitch-lähetysten hakeminen epäonnistui.");
    }

    if (!usersResponse.ok) {
      const errorText = await usersResponse.text();
      console.error("Twitch users -virhe:", errorText);

      throw new Error("Twitch-käyttäjien hakeminen epäonnistui.");
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