"use client";

import { useState } from "react";
import { Play, Pause, Square, RefreshCw, Settings2, Brain, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AgentStatus = "active" | "paused" | "stopped";

interface QuickActionsProps {
  status: AgentStatus;
  onStatusChange: (s: AgentStatus) => void;
}

type ToastType = { id: number; message: string; type: "success" | "warn" | "info" };

const ACTIONS = [
  { id: "start", label: "Start Agent", icon: Play, color: "text-success", bg: "bg-success/10 hover:bg-success/20 border-success/20 hover:border-success/40", disabled: (s: AgentStatus) => s === "active" },
  { id: "pause", label: "Pause", icon: Pause, color: "text-warning", bg: "bg-warning/10 hover:bg-warning/20 border-warning/20 hover:border-warning/40", disabled: (s: AgentStatus) => s !== "active" },
  { id: "stop", label: "Stop", icon: Square, color: "text-danger", bg: "bg-danger/10 hover:bg-danger/20 border-danger/20 hover:border-danger/40", disabled: (s: AgentStatus) => s === "stopped" },
  { id: "restart", label: "Restart", icon: RefreshCw, color: "text-cyan-400", bg: "bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20 hover:border-cyan-500/40", disabled: () => false },
  { id: "config", label: "Config", icon: Settings2, color: "text-purple-400", bg: "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 hover:border-purple-500/40", disabled: () => false },
  { id: "memory", label: "Vider mémoire", icon: Brain, color: "text-rose-400", bg: "bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/20 hover:border-rose-500/40", disabled: () => false },
];

let toastId = 0;

export default function QuickActions({ status, onStatusChange }: QuickActionsProps) {
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [spinning, setSpinning] = useState(false);

  function addToast(message: string, type: ToastType["type"] = "success") {
    const id = ++toastId;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }

  function handleAction(id: string) {
    if (id === "stop" || id === "memory") {
      setConfirmAction(id);
      return;
    }
    executeAction(id);
  }

  function executeAction(id: string) {
    setConfirmAction(null);
    switch (id) {
      case "start":
        onStatusChange("active");
        addToast("Agent démarré avec succès", "success");
        break;
      case "pause":
        onStatusChange("paused");
        addToast("Agent mis en pause", "warn");
        break;
      case "stop":
        onStatusChange("stopped");
        addToast("Agent arrêté", "warn");
        break;
      case "restart":
        setSpinning(true);
        onStatusChange("stopped");
        setTimeout(() => { onStatusChange("active"); setSpinning(false); addToast("Agent redémarré", "success"); }, 1500);
        break;
      case "config":
        addToast("Ouverture des paramètres…", "info");
        break;
      case "memory":
        addToast("Mémoire courte vidée", "success");
        break;
    }
  }

  return (
    <div className="gradient-border-card p-5 h-full card-hover relative">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-border-subtle flex items-center justify-center">
          <Settings2 size={16} className="text-zinc-400" />
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Actions rapides</p>
          <h3 className="font-syne font-semibold text-sm text-white mt-0.5">Contrôle Agent</h3>
        </div>
      </div>

      {/* Status bar */}
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border mb-4 text-xs font-mono",
        status === "active" ? "bg-success/10 border-success/20 text-success" :
        status === "paused" ? "bg-warning/10 border-warning/20 text-warning" :
        "bg-zinc-800/50 border-zinc-700 text-zinc-500"
      )}>
        <div className={cn("w-1.5 h-1.5 rounded-full", status === "active" ? "bg-success status-ring-green" : status === "paused" ? "bg-warning status-ring-yellow" : "bg-zinc-600")} />
        <span>Statut : {status === "active" ? "🟢 Active" : status === "paused" ? "🟡 En attente" : "🔴 Arrêté"}</span>
      </div>

      {/* Action grid */}
      <div className="grid grid-cols-2 gap-2">
        {ACTIONS.map((action) => {
          const isDisabled = action.disabled(status);
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => !isDisabled && handleAction(action.id)}
              disabled={isDisabled}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all duration-150",
                action.bg, action.color,
                isDisabled && "opacity-30 cursor-not-allowed pointer-events-none",
                "active:scale-95"
              )}
            >
              <Icon
                size={13}
                className={cn(action.id === "restart" && spinning && "animate-spin")}
              />
              <span className="truncate">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Confirm dialog */}
      {confirmAction && (
        <div className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <div className="glass rounded-xl border border-border p-5 mx-4 text-center">
            <p className="text-sm font-syne font-semibold text-white mb-1">
              {confirmAction === "stop" ? "Arrêter l'agent ?" : "Vider la mémoire ?"}
            </p>
            <p className="text-xs text-zinc-400 mb-4">
              {confirmAction === "stop" ? "La mission en cours sera interrompue." : "Le contexte court terme sera effacé."}
            </p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => setConfirmAction(null)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 transition-colors">
                <X size={12} /> Annuler
              </button>
              <button onClick={() => executeAction(confirmAction)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-danger/20 hover:bg-danger/30 border border-danger/30 text-xs text-danger transition-colors">
                <Check size={12} /> Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "toast-enter px-4 py-2.5 rounded-lg border text-xs font-mono shadow-2xl",
              t.type === "success" ? "bg-success/15 border-success/30 text-success" :
              t.type === "warn" ? "bg-warning/15 border-warning/30 text-warning" :
              "bg-accent/15 border-accent/30 text-accent"
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
