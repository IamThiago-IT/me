"use server";

import {
  getTimelineEntries,
  getFeedbacks,
  getEvents,
  getSponsors,
  getDiscountCodes,
  getContractTemplates,
  getContracts,
  getPaymentMethods,
  getSkills,
  getLanguages,
  getCertificates,
  getCoverLetter,
  getServicesFromDb,
  getProcessStepsFromDb,
  getFaqItemsFromDb,
  getFeaturedProjects,
} from "./queries";
import { createContract as createContractQuery } from "./queries";

export const fetchTimelineEntries = async () => getTimelineEntries();
export const fetchFeedbacks = async () => getFeedbacks();
export const fetchEvents = async () => getEvents();
export const fetchSponsors = async () => getSponsors();
export const fetchDiscountCodes = async () => getDiscountCodes();
export const fetchContractTemplates = async () => getContractTemplates();
export const fetchContracts = async () => getContracts();
export const fetchPaymentMethods = async () => getPaymentMethods();
export const fetchSkills = async () => getSkills();
export const fetchLanguages = async () => getLanguages();
export const fetchCertificates = async () => getCertificates();
export const fetchCoverLetter = async () => getCoverLetter();
export const fetchServicesFromDb = async () => getServicesFromDb();
export const fetchProcessStepsFromDb = async () => getProcessStepsFromDb();
export const fetchFaqItemsFromDb = async () => getFaqItemsFromDb();
export const fetchFeaturedProjects = async () => getFeaturedProjects();

export const createContractAction = async (data: Parameters<typeof createContractQuery>[0]) => {
  return createContractQuery(data);
};
