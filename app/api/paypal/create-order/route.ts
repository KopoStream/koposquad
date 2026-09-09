import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PAYPAL_BASE_URL =
  process.env.PAYPAL_LIVE_BASE_URL || "https://api-m.paypal.com";

const PRODUCTS = {
  "stream-overlay": {
    referenceId: "stream-overlay",
    description: "KOPOSQUAD Creative - Stream Overlay",
    amount: "59.99",
    membersOnly: false,
  },

  "stream-overlay-static": {
    referenceId: "stream-overlay-static",
    description: "KOPOSQUAD Creative - Stream Overlay - Kuvallinen",
    amount: "59.99",
    membersOnly: false,
  },

  "stream-overlay-animated": {
    referenceId: "stream-overlay-animated",
    description: "KOPOSQUAD Creative - Stream Overlay - Animoitu",
    amount: "69.99",
    membersOnly: false,
  },

  "emote-5": {
    referenceId: "emote-5",
    description: "KOPOSQUAD Creative - Emote-paketti 5 emotea",
    amount: "39.99",
    membersOnly: false,
  },

  "emote-10": {
    referenceId: "emote-10",
    description: "KOPOSQUAD Creative - Emote-paketti 10 emotea",
    amount: "59.99",
    membersOnly: false,
  },

  "graphics-package": {
    referenceId: "graphics-package",
    description: "KOPOSQUAD Creative - Grafiikkapaketti",
    amount: "79.99",
    membersOnly: false,
  },

  "streamer-start-package": {
    referenceId: "streamer-start-package",
    description: "KOPOSQUAD Creative - Striimaajan starttipaketti",
    amount: "69.99",
    membersOnly: false,
  },

  "video-editing": {
    referenceId: "video-editing",
    description: "KOPOSQUAD Creative - Videoeditointi",
    amount: "349.99",
    membersOnly: false,
  },

  "koposquad-member-jersey": {
    referenceId: "koposquad-member-jersey",
    description: "KOPOSQUAD Member Jersey",
    amount: "129.90",
    membersOnly: true,
  },
} as const;

type ProductCode = keyof typeof PRODUCTS;

const KOPOSQUAD_MEMBERS = new Set([
  "kopo",
  "sanzzuuu",
  "kinkki03",
  "burdeni",
  "hkblue88",
]);

async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_LIVE_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_LIVE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal Client ID tai Secret puuttuu.");
  }

  const auth = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type":
          "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("PayPal token error:", data);

    throw new Error(
      "PayPal-kirjautuminen epäonnistui."
    );
  }

  return data.access_token as string;
}

export async function POST(request: Request) {
  try {
    let productCode: ProductCode =
      "stream-overlay";

    let memberName = "";
    let jerseyNickname = "";
    let jerseySize = "";

    const rawBody = await request.text();

    if (rawBody.trim()) {
      const body = JSON.parse(rawBody);

      const requestedProductCode = String(
        body?.productCode || ""
      ).trim();

      if (requestedProductCode) {
        if (!(requestedProductCode in PRODUCTS)) {
          return NextResponse.json(
            {
              error: "Tuntematon PayPal-tuote.",
            },
            {
              status: 400,
            }
          );
        }

        productCode =
          requestedProductCode as ProductCode;
      }

      memberName = String(
        body?.memberName || ""
      ).trim();

      jerseyNickname = String(
        body?.jerseyNickname || ""
      ).trim();

      jerseySize = String(
        body?.jerseySize || ""
      ).trim();
    }

    const product = PRODUCTS[productCode];

    /*
     * MEMBER JERSEY
     * Tämä tarkistus koskee VAIN Member Jerseyä.
     * Muut PayPal-tuotteet jatkavat normaalisti.
     */
    if (
      productCode ===
      "koposquad-member-jersey"
    ) {
      const normalizedMemberName =
        memberName.toLowerCase();

      if (!normalizedMemberName) {
        return NextResponse.json(
          {
            error:
              "KOPOSQUAD-käyttäjänimi puuttuu.",
          },
          {
            status: 403,
          }
        );
      }

      if (
        !KOPOSQUAD_MEMBERS.has(
          normalizedMemberName
        )
      ) {
        return NextResponse.json(
          {
            error:
              "KOPOSQUAD-jäsenyyttä ei voitu vahvistaa tällä käyttäjänimellä.",
          },
          {
            status: 403,
          }
        );
      }

      if (!jerseyNickname) {
        return NextResponse.json(
          {
            error:
              "Paitaan tuleva käyttäjänimi puuttuu.",
          },
          {
            status: 400,
          }
        );
      }

      if (!jerseySize) {
        return NextResponse.json(
          {
            error:
              "Paidan koko puuttuu.",
          },
          {
            status: 400,
          }
        );
      }
    }

    const accessToken =
      await getPayPalAccessToken();

    const purchaseUnit: Record<
      string,
      unknown
    > = {
      reference_id: product.referenceId,
      description: product.description,

      amount: {
        currency_code: "EUR",
        value: product.amount,
      },
    };

    /*
     * Jersey-tilaukseen tallennetaan
     * vain tarvittavat tunnistetiedot.
     */
    if (
      productCode ===
      "koposquad-member-jersey"
    ) {
      purchaseUnit.custom_id = [
        `member=${memberName.toLowerCase()}`,
        `nickname=${jerseyNickname}`,
        `size=${jerseySize}`,
      ].join("|");
    }

    const response = await fetch(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type":
            "application/json",
          Accept: "application/json",
          Prefer: "return=representation",
          "PayPal-Request-Id":
            crypto.randomUUID(),
        },

        body: JSON.stringify({
          intent: "CAPTURE",

          purchase_units: [
            purchaseUnit,
          ],
        }),

        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "PayPal create order error:",
        JSON.stringify(data, null, 2)
      );

      return NextResponse.json(
        {
          error:
            data?.details?.[0]
              ?.description ||
            data?.message ||
            "PayPal-tilauksen luominen epäonnistui.",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      id: data.id,
      status: data.status,
      productCode,
      amount: product.amount,
      currency: "EUR",

      ...(productCode ===
      "koposquad-member-jersey"
        ? {
            memberVerified: true,
            memberName,
            jerseyNickname,
            jerseySize,
          }
        : {}),
    });
  } catch (error) {
    console.error(
      "PayPal create order error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "PayPal-tilauksen luominen epäonnistui.",
      },
      {
        status: 500,
      }
    );
  }
}