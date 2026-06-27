"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, Clock, Zap, Coins, DollarSign, Users, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type Stat = {
  label: string;
  value: number;
  unit: string;
  prefix?: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  sparkline: number[];
};

const STATS: Stat[] = [
  {
    label: "Tâches exécutées",
    value: 1847,
    unit: "",
    change: 12.4,
    icon: <CheckSquare size={16} />,
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
    sparkline: [20, 35, 28, 52, 40, 65, 58, 80, 72, 95],
  },
  {
    label: "Temps d'exécution moyen",
    value: 4.2,
    unit: "min",
    change: -8.1,
    icon: <Clock size={16} />,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    sparkline: [55, 48, 60, 42, 38, 45, 32, 28, 35, 30],
  },
  {
    label: "Appels API",
    value: 12843,
    unit: "",
    change: 5.7,
    icon: <Zap size={16} />,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    sparkline: [30, 45, 55, 48, 70, 82, 68, 90, 85, 100],
  },
  {
    label: "Tokens consommés",
    value: 2.4,
    unit: "M",
    change: 18.3,
    icon: <Coins size={16} />,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    sparkline: [10, 25, 40, 35, 60, 55, 75, 70, 88, 95],
  },
  {
    label: "Revenu généré",
    value: 48500,
    unit: " MAD",
    change: 22.8,
    icon: <DollarSign size={16} />,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
    sparkline: [15, 28, 22, 45, 40, 58, 52, 70, 68, 82],
  },
  {
    label: "Clients traités",
    value: 34,
    unit: "",
    change: 3,
    icon: <Users size={16} />,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    sparkline: [5, 8, 12, 10, 18, 16, 22, 20, 28, 34],
  },
];

function AnimatedCounter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target * 10) / 10);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <>{count >= 1000 ? count.toLocaleString("fr-FR") : count}</>;
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const height = 32;
  const width = 72;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  const fillPoints = `0,${height} ${points} ${(data.length - 1) * step},${height}`;

  const colorMap: Record<string, string> = {
    "text-accent": "#3B82F6",
    "text-purple-400": "#C084FC",
    "text-cyan-400": "#22D3EE",
    "text-amber-400": "#FBBF24",
    "text-success": "#22C55E",
    "text-rose-400": "#FB7185",
  };
  const hex = colorMap[color] ?? "#3B82F6";

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <defs>
        <linearGradient id={`spark-${hex.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hex} stopOpacity="0.3" />
          <stop offset="100%" stopColor={hex} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={fillPoints}
        fill={`url(#spark-${hex.replace("#", "")})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={hex}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className="gradient-border-card p-4 card-hover stagger-card"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {/* Icon + trend */}
          <div className="flex items-start justify-between mb-3">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border", stat.bgColor, stat.borderColor, stat.color)}>
              {stat.icon}
            </div>
            <div className={cn("flex items-center gap-0.5 text-[10px] font-mono",
              stat.change > 0 ? "text-success" : stat.change < 0 ? "text-danger" : "text-zinc-500"
            )}>
              {stat.change > 0 ? <TrendingUp size={10} /> : stat.change < 0 ? <TrendingDown size={10} /> : <Minus size={10} />}
              {Math.abs(stat.change)}%
            </div>
          </div>

          {/* Value */}
          <div className="mb-1">
            <span className="font-syne font-bold text-xl text-white">
              {stat.prefix}
              <AnimatedCounter target={stat.value} />
              {stat.unit}
            </span>
          </div>

          {/* Label */}
          <p className="text-[11px] text-zinc-500 leading-tight mb-3">{stat.label}</p>

          {/* Sparkline */}
          <div className="opacity-70">
            <MiniSparkline data={stat.sparkline} color={stat.color} />
          </div>
        </div>
      ))}
    </div>
  );
}
