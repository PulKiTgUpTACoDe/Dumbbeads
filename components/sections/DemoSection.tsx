"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, MessageCircle, Package } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Sparkles,
    step: "01",
    title: "Choose Your Design",
    description:
      "Browse our handcrafted collection and pick your favorite style. Each piece is unique and made with premium beads.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Order via WhatsApp",
    description:
      "Tap 'Buy Now' and your order is sent directly to us on WhatsApp. Simple, personal, and instant.",
    color: "from-pink-500 to-blue-500",
  },
  {
    icon: Package,
    step: "03",
    title: "Receive Your Jewelry",
    description:
      "We'll confirm your order and deliver your beautiful handcrafted jewelry straight to your doorstep.",
    color: "from-blue-500 to-purple-500",
  },
];

export default function DemoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.children;

      // Stagger cards in on scroll — no pin needed
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Animate the connector lines
      const lines = gridRef.current!.querySelectorAll(".step-connector");
      gsap.fromTo(
        lines,
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.2,
          duration: 0.6,
          delay: 0.4,
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
      className="py-20 md:py-28 px-4 bg-gradient-to-b from-neutral-950 to-neutral-900"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutral-400">
            Simple 3-step process to get your favorite jewelry
          </p>
        </div>

        {/* Step cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="text-center space-y-5">
                {/* Icon */}
                <div className="flex items-center justify-center">
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-purple-500/20`}
                  >
                    <step.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>

                {/* Step label */}
                <p className="text-sm font-mono text-purple-400 uppercase tracking-widest">
                  Step {step.step}
                </p>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-base leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="step-connector hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-neutral-700 to-transparent origin-left" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
