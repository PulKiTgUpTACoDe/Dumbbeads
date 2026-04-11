"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Gallery } from "@/data/galleries";
import GalleryCard from "@/components/GalleryCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProductShowcaseProps {
  galleries: Gallery[];
  maxGalleries?: number;
  showViewAll?: boolean;
  isCollectionsPage?: boolean;
}

export default function ProductShowcase({
  galleries,
  maxGalleries,
  showViewAll = false,
  isCollectionsPage = false,
}: ProductShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const displayedGalleries = maxGalleries
    ? galleries.slice(0, maxGalleries)
    : galleries;

  // GSAP stagger entry for gallery cards
  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.children;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [displayedGalleries]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 bg-theme-primary transition-colors duration-400">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme-primary mb-3 sm:mb-4 px-4">
            {showViewAll ? "Latest Collections" : "Our Collection"}
          </h2>
          <p className="text-base sm:text-lg text-theme-muted max-w-2xl mx-auto px-4">
            Each piece is carefully handcrafted with premium beads and
            materials. Choose your favorite and order instantly on WhatsApp.
          </p>
        </motion.div>

        {/* Gallery Grid — GSAP stagger entry */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-[1400px] mx-auto"
        >
          {displayedGalleries.map((gallery, index) => (
            <GalleryCard key={gallery.id} gallery={gallery} index={index} />
          ))}
        </div>

        {/* View All / Back to Top Button */}
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
                  className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 dark:active:from-purple-800 dark:active:to-pink-800  text-white font-semibold rounded-full px-8 py-6 text-lg shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  Back to Top
                  <ArrowUp className="ml-2 w-5 h-5" />
                </Button>
              ) : (
                <Link href="/collections">
                  <Button
                    size="lg"
                    className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 dark:active:from-purple-800 dark:active:to-pink-800  text-white font-semibold rounded-full px-8 py-6 text-lg shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105"
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
