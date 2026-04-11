import { getAllCollections } from "@/lib/queries/collections";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Eye } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DeleteCollectionButton from "@/components/admin/DeleteCollectionButton";

// Force dynamic rendering - admin pages need authentication
export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const collections = await getAllCollections();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
            Collections
          </h1>
          <p className="text-sm sm:text-base text-neutral-400">
            Manage your product collections and galleries
          </p>
        </div>
        <Link href="/admin/collections/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
            <Plus size={16} className="mr-2" />
            <span className="hidden sm:inline">New Collection</span>
            <span className="sm:hidden">New</span>
          </Button>
        </Link>
      </div>

      {/* Collections Grid */}
      {collections.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 sm:p-12 text-center">
          <p className="text-sm sm:text-base text-neutral-400 mb-4">
            No collections yet
          </p>
          <Link href="/admin/collections/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
              <Plus size={16} className="mr-2" />
              Create Your First Collection
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {collections.map(
            (
              collection: Awaited<ReturnType<typeof getAllCollections>>[number]
            ) => (
              <div
                key={collection.id}
                className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-700 transition-colors"
              >
                {/* Collection Preview */}
                <div className="aspect-video bg-neutral-800 relative">
                  {collection.products[0]?.images[0] ? (
                    <Image
                      src={collection.products[0].images[0].url}
                      alt={collection.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-600">
                      <Eye size={48} />
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        collection.status === "published"
                          ? "bg-green-600/20 text-green-400 border border-green-600/30"
                          : "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30"
                      }`}
                    >
                      {collection.status}
                    </span>
                  </div>
                </div>

                {/* Collection Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-3 line-clamp-2">
                    {collection.description || "No description"}
                  </p>
                  <p className="text-sm text-neutral-500 mb-4">
                    {collection.products.length} product
                    {collection.products.length !== 1 ? "s" : ""}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/collections/${collection.id}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="bg-transparent w-full border-neutral-700 text-white hover:bg-neutral-800 hover:text-white"
                      >
                        <Edit size={14} className="mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <DeleteCollectionButton
                      collectionId={collection.id}
                      collectionName={collection.name}
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
