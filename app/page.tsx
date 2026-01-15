import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import HowItWorks from "@/components/sections/HowItWorks";
import SocialProof from "@/components/sections/SocialProof";
import InstagramFeed from "@/components/sections/InstagramFeed";
import TrustPolicy from "@/components/sections/TrustPolicy";
import FinalCTA from "@/components/sections/FinalCTA";
import { getGalleries } from "@/data/galleries";

// Force dynamic rendering to avoid database calls during build
export const dynamic = "force-dynamic";

export default async function Home() {
  const galleries = await getGalleries();

  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero />
      <ProductShowcase
        galleries={galleries}
        maxGalleries={6}
        showViewAll={true}
      />
      <HowItWorks />
      <SocialProof />
      <InstagramFeed />
      <TrustPolicy />
      <FinalCTA />
    </main>
  );
}
