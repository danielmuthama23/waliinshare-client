// Organization types
export interface Organization {
  id: string;
  name: string;
  chatSessions: number;
  messages: number;
  voiceSessions: number;
  voiceDuration: number;
  lastActive: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email?: string;
  chatSessions: number;
  totalMessages: number;
  lastSession?: string;
}

// Metrics types
export interface ActiveUsers {
  total: number;
  chatOnly: number;
  voiceOnly: number;
  chatAndVoice: number;
}

export interface UsageMetrics {
  totalChatSessions: number;
  totalMessages: number;
  totalVoiceSessions: number;
  totalVoiceDuration: string;
}

// Time filter types
export type TimeFilterOption = "today" | "yesterday" | "last7" | "last30" | "custom";

export interface TimeRange {
  start: Date;
  end: Date;
}

// Chart data types
export interface UsageTrendsData {
  name: string;
  Chatbot: number;
  Voicebot: number;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

// Table column definition
export interface ColumnDefinition<T> {
  id: string;
  header: string;
  accessor: (item: T) => React.ReactNode;
  width?: string;
}