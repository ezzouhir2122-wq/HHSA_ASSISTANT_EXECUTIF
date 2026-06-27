"use client";

import { useEffect, useState } from "react";
import { Target, Clock, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MISSION = {
  title: "Traitement leads Q2 2026",
  description: "Analyser les nouveaux leads, générer les devis et envoyer les emails de relance",
  tasks: [
    { id: 1, label: "Lecture CRM Sheets", done: true },
    { id: 2, label: "Analyser 12 nouveaux leads", done: true },
    { id: 3, label: "Générer devis pour Lead #847", done: true },
    { id: 4, label: "Envoyer emails de relance", done: false, active: true },
    { id: 5, label: "Mettre à jour statuts CRM", done: false },
    { id: 6, label: "Générer rapport de session", done: false },
  ],
  totalMinutes: 8,
};

export default function MissionCard() {
  const [elapsed, setElapsed] = useState(4);
  const [progress, setProgress] = useState(58);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((e) => Math.min(e + 1 / 60, MISSION.totalMinutes));
      setProgress((p) => Math.min(p + 0.2, 100));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const doneCount = MISSION.tasks.filter((t) => t.done).length;

  return (
    <div className="gradient-border-card p-5 h-full card-hover">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Target size={16} className="text-accent" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Mission Actuelle</p>
            <h3 className="font-syne font-semibold text-sm text-white mt-0.5">{MISSION.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
          <Clock size={11} />
          {Math.floor(elapsed)}m {Math.round((elapsed % 1) * 60).toString().padStart(2, "0")}s
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-400 mb-4 leading-relaxed">{MISSION.description}</p>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-zinc-500 font-mono">Progression</span>
          <span className="text-[10px] font-mono font-medium text-accent">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full progress-fill rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] text-zinc-600 font-mono">{doneCount}/{MISSION.tasks.length} tâches</span>
          <span className="text-[10px] text-zinc-600 font-mono">
            ~{Math.ceil(MISSION.totalMinutes - elapsed)}min restant
          </span>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {MISSION.tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all",
              task.done
                ? "bg-success/5 border border-success/10"
                : (task as any).active
                ? "bg-accent/10 border border-accent/20"
                : "bg-zinc-900/50 border border-transparent"
            )}
          >
            {task.done ? (
              <CheckCircle2 size={13} className="text-success flex-shrink-0" />
            ) : (task as any).active ? (
              <Loader2 size={13} className="text-accent flex-shrink-0 animate-spin" />
            ) : (
              <Circle size={13} className="text-zinc-700 flex-shrink-0" />
            )}
            <span className={cn(
              "text-xs",
              task.done ? "text-zinc-400 line-through decoration-zinc-700" : (task as any).active ? "text-white font-medium" : "text-zinc-500"
            )}>
              {task.label}
            </span>
            {(task as any).active && (
              <span className="ml-auto text-[10px] text-accent font-mono animate-pulse">En cours…</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
