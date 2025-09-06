"use client";
import React from "react";

const services = [
  { id: 1, name: "Desenvolvimento Web", description: "Criação de sites e aplicações web modernas e responsivas." },
  { id: 2, name: "Design Gráfico", description: "Design de logotipos, banners e materiais visuais." },
  { id: 3, name: "Consultoria de TI", description: "Soluções personalizadas para otimizar seus processos tecnológicos." },
];

export default function Services() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Nossos Serviços</h1>
      <ul className="space-y-4">
        {services.map((service) => (
          <li key={service.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-700">{service.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};
