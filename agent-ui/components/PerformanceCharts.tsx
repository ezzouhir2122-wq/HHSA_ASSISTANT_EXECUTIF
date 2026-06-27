"use client";

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { TrendingUp, BarChart2, Activity, Cpu, Layers, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const tasksData = [
  { day: "Lun", tasks: 42, cost: 2.1 },
  { day: "Mar", tasks: 61, cost: 3.0 },
  { day: "Mer", tasks: 55, cost: 2.8 },
  { day: "Jeu", tasks: 78, cost: 3.9 },
  { day: "Ven", tasks: 90, cost: 4.5 },
  { day: "Sam", tasks: 45, cost: 2.3 },
  { day: "Dim", tasks: 68, cost: 3.4 },
];

const execTimeData = [
  { hour: "08h", time: 5.2 },
  { hour: "09h", time: 4.1 },
  { hour: "10h", time: 6.3 },
  { hour: "11h", time: 3.8 },
  { hour: "12h", time: 4.5 },
  { hour: "13h", time: 2.9 },
  { hour: "14h", time: 4.2 },
  { hour: "15h", time: 3.5 },
];

const memData = [
  { t: "8h", court: 20, long: 65 },
  { t: "9h", court: 35, long: 68 },
  { t: "10h", court: 28, long: 70 },
  { t: "11h", court: 52, long: 73 },
  { t: "12h", court: 40, long: 75 },
  { t: "13h", court: 45, long: 77 },
  { t: "14h", court: 42, long: 78 },
];

const autoData = [
  { name: "Gmail", count: 18 },
  { name: "Sheets", count: 31 },
  { name: "Zapier", count: 24 },
  { name: "Drive", count: 9 },
  { name: "Brave", count: 6 },
  { name: "MCP", count: 45 },
];

const CustomTooltip = ({ active, payload, label, unit = "" }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass px-3 py-2 rounded-lg border border-border text-[11px] font-mono">
      <p className="text-zinc-400 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.value}{unit}
        </p>
      ))}
    </div>
  );
};

const CHART_CARDS = [
  {
    title: "Tâches / Jour",
    icon: <TrendingUp size={14} />,
    color: "text-accent",
    chart: (
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={tasksData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="taskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip unit=" tâches" />} />
          <Area type="monotone" dataKey="tasks" name="Tâches" stroke="#3B82F6" strokeWidth={1.5} fill="url(#taskGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "Temps exécution",
    icon: <Activity size={14} />,
    color: "text-purple-400",
    chart: (
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={execTimeData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="hour" tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip unit="min" />} />
          <Line type="monotone" dataKey="time" name="Durée" stroke="#C084FC" strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "Coût API / Jour",
    icon: <BarChart2 size={14} />,
    color: "text-amber-400",
    chart: (
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={tasksData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip unit="$" />} />
          <Bar dataKey="cost" name="Coût" fill="#FBBF24" radius={[3, 3, 0, 0]} opacity={0.8} />
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "Utilisation Mémoire",
    icon: <Cpu size={14} />,
    color: "text-cyan-400",
    chart: (
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={memData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="courtGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="longGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="t" tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip unit="%" />} />
          <Area type="monotone" dataKey="court" name="Court" stroke="#22D3EE" strokeWidth={1.5} fill="url(#courtGrad)" dot={false} />
          <Area type="monotone" dataKey="long" name="Long" stroke="#8B5CF6" strokeWidth={1.5} fill="url(#longGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "CPU simulé",
    icon: <Layers size={14} />,
    color: "text-rose-400",
    chart: (
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={[
          { t: "08h", v: 12 }, { t: "09h", v: 28 }, { t: "10h", v: 22 },
          { t: "11h", v: 45 }, { t: "12h", v: 38 }, { t: "13h", v: 30 }, { t: "14h", v: 23 }
        ]} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FB7185" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FB7185" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="t" tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip unit="%" />} />
          <Area type="monotone" dataKey="v" name="CPU" stroke="#FB7185" strokeWidth={1.5} fill="url(#cpuGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "Automatisations",
    icon: <Bot size={14} />,
    color: "text-success",
    chart: (
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={autoData} layout="vertical" margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis type="number" tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: "#52525B", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} width={42} />
          <Tooltip content={<CustomTooltip unit=" calls" />} />
          <Bar dataKey="count" name="Appels" fill="#22C55E" radius={[0, 3, 3, 0]} opacity={0.8} />
        </BarChart>
      </ResponsiveContainer>
    ),
  },
];

export default function PerformanceCharts() {
  return (
    <div className="gradient-border-card p-5 card-hover">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
          <BarChart2 size={16} className="text-accent" />
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Analytics</p>
          <h3 className="font-syne font-semibold text-sm text-white mt-0.5">Performance Agent</h3>
        </div>
        <div className="ml-auto text-[10px] text-zinc-600 font-mono">7 derniers jours</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHART_CARDS.map((card) => (
          <div key={card.title} className="bg-zinc-900/50 rounded-xl border border-border-subtle p-4 hover:border-accent/20 transition-colors">
            <div className={cn("flex items-center gap-1.5 mb-3 text-xs font-mono", card.color)}>
              {card.icon}
              <span>{card.title}</span>
            </div>
            {card.chart}
          </div>
        ))}
      </div>
    </div>
  );
}
