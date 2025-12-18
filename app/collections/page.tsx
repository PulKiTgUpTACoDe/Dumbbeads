import ProductShowcase from "@/components/sections/ProductShowcase";
import { getGalleries } from "@/data/galleries";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "All Collections | Dumbbeads",
  description: "Browse all our handcrafted beaded jewelry collections",
};

export default function CollectionsPage() {
  const galleries = getGalleries();

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Back to Home Button */}
      <div className="container mx-auto max-w-7xl px-4 pt-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="text-neutral-400 hover:text-black transition-colors"
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
