import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function Contato() {
  const contactLinks = [
    { icon: Mail, label: "Email", href: "mailto:seu.email@exemplo.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/seu-perfil" },
    { icon: Github, label: "GitHub", href: "https://github.com/IamThiago-IT" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/seu_usuario" },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Entre em Contato</h1>
      <p className="text-lg mb-6">
        Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato comigo
        através dos seguintes meios:
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-4 border rounded-md hover:bg-gray-100 transition-colors"
          >
            <link.icon className="w-6 h-6" />
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
