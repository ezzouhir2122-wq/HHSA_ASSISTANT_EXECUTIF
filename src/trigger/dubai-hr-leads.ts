import { schedules, logger } from "@trigger.dev/sdk/v3"
import { scrapeLeads } from "./lib/firecrawl-scraper"
import { synthesizeLeads } from "./lib/claude-synthesizer"
import { scoreLead } from "./lib/lead-scorer"
import { writeLeadsToSheets } from "./lib/sheets-writer"

export const dubaiHRLeadGeneration = schedules.task({
  id: "dubai-hr-lead-generation",
  cron: {
    pattern: "0 7 * * *",
    timezone: "Asia/Dubai",
  },
  maxDuration: 3600,
  run: async (payload) => {
    const startMs = Date.now()
    const scrapedAt = payload.timestamp?.toISOString() ?? new Date().toISOString()

    logger.log("TASK_START", {
      scheduleId: payload.scheduleId,
      timestamp: scrapedAt,
    })

    // ── Phase 1: Scrape ─────────────────────────────────────────────────────
    logger.log("PHASE_1_START", { phase: "Firecrawl scraping" })

    let rawResults
    try {
      rawResults = await scrapeLeads()
    } catch (error) {
      logger.log("PHASE_1_FATAL", { error: String(error) })
      throw error
    }

    logger.log("PHASE_1_COMPLETE", { unique: rawResults.length })

    // ── Phase 2: Synthesize ──────────────────────────────────────────────────
    logger.log("PHASE_2_START", { phase: "Claude synthesis", count: rawResults.length })

    let leads
    try {
      leads = await synthesizeLeads(rawResults, scrapedAt)
    } catch (error) {
      logger.log("PHASE_2_FATAL", { error: String(error) })
      throw error
    }

    logger.log("PHASE_2_COMPLETE", { extracted: leads.length })

    if (leads.length === 0) {
      logger.log("TASK_COMPLETE", {
        status: "no_valid_leads",
        rawFound: rawResults.length,
        runDurationMs: Date.now() - startMs,
      })
      return { status: "no_valid_leads", rawFound: rawResults.length, extracted: 0, written: 0, failed: 0 }
    }

    // ── Phase 3: Score ───────────────────────────────────────────────────────
    logger.log("PHASE_3_START", { phase: "Scoring", count: leads.length })

    const scoredLeads = leads.map((lead) => {
      const { score, breakdown } = scoreLead(lead)
      logger.log("SCORE_OK", { companyName: lead.companyName, score })
      return { ...lead, score, scoreBreakdown: breakdown }
    })

    logger.log("PHASE_3_COMPLETE", { scored: scoredLeads.length })

    // ── Phase 4: Write to Sheets ─────────────────────────────────────────────
    logger.log("PHASE_4_START", { phase: "Google Sheets write", count: scoredLeads.length })

    let written = 0
    let failed = 0

    try {
      const result = await writeLeadsToSheets(scoredLeads)
      written = result.written
      failed = result.failed
    } catch (error) {
      logger.log("PHASE_4_FATAL", { error: String(error) })
      throw error
    }

    logger.log("PHASE_4_COMPLETE", { written, failed })

    const topLead = scoredLeads.reduce(
      (best, l) => (l.score > best.score ? l : best),
      scoredLeads[0]
    )
    const runDurationMs = Date.now() - startMs

    logger.log("TASK_COMPLETE", {
      rawFound: rawResults.length,
      extracted: leads.length,
      written,
      failed,
      topLead: topLead.companyName,
      topScore: topLead.score,
      runDurationMs,
    })

    return {
      rawFound: rawResults.length,
      extracted: leads.length,
      written,
      failed,
      topLead: topLead.companyName,
      topScore: topLead.score,
      runDurationMs,
    }
  },
})
