import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { deleteProduct } from "@/app/admin/actions";
import ProductForm from "@/components/admin/ProductForm";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Edit product</h1>
        <DeleteButton action={deleteProduct.bind(null, product.id)} label="Delete product" />
      </div>
      <ProductForm product={product} />
    </>
  );
}
