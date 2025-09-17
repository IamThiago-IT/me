"use server";
import { sendEmail } from "./emailActions";

export async function subscribeNewsletter(data: FormData): Promise<void> {
  const email = data.get("email")?.toString();
  // ...lógica para salvar o e-mail...
  console.log("Inscrição na newsletter:", email);
  
  // Envia email de confirmação (simulado)
  if (email) {
    await sendEmail(email, "Confirmação de Inscrição", "Obrigado por se inscrever na nossa newsletter!");
  }
}
