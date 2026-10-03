import { contact } from "@/lib/site";
import {
    getDeveloper,
    getProject,
    unitSizeLabel,
    unitTypeLabel,
} from "@/data/marketplace";
import type { Developer, Project, PropertyUnit } from "@/types/marketplace";
export function whatsappLink(message: string) {
    return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
export const GENERIC_WHATSAPP_MESSAGE =
    "Hello SAFIZ MARKETING, I would like help discovering properties from developers and owners on your platform.";
export const genericWhatsappLink = whatsappLink(GENERIC_WHATSAPP_MESSAGE);
export const advisorWhatsappLink = genericWhatsappLink;
export const calculatorWhatsappLink = whatsappLink(
    "Hello SAFIZ MARKETING, I have used your mortgage estimate calculator and would like help finding a property within my budget.",
);
export function projectWhatsappLink(project: Project) {
    return whatsappLink(
        `Hello SAFIZ MARKETING, I would like more details about ${project.name} by ${getDeveloper(project.developerId)!.name}.`,
    );
}
export function developerWhatsappLink(developer: Developer) {
    return whatsappLink(
        `Hello SAFIZ MARKETING, I would like information about ${developer.name} projects listed on your platform.`,
    );
}
export function unitWhatsappLink(unit: PropertyUnit) {
    return whatsappLink(
        `Hello SAFIZ MARKETING, I am interested in ${unit.unitNumber} (${unit.floor} floor), ${unitTypeLabel(unit)}, ${unitSizeLabel(unit)} at ${getProject(unit.projectId)!.name}. Please confirm current availability and details.`,
    );
}
export const ownerWhatsappLink = whatsappLink(
    "Hello SAFIZ MARKETING, I would like to list my property/project on SAFIZ MARKETING.",
);
export function whatsappAriaLabel(context: string) {
    return `Chat with SAFIZ MARKETING on WhatsApp about ${context} (opens in a new tab)`;
}
