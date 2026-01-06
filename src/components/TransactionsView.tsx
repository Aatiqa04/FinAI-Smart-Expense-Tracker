import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Expense } from '../types';

interface Props {
  expenses: Expense[];
  onClear: () => void;
}

export const TransactionsView: React.FC<Props> = ({ expenses, onClear }) => (
  <div className="glass rounded-3xl overflow-hidden animate-in fade-in duration-500">
    <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
      <h2 className="text-3xl font-black text-white">Ledger</h2>
      <button
        onClick={() => { if (confirm("Clear all financial data?")) onClear(); }}
        className="text-xs font-bold text-rose-500 uppercase tracking-widest hover:text-rose-400 transition-colors"
      >
        Flush System
      </button>
    </div>
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left">
        <thead className="text-slate-500 text-xs font-bold uppercase tracking-widest">
          <tr>
            <th className="px-6 py-4">Timeline</th>
            <th className="px-6 py-4">Memo</th>
            <th className="px-6 py-4">Classification</th>
            <th className="px-6 py-4 text-right">Magnitude</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {expenses.map(exp => (
            <tr key={exp.id} className="hover:bg-slate-800/20 transition-all group">
              <td className="px-6 py-5 text-slate-400 font-medium">{exp.date}</td>
              <td className="px-6 py-5">
                <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">{exp.description}</div>
              </td>
              <td className="px-6 py-5">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-black uppercase tracking-tighter text-slate-400 border border-slate-700">
                  {exp.category}
                </span>
              </td>
              <td className={`px-6 py-5 text-right font-black text-lg ${exp.type === 'income' ? 'text-emerald-400' : 'text-slate-300'}`}>
                {exp.type === 'income' ? '+' : '-'}${exp.amount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expenses.length === 0 && (
        <div className="py-24 text-center">
          <AlertCircle className="mx-auto text-slate-700 mb-4" size={48} />
          <p className="text-slate-500 font-bold uppercase tracking-widest">System ledger is empty</p>
        </div>
      )}
    </div>
  </div>
);
