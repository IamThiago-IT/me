"use client";
import { MetadataSetter } from "@/components/MetadataSetter";
import React from "react";

const sponsors = [
  { id: 1, name: "Empresa X", description: "Líder em soluções tecnológicas para empresas de todos os portes.", logo: "/public/globe.svg", tag: "Tecnologia", link: "https://empresax.com" },
  { id: 2, name: "Empresa Y", description: "Especialista em marketing digital e estratégias de crescimento.", logo: "/public/next.svg", tag: "Marketing", link: "https://empresay.com" },
  { id: 3, name: "Empresa Z", description: "Inovação em produtos sustentáveis para um futuro melhor.", logo: null, tag: "Sustentabilidade", link: "https://empresaz.com" },
];

export default function Sponsors() {
  return (
    <main className="p-6">
      <MetadataSetter title="Patrocinadores" />
      <h1 className="text-3xl font-bold mb-4">Patrocinadores</h1>
      <ul className="space-y-4">
        {sponsors.map((sponsor) => (
          <li key={sponsor.id} className="p-4 border rounded shadow flex items-center space-x-4">
            {sponsor.logo ? (
              <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="w-12 h-12" />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-700 font-bold rounded">
                {sponsor.name.charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{sponsor.name}</h2>
              <p className="text-gray-700">{sponsor.description}</p>
              <span className="text-sm font-medium mt-1 inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-300">
                #{sponsor.tag}
              </span>
              <div className="mt-2">
                <a href={sponsor.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Visitar
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};
