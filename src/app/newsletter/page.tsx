import React from "react";
import { subscribeNewsletter } from "../Actions/newsletterActions";
import { MetadataSetter } from "@/components/MetadataSetter";

export default function Newsletter() {
  return (
    <main className="p-6 flex items-center justify-center min-h-screen">
      <MetadataSetter title="Newsletter" />
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Inscreva-se na Newsletter</h1>
        <p className="mb-6 text-gray-600">
          Receba as melhores novidades e atualizações diretamente no seu e-mail.
        </p>
        <form action={subscribeNewsletter} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Seu e-mail"
            className="w-full border p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Inscrever
          </button>
        </form>
      </div>
    </main>
  );
}
