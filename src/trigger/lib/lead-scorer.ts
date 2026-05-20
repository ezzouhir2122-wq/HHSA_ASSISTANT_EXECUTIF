import { DubaiHRLead } from "./types"

interface ScoreResult {
  score: number
  breakdown: string
}

export function scoreLead(lead: DubaiHRLead): ScoreResult {
  const rules: Array<{ label: string; points: number; applies: boolean }> = [
    { label: "email", points: 20, applies: lead.email !== "" },
    { label: "phone", points: 10, applies: lead.phone !== "" },
    { label: "contact_name", points: 10, applies: lead.contactName !== "" },
    { label: "linkedin", points: 5, applies: lead.linkedinUrl !== "" },
    { label: "size_known", points: 10, applies: lead.companySize !== "unknown" },
    { label: "year_known", points: 5, applies: lead.yearFounded !== "unknown" },
    { label: "location_known", points: 5, applies: lead.locationArea !== "unknown" },
    { label: "sme_11_50", points: 15, applies: lead.companySize === "11-50" },
    { label: "sme_1_10", points: 8, applies: lead.companySize === "1-10" },
    { label: "mid_market", points: 5, applies: lead.companySize === "51-200" },
    { label: "social_media", points: 5, applies: lead.hasSocialMedia },
    {
      label: "outsourcing_payroll",
      points: 10,
      applies: lead.servicesOffered.some((s) => /outsourc|payroll/i.test(s)),
    },
    {
      label: "recruitment_talent",
      points: 5,
      applies: lead.servicesOffered.some((s) => /recruit|talent/i.test(s)),
    },
    {
      label: "real_website",
      points: 5,
      applies:
        !lead.website.includes("linkedin.com") &&
        !lead.website.includes("clutch.co") &&
        !lead.website.includes("goodfirms.co"),
    },
  ]

  const applied = rules.filter((r) => r.applies)
  const raw = applied.reduce((sum, r) => sum + r.points, 0)
  const score = Math.min(raw, 100)
  const breakdown = applied.map((r) => `${r.label}+${r.points}`).join(" ")

  return { score, breakdown }
}
