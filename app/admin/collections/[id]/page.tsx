import { getCollectionById } from "@/lib/queries/collections";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import CollectionEditor from "@/components/admin/CollectionEditor";

// Force dynamic rendering - admin pages need authentication and database access
export const dynamic = "force-dynamic";

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const collection = await getCollectionById(id);

  if (!collection) {
    redirect("/admin/collections");
  }

  return <CollectionEditor collection={collection} />;
}
