"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import MissionCard from "@/components/MissionCard";
import QuickActions from "@/components/QuickActions";
import LiveLogs from "@/components/LiveLogs";
import WorkflowView from "@/components/WorkflowView";
import MemoryPanel from "@/components/MemoryPanel";
import ToolsGrid from "@/components/ToolsGrid";
import PerformanceCharts from "@/components/PerformanceCharts";
import HistoryTable from "@/components/HistoryTable";
import SettingsPanel from "@/components/SettingsPanel";
import Footer from "@/components/Footer";

type AgentStatus = "active" | "paused" | "stopped";

export default function HomePage() {
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("active");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedAgent, setSelectedAgent] = useState("exec");

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      {/* Dot grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glow top */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Sidebar */}
      <div className="relative z-10">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          selectedAgent={selectedAgent}
          onAgentChange={setSelectedAgent}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Header agentStatus={agentStatus} tokenCount={2847} />

        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-5 space-y-5 max-w-[1800px] mx-auto">

            {/* Hero title */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-[0.15em] mb-1">
                  HHSA Agency · {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </p>
                <h2 className="font-syne font-bold text-2xl text-white glow-text-blue">
                  Executive AI Agent Control Center
                </h2>
              </div>
              <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-zinc-600">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Session active · claude-sonnet-4-6
              </div>
            </div>

            {/* Stats row */}
            <StatsCards />

            {/* Mid row — Mission + Quick Actions + Live Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <MissionCard />
              <QuickActions status={agentStatus} onStatusChange={setAgentStatus} />
              <LiveLogs />
            </div>

            {/* Workflow + Memory */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <WorkflowView />
              <MemoryPanel />
            </div>

            {/* Tools full width */}
            <ToolsGrid />

            {/* Performance charts */}
            <PerformanceCharts />

            {/* History + Settings */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
              <div className="xl:col-span-3">
                <HistoryTable />
              </div>
              <div className="xl:col-span-2">
                <SettingsPanel />
              </div>
            </div>

          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}
