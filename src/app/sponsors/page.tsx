"use client";
import React from "react";

const services = [
  { id: 1, name: "Desenvolvimento Web", description: "Criação de sites e aplicações web modernas e responsivas.", price: "R$ 5.000,00" },
  { id: 2, name: "Design Gráfico", description: "Design de logotipos, banners e materiais visuais.", price: "R$ 2.000,00" },
  { id: 3, name: "Consultoria de TI", description: "Soluções personalizadas para otimizar seus processos tecnológicos.", price: "R$ 3.500,00" },
];

const sponsors = [
  { id: 1, name: "Empresa X", description: "Líder em soluções tecnológicas.", logo: "/public/globe.svg" },
  { id: 2, name: "Empresa Y", description: "Especialista em marketing digital.", logo: "/public/next.svg" },
  { id: 3, name: "Empresa Z", description: "Inovação em produtos sustentáveis.", logo: "/public/vercel.svg" },
];

export default function Sponsors() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Nossos Patrocinadores</h1>
      <ul className="space-y-4">
        {sponsors.map((sponsor) => (
          <li key={sponsor.id} className="p-4 border rounded shadow flex items-center space-x-4">
            <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="w-12 h-12" />
            <div>
              <h2 className="text-xl font-semibold">{sponsor.name}</h2>
              <p className="text-gray-700">{sponsor.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">Nossos Serviços</h2>
      <ul className="space-y-4">
        {services.map((service) => (
          <li key={service.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{service.name}</h3>
            <p className="text-gray-700">{service.description}</p>
            <p className="text-green-600 font-bold mt-2">Preço: {service.price}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};
