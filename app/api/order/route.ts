import { NextResponse } from "next/server";
import { Resend } from "resend";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const service = String(formData.get("service") || "").trim();
const isJerseyOrder = service === "KOPOSQUAD Member Jersey";

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (isJerseyOrder) {
      const memberName = String(formData.get("memberName") || "").trim();
      const discord = String(formData.get("discord") || "").trim();
      const jerseyNickname = String(formData.get("jerseyNickname") || "").trim();
      const jerseySize = String(formData.get("jerseySize") || "").trim();
      const address = String(formData.get("address") || "").trim();
      const postalCode = String(formData.get("postalCode") || "").trim();
      const city = String(formData.get("city") || "").trim();
      const memberConfirmed = String(formData.get("memberConfirmed") || "");
      const paypalOrderId = String(formData.get("paypalOrderId") || "").trim();
      const paypalCaptureId = String(formData.get("paypalCaptureId") || "").trim();

      if (
        !name ||
        !email ||
        !memberName ||
        !discord ||
        !jerseyNickname ||
        !jerseySize ||
        !address ||
        !postalCode ||
        !city ||
        memberConfirmed !== "yes" ||
        !paypalOrderId ||
        !paypalCaptureId
      ) {
        return NextResponse.json(
          { error: "Jersey-tilauksesta puuttuu pakollisia tietoja." },
          { status: 400 }
        );
      }

      if (!process.env.RESEND_API_KEY) {
        return NextResponse.json(
          { error: "Resend API-avain puuttuu palvelimelta." },
          { status: 500 }
        );
      }

      const orderToEmail =
        process.env.ORDER_TO_EMAIL || "koposquadtv@gmail.com";

      const resendFrom =
        process.env.RESEND_FROM ||
        "KOPOSQUAD Creative <onboarding@resend.dev>";

      const isResendTestSender = resendFrom.includes("onboarding@resend.dev");
      const orderId = `KS-JERSEY-${Date.now().toString().slice(-8)}`;

      let jerseyLogoAttachment:
        | { filename: string; content: string; contentId: string }
        | undefined;

      try {
        const logoPath = path.join(
          process.cwd(),
          "public",
          "images",
          "ks-logo.png.png"
        );

        const logoBuffer = await readFile(logoPath);

        jerseyLogoAttachment = {
          filename: "ks-logo.png",
          content: logoBuffer.toString("base64"),
          contentId: "ks-logo",
        };
      } catch (logoError) {
        console.warn("KS-logoa ei löytynyt Jersey-sähköpostia varten:", logoError);
      }

      const jerseyLogoHtml = jerseyLogoAttachment
        ? `
          <div style="text-align:center;margin-bottom:18px">
            <img
              src="cid:ks-logo"
              alt="KOPOSQUAD"
              width="92"
              style="display:inline-block;width:92px;height:auto"
            />
          </div>
        `
        : "";

      const adminSubject =
        `UUSI JERSEY-TILAUS – ${orderId} – ${memberName} – ${jerseyNickname}`;

      const adminText = `
UUSI KOPOSQUAD MEMBER JERSEY -TILAUS

TILAUSNUMERO: ${orderId}
Palvelu: KOPOSQUAD Member Jersey
Hinta: 129,90 €

ASIAKAS
Nimi: ${name}
Sähköposti: ${email}
Discord: ${discord}
KOPOSQUAD-käyttäjänimi: ${memberName}

PERSONOINTI
Selkään tuleva NICKNAME: ${jerseyNickname}
Paitakoko: ${jerseySize}

TOIMITUSOSOITE
${address}
${postalCode} ${city}

MAKSU
PayPal Order ID: ${paypalOrderId}
PayPal Capture ID: ${paypalCaptureId}
Maksu vahvistettu ennen tilauksen lähettämistä: Kyllä

Jäsenyysvahvistus: Kyllä
`.trim();

      const adminHtml = `
        <div style="margin:0;padding:34px 16px;background:#07040a;font-family:Arial,sans-serif;color:#f5f3f7">
          <div style="max-width:720px;margin:0 auto;border:1px solid #7e22ce;border-radius:22px;overflow:hidden;background:#120918">
            <div style="padding:28px;background:linear-gradient(135deg,#4c1d95,#86198f)">
              ${jerseyLogoHtml}
              <div style="font-size:11px;letter-spacing:3px;font-weight:800;color:#e9d5ff">
                KOPOSQUAD MEMBER PRODUCT
              </div>
              <h1 style="margin:10px 0 0;font-size:28px;color:#fff">
                UUSI JERSEY-TILAUS
              </h1>
              <p style="margin:9px 0 0;color:#f5d0fe">
                KOPOSQUAD Member Jersey – 129,90 €
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#ddd6fe">
                Tilausnumero: <strong>${orderId}</strong>
              </p>
            </div>

            <div style="padding:26px">
              ${emailSection(
                "ASIAKAS",
                `
                  <strong>Nimi:</strong> ${escapeHtml(name)}<br>
                  <strong>Sähköposti:</strong> ${escapeHtml(email)}<br>
                  <strong>Discord:</strong> ${escapeHtml(discord)}<br>
                  <strong>KOPOSQUAD-käyttäjänimi:</strong> ${escapeHtml(memberName)}
                `
              )}

              ${emailSection(
                "PERSONOINTI",
                `
                  <strong>Selkään tuleva NICKNAME:</strong> ${escapeHtml(jerseyNickname)}<br>
                  <strong>Paitakoko:</strong> ${escapeHtml(jerseySize)}
                `
              )}

              ${emailSection(
                "TOIMITUSOSOITE",
                `
                  ${escapeHtml(address)}<br>
                  ${escapeHtml(postalCode)} ${escapeHtml(city)}
                `
              )}

              ${emailSection(
                "PAYPAL-MAKSU",
                `
                  <strong>Order ID:</strong> ${escapeHtml(paypalOrderId)}<br>
                  <strong>Capture ID:</strong> ${escapeHtml(paypalCaptureId)}<br>
                  <strong>Maksu:</strong> vahvistettu ennen tilauksen lähettämistä
                `
              )}

              <div style="margin-top:24px;padding:16px;border-radius:12px;background:#0b060e;border:1px solid #6d28d944;color:#d8b4fe;line-height:1.7">
                <strong>Jäsenyysvahvistus:</strong> Kyllä<br>
                Tarkista jäsenyys ja personointitiedot ennen paidan tilaamista valmistajalta.
              </div>
            </div>
          </div>
        </div>
      `;

      const adminResult = await resend.emails.send({
        from: resendFrom,
        to: [orderToEmail],
        replyTo: email,
        subject: adminSubject,
        text: adminText,
        html: adminHtml,
        attachments: jerseyLogoAttachment ? [jerseyLogoAttachment] : [],
      });

      if (adminResult.error) {
        console.error("Resend Jersey admin error:", adminResult.error);

        return NextResponse.json(
          {
            error:
              adminResult.error.message ||
              "Jersey-tilauksen sähköpostin lähetys epäonnistui.",
          },
          { status: 500 }
        );
      }

      const customerRecipient = isResendTestSender ? orderToEmail : email;
      const customerSubject =
        `Jersey-tilauksesi on vastaanotettu – ${orderId} – KOPOSQUAD`;

      const customerText = `
Hei ${name}!

Kiitos KOPOSQUAD Member Jersey -tilauksestasi.

Tilausnumero: ${orderId}
Hinta: 129,90 €
KOPOSQUAD-käyttäjänimi: ${memberName}
Selkään tuleva NICKNAME: ${jerseyNickname}
Paitakoko: ${jerseySize}

Toimitusosoite:
${address}
${postalCode} ${city}

Maksu on vahvistettu PayPalissa. Jäsenyys ja personointitiedot tarkistetaan ennen paidan tilaamista valmistajalta.

KOPOSQUAD
`.trim();

      const customerHtml = `
        <div style="margin:0;padding:34px 16px;background:#07040a;font-family:Arial,sans-serif;color:#f5f3f7">
          <div style="max-width:680px;margin:0 auto;border:1px solid #7e22ce;border-radius:22px;overflow:hidden;background:#120918">
            <div style="padding:30px;text-align:center;background:linear-gradient(135deg,#4c1d95,#86198f)">
              ${jerseyLogoHtml}
              <div style="font-size:11px;letter-spacing:3px;font-weight:800;color:#e9d5ff">
                KOPOSQUAD MEMBER PRODUCT
              </div>
              <h1 style="margin:12px 0 0;font-size:27px;color:#fff">
                KIITOS JERSEY-TILAUKSESTASI!
              </h1>
            </div>

            <div style="padding:28px">
              <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#e5e7eb">
                Hei <strong>${escapeHtml(name)}</strong>! Maksusi on vahvistettu ja Jersey-tilauksesi on vastaanotettu.
              </p>

              ${emailSection(
                "TILAUKSEN TIEDOT",
                `
                  <strong>Tilausnumero:</strong> ${orderId}<br>
                  <strong>Hinta:</strong> 129,90 €<br>
                  <strong>KOPOSQUAD-käyttäjänimi:</strong> ${escapeHtml(memberName)}<br>
                  <strong>Selkään tuleva NICKNAME:</strong> ${escapeHtml(jerseyNickname)}<br>
                  <strong>Paitakoko:</strong> ${escapeHtml(jerseySize)}
                `
              )}

              ${emailSection(
                "TOIMITUSOSOITE",
                `
                  ${escapeHtml(address)}<br>
                  ${escapeHtml(postalCode)} ${escapeHtml(city)}
                `
              )}

              <div style="margin-top:26px;padding:18px;border-radius:14px;background:linear-gradient(135deg,#2e1065,#4a044e);color:#f5f3f7;line-height:1.7">
                <strong>Mitä seuraavaksi?</strong><br>
                KOPOSQUAD-jäsenyys ja personointitiedot tarkistetaan ennen paidan tilaamista valmistajalta.
              </div>

              <p style="margin:26px 0 0;text-align:center;color:#9ca3af;font-size:12px;line-height:1.6">
                KOPOSQUAD<br>
                ${orderId}
              </p>
            </div>
          </div>
        </div>
      `;

      const customerResult = await resend.emails.send({
        from: resendFrom,
        to: [customerRecipient],
        subject: customerSubject,
        text: customerText,
        html: customerHtml,
        attachments: jerseyLogoAttachment ? [jerseyLogoAttachment] : [],
      });

      if (customerResult.error) {
        console.error(
          "Resend Jersey customer confirmation error:",
          customerResult.error
        );

        return NextResponse.json({
          ok: true,
          id: adminResult.data?.id,
          jerseyOrder: true,
          customerConfirmationSent: false,
          warning:
            "Jersey-tilaus tuli adminille, mutta asiakkaan vahvistusviestin lähetys epäonnistui.",
        });
      }

      return NextResponse.json({
        ok: true,
        id: adminResult.data?.id,
        jerseyOrder: true,
        customerConfirmationSent: true,
        customerConfirmationRecipient: customerRecipient,
        customerConfirmationTestMode:
          isResendTestSender && customerRecipient !== email,
      });
    }
    const channel = String(formData.get("channel") || "").trim();
    const implementation = String(formData.get("implementation") || "").trim();
    const colorTheme = String(formData.get("colorTheme") || "").trim();
    const discord = String(formData.get("discord") || "").trim();
    const platform = String(formData.get("platform") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const termsAccepted = String(formData.get("termsAccepted") || "");
    const overlayItems = formData.getAll("overlayItems").map(String);

if (
  !isJerseyOrder &&
  (
    !name ||
    !email ||
    !channel ||
    !implementation ||
    !colorTheme ||
    !discord ||
    !platform ||
    !description ||
    termsAccepted !== "yes" ||
    overlayItems.length === 0
  )
) {
  return NextResponse.json(
    { error: "Täytä kaikki pakolliset kentät ennen lähettämistä." },
    { status: 400 }
  );
}

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Resend API-avain puuttuu palvelimelta." },
        { status: 500 }
      );
    }

    const orderToEmail =
      process.env.ORDER_TO_EMAIL || "koposquadtv@gmail.com";

    const resendFrom =
      process.env.RESEND_FROM ||
      "KOPOSQUAD Creative <onboarding@resend.dev>";

    const isResendTestSender = resendFrom.includes("onboarding@resend.dev");
    const orderId = `KS-${Date.now().toString().slice(-8)}`;

    let logoAttachment:
      | { filename: string; content: string; contentId: string }
      | undefined;

    try {
      const logoPath = path.join(
        process.cwd(),
        "public",
        "images",
        "ks-logo.png.png"
      );

      const logoBuffer = await readFile(logoPath);

      logoAttachment = {
        filename: "ks-logo.png",
        content: logoBuffer.toString("base64"),
        contentId: "ks-logo",
      };
    } catch (logoError) {
      console.warn("KS-logoa ei löytynyt sähköpostia varten:", logoError);
    }

    const customerAttachments: {
      filename: string;
      content: string;
    }[] = [];

    const materialFiles = formData
      .getAll("materials")
      .filter(
        (value): value is File =>
          value instanceof File && value.size > 0
      );

    for (const file of materialFiles) {
      if (file.size > 8 * 1024 * 1024) {
        return NextResponse.json(
          {
            error: `Tiedosto "${file.name}" on liian suuri. Maksimikoko on 8 Mt / tiedosto.`,
          },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();

      customerAttachments.push({
        filename: file.name,
        content: Buffer.from(bytes).toString("base64"),
      });
    }

    const adminAttachments = [
      ...(logoAttachment ? [logoAttachment] : []),
      ...customerAttachments,
    ];

    const confirmationAttachments = logoAttachment
      ? [logoAttachment]
      : [];

    const overlayList = overlayItems
      .map((item) => `• ${item}`)
      .join("\n");

    const overlayHtml = overlayItems
      .map(
        (item) =>
          `<li style="margin:0 0 7px;color:#e5e7eb">${escapeHtml(item)}</li>`
      )
      .join("");

    const logoHtml = logoAttachment
      ? `
        <div style="text-align:center;margin-bottom:18px">
          <img
            src="cid:ks-logo"
            alt="KOPOSQUAD"
            width="92"
            style="display:inline-block;width:92px;height:auto"
          />
        </div>
      `
      : "";

    const adminSubject =
`UUSI TILAUS – ${orderId} – Stream Overlay – ${name}`;

    const adminText = `
UUSI KOPOSQUAD CREATIVE - TILAUS

TILAUSNUMERO: ${orderId}


Palvelu: Stream Overlay
Hinta: 59,99 €

ASIAKAS
Nimi: ${name}
Sähköposti: ${email}
Discord: ${discord}

KANAVA
Kanava / linkki: ${channel}
Pääasiallinen alusta: ${platform}

TOTEUTUS
Toteutustapa: ${implementation}
Väriteema: ${colorTheme}

OVERLAY-PAKETTIIN VALITTU
${overlayList}

ASIAKKAAN TOIVEET
${description}

Hyväksyntä: Kyllä
Liitteitä asiakkaalta: ${customerAttachments.length}
`.trim();

    const adminHtml = `
      <div style="margin:0;padding:34px 16px;background:#07040a;font-family:Arial,sans-serif;color:#f5f3f7">
        <div style="max-width:720px;margin:0 auto;border:1px solid #7e22ce;border-radius:22px;overflow:hidden;background:#120918">
          <div style="padding:28px;background:linear-gradient(135deg,#4c1d95,#86198f)">
            ${logoHtml}
            <div style="font-size:11px;letter-spacing:3px;font-weight:800;color:#e9d5ff">
              KOPOSQUAD CREATIVE
            </div>
<h1 style="margin:10px 0 0;font-size:28px;color:#fff">
  UUSI TILAUS
</h1>
            <p style="margin:9px 0 0;color:#f5d0fe">
              Stream Overlay – 59,99 €
            </p>
            <p style="margin:8px 0 0;font-size:12px;color:#ddd6fe">
              Tilausnumero: <strong>${orderId}</strong>
            </p>
          </div>

          <div style="padding:26px">
            ${emailSection(
              "ASIAKAS",
              `
                <strong>Nimi:</strong> ${escapeHtml(name)}<br>
                <strong>Sähköposti:</strong> ${escapeHtml(email)}<br>
                <strong>Discord:</strong> ${escapeHtml(discord)}
              `
            )}

            ${emailSection(
              "KANAVA",
              `
                <strong>Kanava / linkki:</strong> ${escapeHtml(channel)}<br>
                <strong>Alusta:</strong> ${escapeHtml(platform)}
              `
            )}

            ${emailSection(
              "TOTEUTUS",
              `
                <strong>Toteutustapa:</strong> ${escapeHtml(implementation)}<br>
                <strong>Väriteema:</strong> ${escapeHtml(colorTheme)}
              `
            )}

            <h2 style="margin:26px 0 10px;font-size:13px;letter-spacing:1px;color:#d8b4fe">
              OVERLAY-PAKETTIIN VALITTU
            </h2>
            <div style="padding:16px;background:#0b060e;border:1px solid #6d28d944;border-radius:12px">
              <ul style="margin:0;padding-left:20px">
                ${overlayHtml}
              </ul>
            </div>

            <h2 style="margin:26px 0 10px;font-size:13px;letter-spacing:1px;color:#d8b4fe">
              ASIAKKAAN TOIVEET
            </h2>
            <div style="white-space:pre-wrap;padding:16px;background:#0b060e;border:1px solid #6d28d944;border-radius:12px;color:#e5e7eb;line-height:1.6">
              ${escapeHtml(description)}
            </div>

            <div style="margin-top:24px;padding-top:18px;border-top:1px solid #6d28d944;color:#9ca3af;font-size:12px">
              Asiakkaan liitteitä: ${customerAttachments.length}
              &nbsp;•&nbsp;
              Hyväksyntä: Kyllä
              &nbsp;•&nbsp;
              ${orderId}
            </div>
          </div>
        </div>
      </div>
    `;

    const adminResult = await resend.emails.send({
      from: resendFrom,
      to: [orderToEmail],
      replyTo: email,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
      attachments: adminAttachments,
    });

    if (adminResult.error) {
      console.error("Resend admin error:", adminResult.error);

      return NextResponse.json(
        {
          error:
            adminResult.error.message ||
            "Tilauksen lähetys epäonnistui.",
        },
        { status: 500 }
      );
    }

    const customerRecipient =
      isResendTestSender ? orderToEmail : email;

    const customerSubject =
      `Tilauksesi on vastaanotettu – ${orderId} – KOPOSQUAD Creative`;

    const customerText = `
Hei ${name}!

Kiitos Stream Overlay -tilauksestasi.

Tilausnumero: ${orderId}
Palvelu: Stream Overlay
Hinta: 59,99 €


Toteutustapa: ${implementation}
Väriteema: ${colorTheme}
Kanava: ${channel}
Alusta: ${platform}

Valitsemasi overlay-osat:
${overlayList}

Toiveesi:
${description}

Tilaus on vastaanotettu. Tarkemmat yksityiskohdat voidaan varmistaa ennen työn aloittamista.

KOPOSQUAD Creative
`.trim();

    const customerHtml = `
      <div style="margin:0;padding:34px 16px;background:#07040a;font-family:Arial,sans-serif;color:#f5f3f7">
        <div style="max-width:680px;margin:0 auto;border:1px solid #7e22ce;border-radius:22px;overflow:hidden;background:#120918">
          <div style="padding:30px;text-align:center;background:linear-gradient(135deg,#4c1d95,#86198f)">
            ${logoHtml}
            <div style="font-size:11px;letter-spacing:3px;font-weight:800;color:#e9d5ff">
              KOPOSQUAD CREATIVE
            </div>
            <h1 style="margin:12px 0 0;font-size:27px;color:#fff">
              KIITOS TILAUKSESTASI!
            </h1>
            <p style="margin:10px 0 0;color:#f5d0fe">
              Stream Overlay
            </p>
          </div>

          <div style="padding:28px">
            <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#e5e7eb">
              Hei <strong>${escapeHtml(name)}</strong>! Tilauksesi on vastaanotettu.
              Alla näet yhteenvedon antamistasi tiedoista.
            </p>

            <div style="padding:18px;background:#0b060e;border:1px solid #6d28d944;border-radius:14px">
              <div style="font-size:11px;letter-spacing:2px;color:#a78bfa">
                TILAUSNUMERO
              </div>
              <div style="margin-top:5px;font-size:22px;font-weight:800;color:#e9d5ff">
                ${orderId}
              </div>

              <div style="margin-top:18px;color:#e5e7eb;line-height:1.7">
                <strong>Palvelu:</strong> Stream Overlay<br>
                <strong>Hinta:</strong> 59,99 €<br>
                <strong>Toteutustapa:</strong> ${escapeHtml(implementation)}<br>
                <strong>Väriteema:</strong> ${escapeHtml(colorTheme)}<br>
                <strong>Kanava:</strong> ${escapeHtml(channel)}<br>
                <strong>Alusta:</strong> ${escapeHtml(platform)}
              </div>
            </div>

            <h2 style="margin:26px 0 10px;font-size:13px;letter-spacing:1px;color:#d8b4fe">
              VALITSEMASI OVERLAY-OSAT
            </h2>
            <div style="padding:16px;background:#0b060e;border:1px solid #6d28d944;border-radius:12px">
              <ul style="margin:0;padding-left:20px">
                ${overlayHtml}
              </ul>
            </div>

            <h2 style="margin:26px 0 10px;font-size:13px;letter-spacing:1px;color:#d8b4fe">
              TOIVEESI
            </h2>
            <div style="white-space:pre-wrap;padding:16px;background:#0b060e;border:1px solid #6d28d944;border-radius:12px;color:#e5e7eb;line-height:1.6">
              ${escapeHtml(description)}
            </div>

            <div style="margin-top:26px;padding:18px;border-radius:14px;background:linear-gradient(135deg,#2e1065,#4a044e);color:#f5f3f7;line-height:1.7">
              <strong>Mitä seuraavaksi?</strong><br>
              Tilaus on vastaanotettu. Tarkemmat yksityiskohdat voidaan varmistaa
              ennen työn aloittamista.
            </div>

            <p style="margin:26px 0 0;text-align:center;color:#9ca3af;font-size:12px;line-height:1.6">
              KOPOSQUAD Creative<br>
              ${orderId}
            </p>
          </div>
        </div>
      </div>
    `;

    const customerResult = await resend.emails.send({
      from: resendFrom,
      to: [customerRecipient],
      subject: customerSubject,
      text: customerText,
      html: customerHtml,
      attachments: confirmationAttachments,
    });

    if (customerResult.error) {
      console.error(
        "Resend customer confirmation error:",
        customerResult.error
      );

      return NextResponse.json({
        ok: true,
        id: adminResult.data?.id,
        customerConfirmationSent: false,
        warning:
          "Tilaus tuli adminille, mutta asiakkaan vahvistusviestin lähetys epäonnistui.",
      });
    }

    return NextResponse.json({
      ok: true,
      id: adminResult.data?.id,
      customerConfirmationSent: true,
      customerConfirmationRecipient: customerRecipient,
      customerConfirmationTestMode:
        isResendTestSender && customerRecipient !== email,
    });
  } catch (error) {
    console.error("Order email error:", error);

    return NextResponse.json(
      {
        error: "Tilauksen lähetys epäonnistui.",
      },
      { status: 500 }
    );
  }
}

function emailSection(title: string, content: string) {
  return `
    <h2 style="margin:26px 0 10px;font-size:13px;letter-spacing:1px;color:#d8b4fe">
      ${title}
    </h2>
    <div style="padding:16px;background:#0b060e;border:1px solid #6d28d944;border-radius:12px;color:#e5e7eb;line-height:1.7">
      ${content}
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}