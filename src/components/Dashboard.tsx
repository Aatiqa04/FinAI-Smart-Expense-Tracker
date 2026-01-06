import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Expense } from '../types';
import { TrendingUp, PieChart as PieIcon, Activity } from 'lucide-react';

interface Props {
  expenses: Expense[];
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#d946ef'];

export const Dashboard: React.FC<Props> = ({ expenses }) => {
  const totalIncome = expenses
    .filter(e => e.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = expenses
    .filter(e => e.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const spendingUtilization = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;

  const categoryData = expenses
    .filter(e => e.type === 'expense')
    .reduce((acc: any[], curr) => {
      const existing = acc.find(a => a.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, [])
    .sort((a, b) => b.value - a.value);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const amount = expenses
      .filter(e => e.date === dateStr && e.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { name: d.toLocaleDateString(undefined, { weekday: 'short' }), amount };
  }).reverse();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Category Breakdown */}
      <div className="glass p-8 rounded-2xl shadow-xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 text-slate-800 pointer-events-none transition-transform group-hover:scale-110">
          <PieIcon size={120} />
        </div>
        <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2 relative z-10">
          <Activity className="text-blue-400 w-5 h-5" />
          Spending Mix
        </h3>
        <div className="h-[280px] w-full relative z-10">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 italic">
              Record some expenses to see breakdown
            </div>
          )}
        </div>

        {/* Simplified Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 relative z-10">
          {categoryData.slice(0, 4).map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="truncate">{entry.name}</span>
              <span className="text-slate-500 ml-auto">${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Utilization & Trends */}
      <div className="space-y-8">
        <div className="glass p-8 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-emerald-400 w-5 h-5" />
              Weekly Flux
            </h3>
            <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded">LAST 7 DAYS</span>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7Days}>
                <CartesianGrid strokeDasharray="0" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#475569"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <Tooltip
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="amount" fill="url(#barGradient)" radius={[6, 6, 0, 0]}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#1e3a8a" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-2xl shadow-xl relative overflow-hidden group">
          <div className={`absolute top-0 left-0 h-1 bg-gradient-to-r transition-all duration-1000 ${spendingUtilization > 90 ? 'from-rose-500 to-rose-700' : 'from-emerald-400 to-blue-500'}`} style={{ width: `${Math.min(spendingUtilization, 100)}%` }}></div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-1">Budget Burn</p>
              <h4 className={`text-4xl font-black ${spendingUtilization > 90 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {spendingUtilization.toFixed(0)}%
              </h4>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs font-medium mb-1 uppercase">Safe to Spend</p>
              <p className="text-2xl font-bold text-white">
                ${Math.max(totalIncome - totalExpense, 0).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-4 italic">
            {spendingUtilization > 100 ? "You've exceeded your income. AI suggests reviewing expenses." : "You are currently within your safe spending limit."}
          </p>
        </div>
      </div>
    </div>
  );
};
