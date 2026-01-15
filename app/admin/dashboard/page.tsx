import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderOpen, Package, Image as ImageIcon, Plus } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Get stats
  const [collectionsCount, productsCount, imagesCount] = await Promise.all([
    prisma.collection.count(),
    prisma.product.count(),
    prisma.image.count(),
  ]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-neutral-400">
          Welcome back, {session.user.name || session.user.email}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
        {/* Collections Stat */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-600/10 rounded-lg">
              <FolderOpen className="text-blue-500" size={20} />
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {collectionsCount}
            </span>
          </div>
          <h3 className="text-neutral-400 text-xs sm:text-sm font-medium">
            Collections
          </h3>
        </div>

        {/* Products Stat */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-green-600/10 rounded-lg">
              <Package className="text-green-500" size={20} />
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {productsCount}
            </span>
          </div>
          <h3 className="text-neutral-400 text-xs sm:text-sm font-medium">
            Products
          </h3>
        </div>

        {/* Images Stat */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 sm:p-6 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-purple-600/10 rounded-lg">
              <ImageIcon className="text-purple-500" size={20} />
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {imagesCount}
            </span>
          </div>
          <h3 className="text-neutral-400 text-xs sm:text-sm font-medium">
            Images
          </h3>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="/admin/collections/new" className="flex-1 sm:flex-none">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
              <Plus size={16} className="mr-2" />
              New Collection
            </Button>
          </Link>
          <Link href="/admin/collections" className="flex-1 sm:flex-none">
            <Button
              variant="outline"
              className="bg-transparent border-neutral-700 text-white hover:bg-neutral-800 hover:text-white w-full"
            >
              <FolderOpen size={16} className="mr-2" />
              View Collections
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
