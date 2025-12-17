"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import Image from "next/image";

// Mock Instagram posts - you can replace these with actual images
const instagramPosts = [
  { id: 1, image: "/images/insta-1.jpg" },
  { id: 2, image: "/images/insta-2.jpg" },
  { id: 3, image: "/images/insta-3.jpg" },
  { id: 4, image: "/images/insta-4.jpg" },
  { id: 5, image: "/images/insta-5.jpg" },
  { id: 6, image: "/images/insta-6.jpg" },
  { id: 7, image: "/images/insta-7.jpg" },
  { id: 8, image: "/images/insta-8.jpg" },
  { id: 9, image: "/images/insta-9.jpg" },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-neutral-900 to-neutral-950">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-lg text-neutral-400 mb-6">
            Get styling tips, new designs, and exclusive offers
          </p>
          <Button
            onClick={() => window.open("https://instagram.com", "_blank")}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white font-semibold rounded-full px-8 py-6 text-base shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-105"
          >
            <Instagram className="w-5 h-5 mr-2" />
            @dumbbeads
          </Button>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg bg-neutral-800"
            >
              {/* Placeholder - replace with actual images */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20" />

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
              >
                <Instagram className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-neutral-400">
            Tag us in your photos with{" "}
            <span className="text-purple-400 font-semibold">
              #DumbbeadsStyle
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
