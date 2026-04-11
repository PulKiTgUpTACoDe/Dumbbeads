"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const instagramPosts = [
  {
    id: 1,
    image: "/images/instagram/img1.webp",
    url: "https://www.instagram.com/p/C8wq8Z7vxhc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 2,
    image: "/images/instagram/img2.jpg",
    url: "https://www.instagram.com/p/C9FdsRvt3bf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 3,
    image: "/images/instagram/img3.jpg",
    url: "https://www.instagram.com/p/C9VDTMLIa_V/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 4,
    image: "/images/instagram/img4.jpg",
    url: "https://www.instagram.com/p/C9VDTMLIa_V/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 5,
    image: "/images/instagram/img5.jpg",
    url: "https://www.instagram.com/p/C-IVAF2ozcc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 6,
    image: "/images/instagram/img6.jpg",
    url: "https://www.instagram.com/p/DCXAHURonD_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP stagger entry for grid items
  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current!.children;

      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-neutral-900 to-neutral-950"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 mb-5 sm:mb-6 px-4">
            Get styling tips, new designs, and exclusive offers
          </p>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() =>
                window.open(
                  "https://www.instagram.com/dumbbeads.__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                )
              }
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 active:from-purple-800 active:via-pink-800 active:to-orange-800 text-white font-semibold rounded-full px-8 py-6 sm:py-6 text-base shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
            >
              <Instagram className="w-5 h-5 mr-2" />
              @dumbbeads
            </Button>
          </motion.div>
        </motion.div>

        {/* Instagram Grid — GSAP stagger entry */}
        <div ref={gridRef} className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg bg-neutral-800 block touch-manipulation"
              style={{ willChange: "transform, opacity" }}
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* Gradient fallback */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center">
                  <Instagram className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-white text-xs font-medium">
                    View on Instagram
                  </p>
                </div>
              </div>
            </a>
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
