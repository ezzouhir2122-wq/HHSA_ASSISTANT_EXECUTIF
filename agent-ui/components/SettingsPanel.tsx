"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Save, RotateCcw, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AgentSettings = {
  name: string;
  systemPrompt: string;
  model: string;
  temperature: number;
  memoryEnabled: boolean;
  timeoutSec: number;
  maxParallelTasks: number;
  apiBudgetUsd: number;
};

const DEFAULTS: AgentSettings = {
  name: "Executive Assistant",
  systemPrompt: "Tu es l'assistant exécutif d'Ezzouhir, fondateur de HHSA Agency. Tu opères en mode autonome pour traiter les leads, générer des devis, envoyer des emails et mettre à jour le CRM.",
  model: "claude-sonnet-4-6",
  temperature: 0.2,
  memoryEnabled: true,
  timeoutSec: 120,
  maxParallelTasks: 3,
  apiBudgetUsd: 50,
};

const MODELS = [
  { value: "claude-opus-4-8", label: "Claude Opus 4.8 — Ultra puissant" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 — Équilibré (défaut)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 — Rapide & économique" },
];

export default function SettingsPanel() {
  const [settings, setSettings] = useState<AgentSettings>(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<"agent" | "perf" | "budget">("agent");

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function set<K extends keyof AgentSettings>(key: K, value: AgentSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  const SECTIONS = [
    { id: "agent" as const, label: "Agent" },
    { id: "perf" as const, label: "Performance" },
    { id: "budget" as const, label: "Budget" },
  ];

  return (
    <div className="gradient-border-card p-5 h-full card-hover">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-border-subtle flex items-center justify-center">
          <SettingsIcon size={16} className="text-zinc-400" />
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Configuration</p>
          <h3 className="font-syne font-semibold text-sm text-white mt-0.5">Paramètres Agent</h3>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 mb-4">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={cn(
              "flex-1 py-1.5 rounded-lg text-[11px] font-mono transition-all",
              activeSection === s.id
                ? "bg-accent/15 text-accent border border-accent/25"
                : "bg-zinc-800 text-zinc-500 hover:text-zinc-300 border border-transparent"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeSection === "agent" && (
          <>
            <Field label="Nom de l'agent">
              <input
                type="text"
                value={settings.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full bg-zinc-900 border border-border-subtle rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-accent/50 transition-colors"
              />
            </Field>

            <Field label="Modèle IA">
              <div className="relative">
                <select
                  value={settings.model}
                  onChange={(e) => set("model", e.target.value)}
                  className="w-full appearance-none bg-zinc-900 border border-border-subtle rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-accent/50 transition-colors pr-8 cursor-pointer"
                >
                  {MODELS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
            </Field>

            <Field label="Prompt système">
              <textarea
                value={settings.systemPrompt}
                onChange={(e) => set("systemPrompt", e.target.value)}
                rows={4}
                className="w-full bg-zinc-900 border border-border-subtle rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-accent/50 transition-colors resize-none leading-relaxed"
              />
              <p className="text-[10px] text-zinc-600 font-mono mt-1">{settings.systemPrompt.length} caractères</p>
            </Field>

            <Field label={`Température : ${settings.temperature}`}>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-zinc-600">0.0</span>
                <input
                  type="range" min="0" max="1" step="0.05"
                  value={settings.temperature}
                  onChange={(e) => set("temperature", parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-[10px] font-mono text-zinc-600">1.0</span>
              </div>
              <p className="text-[10px] text-zinc-600 font-mono mt-1">
                {settings.temperature < 0.3 ? "Précis et déterministe" : settings.temperature < 0.7 ? "Équilibré" : "Créatif et varié"}
              </p>
            </Field>

            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-xs font-medium text-zinc-200">Mémoire active</p>
                <p className="text-[10px] text-zinc-600 font-mono">Contexte persistant entre sessions</p>
              </div>
              <button
                onClick={() => set("memoryEnabled", !settings.memoryEnabled)}
                className={cn(
                  "w-10 h-5 rounded-full border transition-all relative",
                  settings.memoryEnabled ? "bg-accent border-accent" : "bg-zinc-800 border-zinc-700"
                )}
              >
                <div className={cn(
                  "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all",
                  settings.memoryEnabled ? "left-5" : "left-0.5"
                )} />
              </button>
            </div>
          </>
        )}

        {activeSection === "perf" && (
          <>
            <Field label={`Timeout : ${settings.timeoutSec}s`}>
              <input
                type="range" min="30" max="300" step="10"
                value={settings.timeoutSec}
                onChange={(e) => set("timeoutSec", parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-zinc-600 font-mono">30s</span>
                <span className="text-[10px] text-zinc-600 font-mono">300s</span>
              </div>
            </Field>

            <Field label={`Tâches parallèles max : ${settings.maxParallelTasks}`}>
              <input
                type="range" min="1" max="10" step="1"
                value={settings.maxParallelTasks}
                onChange={(e) => set("maxParallelTasks", parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-zinc-600 font-mono">1</span>
                <span className="text-[10px] text-zinc-600 font-mono">10</span>
              </div>
            </Field>

            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
              <p className="text-[11px] text-amber-400 font-mono">
                {settings.maxParallelTasks > 5 ? "⚠ Haute charge — surveiller le coût API" : "✓ Configuration stable"}
              </p>
            </div>
          </>
        )}

        {activeSection === "budget" && (
          <>
            <Field label={`Budget API : ${settings.apiBudgetUsd}$ / mois`}>
              <input
                type="range" min="5" max="200" step="5"
                value={settings.apiBudgetUsd}
                onChange={(e) => set("apiBudgetUsd", parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-zinc-600 font-mono">$5</span>
                <span className="text-[10px] text-zinc-600 font-mono">$200</span>
              </div>
            </Field>

            {/* Budget gauge */}
            <div className="p-3 rounded-xl bg-zinc-900 border border-border-subtle">
              <div className="flex justify-between mb-2">
                <span className="text-[11px] text-zinc-400 font-mono">Consommé ce mois</span>
                <span className="text-[11px] font-mono text-accent">$36.80 / ${settings.apiBudgetUsd}</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full progress-fill"
                  style={{ width: `${Math.min(100, (36.8 / settings.apiBudgetUsd) * 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-zinc-600 font-mono mt-1.5">
                {Math.round((36.8 / settings.apiBudgetUsd) * 100)}% utilisé · Alerte à 80%
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex gap-2 mt-5 pt-4 border-t border-border-subtle">
        <button
          onClick={() => setSettings(DEFAULTS)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-border-subtle text-xs text-zinc-400 hover:text-zinc-200 transition-all"
        >
          <RotateCcw size={12} />
          Reset
        </button>
        <button
          onClick={handleSave}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-medium transition-all",
            saved
              ? "bg-success/20 border-success/30 text-success"
              : "bg-accent/10 border-accent/20 text-accent hover:bg-accent/20"
          )}
        >
          <Save size={12} />
          {saved ? "Sauvegardé ✓" : "Sauvegarder"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] text-zinc-500 font-mono mb-1.5">{label}</label>
      {children}
    </div>
  );
}
