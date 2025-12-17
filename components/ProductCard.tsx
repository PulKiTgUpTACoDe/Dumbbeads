"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product, ProductVariant } from "@/data/products";
import { generateWhatsAppLink } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";
import { Images } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleBuyNow = () => {
    const link = generateWhatsAppLink(
      product.name,
      selectedVariant.name,
      product.price
    );
    window.open(link, "_blank");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <Card className="group overflow-hidden border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
          <CardContent className="p-0">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-neutral-800">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>

              {/* Stock Urgency Badge */}
              {product.stockUrgency && (
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="destructive"
                    className="bg-red-600 text-white"
                  >
                    {product.stockUrgency}
                  </Badge>
                </div>
              )}

              {/* View Gallery Button */}
              <div className="absolute top-4 right-4">
                <Button
                  onClick={() => setIsGalleryOpen(true)}
                  size="sm"
                  className="bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm"
                >
                  <Images className="w-4 h-4 mr-2" />
                  View Gallery ({product.images.length})
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Variant Selector */}
              <div>
                <p className="text-sm text-neutral-400 mb-3">Select Color:</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`group/variant relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                        selectedVariant.id === variant.id
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-neutral-700 hover:border-neutral-600"
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: variant.color }}
                      />
                      <span className="text-xs text-neutral-300">
                        {variant.name}
                      </span>
                      {variant.stockCount <= 3 && (
                        <span className="text-xs text-red-400 font-medium">
                          ({variant.stockCount} left)
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <div>
                  <p className="text-2xl font-bold text-white">
                    ₹{product.price}
                  </p>
                  <p className="text-xs text-neutral-500">Free Shipping</p>
                </div>
                <Button
                  onClick={handleBuyNow}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full px-6 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Image Gallery Modal */}
      <ImageGallery
        images={product.images}
        productName={product.name}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </>
  );
}
