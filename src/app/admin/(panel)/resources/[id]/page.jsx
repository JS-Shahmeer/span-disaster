import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { deleteResource } from "@/app/admin/actions";
import ResourceForm from "@/components/admin/ResourceForm";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function EditResourcePage({ params }) {
  const { id } = await params;
  const resource = await prisma.resource.findUnique({ where: { id } });
  if (!resource) notFound();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Edit resource</h1>
        <DeleteButton action={deleteResource.bind(null, resource.id)} label="Delete resource" />
      </div>
      <ResourceForm resource={resource} />
    </>
  );
}
