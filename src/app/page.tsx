"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {

  return (
    <div className="max-w-4xl mx-auto">
      <MetadataSetter title="Home" />
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Bem-vindo</h1>
        <p className="text-xl text-gray-600">
          Sou um desenvolvedor front-end especializado em JavaScript e ReactJS, focado em criar interfaces de usuário agradáveis e acessíveis para uma ampla variedade de usuários. Minha paixão é desenvolver soluções inovadoras que proporcionem uma experiência de usuário intuitiva e envolvente.
        </p>
{/* Animacao de texto rolando com atalhos
        <div className="relative overflow-hidden h-6 group" aria-live="polite">
          <div className="flex flex-col transition-transform duration-[8s] ease-linear group-hover:duration-0">
            <div className="h-6 flex items-center justify-center">Control + M: Menu de comandos</div>
            <div className="h-6 flex items-center justify-center">Control + T: Menu de comandos</div>
            <div className="h-6 flex items-center justify-center">Control + P: Menu de projetos</div>
            <div className="h-6 flex items-center justify-center">Control + C: Menu de contatos</div>
          </div>
        </div>
 */}
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/projetos" className="flex items-center gap-2">
              Ver Projetos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
