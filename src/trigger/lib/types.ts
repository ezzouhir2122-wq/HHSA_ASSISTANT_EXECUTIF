export interface DubaiHRLead {
  companyName: string
  website: string
  email: string
  phone: string
  contactName: string
  contactTitle: string
  companySize: "1-10" | "11-50" | "51-200" | "200+" | "unknown"
  servicesOffered: string[]
  locationArea: string
  yearFounded: string
  hasSocialMedia: boolean
  linkedinUrl: string
  rawDescription: string
  score: number
  scoreBreakdown: string
  sourceQuery: string
  scrapedAt: string
}

export interface RawScrapedResult {
  url: string
  title: string
  description: string
  markdown: string
  sourceQuery: string
}

export const SEARCH_QUERIES = [
  "HR consulting firms Dubai UAE services recruitment",
  "human resources consultant Dubai company profile contact",
  "HR outsourcing payroll Dubai small business",
  "talent acquisition management consulting Dubai 2025",
  "employee relations HR advisory Dubai site:linkedin.com OR site:clutch.co",
]
