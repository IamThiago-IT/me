import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Bem-vindo</h1>
        <p className="text-xl text-gray-600">
          Sou um desenvolvedor front-end especializado em JavaScript e ReactJS, focado em criar interfaces de usuário agradáveis e acessíveis para uma ampla variedade de usuários. Minha paixão é desenvolver soluções inovadoras que proporcionem uma experiência de usuário intuitiva e envolvente.


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
