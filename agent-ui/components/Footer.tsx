import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-6 py-3 border-t border-border-subtle mt-2">
      <div className="flex items-center gap-2">
        <Zap size={11} className="text-accent" />
        <span className="text-[10px] font-mono text-zinc-600">HHSA Agency · Executive AI Command Centre</span>
      </div>
      <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-700">
        <span>v0.1.0</span>
        <span>claude-sonnet-4-6</span>
        <span className="text-zinc-800">·</span>
        <span className="text-accent/60">Multi-agent ready</span>
      </div>
    </footer>
  );
}
