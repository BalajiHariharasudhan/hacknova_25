import React, { useState } from 'react';
import { Upload, FileText, BarChart3, TrendingUp, Users, LogOut, Zap, DollarSign, Calendar, Activity } from 'lucide-react';
import type { User, BillData } from '../App';
import FileUpload from './FileUpload';

type DashboardProps = {
  user: User;
  onLogout: () => void;
  onNavigate: (page: 'analysis' | 'prediction' | 'reviews') => void;
  onBillUpload: (bill: BillData) => void;
  billData: BillData[];
};

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onNavigate, onBillUpload, billData }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Smart Power Optimizer</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
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
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Upload Your Electricity Bill</h2>
                <p className="text-gray-600">
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
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Bills</h3>
                <div className="space-y-3">
                  {billData.slice(-3).reverse().map((bill) => (
                    <div key={bill.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-800">{bill.month}</p>
                          <p className="text-sm text-gray-600">{bill.units} kWh consumed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{bill.amount}</p>
                        <p className="text-xs text-gray-500">{bill.uploadDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
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
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
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