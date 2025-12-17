"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Truck } from "lucide-react";

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
  return (
    <section className="py-20 px-4 bg-neutral-950">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-neutral-400">
            Quality, trust, and customer satisfaction guaranteed
          </p>
        </motion.div>

        {/* Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center space-y-4"
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
                <h3 className="text-xl font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed max-w-sm mx-auto">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
