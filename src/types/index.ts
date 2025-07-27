export type User = {
  id: string;
  name: string;
  email: string;
};

export type BillData = {
  id: string;
  month: string;
  units: number;
  amount: number;
  uploadDate: Date;
  type: 'uploaded' | 'manual' | 'json';
  hourlyData?: HourlyUsage[];
  dailyData?: DailyUsage[];
};

export type HourlyUsage = {
  hour: number;
  usage: number;
  timestamp: Date;
};

export type DailyUsage = {
  date: string;
  usage: number;
  cost: number;
};

export type ApplianceData = {
  name: string;
  consumption: number;
  percentage: number;
  cost: number;
  hours: number;
};

export type PowerTip = {
  id: string;
  title: string;
  description: string;
  savings: number;
  priority: 'high' | 'medium' | 'low';
  category: string;
  icon: string;
};

export type TrendData = {
  direction: 'increasing' | 'decreasing' | 'stable';
  percentage: number;
  description: string;
  icon: string;
};

export type UserScore = {
  score: number;
  level: string;
  badge: string;
  description: string;
};