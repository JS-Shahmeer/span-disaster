import { activities } from "@/data/activities";
import { meetings } from "@/data/meetings";
import { absoluteUrl } from "@/lib/seo";

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI assistants and answer engines.
export const dynamic = "force-static";

export function GET() {
  const body = `# SPAN Disaster Services

> SPAN Disaster Services is a 501(c)(3) nonprofit (est. 2004, program origins 1986) that helps neighborhoods of 15–20 households prepare, organize, and practice the skills needed to respond together during the critical first hour (the "golden hour") after a major disaster, when professional emergency services may be overwhelmed.

Neighborhood volunteers follow safety procedures and do not replace professional emergency responders.

## Core pages

- [Home](${absoluteUrl("/")}): Overview of SPAN, the golden hour, and the SPAN method
- [About SPAN](${absoluteUrl("/about")}): History, programs, and disaster response experience
- [Personal Preparedness](${absoluteUrl("/personal-preparedness")}): 12 household preparedness activities
- [Neighborhood Preparedness](${absoluteUrl("/neighborhood-preparedness")}): The five-meeting process for organizing a neighborhood response team
- [Resources](${absoluteUrl("/resources")}): Free handouts, graphics, and videos
- [Shop](${absoluteUrl("/shop")}): The SPAN Workbook and preparedness products
- [Contact](${absoluteUrl("/contact")})

## Neighborhood meetings

${meetings.map((m) => `- [${m.title}](${absoluteUrl(`/neighborhood-preparedness/${m.slug}`)}): ${m.short}`).join("\n")}

## Personal preparedness activities

${activities.map((a) => `- [${a.title}](${absoluteUrl(`/personal-preparedness/${a.slug}`)}): ${a.summary}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
