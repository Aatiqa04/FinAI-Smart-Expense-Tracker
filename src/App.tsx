import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, History, Plus } from 'lucide-react';

import { ExpenseForm } from './components/ExpenseForm';
import { Dashboard } from './components/Dashboard';
import { AIInsights } from './components/AIInsights';
import { SummaryCard } from './components/SummaryCard';
import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';
import { FormModal } from './components/FormModal';
import { RecentHistory } from './components/RecentHistory';
import { HealthSynopsis } from './components/HealthSynopsis';
import { TransactionsView } from './components/TransactionsView';
import { ReportView } from './components/ReportView';

import { Expense } from './types';
import { generateFinancialReport } from './services/aiService';

type TabType = 'dashboard' | 'transactions' | 'insights' | 'report';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('finai_expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [report, setReport] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('finai_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExp: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExp,
      id: Math.random().toString(36).substr(2, 9),
    };
    setExpenses(prev => [expense, ...prev]);
    setShowFormModal(false);
  };

  const handleGenerateReport = async () => {
    if (expenses.length === 0) return;
    setIsGeneratingReport(true);
    try {
      const month = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
      const result = await generateFinancialReport(expenses, month);
      setReport(result || "No report generated.");
      setActiveTab('report');
    } catch (error) {
      console.error("Report generation failed:", error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const totalIncome = expenses.filter(e => e.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalSpent = expenses.filter(e => e.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const totalBalance = totalIncome - totalSpent;

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      {totalIncome === 0 && (
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12 transition-transform group-hover:rotate-0">
            <Wallet size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-white mb-2">Kickstart Your Finances!</h2>
              <p className="text-emerald-50/80 max-w-md">To track your spending effectively, we first need to know your income.</p>
            </div>
            <button
              onClick={() => setShowFormModal(true)}
              className="bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus size={24} strokeWidth={3} /> Add Initial Income
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard label="Total Income" value={totalIncome} icon={<TrendingUp size={24} />} color="text-emerald-400" bg="bg-emerald-500/10" />
        <SummaryCard label="Total Spending" value={totalSpent} icon={<History size={24} />} color="text-rose-400" bg="bg-rose-500/10" />
        <SummaryCard label="Net Balance" value={totalBalance} icon={<Wallet size={24} />} color={totalBalance >= 0 ? "text-blue-400" : "text-rose-500"} bg="bg-blue-500/10" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <Dashboard expenses={expenses} />
          <RecentHistory expenses={expenses} onViewAll={() => setActiveTab('transactions')} />
        </div>
        <div className="space-y-8">
          <div className="sticky top-24">
            <div className="hidden xl:block mb-8">
              <ExpenseForm onAdd={handleAddExpense} initialType={totalIncome === 0 ? 'income' : 'expense'} />
            </div>
            <HealthSynopsis onGenerate={handleGenerateReport} isGenerating={isGeneratingReport} disabled={expenses.length === 0} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'transactions':
        return <TransactionsView expenses={expenses} onClear={() => setExpenses([])} />;
      case 'insights':
        return <AIInsights expenses={expenses} />;
      case 'report':
        return <ReportView report={report} onClose={() => setActiveTab('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-200">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-y-auto">
        <MobileHeader onAddClick={() => setShowFormModal(true)} />
        <div className="p-6 lg:p-12 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {showFormModal && (
        <FormModal onClose={() => setShowFormModal(false)}>
          <ExpenseForm onAdd={handleAddExpense} initialType={totalIncome === 0 ? 'income' : 'expense'} />
        </FormModal>
      )}
    </div>
  );
};

export default App;
