"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import { Github, Linkedin, Mail, Twitter, Send, FileText } from "lucide-react"
import { FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa"
import { FaThreads } from "react-icons/fa6";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";

export default function Contato() {
  const { t } = useI18n();

  const contactLinks = [
    { icon: Mail, label: "Email", href: "mailto:thiagodossantos315@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/IamThiago-IT" },
    { icon: Github, label: "GitHub", href: "https://github.com/IamThiago-IT" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/IamThiago-IT" },
    { icon: FaTiktok, label: "TikTok", href: "https://www.tiktok.com/@IamThiago-IT" },
    { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/IamThiago-IT" },
    { icon: FaFacebook, label: "Facebook", href: "https://www.facebook.com/IamThiago-IT" },
    { icon: FaThreads, label: "Threads", href: "https://www.threads.net/@IamThiago-IT" },
  ]

  const brandColors: Record<string, { text: string; icon: string; border: string }> = {
    GitHub: { text: "hover:text-[#181717]", icon: "group-hover:text-[#181717]", border: "hover:border-[#181717]" },
    Twitter: { text: "hover:text-[#1DA1F2]", icon: "group-hover:text-[#1DA1F2]", border: "hover:border-[#1DA1F2]" },
    LinkedIn: { text: "hover:text-[#0077B5]", icon: "group-hover:text-[#0077B5]", border: "hover:border-[#0077B5]" },
    Email: { text: "hover:text-[#EA4335]", icon: "group-hover:text-[#EA4335]", border: "hover:border-[#EA4335]" },
    TikTok: { text: "hover:text-[#000000]", icon: "group-hover:text-[#000000]", border: "hover:border-[#000000]" },
    Threads: { text: "hover:text-[#000000]", icon: "group-hover:text-[#000000]", border: "hover:border-[#000000]" },
    Instagram: { text: "hover:text-[#E4405F]", icon: "group-hover:text-[#E4405F]", border: "hover:border-[#E4405F]" },
    Facebook: { text: "hover:text-[#1877F2]", icon: "group-hover:text-[#1877F2]", border: "hover:border-[#1877F2]" },
  };

  const defaultColors = { text: "hover:text-blue-700", icon: "group-hover:text-blue-700", border: "hover:border-blue-700" };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <MetadataSetter title={t.contact.title} />
      <h1 className="text-3xl font-bold mb-1">{t.contact.title}</h1>
      <p className="text-base mb-5 text-muted-foreground">
        {t.contact.description}
      </p>

      {/* CTA para Proposta */}
      <Link
        href="/contato/proposta"
        className="group mb-5 flex items-center gap-3 p-4 border-2 border-dashed border-primary/40 rounded-xl bg-primary/5 hover:bg-primary/10 hover:border-primary transition-all duration-200"
      >
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {t.contact.proposalCta.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {t.contact.proposalCta.description}
          </p>
        </div>
        <Send className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
      </Link>

      {/* Social Links */}
      <h2 className="text-xl font-semibold mb-3">{t.contact.socialTitle}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
        {contactLinks.map((link) => {
          const colors = brandColors[link.label] || defaultColors;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center justify-center rounded-xl border-2 shadow-sm bg-white dark:bg-neutral-900 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-all duration-200 ${colors.text} ${colors.border}`}
            >
              <link.icon className={`w-7 h-7 mb-1.5 transition-colors ${colors.icon}`} />
              <span className="font-medium text-sm">{link.label}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
