"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {

  return (
    <div className="max-w-4xl mx-auto">
      <MetadataSetter title="Home" />
      <div className="flex flex-col items-center justify-center space-y-8 py-24 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Crio experiências digitais de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">alto impacto</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-500 dark:text-gray-400">
            Sou um desenvolvedor Fullstack apaixonado por transformar desafios complexos em soluções elegantes, escaláveis e focadas na experiência do usuário.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button asChild size="lg" className="rounded-full text-lg h-12 px-8 shadow-lg shadow-blue-600/20">
            <Link href="/projetos">
              Ver meu trabalho <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full text-lg h-12 px-8">
            <Link href="/contato">
              Fale comigo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
