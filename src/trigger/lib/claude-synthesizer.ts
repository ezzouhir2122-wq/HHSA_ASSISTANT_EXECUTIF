import Anthropic from "@anthropic-ai/sdk"
import { logger, wait } from "@trigger.dev/sdk/v3"
import { DubaiHRLead, RawScrapedResult } from "./types"

const SYSTEM_PROMPT = `You are a data extraction assistant. Extract structured information about an HR consulting company from the webpage content provided. Return ONLY a JSON object inside a markdown code block. Use empty string for any string field you cannot determine, false for booleans, "unknown" for companySize, and [] for arrays.`

function buildUserPrompt(raw: RawScrapedResult): string {
  const content = raw.markdown.slice(0, 3000) || raw.description
  return `URL: ${raw.url}
Title: ${raw.title}

Content:
${content}

Extract the following fields and return as JSON:
- companyName (string)
- website (string — use the URL above if unclear)
- email (string)
- phone (string)
- contactName (string — a real person's name, not a job title)
- contactTitle (string — e.g. "CEO", "HR Director")
- companySize ("1-10" | "11-50" | "51-200" | "200+" | "unknown")
- servicesOffered (string[] — e.g. ["HR outsourcing", "payroll", "recruitment"])
- locationArea (string — specific Dubai area like "DIFC", "JLT", "Business Bay", or just "Dubai")
- yearFounded (string — e.g. "2018" or "unknown")
- hasSocialMedia (boolean — true if any social media presence is found or linked)
- linkedinUrl (string)`
}

function extractJsonFromText(text: string): unknown {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (match) return JSON.parse(match[1].trim())
  return JSON.parse(text.trim())
}

const VALID_SIZES = new Set(["1-10", "11-50", "51-200", "200+", "unknown"])

function normalizeLead(raw: RawScrapedResult, parsed: Record<string, unknown>, scrapedAt: string): DubaiHRLead {
  const size = String(parsed.companySize ?? "unknown")
  return {
    companyName: String(parsed.companyName || raw.title || ""),
    website: String(parsed.website ?? raw.url),
    email: String(parsed.email ?? ""),
    phone: String(parsed.phone ?? ""),
    contactName: String(parsed.contactName ?? ""),
    contactTitle: String(parsed.contactTitle ?? ""),
    companySize: (VALID_SIZES.has(size) ? size : "unknown") as DubaiHRLead["companySize"],
    servicesOffered: Array.isArray(parsed.servicesOffered)
      ? parsed.servicesOffered.map(String)
      : [],
    locationArea: String(parsed.locationArea ?? "unknown"),
    yearFounded: String(parsed.yearFounded ?? "unknown"),
    hasSocialMedia: Boolean(parsed.hasSocialMedia),
    linkedinUrl: String(parsed.linkedinUrl ?? ""),
    rawDescription: raw.description.slice(0, 500),
    score: 0,
    scoreBreakdown: "",
    sourceQuery: raw.sourceQuery,
    scrapedAt,
  }
}

export async function synthesizeLeads(
  rawResults: RawScrapedResult[],
  scrapedAt: string
): Promise<DubaiHRLead[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set")

  const client = new Anthropic({ apiKey })
  const leads: DubaiHRLead[] = []

  for (let i = 0; i < rawResults.length; i++) {
    const raw = rawResults[i]
    logger.log("SYNTHESIS_START", { url: raw.url, index: i + 1, total: rawResults.length })

    try {
      const response = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserPrompt(raw) }],
      })

      const block = response.content[0]
      const text = block.type === "text" ? block.text : ""

      let parsed: Record<string, unknown>
      try {
        parsed = extractJsonFromText(text) as Record<string, unknown>
      } catch {
        logger.log("SYNTHESIS_SKIP", { url: raw.url, reason: "JSON parse failed", text: text.slice(0, 200) })
        continue
      }

      if (typeof parsed !== "object" || parsed === null) {
        logger.log("SYNTHESIS_SKIP", { url: raw.url, reason: "not an object" })
        continue
      }

      const lead = normalizeLead(raw, parsed, scrapedAt)

      if (!lead.companyName || !lead.website) {
        logger.log("SYNTHESIS_SKIP", { url: raw.url, reason: "missing companyName or website" })
        continue
      }

      logger.log("SYNTHESIS_OK", { companyName: lead.companyName, website: lead.website })
      leads.push(lead)
    } catch (error) {
      logger.log("SYNTHESIS_FAIL", { url: raw.url, error: String(error) })
    }

    if (i < rawResults.length - 1) {
      await wait.for({ seconds: 1 })
    }
  }

  return leads
}
