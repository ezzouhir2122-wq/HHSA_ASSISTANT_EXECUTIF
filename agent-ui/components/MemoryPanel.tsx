"use client";

import { useState } from "react";
import { Brain, Zap, HardDrive, User, Target, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "short" | "long" | "context" | "goals" | "priorities";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "short", label: "Court terme", icon: <Zap size={12} /> },
  { id: "long", label: "Long terme", icon: <HardDrive size={12} /> },
  { id: "context", label: "Contexte", icon: <User size={12} /> },
  { id: "goals", label: "Objectifs", icon: <Target size={12} /> },
  { id: "priorities", label: "Priorités", icon: <ArrowUpDown size={12} /> },
];

const MEMORY_DATA: Record<Tab, { key: string; value: string; type?: "string" | "number" | "bool" | "array" }[]> = {
  short: [
    { key: "session_id", value: "sess_2026-06-27_0845", type: "string" },
    { key: "active_lead", value: "Lead #847 — AZK Solutions", type: "string" },
    { key: "current_task", value: "email_outreach", type: "string" },
    { key: "leads_processed", value: "12", type: "number" },
    { key: "devis_generated", value: "3", type: "number" },
    { key: "api_calls_used", value: "47", type: "number" },
  ],
  long: [
    { key: "user_id", value: "Ezzouhir — HHSA Agency", type: "string" },
    { key: "agency_email", value: "hhsaagency@gmail.com", type: "string" },
    { key: "crm_sheet_id", value: "1BxiMVs0XRA...", type: "string" },
    { key: "preferred_model", value: "claude-sonnet-4-6", type: "string" },
    { key: "default_currency", value: "MAD", type: "string" },
    { key: "clients_total", value: "34", type: "number" },
    { key: "avg_deal_size", value: "12400 MAD", type: "number" },
  ],
  context: [
    { key: "role", value: "Fondateur, HHSA Agency", type: "string" },
    { key: "focus", value: "Workflows agentiques PME MENA", type: "string" },
    { key: "team_size", value: "solo", type: "string" },
    { key: "north_star", value: "Leader conseil IA MENA", type: "string" },
    { key: "active_quarter", value: "Q2 2026", type: "string" },
    { key: "stack", value: "Claude, Zapier, Sheets, Gmail", type: "array" },
  ],
  goals: [
    { key: "revenue_target_q2", value: "150 000 MAD", type: "number" },
    { key: "clients_target", value: "50 clients actifs", type: "number" },
    { key: "skills_to_build", value: "audit-client, reporting", type: "array" },
    { key: "workshop_goal", value: "2 ateliers formations", type: "string" },
    { key: "mena_expansion", value: "Dubai + Casablanca", type: "string" },
  ],
  priorities: [
    { key: "p1", value: "Traitement leads pipeline actif", type: "string" },
    { key: "p2", value: "Skill audit-client (Blueprint pending)", type: "string" },
    { key: "p3", value: "Onboarding 3 nouveaux clients", type: "string" },
    { key: "p4", value: "Veille tendances IA MENA", type: "string" },
    { key: "p5", value: "Refonte site HHSA Agency", type: "string" },
  ],
};

const TYPE_STYLES: Record<string, string> = {
  string: "text-amber-400",
  number: "text-cyan-400",
  bool: "text-green-400",
  array: "text-purple-400",
};

const USAGE = { short: 42, long: 78, tokens: 234 };

export default function MemoryPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("short");
  const data = MEMORY_DATA[activeTab];

  return (
    <div className="gradient-border-card flex flex-col h-full min-h-[300px] card-hover">
      {/* Header */}
      <div className="flex items-center gap-2.5 p-5 pb-3">
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <Brain size={16} className="text-purple-400" />
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Mémoire Agent</p>
          <h3 className="font-syne font-semibold text-sm text-white mt-0.5">Memory Store</h3>
        </div>
        <div className="ml-auto text-[10px] font-mono text-zinc-600">
          {USAGE.tokens} tok
        </div>
      </div>

      {/* Usage bars */}
      <div className="px-5 mb-3 space-y-1.5">
        <UsageBar label="Court terme" value={USAGE.short} color="bg-accent" />
        <UsageBar label="Long terme" value={USAGE.long} color="bg-purple-500" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0.5 px-5 mb-3 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "bg-accent/15 text-accent border border-accent/25"
                : "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Memory entries */}
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        <div className="rounded-lg border border-border-subtle overflow-hidden font-mono text-[11px]">
          {data.map((entry, i) => (
            <div
              key={entry.key}
              className={cn(
                "flex items-start gap-2 px-3 py-2 border-b border-border-subtle/50 last:border-0 transition-colors hover:bg-zinc-800/30",
                i % 2 === 0 ? "bg-zinc-900/30" : ""
              )}
            >
              <span className="text-zinc-500 flex-shrink-0 min-w-[120px] truncate">{entry.key}</span>
              <span className="text-zinc-700 flex-shrink-0">:</span>
              <span className={cn("flex-1 break-all", TYPE_STYLES[entry.type ?? "string"])}>
                "{entry.value}"
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsageBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-0.5">
        <span className="text-[9px] text-zinc-600 font-mono">{label}</span>
        <span className="text-[9px] text-zinc-600 font-mono">{value}%</span>
      </div>
      <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
