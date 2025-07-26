import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AnalysisPage from './components/AnalysisPage';
import PredictionPage from './components/PredictionPage';
import ReviewsPage from './components/ReviewsPage';

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
  type: 'uploaded' | 'manual';
};

export type ApplianceData = {
  name: string;
  consumption: number;
  percentage: number;
  cost: number;
  hours: number;
};

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'analysis' | 'prediction' | 'reviews'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [billData, setBillData] = useState<BillData[]>([]);
  const [currentBill, setCurrentBill] = useState<BillData | null>(null);

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

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {currentPage === 'dashboard' && (
        <Dashboard 
          user={user!} 
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          onBillUpload={handleBillUpload}
          billData={billData}
        />
      )}
      {currentPage === 'analysis' && (
        <AnalysisPage 
          user={user!}
          onNavigate={setCurrentPage}
          billData={billData}
          currentBill={currentBill}
        />
      )}
      {currentPage === 'prediction' && (
        <PredictionPage 
          user={user!}
          onNavigate={setCurrentPage}
          billData={billData}
          currentBill={currentBill}
        />
      )}
      {currentPage === 'reviews' && (
        <ReviewsPage 
          user={user!}
          onNavigate={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;