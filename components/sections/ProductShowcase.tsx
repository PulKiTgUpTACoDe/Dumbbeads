"use client";

import { motion } from "framer-motion";
import { Gallery } from "@/data/galleries";
import GalleryCard from "@/components/GalleryCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";

interface ProductShowcaseProps {
  galleries: Gallery[];
  maxGalleries?: number; // Optional limit for how many galleries to show
  showViewAll?: boolean; // Whether to show the "View All" button
  isCollectionsPage?: boolean; // Whether this is the collections page
}

export default function ProductShowcase({
  galleries,
  maxGalleries,
  showViewAll = false,
  isCollectionsPage = false,
}: ProductShowcaseProps) {
  // Limit galleries if maxGalleries is specified
  const displayedGalleries = maxGalleries
    ? galleries.slice(0, maxGalleries)
    : galleries;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-neutral-950">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
            {showViewAll ? "Latest Collections" : "Our Collection"}
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto px-4">
            Each piece is carefully handcrafted with premium beads and
            materials. Choose your favorite and order instantly on WhatsApp.
          </p>
        </motion.div>

        {/* Gallery Grid - Mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedGalleries.map((gallery, index) => (
            <GalleryCard key={gallery.id} gallery={gallery} index={index} />
          ))}
        </div>

        {/* View All Collections / Back to Top Button */}
        {showViewAll &&
          (isCollectionsPage || galleries.length > (maxGalleries || 0)) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center mt-12"
            >
              {isCollectionsPage ? (
                <Button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full px-8 py-6 text-lg shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  Back to Top
                  <ArrowUp className="ml-2 w-5 h-5" />
                </Button>
              ) : (
                <Link href="/collections">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full px-8 py-6 text-lg shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                  >
                    View All Collections ({galleries.length})
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
            </motion.div>
          )}
      </div>
    </section>
  );
}
