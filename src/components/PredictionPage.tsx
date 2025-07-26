import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Zap, AlertCircle, CheckCircle, Target } from 'lucide-react';
import type { User, BillData } from '../App';

type PredictionPageProps = {
  user: User;
  onNavigate: (page: 'dashboard' | 'analysis') => void;
  billData: BillData[];
  currentBill: BillData | null;
};

const PredictionPage: React.FC<PredictionPageProps> = ({ user, onNavigate, billData, currentBill }) => {
  const [showComparison, setShowComparison] = useState(false);

  if (!currentBill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">No Bill Data Available</h2>
          <p className="text-gray-600">Please upload a bill first to see predictions.</p>
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

  // Generate realistic predictions based on current bill
  const currentAmount = currentBill.amount;
  const currentUnits = currentBill.units;
  
  // Simulate seasonal variation and trends
  const seasonalMultiplier = 1.15; // Assuming next month might be summer
  const predictedUnits = Math.round(currentUnits * seasonalMultiplier);
  const predictedAmount = Math.round(currentAmount * seasonalMultiplier);
  
  // Optimized predictions after applying suggestions
  const optimizedUnits = Math.round(predictedUnits * 0.75); // 25% reduction
  const optimizedAmount = Math.round(predictedAmount * 0.75);
  
  const monthlyPredictions = [
    { month: 'Current', units: currentUnits, amount: currentAmount, type: 'actual' },
    { month: 'Next Month', units: predictedUnits, amount: predictedAmount, type: 'predicted' },
    { month: 'With Optimization', units: optimizedUnits, amount: optimizedAmount, type: 'optimized' }
  ];

  const improvementSuggestions = [
    {
      category: 'Air Conditioning',
      current: '8 hours/day at peak hours',
      suggested: '6 hours/day during off-peak',
      savings: 450,
      impact: 'High'
    },
    {
      category: 'Water Heating',
      current: 'Continuous heating',
      suggested: 'Timer-based heating (2 hours)',
      savings: 200,
      impact: 'Medium'
    },
    {
      category: 'Lighting',
      current: 'Mixed LED/Incandescent',
      suggested: '100% LED + Motion sensors',
      savings: 180,
      impact: 'Medium'
    },
    {
      category: 'Electronics',
      current: 'Always on standby',
      suggested: 'Smart power strips',
      savings: 120,
      impact: 'Low'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('analysis')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Bill Prediction & Optimization</h1>
                <p className="text-sm text-gray-600">AI-powered forecasting with savings recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* Prediction Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          {monthlyPredictions.map((prediction, index) => (
            <div key={index} className={`rounded-2xl p-6 border ${
              prediction.type === 'actual' 
                ? 'bg-blue-50/70 border-blue-200' 
                : prediction.type === 'predicted'
                  ? 'bg-red-50/70 border-red-200'
                  : 'bg-green-50/70 border-green-200'
            }`}>
              <div className="text-center space-y-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                  prediction.type === 'actual' 
                    ? 'bg-blue-100' 
                    : prediction.type === 'predicted'
                      ? 'bg-red-100'
                      : 'bg-green-100'
                }`}>
                  {prediction.type === 'actual' && <Calendar className="w-6 h-6 text-blue-600" />}
                  {prediction.type === 'predicted' && <TrendingUp className="w-6 h-6 text-red-600" />}
                  {prediction.type === 'optimized' && <Target className="w-6 h-6 text-green-600" />}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{prediction.month}</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">₹{prediction.amount}</p>
                  <p className="text-sm text-gray-600">{prediction.units} kWh</p>
                </div>
                {prediction.type === 'optimized' && (
                  <div className="text-green-600 font-medium text-sm">
                    Save ₹{predictedAmount - optimizedAmount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Prediction Button */}
        {!showComparison && (
          <div className="text-center">
            <button
              onClick={() => setShowComparison(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl transition-all transform hover:scale-105 shadow-lg"
            >
              🔮 Generate AI Prediction & Comparison
            </button>
          </div>
        )}

        {/* Detailed Comparison */}
        {showComparison && (
          <>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Current vs Future Bill Comparison
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Current Bill */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-blue-600 mb-4">Current Bill</h3>
                    <div className="text-center p-6 bg-blue-50 rounded-xl">
                      <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-3xl font-bold text-blue-800">₹{currentAmount}</p>
                      <p className="text-blue-600">{currentUnits} kWh consumed</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800">Current Usage Pattern:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">AC Usage:</span>
                        <span className="font-medium">8 hours/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Peak Hour Usage:</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Energy Efficiency:</span>
                        <span className="font-medium text-yellow-600">Moderate</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Predicted Bill */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-green-600 mb-4">Optimized Future Bill</h3>
                    <div className="text-center p-6 bg-green-50 rounded-xl">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-3xl font-bold text-green-800">₹{optimizedAmount}</p>
                      <p className="text-green-600">{optimizedUnits} kWh projected</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800">With Our Suggestions:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">AC Usage:</span>
                        <span className="font-medium text-green-600">6 hours/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Peak Hour Usage:</span>
                        <span className="font-medium text-green-600">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Energy Efficiency:</span>
                        <span className="font-medium text-green-600">High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    Monthly Savings: ₹{predictedAmount - optimizedAmount}
                  </h3>
                  <p className="text-green-700">
                    Annual Savings: ₹{(predictedAmount - optimizedAmount) * 12}
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm text-green-600">Units Saved</p>
                      <p className="font-bold text-green-800">{predictedUnits - optimizedUnits} kWh</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-600">Efficiency Gain</p>
                      <p className="font-bold text-green-800">25%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                💡 Personalized Improvement Plan
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {improvementSuggestions.map((suggestion, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">{suggestion.category}</h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          suggestion.impact === 'High' 
                            ? 'bg-red-100 text-red-700'
                            : suggestion.impact === 'Medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                        }`}>
                          {suggestion.impact} Impact
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600">Current:</p>
                          <p className="font-medium text-gray-800">{suggestion.current}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Suggested:</p>
                          <p className="font-medium text-green-700">{suggestion.suggested}</p>
                        </div>
                      </div>
                      
                      <div className="text-center pt-2">
                        <p className="text-lg font-bold text-green-600">
                          Save ₹{suggestion.savings}/month
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;