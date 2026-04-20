export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { z } from "zod";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "thiagodossantos315@gmail.com";

const proposalSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  subject: z.string().min(1).max(500),
  message: z.string().min(1).max(5000),
  budget: z.string().max(200).optional(),
  projectType: z.string().max(200).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = proposalSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, subject, message, budget, projectType } = parsed.data;

    const { data, error } = await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `[Proposta] ${escapeHtml(subject)}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">📬 Nova Proposta Recebida</h1>
          </div>
          
          <div style="padding: 32px;">
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <h2 style="color: #333; margin: 0 0 16px 0; font-size: 18px;">Informações do Contato</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600; width: 140px;">Nome:</td>
                  <td style="padding: 8px 0; color: #333;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="mailto:${escapeHtml(email)}" style="color: #667eea;">${escapeHtml(email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Assunto:</td>
                  <td style="padding: 8px 0; color: #333;">${escapeHtml(subject)}</td>
                </tr>
                ${projectType ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Tipo de Projeto:</td>
                  <td style="padding: 8px 0; color: #333;">${escapeHtml(projectType)}</td>
                </tr>
                ` : ""}
                ${budget ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Orçamento:</td>
                  <td style="padding: 8px 0; color: #333;">${escapeHtml(budget)}</td>
                </tr>
                ` : ""}
              </table>
            </div>
            
            <div style="background-color: #f0f4ff; border-left: 4px solid #667eea; border-radius: 0 8px 8px 0; padding: 20px; margin-bottom: 24px;">
              <h3 style="color: #333; margin: 0 0 12px 0; font-size: 16px;">Mensagem</h3>
              <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
            
            <div style="text-align: center; padding-top: 16px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Enviado através do formulário de contato do portfólio
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Erro ao enviar email:", error);
      return NextResponse.json(
        { error: "Falha ao enviar email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: data?.id },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erro interno:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
