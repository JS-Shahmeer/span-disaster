"use client";

import { useActionState } from "react";
import { saveProduct } from "@/app/admin/actions";
import { productCategories } from "@/data/products";
import { Checkbox, Field, FormError, Select, SubmitButton, TextArea, formDefaults } from "@/components/admin/fields";

export default function ProductForm({ product }) {
  const [state, action] = useActionState(saveProduct.bind(null, product?.id ?? null), null);
  const p = product ?? {};
  const { text, checked } = formDefaults(state, {
    ...p,
    features: (p.features ?? []).join("\n"),
    price: p.priceCents == null ? "" : (p.priceCents / 100).toFixed(2),
  });

  return (
    <form key={state?.ts ?? 0} action={action} className="space-y-5 max-w-2xl">
      <FormError state={state} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" name="name" defaultValue={text("name")} required />
        <Field label="Slug" name="slug" defaultValue={text("slug")} required hint="Used in the URL, e.g. span-workbook" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Select
          label="Category"
          name="category"
          defaultValue={text("category", p.category ?? "workbook")}
          options={productCategories.map((c) => ({ value: c.id, label: c.label }))}
        />
        <Field
          label="Price (USD)"
          name="price"
          type="number"
          step="0.01"
          min="0"
          defaultValue={text("price")}
          hint="Leave empty if not set yet. 0 means free."
        />
      </div>
      <TextArea label="Description" name="description" defaultValue={text("description")} required />
      <TextArea label="Features" name="features" defaultValue={text("features")} hint="One per line." />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Price note" name="priceNote" defaultValue={text("priceNote")} hint='e.g. "Price to be confirmed"' />
        <Field label="Badge" name="badge" defaultValue={text("badge")} />
        <Field label="Format" name="format" defaultValue={text("format")} />
        <Field label="Delivery" name="delivery" defaultValue={text("delivery")} />
      </div>
      <TextArea label="Intended audience" name="intendedAudience" rows={2} defaultValue={text("intendedAudience")} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Image URL or key" name="image" defaultValue={text("image")} />
        <Field label="Upload image" name="imageFile" type="file" accept="image/*" hint="Replaces the image URL. Max 4 MB." />
      </div>
      <div className="flex flex-wrap items-end gap-6">
        <div className="w-32">
          <Field label="Sort order" name="sortOrder" type="number" defaultValue={text("sortOrder", p.sortOrder ?? 0)} />
        </div>
        <Checkbox label="Published" name="published" defaultChecked={checked("published", p.published ?? true)} />
      </div>
      <SubmitButton>{product ? "Save changes" : "Create product"}</SubmitButton>
    </form>
  );
}
