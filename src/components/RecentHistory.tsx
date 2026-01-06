import React from 'react';
import { History, ChevronRight } from 'lucide-react';
import { Expense } from '../types';

interface Props {
  expenses: Expense[];
  onViewAll: () => void;
}

export const RecentHistory: React.FC<Props> = ({ expenses, onViewAll }) => (
  <div className="glass p-8 rounded-2xl shadow-xl relative overflow-hidden">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
        <History className="text-slate-400" />
        Recent History
      </h3>
      <button
        onClick={onViewAll}
        className="text-emerald-400 text-sm font-bold flex items-center gap-1 bg-emerald-400/10 px-3 py-1.5 rounded-full hover:bg-emerald-400/20 transition-all"
      >
        Audit Ledger <ChevronRight size={16} />
      </button>
    </div>
    <div className="space-y-3">
      {expenses.slice(0, 4).map(exp => (
        <div key={exp.id} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-all hover:bg-slate-900/60 group">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner ${exp.type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
              {exp.category[0]}
            </div>
            <div>
              <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">{exp.description}</p>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                {exp.category} • {new Date(exp.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
          <p className={`text-lg font-black ${exp.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
            {exp.type === 'income' ? '+' : '-'}${exp.amount.toLocaleString()}
          </p>
        </div>
      ))}
      {expenses.length === 0 && (
        <div className="text-center py-12 text-slate-500 font-medium">No ledger entries found</div>
      )}
    </div>
  </div>
);
