"use client";

import { useState } from "react";
import { Settings, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type ToolItem = {
  id: string;
  name: string;
  emoji: string;
  connected: boolean;
  lastUsed: string;
  callsToday: number;
  category: "google" | "ai" | "data" | "automation" | "search";
};

const TOOLS: ToolItem[] = [
  { id: "gmail", name: "Gmail", emoji: "📧", connected: true, lastUsed: "08:49", callsToday: 7, category: "google" },
  { id: "gcal", name: "Calendar", emoji: "📅", connected: true, lastUsed: "07:30", callsToday: 2, category: "google" },
  { id: "sheets", name: "Sheets", emoji: "📊", connected: true, lastUsed: "08:47", callsToday: 18, category: "google" },
  { id: "drive", name: "Drive", emoji: "💾", connected: true, lastUsed: "08:48", callsToday: 5, category: "google" },
  { id: "zapier", name: "Zapier", emoji: "⚡", connected: true, lastUsed: "08:46", callsToday: 12, category: "automation" },
  { id: "supabase", name: "Supabase", emoji: "🗄️", connected: false, lastUsed: "—", callsToday: 0, category: "data" },
  { id: "claude", name: "Claude", emoji: "🧠", connected: true, lastUsed: "08:50", callsToday: 24, category: "ai" },
  { id: "openai", name: "OpenAI", emoji: "🤖", connected: false, lastUsed: "—", callsToday: 0, category: "ai" },
  { id: "brave", name: "Brave Search", emoji: "🔍", connected: true, lastUsed: "08:46", callsToday: 3, category: "search" },
  { id: "mcp", name: "MCP Server", emoji: "🔌", connected: true, lastUsed: "08:45", callsToday: 31, category: "automation" },
];

type Filter = "all" | "google" | "ai" | "automation" | "search" | "data";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "google", label: "Google" },
  { id: "ai", label: "IA" },
  { id: "automation", label: "Automation" },
  { id: "search", label: "Recherche" },
];

export default function ToolsGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [configTool, setConfigTool] = useState<string | null>(null);

  const filtered = filter === "all" ? TOOLS : TOOLS.filter((t) => t.category === filter);
  const connectedCount = TOOLS.filter((t) => t.connected).length;

  return (
    <div className="gradient-border-card p-5 card-hover">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-lg">
          🔧
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Intégrations</p>
          <h3 className="font-syne font-semibold text-sm text-white mt-0.5">Outils disponibles</h3>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          <span className="text-[11px] font-mono text-zinc-400">{connectedCount}/{TOOLS.length} connectés</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 mb-4 overflow-x-auto pb-0.5">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all",
              filter === f.id
                ? "bg-accent/15 text-accent border border-accent/25"
                : "bg-zinc-800 text-zinc-500 hover:text-zinc-300 border border-transparent"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {filtered.map((tool) => (
          <div
            key={tool.id}
            className={cn(
              "relative flex flex-col items-center p-3 rounded-xl border transition-all group cursor-pointer card-hover",
              tool.connected
                ? "bg-zinc-900/50 border-border-subtle hover:border-accent/30 hover:bg-accent/5"
                : "bg-zinc-900/20 border-border-subtle/50 opacity-50"
            )}
          >
            {/* Status dot */}
            <div className={cn(
              "absolute top-2 right-2 w-1.5 h-1.5 rounded-full",
              tool.connected ? "bg-success status-ring-green" : "bg-zinc-700"
            )} />

            {/* Emoji icon */}
            <div className="text-2xl mb-2">{tool.emoji}</div>

            {/* Name */}
            <p className="text-xs font-syne font-semibold text-white text-center leading-tight mb-1">{tool.name}</p>

            {/* Last used */}
            <p className="text-[9px] text-zinc-600 font-mono mb-2">
              {tool.connected ? `${tool.lastUsed} · ${tool.callsToday} appels` : "Déconnecté"}
            </p>

            {/* Config button */}
            {tool.connected && (
              <button
                onClick={(e) => { e.stopPropagation(); setConfigTool(tool.id); }}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[9px] text-zinc-400 hover:text-zinc-200 transition-all opacity-0 group-hover:opacity-100 border border-transparent hover:border-border"
              >
                <Settings size={8} />
                Config
              </button>
            )}
            {!tool.connected && (
              <button className="flex items-center gap-1 px-2 py-0.5 rounded bg-accent/10 hover:bg-accent/20 text-[9px] text-accent transition-all border border-accent/20">
                <ExternalLink size={8} />
                Connecter
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Config panel (mini popup) */}
      {configTool && (
        <div className="mt-3 p-3 rounded-xl border border-accent/20 bg-accent/5 text-[11px] font-mono text-zinc-400">
          <div className="flex items-center justify-between mb-2">
            <span className="text-accent">Configuration: {TOOLS.find(t => t.id === configTool)?.name}</span>
            <button onClick={() => setConfigTool(null)} className="text-zinc-600 hover:text-zinc-300">✕</button>
          </div>
          <p className="text-zinc-600">→ API key: ••••••••••••7a4f</p>
          <p className="text-zinc-600">→ Rate limit: 100 req/min</p>
          <p className="text-zinc-600">→ Webhook: activé</p>
          <button className="mt-2 px-3 py-1 rounded bg-accent/20 text-accent hover:bg-accent/30 transition-colors">
            Modifier les paramètres →
          </button>
        </div>
      )}
    </div>
  );
}
