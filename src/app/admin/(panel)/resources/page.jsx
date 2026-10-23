import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function ResourcesPage() {
  const resources = await prisma.resource.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Resources</h1>
        <Link href="/admin/resources/new" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:brightness-110">
          New resource
        </Link>
      </div>
      <div className="overflow-x-auto bg-card border border-border rounded-xl">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground border-b border-border">
            <tr>
              <th className="p-3 font-medium">Title</th>
              <th className="p-3 font-medium">Type</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">File</th>
              <th className="p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0">
                <td className="p-3">
                  <Link href={`/admin/resources/${r.id}`} className="font-medium text-primary hover:underline">{r.title}</Link>
                  {r.placeholder && <div className="text-xs text-accent-ink">Placeholder</div>}
                </td>
                <td className="p-3">{r.type}</td>
                <td className="p-3">{r.category}</td>
                <td className="p-3">{r.fileUrl || r.videoUrl ? "Yes" : "None"}</td>
                <td className="p-3">{r.published ? "Published" : "Hidden"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
