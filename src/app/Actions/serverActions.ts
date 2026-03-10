"use server";

import { z } from "zod";

const serviceSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  price: z.string().min(1).max(50),
});

export async function addService(data: FormData): Promise<void> {
  const raw = Object.fromEntries(data.entries());
  const parsed = serviceSchema.parse(raw);

  console.log("Criando serviço:", parsed);
}
