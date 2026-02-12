"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import { Send, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import Link from "next/link";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Proposta() {
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

  return (
    <div>
      <MetadataSetter title={t.contact.form.title} />

      {/* Voltar */}
      <Link
        href="/contato"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.contact.proposalCta.back}
      </Link>

      <h1 className="text-3xl font-bold mb-2">{t.contact.form.title}</h1>
      <p className="text-lg text-muted-foreground mb-8">{t.contact.form.subtitle}</p>

      <div className="max-w-2xl">
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
              rows={6}
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
    </div>
  );
}
