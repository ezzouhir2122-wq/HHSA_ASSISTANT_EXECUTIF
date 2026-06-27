"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, X, Minus, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LogLevel = "INFO" | "ACTION" | "SUCCESS" | "WARN" | "ERROR" | "SYSTEM";

type LogLine = {
  id: number;
  time: string;
  level: LogLevel;
  message: string;
};

const LEVEL_STYLES: Record<LogLevel, string> = {
  INFO: "text-zinc-400",
  ACTION: "text-accent",
  SUCCESS: "text-success",
  WARN: "text-warning",
  ERROR: "text-danger",
  SYSTEM: "text-purple-400",
};

const LEVEL_BADGE: Record<LogLevel, string> = {
  INFO: "text-zinc-600",
  ACTION: "text-blue-400",
  SUCCESS: "text-green-400",
  WARN: "text-yellow-400",
  ERROR: "text-red-400",
  SYSTEM: "text-purple-400",
};

const INITIAL_LOGS: Omit<LogLine, "id">[] = [
  { time: "08:45:01", level: "SYSTEM", message: "OpenWolf boot sequence initiated" },
  { time: "08:45:03", level: "INFO", message: "Agent initialisé — modèle: claude-sonnet-4-6" },
  { time: "08:45:04", level: "INFO", message: "Chargement du contexte mémoire (234 tokens)" },
  { time: "08:45:06", level: "INFO", message: "Lecture de intel/focus.md — priorités chargées" },
  { time: "08:45:12", level: "ACTION", message: "Connexion à Google Sheets CRM (ID: 1BxiMVs0XRA)" },
  { time: "08:45:15", level: "SUCCESS", message: "CRM connecté — 12 nouveaux leads détectés" },
  { time: "08:46:02", level: "ACTION", message: "Recherche Brave: \"HHSA agentic workflows MENA 2026\"" },
  { time: "08:46:08", level: "INFO", message: "3 résultats qualifiés récupérés" },
  { time: "08:46:34", level: "ACTION", message: "Analyse des leads avec Claude reasoning" },
  { time: "08:47:12", level: "SUCCESS", message: "Scoring terminé — Lead #847 priorité HAUTE" },
  { time: "08:47:45", level: "ACTION", message: "Génération devis: Lead #847 — 8500 MAD" },
  { time: "08:48:22", level: "SUCCESS", message: "Devis créé → Drive: devis_847_AZK.pdf" },
  { time: "08:48:47", level: "ACTION", message: "Brouillon Gmail → client@azk-solutions.ma" },
  { time: "08:49:03", level: "SUCCESS", message: "Email prêt pour envoi (brouillon Gmail)" },
  { time: "08:49:30", level: "ACTION", message: "Mise à jour CRM — statut: DEVIS_ENVOYÉ" },
];

const LIVE_EVENTS: Omit<LogLine, "id" | "time">[] = [
  { level: "ACTION", message: "Traitement Lead #848 — Youssef Consulting" },
  { level: "INFO", message: "Modèle raisonnement: température 0.2, max_tokens 4096" },
  { level: "SUCCESS", message: "Lead #848 qualifié — score 8.4/10" },
  { level: "ACTION", message: "Appel API Zapier → mise à jour Sheets" },
  { level: "WARN", message: "Rate limit API approche (80% du quota horaire)" },
  { level: "ACTION", message: "Génération rapport de session en cours" },
  { level: "SUCCESS", message: "Rapport sauvegardé → live/reviews/session-2026-06-27.md" },
  { level: "SYSTEM", message: "Mission terminée — 6 tâches · 4m 24s · 1.2k tokens" },
];

let logCounter = INITIAL_LOGS.length + 1;

export default function LiveLogs() {
  const [logs, setLogs] = useState<LogLine[]>(
    INITIAL_LOGS.map((l, i) => ({ ...l, id: i }))
  );
  const [isPaused, setIsPaused] = useState(false);
  const [eventIdx, setEventIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      const event = LIVE_EVENTS[eventIdx % LIVE_EVENTS.length];
      const now = new Date();
      const time = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const newLog: LogLine = { id: logCounter++, time, level: event.level, message: event.message };
      setLogs((prev) => [...prev.slice(-60), newLog]);
      setEventIdx((i) => i + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused, eventIdx]);

  useEffect(() => {
    if (!isPaused && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isPaused]);

  return (
    <div className="gradient-border-card flex flex-col h-full min-h-[320px] overflow-hidden card-hover">
      {/* Terminal titlebar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/80 border-b border-border-subtle flex-shrink-0">
        <div className="flex gap-1.5">
          <button className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-400 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors" onClick={() => setIsPaused(p => !p)} />
          <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
        </div>
        <div className="flex-1 flex items-center justify-center gap-2">
          <Terminal size={11} className="text-zinc-500" />
          <span className="text-[11px] text-zinc-500 font-mono">hhsa-agent — bash</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={cn("text-[10px] font-mono", isPaused ? "text-warning" : "text-success")}>
            {isPaused ? "⏸ PAUSED" : "● LIVE"}
          </span>
        </div>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 terminal-scanline bg-[#080B0D] font-mono text-[11px] leading-relaxed"
        onClick={() => setIsPaused(p => !p)}
        title="Cliquer pour pause/reprendre"
      >
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex gap-2 mb-0.5 animate-log-in"
            style={{ animationFillMode: "backwards" }}
          >
            <span className="text-zinc-700 flex-shrink-0 select-none">{log.time}</span>
            <span className={cn("flex-shrink-0 w-14", LEVEL_BADGE[log.level])}>[{log.level}]</span>
            <span className={LEVEL_STYLES[log.level]}>{log.message}</span>
          </div>
        ))}

        {/* Blinking cursor */}
        <div className="flex gap-2 mt-0.5">
          <span className="text-zinc-700 select-none" suppressHydrationWarning>
            {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
          <span className="text-success animate-blink-cursor">▋</span>
        </div>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-900/50 border-t border-border-subtle flex-shrink-0">
        <span className="text-[9px] text-zinc-600 font-mono">{logs.length} entrées</span>
        <span className="text-[9px] text-zinc-600 font-mono">cliquer pour {isPaused ? "reprendre" : "pause"}</span>
        <div className="flex items-center gap-1.5">
          <div className={cn("w-1 h-1 rounded-full", isPaused ? "bg-warning" : "bg-success animate-pulse")} />
          <span className="text-[9px] font-mono text-zinc-600">{isPaused ? "paused" : "streaming"}</span>
        </div>
      </div>
    </div>
  );
}
