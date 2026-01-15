"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface UploadedImage {
  url: string;
  publicId: string;
}

interface ImageUploaderProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

export default function ImageUploader({
  images,
  onImagesChange,
  maxImages = 10,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check max images limit
    if (images.length + files.length > maxImages) {
      setUploadError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        return response.json();
      });

      const results = await Promise.all(uploadPromises);
      onImagesChange([...images, ...results]);
    } catch (error) {
      setUploadError("Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-neutral-700 rounded-lg p-8 text-center hover:border-neutral-600 transition-colors">
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          disabled={isUploading || images.length >= maxImages}
          className="hidden"
        />
        <label
          htmlFor="image-upload"
          className={`cursor-pointer ${
            isUploading || images.length >= maxImages
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <Upload className="mx-auto mb-4 text-neutral-400" size={48} />
          <p className="text-neutral-300 mb-2 font-medium">
            {isUploading ? "Uploading..." : "Click to upload images"}
          </p>
          <p className="text-sm text-neutral-500">
            JPEG, PNG, or WebP (Max 10MB each)
          </p>
          <p className="text-xs text-neutral-600 mt-2">
            {images.length} / {maxImages} images uploaded
          </p>
        </label>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
          <p className="text-red-400 text-sm">{uploadError}</p>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square bg-neutral-800 rounded-lg overflow-hidden group"
            >
              <img
                src={image.url}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
              {/* Order indicator */}
              <div className="absolute top-2 left-2 bg-black/70 rounded px-2 py-1 text-xs text-white">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
