import ProductShowcase from "@/components/sections/ProductShowcase";
import { getGalleries } from "@/data/galleries";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";

export const metadata = {
  title: "All Collections | Dumbbeads",
  description: "Browse all our handcrafted beaded jewelry collections",
};

// Force dynamic rendering to avoid database calls during build
export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const galleries = await getGalleries();

  return (
    <main className="min-h-screen bg-theme-primary transition-colors duration-400">
      <ThemeToggle />
      {/* Back to Home Button */}
      <div className="container mx-auto max-w-7xl px-4 pt-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="text-theme-muted hover:text-theme-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* All Collections */}
      <ProductShowcase
        galleries={galleries}
        showViewAll={true}
        isCollectionsPage={true}
      />
    </main>
  );
}
