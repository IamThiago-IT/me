import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Bem-vindo ao meu Portfólio</h1>
        <p className="text-xl text-gray-600">
          Olá! Sou um desenvolvedor apaixonado por criar soluções inovadoras e eficientes. Explore meu portfólio para
          conhecer mais sobre mim e meus projetos.
        </p>
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
  )
}
