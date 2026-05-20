import Firecrawl from "@mendable/firecrawl-js"
import { logger, wait } from "@trigger.dev/sdk/v3"
import { RawScrapedResult, SEARCH_QUERIES } from "./types"

function normalizeDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname
    return hostname.replace(/^www\./, "").toLowerCase()
  } catch {
    return url.toLowerCase()
  }
}

export async function scrapeLeads(): Promise<RawScrapedResult[]> {
  const apiKey = process.env.FIRECRAWL_API_KEY
  if (!apiKey) throw new Error("FIRECRAWL_API_KEY is not set")

  // Firecrawl v4 — default export is `Firecrawl`, results live in response.web
  const firecrawl = new Firecrawl({ apiKey })
  const rawResults: RawScrapedResult[] = []
  const seenDomains = new Set<string>()

  for (let i = 0; i < SEARCH_QUERIES.length; i++) {
    const query = SEARCH_QUERIES[i]
    logger.log("SCRAPE_QUERY_START", { query, index: i + 1, total: SEARCH_QUERIES.length })

    try {
      const response = await firecrawl.search(query, {
        limit: 5,
        scrapeOptions: { formats: ["markdown"] },
      })

      // v4 SearchData: { web?: Array<SearchResultWeb | Document> }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items: any[] = response.web ?? []
      let addedCount = 0

      for (const item of items) {
        const url: string = item.url ?? item.metadata?.url ?? ""
        if (!url) continue

        const domain = normalizeDomain(url)
        if (seenDomains.has(domain)) continue
        seenDomains.add(domain)

        let markdown: string = item.markdown ?? ""

        // Search results don't include full page content — scrape individually
        if (!markdown) {
          try {
            const scraped = await firecrawl.scrapeUrl(url, { formats: ["markdown"] })
            markdown = (scraped as { markdown?: string }).markdown ?? ""
          } catch (scrapeError) {
            logger.log("SCRAPE_URL_FAIL", { url, error: String(scrapeError) })
          }
        }

        rawResults.push({
          url,
          title: item.title ?? item.metadata?.title ?? "",
          description: item.description ?? item.metadata?.description ?? "",
          markdown,
          sourceQuery: query,
        })
        addedCount++
      }

      logger.log("SCRAPE_QUERY_OK", { query, total: items.length, added: addedCount })
    } catch (error) {
      logger.log("SCRAPE_QUERY_FAIL", { query, error: String(error) })
    }

    if (i < SEARCH_QUERIES.length - 1) {
      await wait.for({ seconds: 2 })
    }
  }

  logger.log("SCRAPE_DEDUP", { unique: rawResults.length })

  if (rawResults.length === 0) {
    throw new Error("No scrape results from any query — all 5 queries failed or returned nothing")
  }

  return rawResults
}
