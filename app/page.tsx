import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import HowItWorks from "@/components/sections/HowItWorks";
import SocialProof from "@/components/sections/SocialProof";
import InstagramFeed from "@/components/sections/InstagramFeed";
import TrustPolicy from "@/components/sections/TrustPolicy";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero />
      <ProductShowcase />
      <HowItWorks />
      <SocialProof />
      <InstagramFeed />
      <TrustPolicy />
      <FinalCTA />
    </main>
  );
}
