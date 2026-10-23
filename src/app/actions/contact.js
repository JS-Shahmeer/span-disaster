"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  inquiryType: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
  // Honeypot: real visitors never see or fill this field.
  company: z.string().max(0).optional(),
});

export async function submitContact(input) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    if (parsed.error.issues.some((i) => i.path[0] === "company")) return { ok: true };
    return { ok: false, error: "Please check the form and try again." };
  }
  if (!prisma) {
    return { ok: false, error: "Messages can't be sent right now. Please email us instead." };
  }
  const { company: _honeypot, ...data } = parsed.data;
  try {
    await prisma.contactMessage.create({ data });
    return { ok: true };
  } catch (error) {
    console.error("submitContact failed", error);
    return { ok: false, error: "Something went wrong sending your message. Please try again." };
  }
}
