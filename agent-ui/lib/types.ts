export type AgentStatus = "active" | "paused" | "stopped";

export type AgentConfig = {
  id: string;
  name: string;
  status: AgentStatus;
  model: string;
  description: string;
};

export type LogLevel = "INFO" | "ACTION" | "SUCCESS" | "WARN" | "ERROR";

export type LogEntry = {
  id: string;
  time: string;
  level: LogLevel;
  message: string;
};

export type Task = {
  id: string;
  label: string;
  done: boolean;
};

export type Mission = {
  title: string;
  description: string;
  tasks: Task[];
  progress: number;
  estimatedMinutes: number;
  elapsedMinutes: number;
};

export type Tool = {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastUsed: string;
  category: "google" | "ai" | "data" | "automation";
};

export type HistoryEntry = {
  id: string;
  date: string;
  mission: string;
  duration: string;
  status: "success" | "partial" | "failed";
  result: string;
};

export type MemorySection = {
  key: string;
  value: string;
};
