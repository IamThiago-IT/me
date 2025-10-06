"use server";
import { sendEmail } from "./emailActions";
import { z } from "zod";

const subscribeNewsletterSchema = z.object({
  email: z.string().email(),
});

export async function subscribeNewsletter(data: FormData): Promise<void> {
  const formObj = Object.fromEntries(data.entries());
  const { email } = subscribeNewsletterSchema.parse(formObj);

  // ...lógica para salvar o e-mail...
  console.log("Inscrição na newsletter:", email);

  // Envia email de confirmação (simulado)
  await sendEmail(email, "Confirmação de Inscrição", "Obrigado por se inscrever na nossa newsletter!");
}
