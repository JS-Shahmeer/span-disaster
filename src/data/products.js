// Storefront product data
// NOTE: Prices, inventory, shipping, and product specifications are placeholders.
// Commerce integration will be configured when available.

export const productCategories = [
  { id: "workbook", label: "SPAN Workbook" },
  { id: "personal", label: "Personal Preparedness" },
  { id: "educational", label: "Educational Materials" },
  { id: "free", label: "Free Handouts" },
];

export const products = [
  {
    id: "p1",
    slug: "span-workbook",
    name: "SPAN Workbook",
    category: "workbook",
    description: "The complete SPAN educational workbook that supports the neighborhood preparedness program. Includes the 9-Step Response Plan, the Four Response Teams, all five meeting exercises, and personal preparedness guidance.",
    features: [
      "Full 9-Step Response Plan",
      "Four Response Teams overview",
      "Five meeting and exercise guides",
      "12 personal preparedness activities",
      "Printable handouts and checklists",
    ],
    price: null,
    priceNote: "Price to be confirmed",
    format: "Print workbook",
    delivery: "Shipped to your address",
    image: "workbook",
    badge: "Core Resource",
    intendedAudience: "Neighborhood organizers, facilitators, and individual residents using the SPAN program.",
  },
  {
    id: "p2",
    slug: "emergency-weather-radio",
    name: "Emergency Weather Radio",
    category: "personal",
    description: "A hand-crank and solar-powered emergency radio with NOAA weather alerts, flashlight, and phone charging capability.",
    features: [
      "NOAA weather alerts",
      "Hand-crank and solar charging",
      "Built-in flashlight",
      "USB phone charging",
    ],
    price: null,
    priceNote: "Price to be confirmed",
    format: "Physical product",
    delivery: "Shipped to your address",
    image: "radio",
    badge: null,
    intendedAudience: "Households building an emergency preparedness kit, especially in weather-sensitive regions.",
  },
  {
    id: "p3",
    slug: "household-first-aid-kit",
    name: "Household First Aid Kit",
    category: "personal",
    description: "A comprehensive first aid kit designed for household emergency preparedness, including bandages, gauze, antiseptics, and basic medical supplies.",
    features: [
      "Bandages and gauze",
      "Antiseptic supplies",
      "Basic medical tools",
      "Compact storage case",
    ],
    price: null,
    priceNote: "Price to be confirmed",
    format: "Physical product",
    delivery: "Shipped to your address",
    image: "firstaid",
    badge: null,
    intendedAudience: "Every household, especially those with children or active lifestyles.",
  },
  {
    id: "p4",
    slug: "gas-shut-off-wrench",
    name: "Gas Shut-Off Wrench",
    category: "personal",
    description: "A dedicated gas shut-off wrench for safely turning off your gas valve after an earthquake or other disaster.",
    features: [
      "Fits standard gas valves",
      "Durable steel construction",
      "Lightweight and compact",
      "Essential utility safety tool",
    ],
    price: null,
    priceNote: "Price to be confirmed",
    format: "Physical product",
    delivery: "Shipped to your address",
    image: "wrench",
    badge: null,
    intendedAudience: "Residents in earthquake-prone areas who need to shut off gas safely after a disaster.",
  },
  {
    id: "p5",
    slug: "emergency-led-flashlight-set",
    name: "Emergency LED Flashlight Set",
    category: "personal",
    description: "A set of durable LED flashlights with long battery life, ideal for power outages and emergency lighting.",
    features: [
      "Long-lasting LED bulbs",
      "Multiple flashlights included",
      "Water-resistant design",
      "Battery efficient",
    ],
    price: null,
    priceNote: "Price to be confirmed",
    format: "Physical product",
    delivery: "Shipped to your address",
    image: "flashlight",
    badge: null,
    intendedAudience: "Households preparing for power outages and nighttime emergencies.",
  },
  {
    id: "p6",
    slug: "span-handouts-collection",
    name: "SPAN Handouts Collection",
    category: "free",
    description: "A collection of free downloadable handouts covering personal and neighborhood preparedness topics.",
    features: [
      "Printable PDF format",
      "Personal preparedness checklists",
      "Neighborhood preparedness guides",
      "Free to download",
    ],
    price: 0,
    priceNote: "Free",
    format: "Digital download",
    delivery: "Instant download",
    image: "handouts",
    badge: "Free",
    intendedAudience: "Anyone learning about personal or neighborhood preparedness.",
  },
];

export function getProductsByCategory(categoryId) {
  if (categoryId === "all") return products;
  return products.filter((p) => p.category === categoryId);
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}
