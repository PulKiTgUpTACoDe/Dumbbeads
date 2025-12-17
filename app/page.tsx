import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import HowItWorks from "@/components/sections/HowItWorks";
import SocialProof from "@/components/sections/SocialProof";
import InstagramFeed from "@/components/sections/InstagramFeed";
import TrustPolicy from "@/components/sections/TrustPolicy";
import FinalCTA from "@/components/sections/FinalCTA";
import { getGalleries } from "@/data/galleries";

export default function Home() {
  // Load galleries server-side (page.tsx is a Server Component by default)
  // This allows us to use Node.js fs module
  const galleries = getGalleries();

  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero />
      <ProductShowcase galleries={galleries} />
      <HowItWorks />
      <SocialProof />
      <InstagramFeed />
      <TrustPolicy />
      <FinalCTA />
    </main>
  );
}
