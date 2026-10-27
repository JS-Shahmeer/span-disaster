// Seeds the database with the launch content from src/data and creates the first admin.
// Safe to re-run: existing products, resources and admins are left untouched.
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { products } from "../src/data/products.js";
import { resources } from "../src/data/resources.js";

const prisma = new PrismaClient();

async function main() {
  for (const [i, p] of products.entries()) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        category: p.category,
        description: p.description,
        features: p.features ?? [],
        priceCents: p.price == null ? null : Math.round(p.price * 100),
        priceNote: p.priceNote,
        format: p.format,
        delivery: p.delivery,
        image: p.image,
        badge: p.badge,
        intendedAudience: p.intendedAudience,
        sortOrder: i,
      },
    });
  }

  if ((await prisma.resource.count()) === 0) {
    await prisma.resource.createMany({
      data: resources.map((r, i) => ({
        title: r.title,
        description: r.description,
        type: r.type,
        category: r.category,
        relatedActivity: r.relatedActivity ?? null,
        relatedMeeting: r.relatedMeeting ?? null,
        free: r.free ?? true,
        placeholder: r.placeholder ?? false,
        thumbnail: r.thumbnail ?? null,
        videoUrl: r.videoUrl ?? null,
        transcript: r.transcript ?? null,
        sortOrder: i,
      })),
    });
  }

  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    await prisma.adminUser.upsert({
      where: { email: ADMIN_EMAIL.toLowerCase() },
      update: {},
      create: { email: ADMIN_EMAIL.toLowerCase(), passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12) },
    });
  } else {
    console.warn("ADMIN_EMAIL / ADMIN_PASSWORD not set: no admin account created.");
  }
}

main()
  .then(() => console.log("Seed complete."))
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
