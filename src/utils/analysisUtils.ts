import { BillData, HourlyUsage, DailyUsage, PowerTip, TrendData, UserScore } from '../types';

export const generateHourlyData = (units: number): HourlyUsage[] => {
  const data: HourlyUsage[] = [];
  const baseDate = new Date();
  
  for (let hour = 0; hour < 24; hour++) {
    let usage: number;
    
    // Simulate realistic usage patterns
    if (hour >= 6 && hour <= 9) {
      usage = units * 0.08; // Morning peak
    } else if (hour >= 12 && hour <= 15) {
      usage = units * 0.12; // Afternoon peak
    } else if (hour >= 18 && hour <= 22) {
      usage = units * 0.15; // Evening peak
    } else if (hour >= 23 || hour <= 5) {
      usage = units * 0.02; // Night low usage
    } else {
      usage = units * 0.05; // Regular hours
    }
    
    data.push({
      hour,
      usage: Math.round(usage * 100) / 100,
      timestamp: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), hour)
    });
  }
  
  return data;
};

export const generateDailyData = (units: number, days: number = 30): DailyUsage[] => {
  const data: DailyUsage[] = [];
  const dailyAverage = units / days;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    // Add some variation to daily usage
    const variation = (Math.random() - 0.5) * 0.4; // ±20% variation
    const usage = Math.max(0, dailyAverage * (1 + variation));
    
    data.push({
      date: date.toISOString().split('T')[0],
      usage: Math.round(usage * 100) / 100,
      cost: Math.round(usage * 7.5 * 100) / 100 // Assuming ₹7.5 per unit
    });
  }
  
  return data;
};

export const generateDynamicTips = (billData: BillData, costPerUnit: number): PowerTip[] => {
  const tips: PowerTip[] = [];
  
  if (!billData.hourlyData) return tips;
  
  // Find peak usage hours
  const peakHours = billData.hourlyData
    .sort((a, b) => b.usage - a.usage)
    .slice(0, 3);
  
  const highestPeak = peakHours[0];
  
  // Peak hour tip
  if (highestPeak.hour >= 12 && highestPeak.hour <= 18) {
    tips.push({
      id: 'peak-afternoon',
      title: 'Shift Afternoon Usage',
      description: `Your highest usage is at ${highestPeak.hour}:00 (${highestPeak.usage.toFixed(1)} kWh). Consider shifting heavy appliances to morning or late evening.`,
      savings: Math.round(highestPeak.usage * costPerUnit * 0.3),
      priority: 'high',
      category: 'timing',
      icon: '⏰'
    });
  }
  
  // AC usage tip
  const afternoonUsage = billData.hourlyData
    .filter(h => h.hour >= 12 && h.hour <= 17)
    .reduce((sum, h) => sum + h.usage, 0);
  
  if (afternoonUsage > billData.units * 0.4) {
    tips.push({
      id: 'ac-optimization',
      title: 'AC Temperature Optimization',
      description: `High afternoon usage detected (${afternoonUsage.toFixed(1)} kWh). Set AC to 24°C instead of 18°C to save 30% energy.`,
      savings: Math.round(afternoonUsage * costPerUnit * 0.3),
      priority: 'high',
      category: 'appliance',
      icon: '❄️'
    });
  }
  
  // Night usage tip
  const nightUsage = billData.hourlyData
    .filter(h => h.hour >= 23 || h.hour <= 5)
    .reduce((sum, h) => sum + h.usage, 0);
  
  if (nightUsage > billData.units * 0.15) {
    tips.push({
      id: 'night-usage',
      title: 'Reduce Night Consumption',
      description: `Unusually high night usage detected (${nightUsage.toFixed(1)} kWh). Check for appliances left on standby.`,
      savings: Math.round(nightUsage * costPerUnit * 0.5),
      priority: 'medium',
      category: 'efficiency',
      icon: '🌙'
    });
  }
  
  // Water heater tip
  const morningUsage = billData.hourlyData
    .filter(h => h.hour >= 6 && h.hour <= 9)
    .reduce((sum, h) => sum + h.usage, 0);
  
  if (morningUsage > billData.units * 0.2) {
    tips.push({
      id: 'water-heater',
      title: 'Water Heater Timer',
      description: `High morning usage suggests continuous water heating. Use a timer to heat water only when needed.`,
      savings: Math.round(morningUsage * costPerUnit * 0.4),
      priority: 'medium',
      category: 'appliance',
      icon: '🚿'
    });
  }
  
  return tips.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

export const detectTrend = (dailyData: DailyUsage[]): TrendData => {
  if (dailyData.length < 7) {
    return {
      direction: 'stable',
      percentage: 0,
      description: 'Not enough data to determine trend',
      icon: '📊'
    };
  }
  
  const recent = dailyData.slice(-7).reduce((sum, d) => sum + d.usage, 0) / 7;
  const previous = dailyData.slice(-14, -7).reduce((sum, d) => sum + d.usage, 0) / 7;
  
  const change = ((recent - previous) / previous) * 100;
  
  if (Math.abs(change) < 5) {
    return {
      direction: 'stable',
      percentage: Math.abs(change),
      description: 'Your usage is stable',
      icon: '✅'
    };
  } else if (change > 0) {
    return {
      direction: 'increasing',
      percentage: change,
      description: `Usage increased by ${change.toFixed(1)}%`,
      icon: '📈'
    };
  } else {
    return {
      direction: 'decreasing',
      percentage: Math.abs(change),
      description: `Usage decreased by ${Math.abs(change).toFixed(1)}%`,
      icon: '📉'
    };
  }
};

export const calculateUserScore = (billData: BillData, costPerUnit: number): UserScore => {
  const dailyAverage = billData.units / 30;
  let score = 100;
  
  // Deduct points for high usage
  if (dailyAverage > 15) score -= 30;
  else if (dailyAverage > 10) score -= 15;
  
  // Deduct points for peak hour usage
  if (billData.hourlyData) {
    const peakUsage = billData.hourlyData
      .filter(h => h.hour >= 12 && h.hour <= 18)
      .reduce((sum, h) => sum + h.usage, 0);
    
    if (peakUsage > billData.units * 0.5) score -= 20;
    else if (peakUsage > billData.units * 0.3) score -= 10;
  }
  
  // Determine level and badge
  let level: string;
  let badge: string;
  let description: string;
  
  if (score >= 80) {
    level = 'Eco Champion';
    badge = '🌟';
    description = 'Excellent energy efficiency! You\'re a role model for sustainable living.';
  } else if (score >= 60) {
    level = 'Green User';
    badge = '🌱';
    description = 'Good energy habits! A few optimizations can make you even more efficient.';
  } else if (score >= 40) {
    level = 'Moderate User';
    badge = '⚡';
    description = 'Room for improvement. Follow our suggestions to reduce your energy footprint.';
  } else {
    level = 'High Usage Alert';
    badge = '🚨';
    description = 'Significant energy consumption detected. Immediate action recommended.';
  }
  
  return { score, level, badge, description };
};