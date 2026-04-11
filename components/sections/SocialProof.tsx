"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Priya Sharma",
    quote:
      "Absolutely love my beaded necklace! The quality is amazing and it arrived so fast.",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Ananya Patel",
    quote:
      "Beautiful handcrafted jewelry. I've ordered 3 times already. Highly recommend!",
    rating: 5,
    initials: "AP",
  },
  {
    name: "Riya Gupta",
    quote:
      "The bracelet set is gorgeous! Perfect for layering. WhatsApp ordering was super easy.",
    rating: 5,
    initials: "RG",
  },
  {
    name: "Sneha Kumar",
    quote: "Unique designs and great customer service. My go-to for gifts!",
    rating: 5,
    initials: "SK",
  },
  {
    name: "Meera Shah",
    quote:
      "These beaded pieces are stunning! Get compliments every time I wear them.",
    rating: 5,
    initials: "MS",
  },
  {
    name: "Kavya Reddy",
    quote:
      "Amazing craftsmanship! You can tell each piece is made with love and care.",
    rating: 5,
    initials: "KR",
  },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.children;

      // Subtle fade-in with light stagger — no heavy motion
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
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
    <section ref={sectionRef} className="py-20 px-4 bg-neutral-900">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-neutral-400">
            Join hundreds of happy customers who love our jewelry
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} style={{ willChange: "transform, opacity" }}>
              <Card className="h-full border-neutral-800 bg-neutral-950/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-neutral-300 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Verified Customer
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
