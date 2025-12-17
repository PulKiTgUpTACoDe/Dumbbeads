"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

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
  return (
    <section className="py-20 px-4 bg-neutral-900">
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
            What Our Customers Say
          </h2>
          <p className="text-lg text-neutral-400">
            Join hundreds of happy customers who love our jewelry
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
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
                    "{testimonial.quote}"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
