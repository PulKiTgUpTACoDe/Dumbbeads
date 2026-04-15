# Dumbbeads - Handcrafted Beaded Jewelry Landing Page

A premium, mobile-first Instagram landing page for a wearable jewelry brand (beads & necklaces) built with Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

# https://dumbbeads.vercel.app/

## ✨ Features

- **Premium Design**: Immersive, animated landing page with modern aesthetics
- **Mobile-First**: Optimized for Instagram traffic with responsive design
- **WhatsApp Integration**: Direct "Buy Now" flow with pre-filled order messages
- **High Performance**: Built with Next.js App Router and optimized images
- **Premium Animations**: Framer Motion micro-interactions throughout
- **SEO Optimized**: Proper metadata and Open Graph tags for social sharing

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Aceternity UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 📦 Project Structure

```
jewelry-landing/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles with Tailwind
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── separator.tsx
│   ├── sections/           # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── ProductShowcase.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── SocialProof.tsx
│   │   ├── InstagramFeed.tsx
│   │   ├── TrustPolicy.tsx
│   │   └── FinalCTA.tsx
│   └── ProductCard.tsx     # Reusable product card
├── data/
│   └── products.ts         # Product data and types
├── lib/
│   └── utils.ts            # Utility functions
└── public/
    └── images/             # Product images
```

## 🎨 Landing Page Sections

1. **Hero Section**: Full-screen animated background with headline and primary CTA
2. **Product Showcase**: Grid of 4 jewelry products with variant selectors and buy buttons
3. **How It Works**: 3-step process with animated icons
4. **Social Proof**: Customer testimonials in Instagram-style cards
5. **Instagram Feed**: 3x3 grid preview with follow CTA
6. **Trust & Policy**: Three trust pillars (Quality, Security, Returns)
7. **Final CTA**: Large WhatsApp button (sticky on mobile)

## 🛠️ Installation

```bash
# Navigate to the project directory
cd jewelry-landing

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## 🔧 Configuration

### WhatsApp Number

Update the WhatsApp business number in `lib/utils.ts`:

```typescript
export function generateWhatsAppLink(
  productName: string,
  variant: string,
  price: number,
  phoneNumber: string = "+919876543210" // <- Update this number
): string {
  // ...
}
```

### Product Data

Edit product information in `data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: "necklace-1",
    name: "Multicolor Beaded Necklace",
    description: "Handcrafted beaded necklace...",
    price: 899,
    image: "/images/necklace-1.jpg",
    // ...
  },
  // Add or modify products here
];
```

### Product Images

Replace placeholder images in the `public/images/` directory:

- `necklace-1.jpg`
- `necklace-2.jpg`
- `bracelet-1.jpg`
- `bracelet-2.jpg`
- Instagram grid images: `insta-1.jpg` to `insta-9.jpg`

### Instagram Handle

Update Instagram username in `components/sections/InstagramFeed.tsx`:

```typescript
<Button
  onClick={() => window.open("https://instagram.com/your_handle", "_blank")}
>
  <Instagram className="w-5 h-5 mr-2" />
  @your_handle {/* <- Update this */}
</Button>
```

## 📱 WhatsApp Order Flow

When a customer clicks "Buy Now":

1. Product name, variant, and price are captured
2. A pre-filled WhatsApp message is generated
3. Customer is redirected to WhatsApp Web/App
4. Message template includes fields for Name, Address, and Phone

Example message format:

```
Hi! I want to order:

Product: Multicolor Beaded Necklace
Variant: Rainbow Mix
Price: ₹899

Name:
Address:
Phone:
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🎯 Performance Optimization

- **Next/Image**: All images optimized automatically
- **Code Splitting**: App Router handles automatic code splitting
- **Minimal JavaScript**: Framer Motion tree-shaken for production
- **Tailwind CSS**: Purged unused styles in production

## 📊 Lighthouse Targets

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## 🎨 Customization

### Colors

The landing page uses a purple-pink gradient theme. Customize in Tailwind classes:

- Primary: `purple-600` to `pink-600`
- Background: `neutral-950`, `neutral-900`
- Accent: `blue-500`, `yellow-400`

### Fonts

Change the font in `app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-your-font",
});
```

### Animations

Modify animation variants in component files using Framer Motion:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* Content */}
</motion.div>
```

## 📝 Component Documentation

### ProductCard

- **Props**: `product: Product`, `index: number`
- **Features**: Variant selection, stock urgency, WhatsApp integration
- **Animations**: Hover scale, fade-in on scroll

### generateWhatsAppLink()

- **Purpose**: Create pre-filled WhatsApp order link
- **Returns**: `https://wa.me/...` URL string
- **Usage**: Imported by all "Buy Now" buttons

## 🐛 Troubleshooting

### Images not showing

- Ensure images are in `public/images/` directory
- Check image paths start with `/images/` in `data/products.ts`

### WhatsApp link not working

- Verify phone number format (international, no spaces)
- Test link format: `https://wa.me/919876543210?text=Hello`

### Animations not smooth

- Check if Framer Motion is installed: `npm list framer-motion`
- Ensure components use `"use client"` directive

## 📄 License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

## 🤝 Support

For questions or issues:

- Email: support@dumbbeads.com
- WhatsApp: +91 9876543210
- Instagram: [@dumbbeads](https://instagram.com/dumbbeads._)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
