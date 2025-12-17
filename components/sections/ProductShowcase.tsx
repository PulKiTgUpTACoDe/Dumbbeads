"use client";

import { motion } from "framer-motion";
import { Gallery } from "@/data/galleries";
import GalleryCard from "@/components/GalleryCard";

interface ProductShowcaseProps {
  galleries: Gallery[];
}

export default function ProductShowcase({ galleries }: ProductShowcaseProps) {

  return (
    <section className="py-20 px-4 bg-neutral-950">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Collection
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Each piece is carefully handcrafted with premium beads and
            materials. Choose your favorite and order instantly on WhatsApp.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {galleries.map((gallery, index) => (
            <GalleryCard key={gallery.id} gallery={gallery} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
