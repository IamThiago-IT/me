import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa" // Importing icons from react-icons
import { FaThreads } from "react-icons/fa6";

export default function Contato() {
  const contactLinks = [
    { icon: Mail, label: "Email", href: "mailto:seu.thiagodossantos315@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/seu-perfil" },
    { icon: Github, label: "GitHub", href: "https://github.com/IamThiago-IT" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/IamThiago-IT" },
    { icon: FaTiktok, label: "TikTok", href: "https://www.tiktok.com/@IamThiago-IT" },
    { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/IamThiago-IT" },
    { icon: FaFacebook, label: "Facebook", href: "https://www.facebook.com/IamThiago-IT" },
    { icon: FaThreads, label: "Threads", href: "https://www.threads.net/@IamThiago-IT" },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Entre em Contato</h1>
      <p className="text-lg mb-6">
        Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato comigo
        através dos seguintes meios:
      </p>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {contactLinks.map((link) => {
          // Define brand color classes
          let hoverText = ""
          let hoverIcon = ""
          let hoverBorder = ""
          switch (link.label) {
            case "GitHub":
              hoverText = "hover:text-[#181717]" // GitHub black
              hoverIcon = "group-hover:text-[#181717]"
              hoverBorder = "hover:border-[#181717]"
              break
            case "Twitter":
              hoverText = "hover:text-[#1DA1F2]" // Twitter blue
              hoverIcon = "group-hover:text-[#1DA1F2]"
              hoverBorder = "hover:border-[#1DA1F2]"
              break
            case "LinkedIn":
              hoverText = "hover:text-[#0077B5]" // LinkedIn blue
              hoverIcon = "group-hover:text-[#0077B5]"
              hoverBorder = "hover:border-[#0077B5]"
              break
            case "Email":
              hoverText = "hover:text-[#EA4335]" // Gmail red
              hoverIcon = "group-hover:text-[#EA4335]"
              hoverBorder = "hover:border-[#EA4335]"
              break
            case "TikTok":
              hoverText = "hover:text-[#000000]" // TikTok black
              hoverIcon = "group-hover:text-[#000000]"
              hoverBorder = "hover:border-[#000000]"
              break
            case "Threads":
              hoverText = "hover:text-[#000000]" // Threads black
              hoverIcon = "group-hover:text-[#000000]"
              hoverBorder = "hover:border-[#000000]"
              break
            case "Instagram":
              hoverText = "hover:text-[#E4405F]" // Instagram pink
              hoverIcon = "group-hover:text-[#E4405F]"
              hoverBorder = "hover:border-[#E4405F]"
              break
            case "Facebook":
              hoverText = "hover:text-[#1877F2]" // Facebook blue
              hoverIcon = "group-hover:text-[#1877F2]"
              hoverBorder = "hover:border-[#1877F2]"
              break
            default:
              hoverText = "hover:text-blue-700"
              hoverIcon = "group-hover:text-blue-700"
              hoverBorder = "hover:border-blue-700"
          }
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center justify-center aspect-square min-h-[120px] border-2 rounded-xl shadow-md bg-white dark:bg-neutral-900 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-all duration-200 ${hoverText} ${hoverBorder}`}
            >
              <link.icon className={`w-10 h-10 mb-2 transition-colors ${hoverIcon}`} />
              <span className="font-semibold text-lg">{link.label}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
