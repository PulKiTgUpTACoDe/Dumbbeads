"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Spinner from "@/components/ui/spinner";

interface DeleteCollectionButtonProps {
  collectionId: string;
  collectionName: string;
}

export default function DeleteCollectionButton({
  collectionId,
  collectionName,
}: DeleteCollectionButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete "${collectionName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/collections/${collectionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete collection");
      }

      // Refresh the router to update the collections list
      router.refresh();

      // Small delay to ensure refresh completes before resetting state
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error: any) {
      alert(error.message);
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="bg-transparent border-red-800 text-red-400 hover:bg-red-950 hover:text-white"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? <Spinner size="sm" /> : <Trash2 size={14} />}
    </Button>
  );
}
