import React from 'react';
import { ArrowLeft, Zap, Clock, TrendingUp, AlertTriangle, Lightbulb, Home } from 'lucide-react';
import type { User, BillData, ApplianceData } from '../App';

type AnalysisPageProps = {
  user: User;
  onNavigate: (page: 'dashboard' | 'prediction') => void;
  billData: BillData[];
  currentBill: BillData | null;
};

const AnalysisPage: React.FC<AnalysisPageProps> = ({ user, onNavigate, billData, currentBill }) => {
  // Mock appliance data based on current bill
  const applianceData: ApplianceData[] = [
    { name: 'Air Conditioner', consumption: 180, percentage: 45, cost: 1350, hours: 8 },
    { name: 'Water Heater', consumption: 80, percentage: 20, cost: 600, hours: 4 },
    { name: 'Refrigerator', consumption: 60, percentage: 15, cost: 450, hours: 24 },
    { name: 'Lighting', consumption: 40, percentage: 10, cost: 300, hours: 12 },
    { name: 'TV & Electronics', consumption: 30, percentage: 7.5, cost: 225, hours: 6 },
    { name: 'Others', consumption: 10, percentage: 2.5, cost: 75, hours: 2 }
  ];

  const peakHours = [
    { time: '6:00 PM - 9:00 PM', usage: 85, cost: 765 },
    { time: '12:00 PM - 3:00 PM', usage: 70, cost: 630 },
    { time: '9:00 AM - 11:00 AM', usage: 45, cost: 405 }
  ];

  const suggestions = [
    {
      icon: Clock,
      title: 'Shift AC Usage to Off-Peak Hours',
      description: 'Your AC consumes 45% of total electricity. Using it between 11 PM - 6 AM can save up to ₹400/month.',
      savings: 400,
      difficulty: 'Easy'
    },
    {
      icon: Zap,
      title: 'Optimize Water Heater Schedule',
      description: 'Heat water during morning hours (6-8 AM) instead of evening peak hours.',
      savings: 200,
      difficulty: 'Easy'
    },
    {
      icon: Lightbulb,
      title: 'Switch to LED Lighting',
      description: 'Replace remaining incandescent bulbs with LED to reduce lighting costs by 60%.',
      savings: 180,
      difficulty: 'Medium'
    },
    {
      icon: TrendingUp,
      title: 'Use Smart Power Strips',
      description: 'Eliminate standby power consumption from electronics when not in use.',
      savings: 150,
      difficulty: 'Easy'
    }
  ];

  if (!currentBill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">No Bill Data Available</h2>
          <p className="text-gray-600">Please upload a bill first to see the analysis.</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Electricity Usage Analysis</h1>
                <p className="text-sm text-gray-600">{currentBill.month} - ₹{currentBill.amount}</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('prediction')}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
            >
              Predict Future Bill
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-gray-800">{currentBill.units} kWh</p>
              </div>
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Daily Average</p>
                <p className="text-2xl font-bold text-gray-800">{Math.round(currentBill.units / 30)} kWh</p>
              </div>
              <Home className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cost per Unit</p>
                <p className="text-2xl font-bold text-gray-800">₹{(currentBill.amount / currentBill.units).toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Potential Savings</p>
                <p className="text-2xl font-bold text-green-600">₹{Math.round(currentBill.amount * 0.25)}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Appliance Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Appliance-wise Consumption</h2>
              <div className="space-y-4">
                {applianceData.map((appliance, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{appliance.name}</span>
                      <div className="text-right">
                        <span className="font-semibold text-gray-800">₹{appliance.cost}</span>
                        <span className="text-sm text-gray-600 ml-2">({appliance.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${appliance.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{appliance.consumption} kWh</span>
                      <span>{appliance.hours}h/day</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peak Usage Hours */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Peak Usage Hours</h2>
              <div className="space-y-4">
                {peakHours.map((peak, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-red-500" />
                      <span className="font-medium text-gray-800">{peak.time}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{peak.usage} kWh</p>
                      <p className="text-sm text-gray-600">₹{peak.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Smart Suggestions */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Smart Suggestions</h2>
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <suggestion.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{suggestion.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-600">
                            Save ₹{suggestion.savings}/month
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            suggestion.difficulty === 'Easy' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {suggestion.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Total Potential Savings</h4>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{suggestions.reduce((sum, s) => sum + s.savings, 0)}/month
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