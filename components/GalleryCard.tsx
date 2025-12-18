"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/data/galleries";
import { generateWhatsAppLink } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";
import { Images } from "lucide-react";

interface GalleryCardProps {
  gallery: Gallery;
  index: number;
}

export default function GalleryCard({ gallery, index }: GalleryCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(gallery.variants[0]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Mouse position tracking for smooth tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for the tilt
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Transform mouse position to rotation values
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"]
  );
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleBuyNow = () => {
    const link = generateWhatsAppLink(
      gallery.name,
      selectedVariant.name,
      gallery.price
    );
    window.open(link, "_blank");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        style={{
          // Disable 3D tilt on mobile for better performance
          rotateX:
            typeof window !== "undefined" && window.innerWidth >= 768
              ? rotateX
              : 0,
          rotateY:
            typeof window !== "undefined" && window.innerWidth >= 768
              ? rotateY
              : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
        className="max-w-md mx-auto touch-manipulation" // Better touch handling
      >
        <Card className="group overflow-hidden border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-purple-500/50 active:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 active:shadow-purple-500/40">
          <CardContent className="p-0">
            {/* Cover Image - Mobile optimized aspect ratio */}
            <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-neutral-800">
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full relative"
              >
                <Image
                  src={gallery.coverImage}
                  alt={gallery.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                />
              </motion.div>

              {/* Stock Urgency Badge */}
              {gallery.stockUrgency && (
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="destructive"
                    className="bg-red-600 text-white text-xs"
                  >
                    {gallery.stockUrgency}
                  </Badge>
                </div>
              )}

              {/* View Gallery Button */}
              <div className="absolute top-3 right-3">
                <Button
                  onClick={() => setIsGalleryOpen(true)}
                  size="sm"
                  className="bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm text-xs"
                >
                  <Images className="w-3 h-3 mr-1" />
                  Gallery ({gallery.images.length})
                </Button>
              </div>
            </div>

            {/* Gallery Details - More compact */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {gallery.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                  {gallery.description}
                </p>
              </div>

              {/* Variant Selector - Compact */}
              <div>
                <p className="text-xs text-neutral-400 mb-2">Select Color:</p>
                <div className="flex flex-wrap gap-1.5">
                  {gallery.variants.map((variant) => (
                    <motion.button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all duration-200 ${
                        selectedVariant.id === variant.id
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-neutral-700 hover:border-neutral-600"
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: variant.color }}
                      />
                      <span className="text-xs text-neutral-300">
                        {variant.name}
                      </span>
                      {variant.stockCount <= 3 && (
                        <span className="text-xs text-red-400 font-medium">
                          ({variant.stockCount})
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-3 border-t border-neutral-800">
                <div className="text-center sm:text-left">
                  <p className="text-2xl sm:text-xl font-bold text-white">
                    ₹{gallery.price}
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    onClick={handleBuyNow}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:from-purple-800 active:to-pink-800 text-white font-semibold rounded-full px-6 py-6 sm:py-3 text-base sm:text-sm transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 active:shadow-purple-500/70 touch-manipulation"
                  >
                    Buy Now
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Image Gallery Modal */}
      <ImageGallery
        images={gallery.images}
        productName={gallery.name}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </>
  );
}
