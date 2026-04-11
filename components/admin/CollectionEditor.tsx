"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/components/ui/spinner";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stockUrgency: string | null;
  images: Array<{
    id: string;
    url: string;
    order: number;
  }>;
  variants: Array<{
    id: string;
    name: string;
    color: string;
    stockCount: number;
  }>;
}

interface Collection {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  status: string;
  products: Product[];
}

interface CollectionEditorProps {
  collection: Collection;
}

export default function CollectionEditor({
  collection,
}: CollectionEditorProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: collection.name,
    description: collection.description || "",
    slug: collection.slug,
    status: collection.status as "draft" | "published",
  });

  // Track product price edits: { productId: newPrice }
  const [productPrices, setProductPrices] = useState<Record<string, number>>(
    () => {
      const prices: Record<string, number> = {};
      collection.products.forEach((p) => {
        prices[p.id] = p.price;
      });
      return prices;
    }
  );

  const handlePriceChange = (productId: string, value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setProductPrices((prev) => ({ ...prev, [productId]: numericValue }));
    } else if (value === "") {
      setProductPrices((prev) => ({ ...prev, [productId]: 0 }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // 1. Update collection details
      const collectionRes = await fetch(`/api/admin/collections/${collection.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!collectionRes.ok) {
        const data = await collectionRes.json();
        throw new Error(data.error || "Failed to update collection");
      }

      // 2. Update product prices (only changed ones)
      const priceUpdates = collection.products
        .filter((p) => productPrices[p.id] !== p.price)
        .map((p) =>
          fetch(`/api/admin/products/${p.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: productPrices[p.id] }),
          })
        );

      if (priceUpdates.length > 0) {
        const results = await Promise.all(priceUpdates);
        const failed = results.find((r) => !r.ok);
        if (failed) {
          throw new Error("Failed to update one or more product prices");
        }
      }

      router.push("/admin/collections");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this collection? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/collections/${collection.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete collection");
      }

      router.push("/admin/collections");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/admin/collections">
            <Button
              variant="outline"
              className="bg-transparent border-neutral-700 text-white hover:bg-neutral-800 hover:text-white"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Edit Collection
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 mt-1">
              {collection.name}
            </p>
          </div>
        </div>
        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          variant="outline"
          className="border-red-800 text-red-400 hover:bg-red-950 hover:text-white w-full sm:w-auto"
        >
          {isDeleting ? (
            <Spinner size="sm" className="mr-2" />
          ) : (
            <Trash2 size={16} className="mr-2" />
          )}
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Basic Info Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            Basic Information
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Collection Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "draft" | "published",
                  })
                }
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            Products
          </h2>

          {collection.products.length === 0 ? (
            <p className="text-neutral-400 text-center py-8">
              No products in this collection yet
            </p>
          ) : (
            <div className="space-y-4">
              {collection.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg p-4"
                >
                  <div className="flex items-start gap-4">
                    {product.images[0] && (
                      <div className="w-20 h-20 relative">
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                          sizes="80px"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <p className="text-neutral-400 text-sm mt-1">
                        {product.description || "No description"}
                      </p>
                      <div className="mt-2">
                        <label className="block text-xs font-medium text-neutral-400 mb-1">
                          Price (₹)
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-400 text-sm">₹</span>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={productPrices[product.id] ?? product.price}
                            onChange={(e) =>
                              handlePriceChange(product.id, e.target.value)
                            }
                            className="w-32 px-3 py-1.5 bg-neutral-900 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {productPrices[product.id] !== product.price && (
                            <span className="text-xs text-yellow-400">
                              (was ₹{product.price})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            {isSubmitting ? (
              <Spinner size="sm" className="mr-2" />
            ) : (
              <Save size={16} className="mr-2" />
            )}
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Link href="/admin/collections" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="bg-transparent border-neutral-700 text-white hover:bg-neutral-800 hover:text-white w-full"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
