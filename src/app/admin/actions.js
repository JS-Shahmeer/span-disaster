"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { login, logout, requireAdmin } from "@/lib/auth";

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export async function loginAction(_prev, formData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password.", email };
  if (!(await login(email, password))) return { error: "Email or password is incorrect.", email };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

// ---------- helpers ----------

const optionalText = z
  .string()
  .trim()
  .transform((v) => (v === "" ? null : v))
  .nullable();

const checkbox = z.preprocess((v) => v === "on" || v === "true", z.boolean());

function formToObject(formData) {
  return Object.fromEntries([...formData.entries()].filter(([, v]) => typeof v === "string"));
}

async function uploadFile(file, folder) {
  if (!file || typeof file === "string" || file.size === 0) return null;
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("File uploads need BLOB_READ_WRITE_TOKEN. Paste a file URL instead.");
  }
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Files must be 4 MB or smaller.");
  const blob = await put(`${folder}/${file.name}`, file, { access: "public", addRandomSuffix: true });
  return blob.url;
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

// ---------- products ----------

const productSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only use lowercase letters, numbers and dashes"),
  category: z.enum(["workbook", "personal", "educational", "free"]),
  description: z.string().trim().min(1, "Description is required"),
  features: z.string().transform((v) => v.split("\n").map((s) => s.trim()).filter(Boolean)),
  price: z
    .string()
    .trim()
    .transform((v, ctx) => {
      if (v === "") return null;
      const n = Number(v);
      if (!Number.isFinite(n) || n < 0) {
        ctx.addIssue({ code: "custom", message: "Price must be a positive number" });
        return z.NEVER;
      }
      return Math.round(n * 100);
    }),
  priceNote: optionalText,
  format: optionalText,
  delivery: optionalText,
  image: optionalText,
  badge: optionalText,
  intendedAudience: optionalText,
  sortOrder: z.coerce.number().int().default(0),
  published: checkbox,
});

// Failed saves return the submitted values so the form can be re-filled (React resets forms after an action).
function failure(message, formData) {
  return { error: message, values: formToObject(formData), ts: Date.now() };
}

function firstError(error) {
  return error.issues[0]?.message ?? "Please check the form.";
}

export async function saveProduct(id, _prev, formData) {
  await requireAdmin();
  const parsed = productSchema.safeParse({ published: "", ...formToObject(formData) });
  if (!parsed.success) return failure(firstError(parsed.error), formData);
  const { price, ...rest } = parsed.data;
  const data = { ...rest, priceCents: price };
  try {
    const uploaded = await uploadFile(formData.get("imageFile"), "products");
    if (uploaded) data.image = uploaded;
    if (id) await prisma.product.update({ where: { id }, data });
    else await prisma.product.create({ data });
  } catch (error) {
    if (error?.code === "P2002") return failure("Another product already uses that slug.", formData);
    return failure(error.message ?? "Could not save the product.", formData);
  }
  revalidateSite();
  redirect("/admin/products");
}

export async function deleteProduct(id) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidateSite();
  redirect("/admin/products");
}

// ---------- resources ----------

const resourceSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  type: z.enum(["handout", "pdf", "graphic", "video", "workbook"]),
  category: z.string().trim().min(1, "Category is required"),
  relatedActivity: z
    .string()
    .trim()
    .transform((v) => (v === "" ? null : Number(v)))
    .pipe(z.number().int().positive().nullable()),
  relatedMeeting: optionalText,
  fileUrl: optionalText,
  thumbnail: optionalText,
  videoUrl: optionalText,
  transcript: optionalText,
  sortOrder: z.coerce.number().int().default(0),
  free: checkbox,
  placeholder: checkbox,
  published: checkbox,
});

export async function saveResource(id, _prev, formData) {
  await requireAdmin();
  const parsed = resourceSchema.safeParse({ free: "", placeholder: "", published: "", ...formToObject(formData) });
  if (!parsed.success) return failure(firstError(parsed.error), formData);
  const data = parsed.data;
  try {
    const uploaded = await uploadFile(formData.get("file"), "resources");
    if (uploaded) data.fileUrl = uploaded;
    if (id) await prisma.resource.update({ where: { id }, data });
    else await prisma.resource.create({ data });
  } catch (error) {
    return failure(error.message ?? "Could not save the resource.", formData);
  }
  revalidateSite();
  redirect("/admin/resources");
}

export async function deleteResource(id) {
  await requireAdmin();
  await prisma.resource.delete({ where: { id } });
  revalidateSite();
  redirect("/admin/resources");
}

// ---------- messages ----------

export async function setMessageRead(id, read) {
  await requireAdmin();
  await prisma.contactMessage.update({ where: { id }, data: { read } });
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(id) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin", "layout");
}

// ---------- orders ----------

const orderStatuses = ["paid", "fulfilled", "cancelled", "refunded"];

export async function updateOrder(id, formData) {
  await requireAdmin();
  const status = String(formData.get("status") ?? "");
  if (!orderStatuses.includes(status)) return;
  const notes = String(formData.get("notes") ?? "").trim() || null;
  await prisma.order.update({ where: { id }, data: { status, notes } });
  revalidatePath("/admin", "layout");
}
