"use client";

import { useState } from "react";
import {
  LayoutDashboard, Brain, Wrench, GitBranch, Terminal,
  History, Settings, ChevronLeft, ChevronRight, ChevronDown,
  Zap, Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AgentConfig, AgentStatus } from "@/lib/types";

const AGENTS: AgentConfig[] = [
  { id: "exec", name: "Executive Assistant", status: "active", model: "claude-sonnet-4-6", description: "Pilote principal" },
  { id: "sales", name: "Sales Agent", status: "paused", model: "claude-haiku-4-5", description: "Gestion leads" },
  { id: "marketing", name: "Marketing Agent", status: "stopped", model: "claude-sonnet-4-6", description: "Contenu & social" },
  { id: "crm", name: "CRM Agent", status: "stopped", model: "claude-haiku-4-5", description: "Suivi clients" },
  { id: "research", name: "Research Agent", status: "paused", model: "claude-opus-4-8", description: "Veille & analyse" },
  { id: "automation", name: "Automation Agent", status: "stopped", model: "claude-haiku-4-5", description: "Workflows Zapier" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "memory", label: "Mémoire", icon: Brain },
  { id: "tools", label: "Outils", icon: Wrench },
  { id: "workflows", label: "Workflows", icon: GitBranch },
  { id: "logs", label: "Logs", icon: Terminal },
  { id: "history", label: "Historique", icon: History },
  { id: "settings", label: "Paramètres", icon: Settings },
];

const STATUS_META: Record<AgentStatus, { color: string; label: string; ring: string }> = {
  active: { color: "bg-success", label: "Active", ring: "status-ring-green" },
  paused: { color: "bg-warning", label: "En attente", ring: "status-ring-yellow" },
  stopped: { color: "bg-zinc-600", label: "Arrêté", ring: "" },
};

interface SidebarProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
  selectedAgent: string;
  onAgentChange: (id: string) => void;
}

export default function Sidebar({
  activeSection,
  onSectionChange,
  selectedAgent,
  onAgentChange,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [agentMenuOpen, setAgentMenuOpen] = useState(false);

  const currentAgent = AGENTS.find((a) => a.id === selectedAgent) ?? AGENTS[0];
  const meta = STATUS_META[currentAgent.status];

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-bg-card border-r border-border-subtle transition-all duration-300 flex-shrink-0 z-30",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-50 w-6 h-6 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-zinc-400 hover:text-white hover:border-accent transition-all"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Logo */}
      <div className={cn("flex items-center gap-3 p-4 border-b border-border-subtle", collapsed && "justify-center")}>
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center animate-glow-blue">
            <Zap size={16} className="text-white" />
          </div>
        </div>
        {!collapsed && (
          <div>
            <p className="font-syne font-bold text-sm text-white tracking-wide leading-none">HHSA</p>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">AGENCY</p>
          </div>
        )}
      </div>

      {/* Agent selector */}
      {!collapsed && (
        <div className="p-3 border-b border-border-subtle">
          <button
            onClick={() => setAgentMenuOpen(!agentMenuOpen)}
            className="w-full flex items-center gap-2.5 p-2.5 rounded-lg bg-bg-elevated hover:bg-zinc-700 border border-border-subtle transition-all group"
          >
            <div className={cn("w-2 h-2 rounded-full flex-shrink-0", meta.color, meta.ring)} />
            <div className="flex-1 text-left min-w-0">
              <p className="text-xs font-outfit font-medium text-white truncate">{currentAgent.name}</p>
              <p className="text-[10px] text-zinc-500 font-mono">{meta.label}</p>
            </div>
            <ChevronDown
              size={12}
              className={cn("text-zinc-500 flex-shrink-0 transition-transform", agentMenuOpen && "rotate-180")}
            />
          </button>

          {agentMenuOpen && (
            <div className="mt-1.5 rounded-lg border border-border bg-bg-elevated overflow-hidden">
              {AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => { onAgentChange(agent.id); setAgentMenuOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-zinc-700 transition-colors",
                    selectedAgent === agent.id && "bg-accent/10"
                  )}
                >
                  <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", STATUS_META[agent.status].color)} />
                  <div className="min-w-0">
                    <p className="text-xs text-white truncate">{agent.name}</p>
                    <p className="text-[10px] text-zinc-500">{agent.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Agent status dot in collapsed mode */}
      {collapsed && (
        <div className="flex justify-center py-3 border-b border-border-subtle">
          <div className={cn("w-2.5 h-2.5 rounded-full", meta.color, meta.ring)} />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onSectionChange(id)}
              title={collapsed ? label : undefined}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-accent/10 text-accent border border-accent/20 nav-active-glow"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800"
              )}
            >
              <Icon
                size={16}
                className={cn(
                  "flex-shrink-0 transition-colors",
                  isActive ? "text-accent" : "text-zinc-500 group-hover:text-zinc-300"
                )}
              />
              {!collapsed && (
                <span className="text-sm font-outfit font-medium">{label}</span>
              )}
              {!collapsed && isActive && (
                <div className="ml-auto w-1 h-4 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={cn("p-3 border-t border-border-subtle", collapsed && "flex justify-center")}>
        {collapsed ? (
          <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center">
            <Users size={12} className="text-zinc-400" />
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-syne font-bold text-white">EZ</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">Ezzouhir</p>
              <p className="text-[10px] text-zinc-500 font-mono">Fondateur · HHSA</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
