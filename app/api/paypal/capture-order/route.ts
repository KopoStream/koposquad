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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderID = String(body?.orderID || "").trim();

    if (!orderID) {
      return NextResponse.json(
        { error: "PayPal Order ID puuttuu." },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
          "PayPal-Request-Id": crypto.randomUUID(),
        },
        body: JSON.stringify({}),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("PayPal capture error:", JSON.stringify(data, null, 2));

      return NextResponse.json(
        {
          error:
            data?.details?.[0]?.description ||
            data?.message ||
            "PayPal-maksun vahvistaminen epäonnistui.",
          details: data,
        },
        { status: response.status }
      );
    }

    const capture =
      data?.purchase_units?.[0]?.payments?.captures?.[0];

    const amount = capture?.amount?.value;
    const currency = capture?.amount?.currency_code;
    const captureStatus = capture?.status;

    if (
      data?.status !== "COMPLETED" ||
      captureStatus !== "COMPLETED" ||
      amount !== "59.99" ||
      currency !== "EUR"
    ) {
      console.error(
        "PayPal capture validation failed:",
        JSON.stringify(
          {
            orderStatus: data?.status,
            captureStatus,
            amount,
            currency,
            paypalResponse: data,
          },
          null,
          2
        )
      );

      return NextResponse.json(
        {
          error: "PayPal-maksun tietojen vahvistaminen epäonnistui.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      id: data.id,
      status: data.status,
      captureId: capture.id,
      amount,
      currency,
    });
  } catch (error) {
    console.error("PayPal capture order error:", error);

    return NextResponse.json(
      {
        error: "PayPal-maksun vahvistaminen epäonnistui.",
      },
      { status: 500 }
    );
  }
}