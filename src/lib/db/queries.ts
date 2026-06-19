import { prisma } from "./index";

// ─── Timeline ──────────────────────────────────────────────────
export async function getTimelineEntries() {
  const entries = await prisma.timelineEntry.findMany({
    orderBy: { order: "asc" },
    include: { projects: true },
  });
  return entries.map((e) => ({
    ...e,
    skills: JSON.parse(e.skills) as string[],
  }));
}

// ─── Feedbacks ─────────────────────────────────────────────────
export async function getFeedbacks() {
  return prisma.feedback.findMany({ orderBy: { date: "desc" } });
}

// ─── Events ────────────────────────────────────────────────────
export async function getEvents() {
  const events = await prisma.event.findMany({ orderBy: { date: "desc" } });
  return events.map((e) => ({
    ...e,
    tags: e.tags ? (JSON.parse(e.tags) as string[]) : null,
  }));
}

// ─── Sponsors ──────────────────────────────────────────────────
export async function getSponsors() {
  return prisma.sponsor.findMany({
    orderBy: { id: "asc" },
    include: { codes: true },
  });
}

export async function getDiscountCodes() {
  return prisma.discountCode.findMany({ orderBy: { id: "asc" } });
}

// ─── Contract Templates ────────────────────────────────────────
export async function getContractTemplates() {
  return prisma.contractTemplate.findMany({ orderBy: { id: "asc" } });
}

// ─── Contracts ─────────────────────────────────────────────────
export async function getContracts() {
  return prisma.contract.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createContract(data: {
  clientName: string;
  clientDocument: string;
  clientEmail: string;
  clientPhone?: string;
  projectName: string;
  projectDescription: string;
  value: string;
  paymentTerms: string;
  startDate: string;
  endDate: string;
  warranty: string;
  supportMonths: string;
}) {
  const count = await prisma.contract.count();
  const contractNumber = `CTR-${new Date().getFullYear()}-${String(count + 1).padStart(3, "0")}`;
  return prisma.contract.create({
    data: {
      ...data,
      clientPhone: data.clientPhone ?? "",
      status: "in_progress",
      signedDate: new Date().toISOString().split("T")[0],
      contractNumber,
    },
  });
}

// ─── Services (from services schema) ───────────────────────────
// These use the services Prisma client, imported separately
export async function getServicesFromDb() {
  const { prisma: servicesPrisma } = await import("./services-index");
  return servicesPrisma.service.findMany({
    orderBy: { order: "asc" },
    include: { features: { orderBy: { order: "asc" } } },
  });
}

export async function getProcessStepsFromDb() {
  const { prisma: servicesPrisma } = await import("./services-index");
  return servicesPrisma.processStep.findMany({ orderBy: { order: "asc" } });
}

export async function getFaqItemsFromDb() {
  const { prisma: servicesPrisma } = await import("./services-index");
  return servicesPrisma.faqItem.findMany({ orderBy: { order: "asc" } });
}

// ─── Payment Methods ───────────────────────────────────────────
export async function getPaymentMethods() {
  return prisma.paymentMethod.findMany({ orderBy: { order: "asc" } });
}

// ─── About ─────────────────────────────────────────────────────
export async function getSkills() {
  return prisma.skill.findMany({ orderBy: { order: "asc" } });
}

export async function getLanguages() {
  return prisma.language.findMany({ orderBy: { order: "asc" } });
}

// ─── Certificates ──────────────────────────────────────────────
export async function getCertificates() {
  return prisma.certificate.findMany({ orderBy: { order: "asc" } });
}

// ─── Cover Letter ──────────────────────────────────────────────
export async function getCoverLetter() {
  return prisma.coverLetter.findFirst();
}
