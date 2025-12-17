"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageCircle, Package } from "lucide-react";

const steps = [
  {
    icon: Sparkles,
    title: "Choose Your Design",
    description:
      "Browse our handcrafted collection and pick your favorite style",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: MessageCircle,
    title: "Click WhatsApp Order",
    description: "Tap 'Buy Now' and send your order via WhatsApp instantly",
    color: "from-pink-500 to-blue-500",
  },
  {
    icon: Package,
    title: "Get It Delivered",
    description:
      "We'll confirm and deliver your beautiful jewelry to your doorstep",
    color: "from-blue-500 to-purple-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-neutral-950 to-neutral-900">
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
            How It Works
          </h2>
          <p className="text-lg text-neutral-400">
            Simple 3-step process to get your favorite jewelry
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="text-center space-y-4">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 flex items-center justify-center relative overflow-hidden group"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />
                  <step.icon className="w-10 h-10 text-white relative z-10" />
                </motion.div>

                {/* Step Number */}
                <div className="flex justify-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line (hidden on mobile, shown on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-neutral-700 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
