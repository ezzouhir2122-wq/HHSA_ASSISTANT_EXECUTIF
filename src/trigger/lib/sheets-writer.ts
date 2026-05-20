import { google } from "googleapis"
import { logger } from "@trigger.dev/sdk/v3"
import { DubaiHRLead } from "./types"

function buildRow(lead: DubaiHRLead): string[] {
  return [
    lead.companyName,
    lead.website,
    lead.email,
    lead.phone,
    lead.contactName,
    lead.contactTitle,
    lead.companySize,
    lead.servicesOffered.join(", "),
    lead.locationArea,
    lead.yearFounded,
    lead.hasSocialMedia ? "Yes" : "No",
    lead.linkedinUrl,
    lead.rawDescription,
    String(lead.score),
    lead.scoreBreakdown,
    lead.sourceQuery,
    lead.scrapedAt,
  ]
}

interface WriteResult {
  written: number
  failed: number
}

export async function writeLeadsToSheets(leads: DubaiHRLead[]): Promise<WriteResult> {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID
  const range = process.env.GOOGLE_SHEETS_RANGE

  if (!clientId || !clientSecret || !refreshToken || !spreadsheetId || !range) {
    throw new Error(
      "Missing Google Sheets env vars — need GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GOOGLE_SHEETS_ID, GOOGLE_SHEETS_RANGE"
    )
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret)
  oauth2Client.setCredentials({ refresh_token: refreshToken })

  const sheets = google.sheets({ version: "v4", auth: oauth2Client })

  let written = 0
  let failed = 0

  for (const lead of leads) {
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [buildRow(lead)] },
      })
      logger.log("SHEET_WRITE_OK", { companyName: lead.companyName, score: lead.score })
      written++
    } catch (error) {
      logger.log("SHEET_WRITE_FAIL", { companyName: lead.companyName, error: String(error) })
      failed++
    }
  }

  return { written, failed }
}
