import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Info } from 'lucide-react';
import { BillData } from '../types';

type CostEstimatorProps = {
  billData: BillData;
  onCostPerUnitChange: (cost: number) => void;
  isDark: boolean;
};

const CostEstimator: React.FC<CostEstimatorProps> = ({ billData, onCostPerUnitChange, isDark }) => {
  const [costPerUnit, setCostPerUnit] = useState(7.5);
  const [showDetails, setShowDetails] = useState(false);

  const handleCostChange = (value: number) => {
    setCostPerUnit(value);
    onCostPerUnitChange(value);
  };

  const estimatedMonthlyCost = billData.units * costPerUnit;
  const dailyAverage = billData.units / 30;
  const dailyCost = dailyAverage * costPerUnit;
  const yearlyEstimate = estimatedMonthlyCost * 12;

  // Calculate cost breakdown by time periods
  const peakHoursCost = billData.hourlyData 
    ? billData.hourlyData
        .filter(h => h.hour >= 12 && h.hour <= 18)
        .reduce((sum, h) => sum + h.usage, 0) * costPerUnit
    : 0;

  const offPeakCost = estimatedMonthlyCost - peakHoursCost;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <Calculator className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Cost Estimator</h2>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Show details"
        >
          <Info className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Cost Per Unit Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Electricity Rate (₹ per kWh)
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="number"
            value={costPerUnit}
            onChange={(e) => handleCostChange(parseFloat(e.target.value) || 0)}
            step="0.1"
            min="0"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your electricity rate"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Check your electricity bill for the exact rate in your area
        </p>
      </div>

      {/* Cost Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Daily Cost</p>
          <p className="text-xl font-bold text-blue-800 dark:text-blue-300">₹{dailyCost.toFixed(2)}</p>
        </div>
        
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">Monthly Cost</p>
          <p className="text-xl font-bold text-green-800 dark:text-green-300">₹{estimatedMonthlyCost.toFixed(2)}</p>
        </div>
        
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Yearly Estimate</p>
          <p className="text-xl font-bold text-purple-800 dark:text-purple-300">₹{yearlyEstimate.toFixed(0)}</p>
        </div>
        
        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
          <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">Per Unit</p>
          <p className="text-xl font-bold text-orange-800 dark:text-orange-300">₹{costPerUnit}</p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      {showDetails && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Cost Breakdown
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
              <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Peak Hours Cost</h4>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">₹{peakHoursCost.toFixed(2)}</p>
              <p className="text-sm text-red-600 dark:text-red-400">12 PM - 6 PM (Higher rates)</p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Off-Peak Cost</h4>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{offPeakCost.toFixed(2)}</p>
              <p className="text-sm text-green-600 dark:text-green-400">Other hours (Lower rates)</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Usage Statistics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Units:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">{billData.units} kWh</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Daily Average:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">{dailyAverage.toFixed(1)} kWh</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Peak Usage:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                  {billData.hourlyData 
                    ? billData.hourlyData.filter(h => h.hour >= 12 && h.hour <= 18).reduce((sum, h) => sum + h.usage, 0).toFixed(1)
                    : '0'
                  } kWh
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Efficiency:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 ml-2">
                  {dailyAverage < 10 ? 'Excellent' : dailyAverage < 15 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostEstimator;