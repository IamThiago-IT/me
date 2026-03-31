import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY não está definida. Os emails não serão enviados.");
}

export const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");
