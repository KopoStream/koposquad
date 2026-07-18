import { NextResponse } from "next/server";

const channels = ["kopostream", "sanzzuuu", "kinkki03"];

type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
};

type TwitchClip = {
  id: string;
  title: string;
  url: string;
  embed_url: string;
  thumbnail_url: string;
  view_count: number;
  created_at: string;
  broadcaster_name: string;
  creator_name: string;
};

type ClipWithChannel = TwitchClip & {
  broadcaster_login: string;
};

async function getAccessToken() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Twitch API -tunnukset puuttuvat.");
  }

  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Twitch access tokenin hakeminen epäonnistui.");
  }

  const data = await response.json();

  return data.access_token as string;
}

export async function GET() {
  try {
    const clientId = process.env.TWITCH_CLIENT_ID;

    if (!clientId) {
      throw new Error("TWITCH_CLIENT_ID puuttuu.");
    }

    const token = await getAccessToken();

    const usersQuery = channels
      .map((channel) => `login=${encodeURIComponent(channel)}`)
      .join("&");

    const usersResponse = await fetch(
      `https://api.twitch.tv/helix/users?${usersQuery}`,
      {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!usersResponse.ok) {
      throw new Error("Twitch-käyttäjien hakeminen epäonnistui.");
    }

    const usersData = await usersResponse.json();
    const users = (usersData.data ?? []) as TwitchUser[];

    const clips: ClipWithChannel[] = [];

    for (const user of users) {
      const clipsResponse = await fetch(
        `https://api.twitch.tv/helix/clips?broadcaster_id=${user.id}&first=3`,
        {
          headers: {
            "Client-ID": clientId,
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (!clipsResponse.ok) {
        console.error(
          `Klippien hakeminen epäonnistui kanavalta ${user.login}.`
        );
        continue;
      }

      const clipsData = await clipsResponse.json();
      const userClips = (clipsData.data ?? []) as TwitchClip[];

      for (const clip of userClips) {
        clips.push({
          id: clip.id,
          title: clip.title,
          url: clip.url,
          embed_url: clip.embed_url,
          thumbnail_url: clip.thumbnail_url,
          view_count: clip.view_count,
          created_at: clip.created_at,
          broadcaster_name: clip.broadcaster_name,
          broadcaster_login: user.login,
          creator_name: clip.creator_name,
        });
      }
    }

    // Kopo ensimmäiseksi, sitten Sanzzuuu, lopuksi muut.
    // Jokaisen sisällä uusimmat klipit ensin.
    const order = ["kopostream", "sanzzuuu", "kinkki03"];

    clips.sort((a, b) => {
      const orderA = order.indexOf(a.broadcaster_login);
      const orderB = order.indexOf(b.broadcaster_login);

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return (
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      );
    });

    return NextResponse.json({
      data: clips,
    });
  } catch (error) {
    console.error("Clips API error:", error);

    return NextResponse.json(
      {
        data: [],
        error: "Twitch-klippien hakeminen epäonnistui.",
      },
      {
        status: 500,
      }
    );
  }
}