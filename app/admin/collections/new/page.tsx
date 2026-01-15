"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";
import Spinner from "@/components/ui/spinner";

export default function NewCollectionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    status: "draft" as "draft" | "published",
    price: 99,
  });

  const [images, setImages] = useState<
    Array<{ url: string; publicId: string }>
  >([]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Create collection
      const response = await fetch("/api/admin/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create collection");
      }

      const collection = await response.json();

      // If there are images, create a product to attach them to
      if (images.length > 0) {
        // Create a product for the images
        const productResponse = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            price: formData.price,
            collectionId: collection.id,
          }),
        });

        if (productResponse.ok) {
          const product = await productResponse.json();

          // Attach images to the product
          await Promise.all(
            images.map((image, index) =>
              fetch("/api/admin/images", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  url: image.url,
                  cloudinaryId: image.publicId,
                  productId: product.id,
                  order: index,
                }),
              })
            )
          );
        }
      }

      router.push("/admin/collections");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
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
            New Collection
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-1">
            Create a new collection for your products
          </p>
        </div>
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
                onChange={(e) => handleNameChange(e.target.value)}
                required
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Summer Collection"
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
                placeholder="summer-collection"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Auto-generated from name, but you can customize it
              </p>
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
                placeholder="Describe your collection..."
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="99"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Base price for products in this collection
              </p>
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
              <p className="text-xs text-neutral-500 mt-1">
                Draft collections won't be visible on the public site
              </p>
            </div>
          </div>
        </div>

        {/* Images Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            Images
          </h2>
          <ImageUploader images={images} onImagesChange={setImages} />
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
            {isSubmitting ? "Creating..." : "Create Collection"}
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
