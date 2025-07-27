import React, { useState } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AnalysisPage from './components/AnalysisPage';
import PredictionPage from './components/PredictionPage';
import ReviewsPage from './components/ReviewsPage';
import ChatBot from './components/ChatBot';
import { User, BillData } from './types';

function App() {
  const { isDark } = useDarkMode();
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'analysis' | 'prediction' | 'reviews'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [billData, setBillData] = useState<BillData[]>([]);
  const [currentBill, setCurrentBill] = useState<BillData | null>(null);
  const [costPerUnit, setCostPerUnit] = useState(7.5);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setBillData([]);
    setCurrentBill(null);
    setCurrentPage('login');
  };

  const handleBillUpload = (bill: BillData) => {
    setBillData(prev => [...prev, bill]);
    setCurrentBill(bill);
  };

  const handleReset = () => {
    setBillData([]);
    setCurrentBill(null);
    localStorage.removeItem('billData');
    localStorage.removeItem('currentBill');
  };

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-green-50 to-blue-100'
    }`}>
      {currentPage === 'dashboard' && (
        <Dashboard 
          user={user!} 
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          onBillUpload={handleBillUpload}
          billData={billData}
          onReset={handleReset}
        />
      )}
      {currentPage === 'analysis' && (
        <AnalysisPage 
          user={user!}
          onNavigate={setCurrentPage}
          billData={billData}
          currentBill={currentBill}
          costPerUnit={costPerUnit}
          onCostPerUnitChange={setCostPerUnit}
        />
      )}
      {currentPage === 'prediction' && (
        <PredictionPage 
          user={user!}
          onNavigate={setCurrentPage}
          billData={billData}
          currentBill={currentBill}
          costPerUnit={costPerUnit}
        />
      )}
      {currentPage === 'reviews' && (
        <ReviewsPage 
          user={user!}
          onNavigate={setCurrentPage}
        />
      )}
      
      <ChatBot />
    </div>
  );
}

export default App;