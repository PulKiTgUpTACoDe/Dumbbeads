"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Truck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const trustPillars = [
  {
    icon: Heart,
    title: "Handmade Quality",
    description:
      "Each piece is carefully handcrafted with premium beads and materials. No mass production.",
  },
  {
    icon: Shield,
    title: "Secure Ordering",
    description:
      "Order directly via WhatsApp. Safe, simple, and personal communication throughout.",
  },
  {
    icon: Truck,
    title: "Easy Returns",
    description:
      "7-day easy returns and exchanges. Free shipping on all orders. Your satisfaction is our priority.",
  },
];

export default function TrustPolicy() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.children;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
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
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-theme-primary transition-colors duration-400">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-theme-muted">
            Quality, trust, and customer satisfaction guaranteed
          </p>
        </motion.div>

        {/* Trust Pillars — GSAP stagger */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPillars.map((pillar, index) => (
            <div
              key={index}
              className="text-center space-y-4"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30"
              >
                <pillar.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-theme-primary">
                  {pillar.title}
                </h3>
                <p className="text-theme-muted leading-relaxed max-w-sm mx-auto">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
