"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import { Github, Linkedin, Mail, Twitter, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa"
import { FaThreads } from "react-icons/fa6";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contato() {
  const { t } = useI18n();
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/send-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        setFormStatus("error");
        setErrorMessage(result.error || t.contact.form.errorMessage);
        return;
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", projectType: "", budget: "", message: "" });

      setTimeout(() => setFormStatus("idle"), 5000);
    } catch {
      setFormStatus("error");
      setErrorMessage(t.contact.form.errorMessage);
    }
  };

  const contactLinks = [
    { icon: Mail, label: "Email", href: "mailto:thiagodossantos315@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/seu-perfil" },
    { icon: Github, label: "GitHub", href: "https://github.com/IamThiago-IT" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/IamThiago-IT" },
    { icon: FaTiktok, label: "TikTok", href: "https://www.tiktok.com/@IamThiago-IT" },
    { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/IamThiago-IT" },
    { icon: FaFacebook, label: "Facebook", href: "https://www.facebook.com/IamThiago-IT" },
    { icon: FaThreads, label: "Threads", href: "https://www.threads.net/@IamThiago-IT" },
  ]

  // Brand color mapping
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
    <div>
      <MetadataSetter title={t.contact.title} />
      <h1 className="text-3xl font-bold mb-2">{t.contact.title}</h1>
      <p className="text-lg mb-8 text-muted-foreground">
        {t.contact.description}
      </p>

      {/* Formulário de Proposta */}
      <div className="mb-12 p-6 border-2 rounded-xl bg-white dark:bg-neutral-900 shadow-md">
        <h2 className="text-2xl font-semibold mb-2">{t.contact.form.title}</h2>
        <p className="text-muted-foreground mb-6">{t.contact.form.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                {t.contact.form.name} *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t.contact.form.namePlaceholder}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                {t.contact.form.email} *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t.contact.form.emailPlaceholder}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
              {t.contact.form.subject} *
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder={t.contact.form.subjectPlaceholder}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium mb-1.5">
                {t.contact.form.projectType}
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">{t.contact.form.selectProjectType}</option>
                <option value="website">{t.contact.form.projectTypes.website}</option>
                <option value="webapp">{t.contact.form.projectTypes.webapp}</option>
                <option value="mobile">{t.contact.form.projectTypes.mobile}</option>
                <option value="api">{t.contact.form.projectTypes.api}</option>
                <option value="consulting">{t.contact.form.projectTypes.consulting}</option>
                <option value="other">{t.contact.form.projectTypes.other}</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-1.5">
                {t.contact.form.budget}
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">{t.contact.form.selectBudget}</option>
                <option value="< R$ 1.000">{t.contact.form.budgetRanges.low}</option>
                <option value="R$ 1.000 - R$ 5.000">{t.contact.form.budgetRanges.mid}</option>
                <option value="R$ 5.000 - R$ 15.000">{t.contact.form.budgetRanges.high}</option>
                <option value="R$ 15.000+">{t.contact.form.budgetRanges.premium}</option>
                <option value="A definir">{t.contact.form.budgetRanges.tbd}</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1.5">
              {t.contact.form.message} *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder={t.contact.form.messagePlaceholder}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
            />
          </div>

          {/* Status messages */}
          {formStatus === "success" && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              {t.contact.form.successMessage}
            </div>
          )}

          {formStatus === "error" && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {errorMessage || t.contact.form.errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={formStatus === "loading"}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formStatus === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t.contact.form.sending}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t.contact.form.send}
              </>
            )}
          </button>
        </form>
      </div>

      {/* Social Links */}
      <h2 className="text-2xl font-semibold mb-4">{t.contact.socialTitle}</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {contactLinks.map((link) => {
          const colors = brandColors[link.label] || defaultColors;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center justify-center aspect-square min-h-[120px] border-2 rounded-xl shadow-md bg-white dark:bg-neutral-900 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-all duration-200 ${colors.text} ${colors.border}`}
            >
              <link.icon className={`w-10 h-10 mb-2 transition-colors ${colors.icon}`} />
              <span className="font-semibold text-lg">{link.label}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
