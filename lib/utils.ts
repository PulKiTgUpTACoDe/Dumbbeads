import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a WhatsApp link with pre-filled order message
 * @param productName - Name of the product
 * @param variant - Selected variant
 * @param price - Product price
 * @param phoneNumber - WhatsApp business number (default: +919876543210)
 * @returns WhatsApp web link with pre-filled message
 */
export function generateWhatsAppLink(
  productName: string,
  variant: string,
  price: number,
  phoneNumber: string = "+919876543210"
): string {
  const message = `Hi! I want to order:

Product: ${productName}
Variant: ${variant}
Price: ₹${price}

Name:
Address:
Phone:`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;
}
