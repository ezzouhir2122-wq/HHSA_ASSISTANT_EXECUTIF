"use client";

import { useState, Fragment } from "react";
import { Clock, CheckCircle2, AlertTriangle, XCircle, ChevronUp, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "success" | "partial" | "failed";

type HistoryEntry = {
  id: string;
  date: string;
  time: string;
  mission: string;
  duration: string;
  status: Status;
  result: string;
  tokens: number;
};

const HISTORY: HistoryEntry[] = [
  { id: "m-2847", date: "27 Jun", time: "08:45", mission: "Traitement leads Q2 2026", duration: "4m 24s", status: "success", result: "12 leads analysés · 3 devis générés · 3 emails", tokens: 1240 },
  { id: "m-2846", date: "27 Jun", time: "07:30", mission: "Veille tendances IA MENA", duration: "8m 12s", status: "success", result: "5 articles analysés · rapport Drive créé", tokens: 2180 },
  { id: "m-2845", date: "26 Jun", time: "16:15", mission: "Onboarding Client #034 — Maktoub", duration: "3m 45s", status: "success", result: "Dossier créé · contrat généré · email bienvenue", tokens: 890 },
  { id: "m-2844", date: "26 Jun", time: "14:00", mission: "Relances pipeline inactif", duration: "6m 30s", status: "partial", result: "8/10 relances envoyées · 2 email echecs", tokens: 1560 },
  { id: "m-2843", date: "26 Jun", time: "10:45", mission: "Génération devis batch — 5 leads", duration: "12m 01s", status: "success", result: "5 devis PDF · Drive + email clients", tokens: 3200 },
  { id: "m-2842", date: "25 Jun", time: "17:30", mission: "Mise à jour CRM — statuts Q2", duration: "2m 15s", status: "success", result: "47 lignes Sheets mises à jour", tokens: 540 },
  { id: "m-2841", date: "25 Jun", time: "15:00", mission: "Recherche concurrents MENA AI", duration: "5m 48s", status: "failed", result: "API Brave timeout · retry limit atteint", tokens: 380 },
  { id: "m-2840", date: "25 Jun", time: "09:00", mission: "Posts LinkedIn semaine 26", duration: "4m 10s", status: "success", result: "3 posts générés · 1 PDF résumé", tokens: 1100 },
];

type SortKey = "date" | "mission" | "duration" | "status" | "tokens";

const STATUS_CONFIG: Record<Status, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  success: { icon: <CheckCircle2 size={12} />, color: "text-success", bg: "bg-success/10 border-success/20", label: "Succès" },
  partial: { icon: <AlertTriangle size={12} />, color: "text-warning", bg: "bg-warning/10 border-warning/20", label: "Partiel" },
  failed: { icon: <XCircle size={12} />, color: "text-danger", bg: "bg-danger/10 border-danger/20", label: "Échoué" },
};

export default function HistoryTable() {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 5;

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  const sorted = [...HISTORY].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "date") cmp = a.id.localeCompare(b.id);
    else if (sortKey === "mission") cmp = a.mission.localeCompare(b.mission);
    else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
    else if (sortKey === "tokens") cmp = a.tokens - b.tokens;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const paged = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortDir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />
    ) : (
      <ChevronDown size={11} className="opacity-20" />
    );

  return (
    <div className="gradient-border-card p-5 card-hover">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-border-subtle flex items-center justify-center">
          <Clock size={16} className="text-zinc-400" />
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Historique</p>
          <h3 className="font-syne font-semibold text-sm text-white mt-0.5">Missions passées</h3>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-500">{HISTORY.length} missions</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border-subtle">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border-subtle bg-zinc-900/50">
              {[
                { key: "date" as SortKey, label: "Date" },
                { key: "mission" as SortKey, label: "Mission" },
                { key: "duration" as SortKey, label: "Durée" },
                { key: "status" as SortKey, label: "Statut" },
                { key: "tokens" as SortKey, label: "Tokens" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-3 text-left font-mono text-[10px] text-zinc-500 cursor-pointer hover:text-zinc-300 transition-colors uppercase tracking-wider"
                >
                  <div className="flex items-center gap-1">
                    {label}
                    <SortIcon col={key} />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {paged.map((entry) => {
              const sc = STATUS_CONFIG[entry.status];
              const isExpanded = expanded === entry.id;
              return (
                <Fragment key={entry.id}>
                  <tr
                    onClick={() => setExpanded(isExpanded ? null : entry.id)}
                    className={cn(
                      "border-b border-border-subtle/50 last:border-0 cursor-pointer transition-colors",
                      isExpanded ? "bg-accent/5" : "hover:bg-zinc-800/30"
                    )}
                  >
                    <td className="px-4 py-3 text-zinc-500 font-mono whitespace-nowrap">
                      {entry.date}
                      <span className="ml-1.5 text-zinc-700">{entry.time}</span>
                    </td>
                    <td className="px-4 py-3 text-zinc-200 max-w-[220px] truncate font-outfit">{entry.mission}</td>
                    <td className="px-4 py-3 text-zinc-500 font-mono whitespace-nowrap">{entry.duration}</td>
                    <td className="px-4 py-3">
                      <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-mono", sc.bg, sc.color)}>
                        {sc.icon}
                        {sc.label}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 font-mono">{entry.tokens.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <ChevronRight size={12} className={cn("text-zinc-600 transition-transform", isExpanded && "rotate-90")} />
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-zinc-900/50">
                      <td colSpan={6} className="px-4 py-3">
                        <div className="flex items-start gap-3">
                          <div className={cn("flex items-center gap-1.5 text-[10px] font-mono", sc.color)}>
                            {sc.icon} Résultat :
                          </div>
                          <p className="text-[11px] text-zinc-400 font-mono">{entry.result}</p>
                          <div className="ml-auto text-[10px] font-mono text-zinc-600">ID: {entry.id}</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-[11px] font-mono text-zinc-600">
          {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, HISTORY.length)} sur {HISTORY.length}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-6 h-6 rounded border border-border-subtle text-zinc-500 hover:text-white hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <ChevronUp size={11} className="-rotate-90" />
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="w-6 h-6 rounded border border-border-subtle text-zinc-500 hover:text-white hover:border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <ChevronDown size={11} className="-rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}
