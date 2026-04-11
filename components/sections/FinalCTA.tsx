"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const handleOrderClick = () => {
    const link = generateWhatsAppLink("General Inquiry", "N/A", 0);
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading scale + fade entry
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Description fade up
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 px-4 bg-linear-to-r from-blue-400 to-indigo-700 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 dark:active:from-purple-800 dark:active:to-pink-800 relative overflow-hidden transition-colors duration-400"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
      <div className="absolute top-0 left-0 w-96 h-96 dark:bg-purple-500/30 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 dark:bg-pink-500/30 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-6">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ willChange: "transform, opacity" }}
          >
            Ready to Order?
          </h2>
          <p
            ref={descRef}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            style={{ willChange: "transform, opacity" }}
          >
            Chat with us on WhatsApp and get your beautiful handcrafted
            jewelry delivered to your doorstep
          </p>

          {/* CTA Button with glow + Framer Motion hover/tap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                onClick={handleOrderClick}
                className="dark:bg-white dark:text-green-500 bg-white text-green-500 hover:bg-neutral-100 px-10 py-7 text-xl font-bold rounded-full shadow-2xl transition-all duration-300 animate-pulse-glow"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Order on WhatsApp
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
