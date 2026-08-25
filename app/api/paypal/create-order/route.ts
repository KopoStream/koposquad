import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PAYPAL_BASE_URL =
  process.env.PAYPAL_LIVE_BASE_URL || "https://api-m.paypal.com";

async function getPayPalAccessToken() {
const clientId = process.env.PAYPAL_LIVE_CLIENT_ID;
const clientSecret = process.env.PAYPAL_LIVE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal Client ID tai Secret puuttuu.");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("PayPal token error:", data);
    throw new Error("PayPal-kirjautuminen epäonnistui.");
  }

  return data.access_token as string;
}

export async function POST() {
  try {
    const accessToken = await getPayPalAccessToken();

    const response = await fetch(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Prefer: "return=representation",
          "PayPal-Request-Id": crypto.randomUUID(),
        },

        body: JSON.stringify({
          intent: "CAPTURE",

          purchase_units: [
            {
              reference_id: "stream-overlay",
              description: "KOPOSQUAD Creative - Stream Overlay",

              amount: {
                currency_code: "EUR",
                value: "59.99",
              },
            },
          ],
        }),

        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("PayPal create order error:", data);

      return NextResponse.json(
        {
          error:
            data?.details?.[0]?.description ||
            data?.message ||
            "PayPal-tilauksen luominen epäonnistui.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      id: data.id,
      status: data.status,
    });
  } catch (error) {
    console.error("PayPal create order error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "PayPal-tilauksen luominen epäonnistui.",
      },
      { status: 500 }
    );
  }
}