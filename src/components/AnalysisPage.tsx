import React from 'react';
import { ArrowLeft, Zap, Clock, TrendingUp, AlertTriangle, Lightbulb, Home, Download, Award } from 'lucide-react';
import { User, BillData, ApplianceData, PowerTip, TrendData, UserScore } from '../types';
import { useDarkMode } from '../hooks/useDarkMode';
import { generateHourlyData, generateDailyData, generateDynamicTips, detectTrend, calculateUserScore } from '../utils/analysisUtils';
import { generatePDFReport } from '../utils/pdfGenerator';
import UsageCharts from './UsageCharts';
import CostEstimator from './CostEstimator';
import DarkModeToggle from './DarkModeToggle';

type AnalysisPageProps = {
  user: User;
  onNavigate: (page: 'dashboard' | 'prediction') => void;
  billData: BillData[];
  currentBill: BillData | null;
  costPerUnit: number;
  onCostPerUnitChange: (cost: number) => void;
};

const AnalysisPage: React.FC<AnalysisPageProps> = ({ 
  user, 
  onNavigate, 
  billData, 
  currentBill, 
  costPerUnit, 
  onCostPerUnitChange 
}) => {
  const { isDark } = useDarkMode();

  if (!currentBill) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-green-50 to-blue-100'
      }`}>
        <div className="text-center space-y-4">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto" />
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>No Bill Data Available</h2>
          <p className={`transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Please upload a bill first to see the analysis.</p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Generate enhanced data
  const enhancedBill = {
    ...currentBill,
    hourlyData: currentBill.hourlyData || generateHourlyData(currentBill.units),
    dailyData: currentBill.dailyData || generateDailyData(currentBill.units)
  };

  // Mock appliance data based on current bill
  const applianceData: ApplianceData[] = [
    { name: 'Air Conditioner', consumption: 180, percentage: 45, cost: 1350, hours: 8 },
    { name: 'Water Heater', consumption: 80, percentage: 20, cost: 600, hours: 4 },
    { name: 'Refrigerator', consumption: 60, percentage: 15, cost: 450, hours: 24 },
    { name: 'Lighting', consumption: 40, percentage: 10, cost: 300, hours: 12 },
    { name: 'TV & Electronics', consumption: 30, percentage: 7.5, cost: 225, hours: 6 },
    { name: 'Others', consumption: 10, percentage: 2.5, cost: 75, hours: 2 }
  ];

  // Generate dynamic insights
  const dynamicTips: PowerTip[] = generateDynamicTips(enhancedBill, costPerUnit);
  const trendData: TrendData = detectTrend(enhancedBill.dailyData || []);
  const userScore: UserScore = calculateUserScore(enhancedBill, costPerUnit);

  const handleDownloadReport = async () => {
    await generatePDFReport(enhancedBill, dynamicTips, trendData, userScore, costPerUnit);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-green-50 to-blue-100'
    }`}>
      {/* Header */}
      <div className={`backdrop-blur-md border-b sticky top-0 z-50 transition-colors duration-300 ${
        isDark 
          ? 'bg-gray-800/80 border-gray-700/20' 
          : 'bg-white/80 border-white/20'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className={`w-5 h-5 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>Electricity Usage Analysis</h1>
                <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{currentBill.month} - ₹{currentBill.amount}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DarkModeToggle />
              <button
                onClick={handleDownloadReport}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
              <button
                onClick={() => onNavigate('prediction')}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
              >
                Predict Future Bill
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* User Score & Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-800/70 border-gray-700/20' 
              : 'bg-white/70 border-white/20'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Efficiency Score</p>
                <p className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>{userScore.score}/100</p>
                <p className="text-sm text-green-600">{userScore.badge} {userScore.level}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-800/70 border-gray-700/20' 
              : 'bg-white/70 border-white/20'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Units</p>
                <p className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>{currentBill.units} kWh</p>
              </div>
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-800/70 border-gray-700/20' 
              : 'bg-white/70 border-white/20'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Daily Average</p>
                <p className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>{Math.round(currentBill.units / 30)} kWh</p>
              </div>
              <Home className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-800/70 border-gray-700/20' 
              : 'bg-white/70 border-white/20'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Usage Trend</p>
                <p className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>{trendData.icon}</p>
                <p className="text-sm text-blue-600">{trendData.direction}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Cost Estimator */}
        <CostEstimator 
          billData={enhancedBill}
          onCostPerUnitChange={onCostPerUnitChange}
          isDark={isDark}
        />

        {/* Usage Charts */}
        <UsageCharts 
          hourlyData={enhancedBill.hourlyData || []}
          dailyData={enhancedBill.dailyData || []}
          applianceData={applianceData}
          isDark={isDark}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Appliance Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`backdrop-blur-md rounded-2xl p-6 border transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-800/70 border-gray-700/20' 
                : 'bg-white/70 border-white/20'
            }`}>
              <h2 className={`text-xl font-bold mb-6 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>Appliance-wise Consumption</h2>
              <div className="space-y-4">
                {applianceData.map((appliance, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>{appliance.name}</span>
                      <div className="text-right">
                        <span className={`font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>₹{appliance.cost}</span>
                        <span className={`text-sm ml-2 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>({appliance.percentage}%)</span>
                      </div>
                    </div>
                    <div className={`w-full rounded-full h-3 transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${appliance.percentage}%` }}
                      ></div>
                    </div>
                    <div className={`flex justify-between text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span>{appliance.consumption} kWh</span>
                      <span>{appliance.hours}h/day</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Smart Suggestions */}
          <div className="space-y-6">
            <div className={`backdrop-blur-md rounded-2xl p-6 border transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-800/70 border-gray-700/20' 
                : 'bg-white/70 border-white/20'
            }`}>
              <h2 className={`text-xl font-bold mb-6 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>Smart Suggestions</h2>
              <div className="space-y-4">
                {dynamicTips.slice(0, 4).map((tip, index) => (
                  <div key={tip.id} className={`rounded-xl p-4 border transition-colors duration-300 ${
                    isDark 
                      ? 'bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-700/30' 
                      : 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg transition-colors duration-300 ${
                        isDark ? 'bg-green-900/40' : 'bg-green-100'
                      }`}>
                        <span className="text-lg">{tip.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>{tip.title}</h3>
                        <p className={`text-sm mb-3 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{tip.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-600">
                            Save ₹{tip.savings}/month
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
                            tip.priority === 'high' 
                              ? isDark ? 'bg-red-900/40 text-red-300' : 'bg-red-100 text-red-700'
                              : tip.priority === 'medium'
                                ? isDark ? 'bg-yellow-900/40 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
                                : isDark ? 'bg-green-900/40 text-green-300' : 'bg-green-100 text-green-700'
                          }`}>
                            {tip.priority} priority
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`mt-6 p-4 rounded-xl border transition-colors duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-700/30' 
                  : 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  <div>
                    <h4 className={`font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>Total Potential Savings</h4>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{dynamicTips.reduce((sum, tip) => sum + tip.savings, 0)}/month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;