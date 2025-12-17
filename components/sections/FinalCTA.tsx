"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";

export default function FinalCTA() {
  const handleOrderClick = () => {
    const link = generateWhatsAppLink("General Inquiry", "N/A", 0);
    window.open(link, "_blank");
  };

  return (
    <>
      {/* Desktop/Tablet CTA Section */}
      <section className="hidden md:block py-24 px-4 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Order?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Chat with us on WhatsApp and get your beautiful handcrafted
              jewelry delivered to your doorstep
            </p>
            <Button
              size="lg"
              onClick={handleOrderClick}
              className="bg-white text-purple-900 hover:bg-neutral-100 px-10 py-7 text-xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Order on WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-sm"
      >
        <Button
          size="lg"
          onClick={handleOrderClick}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 text-lg rounded-full shadow-2xl shadow-purple-500/50"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Order on WhatsApp
        </Button>
      </motion.div>

      {/* Spacer for mobile sticky button */}
      <div className="md:hidden h-24" />
    </>
  );
}
