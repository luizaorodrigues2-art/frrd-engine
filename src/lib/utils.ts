import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPhoneLink(phone: string) {
  return phone.replace(/\D/g, "");
}
