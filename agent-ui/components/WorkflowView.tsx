"use client";

import { useState, useEffect } from "react";
import { Webhook, BookOpen, Search, Brain, GitBranch, Zap, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 0, label: "Déclencheur", sublabel: "Webhook / Schedule", icon: Webhook, color: "from-purple-500 to-purple-700" },
  { id: 1, label: "Mémoire", sublabel: "Chargement contexte", icon: BookOpen, color: "from-blue-500 to-blue-700" },
  { id: 2, label: "Recherche", sublabel: "Brave / CRM / Drive", icon: Search, color: "from-cyan-500 to-cyan-700" },
  { id: 3, label: "Analyse", sublabel: "Claude reasoning", icon: Brain, color: "from-accent to-blue-700" },
  { id: 4, label: "Décision", sublabel: "Routing logique", icon: GitBranch, color: "from-green-500 to-emerald-700" },
  { id: 5, label: "Exécution", sublabel: "Email / Sheet / Drive", icon: Zap, color: "from-amber-500 to-orange-600" },
  { id: 6, label: "Rapport", sublabel: "Log + notification", icon: FileText, color: "from-rose-500 to-rose-700" },
];

export default function WorkflowView() {
  const [activeStep, setActiveStep] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % STEPS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="gradient-border-card p-5 h-full card-hover">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <GitBranch size={16} className="text-purple-400" />
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Pipeline</p>
          <h3 className="font-syne font-semibold text-sm text-white mt-0.5">Workflow Agent</h3>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Running
        </div>
      </div>

      {/* Vertical flow */}
      <div className="relative flex flex-col items-center gap-0">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = activeStep === i;
          const isDone = activeStep > i;
          const isPending = activeStep < i;

          return (
            <div key={step.id} className="relative flex flex-col items-center w-full">
              {/* Step row */}
              <div
                className={cn(
                  "relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-500 cursor-pointer",
                  isActive
                    ? "bg-accent/10 border border-accent/30 animate-workflow-pulse"
                    : isDone
                    ? "bg-success/5 border border-success/10"
                    : "bg-transparent border border-transparent hover:bg-zinc-800/50"
                )}
                onClick={() => setActiveStep(i)}
              >
                {/* Icon */}
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br transition-all duration-500",
                  step.color,
                  isActive ? "scale-110 shadow-lg" : isDone ? "opacity-60 scale-95" : "opacity-30"
                )}>
                  <Icon size={14} className="text-white" />
                </div>

                {/* Labels */}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-xs font-syne font-semibold transition-colors",
                    isActive ? "text-white" : isDone ? "text-zinc-400" : "text-zinc-600"
                  )}>
                    {step.label}
                  </p>
                  <p className={cn(
                    "text-[10px] font-mono transition-colors",
                    isActive ? "text-zinc-400" : "text-zinc-700"
                  )}>
                    {step.sublabel}
                  </p>
                </div>

                {/* Status badge */}
                <div className={cn(
                  "flex-shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded",
                  isActive ? "bg-accent/20 text-accent" : isDone ? "bg-success/10 text-success" : "bg-zinc-800 text-zinc-700"
                )}>
                  {isActive ? "ACTIF" : isDone ? "✓" : "—"}
                </div>
              </div>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="relative flex items-center justify-center my-0.5">
                  <div className={cn(
                    "w-px h-5 transition-all duration-500",
                    isDone || isActive ? "bg-gradient-to-b from-accent/60 to-accent/20" : "bg-zinc-800"
                  )} />
                  {isActive && (
                    <div className="absolute w-px h-3 bg-accent/80 animate-scan rounded-full" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
        <span className="text-[10px] text-zinc-600 font-mono">Step {activeStep + 1}/{STEPS.length}</span>
        <span className="text-[10px] text-zinc-600 font-mono">Cliquer sur une étape</span>
      </div>
    </div>
  );
}
