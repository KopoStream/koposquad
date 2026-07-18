import { NextResponse } from "next/server";


const channels = [
  "kopostream",
  "sanzzuuu",
];


async function getAccessToken() {

  const response = await fetch(
    "https://id.twitch.tv/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID!,
        client_secret: process.env.TWITCH_CLIENT_SECRET!,
        grant_type: "client_credentials",
      }),
    }
  );


  const data = await response.json();

  return data.access_token;

}





export async function GET() {


  try {


    const token = await getAccessToken();


    const response = await fetch(
      `https://api.twitch.tv/helix/streams?${channels
        .map(channel => `user_login=${channel}`)
        .join("&")}`,
      {
        headers: {
          "Client-ID": process.env.TWITCH_CLIENT_ID!,
          "Authorization": `Bearer ${token}`,
        },
      }
    );


    const data = await response.json();


    return NextResponse.json(data);


  } catch (error) {


    return NextResponse.json(
      {
        error: "Twitch API error"
      },
      {
        status:500
      }
    );


  }


}