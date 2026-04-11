import Hero from "@/components/sections/Hero";
import StorySection from "@/components/sections/StorySection";
import ProductShowcase from "@/components/sections/ProductShowcase";
import DemoSection from "@/components/sections/DemoSection";
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
      <StorySection />
      <ProductShowcase
        galleries={galleries}
        maxGalleries={6}
        showViewAll={true}
      />
      <DemoSection />
      <SocialProof />
      <InstagramFeed />
      <TrustPolicy />
      <FinalCTA />
    </main>
  );
}
