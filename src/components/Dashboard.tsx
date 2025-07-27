import React, { useState } from 'react';
import { Upload, FileText, BarChart3, TrendingUp, Users, LogOut, Zap, DollarSign, Calendar, Activity, RotateCcw } from 'lucide-react';
import { User, BillData } from '../types';
import { useDarkMode } from '../hooks/useDarkMode';
import FileUpload from './FileUpload';
import DarkModeToggle from './DarkModeToggle';

type DashboardProps = {
  user: User;
  onLogout: () => void;
  onNavigate: (page: 'analysis' | 'prediction' | 'reviews') => void;
  onBillUpload: (bill: BillData) => void;
  billData: BillData[];
  onReset: () => void;
};

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onNavigate, onBillUpload, billData, onReset }) => {
  const { isDark } = useDarkMode();
  const [showUpload, setShowUpload] = useState(false);

  const stats = [
    {
      icon: DollarSign,
      label: 'Current Month Bill',
      value: billData.length > 0 ? `₹${billData[billData.length - 1]?.amount || 0}` : '₹0',
      change: billData.length > 1 ? `${((billData[billData.length - 1]?.amount - billData[billData.length - 2]?.amount) / billData[billData.length - 2]?.amount * 100).toFixed(1)}%` : '+0%',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Zap,
      label: 'Units Consumed',
      value: billData.length > 0 ? `${billData[billData.length - 1]?.units || 0} kWh` : '0 kWh',
      change: billData.length > 1 ? `${((billData[billData.length - 1]?.units - billData[billData.length - 2]?.units) / billData[billData.length - 2]?.units * 100).toFixed(1)}%` : '+0%',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: TrendingUp,
      label: 'Potential Savings',
      value: billData.length > 0 ? `₹${Math.round((billData[billData.length - 1]?.amount || 0) * 0.25)}` : '₹0',
      change: '+25%',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Calendar,
      label: 'Bills Analyzed',
      value: billData.length.toString(),
      change: '+100%',
      color: 'from-purple-500 to-pink-600'
    }
  ];

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
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>Smart Power Optimizer</h1>
                <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DarkModeToggle />
              {billData.length > 0 && (
                <button
                  onClick={onReset}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                    isDark 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                  title="Reset all data"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              )}
              <button
              onClick={onLogout}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`backdrop-blur-md rounded-2xl p-6 border hover:scale-105 transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/70 border-gray-700/20 hover:bg-gray-800/90' 
                : 'bg-white/70 border-white/20 hover:bg-white/90'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</p>
                  <p className={`text-2xl font-bold mt-1 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`backdrop-blur-md rounded-2xl p-8 border transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-800/70 border-gray-700/20' 
                : 'bg-white/70 border-white/20'
            }`}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>Upload Your Electricity Bill</h2>
                <p className={`transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Upload your electricity bill in PDF, image format, CSV data, or enter details manually to get started with analysis
                </p>
                <button
                  onClick={() => setShowUpload(true)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Bill</span>
                </button>
              </div>
            </div>

            {/* Recent Bills */}
            {billData.length > 0 && (
              <div className={`backdrop-blur-md rounded-2xl p-6 border transition-colors duration-300 ${
                isDark 
                  ? 'bg-gray-800/70 border-gray-700/20' 
                  : 'bg-white/70 border-white/20'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>Recent Bills</h3>
                <div className="space-y-3">
                  {billData.slice(-3).reverse().map((bill) => (
                    <div key={bill.id} className={`flex items-center justify-between p-4 rounded-xl transition-colors duration-300 ${
                      isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className={`font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>{bill.month}</p>
                          <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{bill.units} kWh consumed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>₹{bill.amount}</p>
                        <p className={`text-xs transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{bill.uploadDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className={`backdrop-blur-md rounded-2xl p-6 border transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-800/70 border-gray-700/20' 
                : 'bg-white/70 border-white/20'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('analysis')}
                  disabled={billData.length === 0}
                  className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Analyze Usage</span>
                </button>
                
                <button
                  onClick={() => onNavigate('prediction')}
                  disabled={billData.length === 0}
                  className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Predict Future Bill</span>
                </button>
                
                <button
                  onClick={() => onNavigate('reviews')}
                  className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all transform hover:scale-105"
                >
                  <Users className="w-5 h-5" />
                  <span>Reviews & Feedback</span>
                </button>
              </div>
            </div>

            {/* Energy Tip */}
            <div className={`rounded-2xl p-6 text-white transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-yellow-600 to-orange-600' 
                : 'bg-gradient-to-r from-yellow-500 to-orange-500'
            }`}>
              <div className="flex items-start space-x-3">
                <Activity className="w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">💡 Energy Tip of the Day</h4>
                  <p className="text-sm opacity-90">
                    Using LED bulbs can reduce lighting energy consumption by up to 75% compared to incandescent bulbs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <FileUpload 
          onClose={() => setShowUpload(false)}
          onUpload={onBillUpload}
        />
      )}
    </div>
  );
};

export default Dashboard;