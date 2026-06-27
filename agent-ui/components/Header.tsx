"use client";

import { useState } from "react";
import { Bell, Search, Cpu, Wifi, Activity, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  agentStatus: "active" | "paused" | "stopped";
  tokenCount: number;
}

const STATUS_CONFIG = {
  active: { label: "OPERATIONAL", color: "text-success", dot: "bg-success status-ring-green", bg: "bg-success/10 border-success/20" },
  paused: { label: "EN ATTENTE", color: "text-warning", dot: "bg-warning status-ring-yellow", bg: "bg-warning/10 border-warning/20" },
  stopped: { label: "ARRÊTÉ", color: "text-zinc-400", dot: "bg-zinc-600", bg: "bg-zinc-800/50 border-zinc-700" },
};

export default function Header({ agentStatus, tokenCount }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const statusCfg = STATUS_CONFIG[agentStatus];

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 px-6 py-3 bg-bg-base/80 backdrop-blur-xl border-b border-border-subtle">
      {/* Title block */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3">
          <h1 className="font-syne font-bold text-xl text-white glow-text-blue whitespace-nowrap">
            Executive AI Agent
          </h1>
          <span className="text-zinc-600 font-mono text-xs hidden sm:block">Control Center</span>
        </div>
        <div className="flex items-center gap-4 mt-0.5">
          <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-mono font-medium", statusCfg.bg, statusCfg.color)}>
            <div className={cn("w-1.5 h-1.5 rounded-full", statusCfg.dot)} />
            {statusCfg.label}
          </div>
          <span className="text-zinc-600 text-[10px] font-mono hidden md:block">
            {tokenCount.toLocaleString()} tokens · session active
          </span>
        </div>
      </div>

      {/* System metrics */}
      <div className="hidden lg:flex items-center gap-4 border-l border-border-subtle pl-4">
        <MetricPill icon={<Cpu size={12} />} label="CPU" value="23%" color="text-accent" />
        <MetricPill icon={<Activity size={12} />} label="MEM" value="41%" color="text-purple-400" />
        <MetricPill icon={<Wifi size={12} />} label="API" value="OK" color="text-success" />
      </div>

      {/* Search */}
      <div className="relative hidden md:flex items-center">
        <Search size={14} className="absolute left-3 text-zinc-500" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-44 bg-bg-elevated border border-border-subtle rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-accent/50 focus:bg-zinc-800 transition-all font-mono"
        />
        <kbd className="absolute right-2.5 text-[9px] text-zinc-600 font-mono">⌘K</kbd>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-bg-elevated border border-border-subtle hover:border-accent/50 transition-all group"
        >
          <Bell size={14} className="text-zinc-400 group-hover:text-accent transition-colors" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
        </button>

        {notifOpen && (
          <div className="absolute right-0 top-10 w-72 glass rounded-xl border border-border overflow-hidden z-50">
            <div className="px-4 py-2.5 border-b border-border-subtle">
              <p className="text-xs font-syne font-semibold text-white">Notifications</p>
            </div>
            {[
              { time: "08:50", msg: "Mission terminée avec succès", type: "success" },
              { time: "08:49", msg: "Email envoyé à client@company.ma", type: "info" },
              { time: "08:47", msg: "Budget API à 73% de la limite", type: "warn" },
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-2.5 hover:bg-zinc-800 border-b border-border-subtle/50 last:border-0 transition-colors cursor-pointer">
                <div className={cn("mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0",
                  n.type === "success" ? "bg-success" : n.type === "warn" ? "bg-warning" : "bg-accent"
                )} />
                <div className="min-w-0">
                  <p className="text-xs text-zinc-300 leading-snug">{n.msg}</p>
                  <p className="text-[10px] text-zinc-600 font-mono mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function MetricPill({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-zinc-600">{icon}</span>
      <span className="text-[10px] text-zinc-600 font-mono">{label}</span>
      <span className={cn("text-[10px] font-mono font-medium", color)}>{value}</span>
    </div>
  );
}
