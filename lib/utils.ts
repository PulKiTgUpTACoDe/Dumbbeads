import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a WhatsApp link with pre-filled order message
 * @param productName - Name of the product
 * @param description - Product description
 * @param price - Product price
 * @param phoneNumber - WhatsApp business number (default: +919876543210)
 * @returns WhatsApp web link with pre-filled message
 */
export function generateWhatsAppLink(
  productName: string,
  description: string,
  price: number,
  phoneNumber: string = "+91 91375 62096"
): string {
  const descriptionLine = description ? `\n${description}\n` : '\n';
  const message = `Hi! I'm interested in ordering:

*${productName}*${descriptionLine}
 Price: ₹${price}

Please share details:
 Name:
 Address:
 Phone:`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;
}
