import { promises as fs } from "fs";
import path from "path";

export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
    // Integração com a API Mailgun
    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;
    const endpoint = `https://api.mailgun.net/v3/${domain}/messages`;
    const auth = Buffer.from(`api:${apiKey}`).toString("base64");

    const formData = new URLSearchParams();
    formData.append("from", `Excited User <mailgun@${domain}>`);
    formData.append("to", to);
    formData.append("subject", subject);
    formData.append("text", body);

    await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });
    console.log("Email enviado via Mailgun:", { to, subject });
  } else {
    // Fallback: salva o email em um arquivo de log
    const emailLogPath = path.join(process.cwd(), "emails.log");
    const emailContent = `
To: ${to}
Subject: ${subject}
Body: ${body}

---------------------------
`;
    await fs.appendFile(emailLogPath, emailContent);
    console.log("Email salvo no log:", { to, subject });
  }
}
