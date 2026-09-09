import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PAYPAL_BASE_URL =
  process.env.PAYPAL_LIVE_BASE_URL ||
  "https://api-m.paypal.com";

const PRODUCTS = {
  "stream-overlay": {
    amount: "59.99",
    referenceId: "stream-overlay",
  },

  "stream-overlay-static": {
    amount: "59.99",
    referenceId: "stream-overlay-static",
  },

  "stream-overlay-animated": {
    amount: "69.99",
    referenceId: "stream-overlay-animated",
  },

  "emote-5": {
    amount: "39.99",
    referenceId: "emote-5",
  },

  "emote-10": {
    amount: "59.99",
    referenceId: "emote-10",
  },

  "graphics-package": {
    amount: "79.99",
    referenceId: "graphics-package",
  },

  "streamer-start-package": {
    amount: "69.99",
    referenceId: "streamer-start-package",
  },

  "video-editing": {
    amount: "349.99",
    referenceId: "video-editing",
  },

  "koposquad-member-jersey": {
    amount: "129.90",
    referenceId: "koposquad-member-jersey",
  },
} as const;

type ProductCode = keyof typeof PRODUCTS;

async function getPayPalAccessToken() {
  const clientId =
    process.env.PAYPAL_LIVE_CLIENT_ID;

  const clientSecret =
    process.env.PAYPAL_LIVE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "PayPal Client ID tai Secret puuttuu."
    );
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
    console.error(
      "PayPal token error:",
      data
    );

    throw new Error(
      "PayPal-kirjautuminen epäonnistui."
    );
  }

  return data.access_token as string;
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const orderID = String(
      body?.orderID || ""
    ).trim();

    const requestedProductCode = String(
      body?.productCode ||
        "stream-overlay"
    ).trim();

    if (!orderID) {
      return NextResponse.json(
        {
          error: "PayPal Order ID puuttuu.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !(
        requestedProductCode in PRODUCTS
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Tuntematon PayPal-tuote.",
        },
        {
          status: 400,
        }
      );
    }

    const productCode =
      requestedProductCode as ProductCode;

    const expectedAmount =
      PRODUCTS[productCode].amount;

    const expectedReferenceId =
      PRODUCTS[productCode].referenceId;

    const accessToken =
      await getPayPalAccessToken();

    /*
     * Haetaan ensin PayPal-orderin tiedot.
     * Tarkistetaan että kyseessä on juuri
     * oikea meidän luoma tuote.
     */
    const orderResponse = await fetch(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${encodeURIComponent(
        orderID
      )}`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },

        cache: "no-store",
      }
    );

    const orderData =
      await orderResponse.json();

    if (!orderResponse.ok) {
      console.error(
        "PayPal order lookup error:",
        JSON.stringify(
          orderData,
          null,
          2
        )
      );

      return NextResponse.json(
        {
          error:
            "PayPal-tilauksen tarkistaminen epäonnistui.",
        },
        {
          status: orderResponse.status,
        }
      );
    }

    const purchaseUnit =
      orderData?.purchase_units?.[0];

    const orderReferenceId =
      purchaseUnit?.reference_id;

    const orderAmount =
      purchaseUnit?.amount?.value;

    const orderCurrency =
      purchaseUnit?.amount
        ?.currency_code;

    if (
      orderReferenceId !==
        expectedReferenceId ||
      orderAmount !== expectedAmount ||
      orderCurrency !== "EUR"
    ) {
      console.error(
        "PayPal order validation failed:",
        JSON.stringify(
          {
            productCode,
            expectedReferenceId,
            expectedAmount,
            orderReferenceId,
            orderAmount,
            orderCurrency,
          },
          null,
          2
        )
      );

      return NextResponse.json(
        {
          error:
            "PayPal-tilaus ei vastaa valittua tuotetta.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Member Jersey:
     * create-order on jo tarkistanut
     * jäsenyyden ennen tämän tilauksen
     * syntymistä.
     *
     * Varmistetaan lisäksi että
     * custom_id sisältää jäsenmerkinnän.
     */
    if (
      productCode ===
      "koposquad-member-jersey"
    ) {
      const customId = String(
        purchaseUnit?.custom_id || ""
      );

      if (
        !customId.startsWith(
          "member="
        )
      ) {
        console.error(
          "Member Jersey custom_id missing:",
          customId
        );

        return NextResponse.json(
          {
            error:
              "Jersey-tilauksen jäsenvarmennus puuttuu.",
          },
          {
            status: 403,
          }
        );
      }
    }

    /*
     * Maksun capture
     */
    const response = await fetch(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${encodeURIComponent(
        orderID
      )}/capture`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type":
            "application/json",
          Accept: "application/json",
          Prefer:
            "return=representation",

          "PayPal-Request-Id":
            crypto.randomUUID(),
        },

        body: JSON.stringify({}),

        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "PayPal capture error:",
        JSON.stringify(data, null, 2)
      );

      return NextResponse.json(
        {
          error:
            data?.details?.[0]
              ?.description ||
            data?.message ||
            "PayPal-maksun vahvistaminen epäonnistui.",

          details: data,
        },
        {
          status: response.status,
        }
      );
    }

    const capture =
      data?.purchase_units?.[0]
        ?.payments?.captures?.[0];

    const amount =
      capture?.amount?.value;

    const currency =
      capture?.amount
        ?.currency_code;

    const captureStatus =
      capture?.status;

    const capturedReferenceId =
      data?.purchase_units?.[0]
        ?.reference_id;

    if (
      data?.status !== "COMPLETED" ||
      captureStatus !==
        "COMPLETED" ||
      amount !== expectedAmount ||
      currency !== "EUR" ||
      capturedReferenceId !==
        expectedReferenceId
    ) {
      console.error(
        "PayPal capture validation failed:",
        JSON.stringify(
          {
            productCode,
            expectedAmount,
            expectedReferenceId,
            orderStatus:
              data?.status,
            captureStatus,
            amount,
            currency,
            capturedReferenceId,
            paypalResponse: data,
          },
          null,
          2
        )
      );

      return NextResponse.json(
        {
          error:
            "PayPal-maksun tietojen vahvistaminen epäonnistui.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      id: data.id,
      status: data.status,
      captureId: capture.id,
      productCode,
      amount,
      currency,
      referenceId:
        capturedReferenceId,

      ...(productCode ===
      "koposquad-member-jersey"
        ? {
            memberOrder: true,
            jerseyData:
              purchaseUnit?.custom_id ||
              "",
          }
        : {}),
    });
  } catch (error) {
    console.error(
      "PayPal capture order error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "PayPal-maksun vahvistaminen epäonnistui.",
      },
      {
        status: 500,
      }
    );
  }
}