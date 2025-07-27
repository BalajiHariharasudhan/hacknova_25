import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { HourlyUsage, DailyUsage, ApplianceData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type UsageChartsProps = {
  hourlyData: HourlyUsage[];
  dailyData: DailyUsage[];
  applianceData: ApplianceData[];
  isDark: boolean;
};

const UsageCharts: React.FC<UsageChartsProps> = ({ hourlyData, dailyData, applianceData, isDark }) => {
  const textColor = isDark ? '#E5E7EB' : '#374151';
  const gridColor = isDark ? '#374151' : '#E5E7EB';

  // Hourly Usage Chart
  const hourlyChartData = {
    labels: hourlyData.map(h => `${h.hour}:00`),
    datasets: [
      {
        label: 'Usage (kWh)',
        data: hourlyData.map(h => h.usage),
        backgroundColor: hourlyData.map(h => {
          // Highlight peak hours
          if (h.hour >= 12 && h.hour <= 18) {
            return 'rgba(239, 68, 68, 0.8)'; // Red for peak hours
          } else if (h.hour >= 18 && h.hour <= 22) {
            return 'rgba(245, 158, 11, 0.8)'; // Orange for evening
          } else {
            return 'rgba(59, 130, 246, 0.8)'; // Blue for normal hours
          }
        }),
        borderColor: hourlyData.map(h => {
          if (h.hour >= 12 && h.hour <= 18) {
            return 'rgba(239, 68, 68, 1)';
          } else if (h.hour >= 18 && h.hour <= 22) {
            return 'rgba(245, 158, 11, 1)';
          } else {
            return 'rgba(59, 130, 246, 1)';
          }
        }),
        borderWidth: 2,
      },
    ],
  };

  const hourlyChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        text: 'Hourly Usage Pattern',
        color: textColor,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: (context: any) => {
            const hour = context.dataIndex;
            if (hour >= 12 && hour <= 18) {
              return 'Peak Hours - Higher Rates';
            } else if (hour >= 18 && hour <= 22) {
              return 'Evening Hours';
            } else {
              return 'Off-Peak Hours - Lower Rates';
            }
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  // Daily Usage Chart
  const dailyChartData = {
    labels: dailyData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Daily Usage (kWh)',
        data: dailyData.map(d => d.usage),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const dailyChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        text: 'Daily Usage Trend (Last 30 Days)',
        color: textColor,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  // Appliance Distribution Chart
  const applianceChartData = {
    labels: applianceData.map(a => a.name),
    datasets: [
      {
        data: applianceData.map(a => a.percentage),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',   // Red
          'rgba(245, 158, 11, 0.8)',  // Orange
          'rgba(34, 197, 94, 0.8)',   // Green
          'rgba(59, 130, 246, 0.8)',  // Blue
          'rgba(147, 51, 234, 0.8)',  // Purple
          'rgba(236, 72, 153, 0.8)',  // Pink
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const applianceChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: textColor,
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Appliance-wise Consumption',
        color: textColor,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const appliance = applianceData[context.dataIndex];
            return [
              `${appliance.name}: ${appliance.percentage}%`,
              `Cost: ₹${appliance.cost}`,
              `Usage: ${appliance.consumption} kWh`,
            ];
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Hourly Usage Chart */}
      <div id="hourly-chart" className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <Bar data={hourlyChartData} options={hourlyChartOptions} />
      </div>

      {/* Daily Usage Chart */}
      <div id="daily-chart" className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <Line data={dailyChartData} options={dailyChartOptions} />
      </div>

      {/* Appliance Distribution Chart */}
      <div id="appliance-chart" className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="max-w-md mx-auto">
          <Doughnut data={applianceChartData} options={applianceChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default UsageCharts;