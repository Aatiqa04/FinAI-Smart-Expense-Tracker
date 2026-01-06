import React, { useState } from 'react';
import { Category, Expense } from '../types';
import { PlusCircle, MinusCircle, Tag, Calendar, FileText } from 'lucide-react';

interface Props {
  onAdd: (expense: Omit<Expense, 'id'>) => void;
  initialType?: 'expense' | 'income';
}

const CATEGORIES: Category[] = [
  'Food', 'Transport', 'Rent', 'Utilities', 'Entertainment', 'Shopping', 'Healthcare', 'Income', 'Other'
];

export const ExpenseForm: React.FC<Props> = ({ onAdd, initialType = 'expense' }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>(initialType === 'income' ? 'Income' : 'Food');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'expense' | 'income'>(initialType);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onAdd({
      amount: parseFloat(amount),
      category,
      description,
      type,
      date
    });

    setAmount('');
    setDescription('');
  };

  return (
    <div className="glass p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-blue-500 opacity-50"></div>

      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
        <PlusCircle className="text-emerald-400 w-5 h-5" />
        Record Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="flex p-1 bg-slate-900/50 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => { setType('income'); setCategory('Income'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all font-medium ${type === 'income' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <PlusCircle size={18} /> Income
            </button>
            <button
              type="button"
              onClick={() => { setType('expense'); setCategory('Food'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all font-medium ${type === 'expense' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <MinusCircle size={18} /> Expense
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div className="relative">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-lg font-medium"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Category</label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none transition-all"
                >
                  {CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Description</label>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                placeholder="What was this for?"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 ${
            type === 'income'
              ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'
              : 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20'
          }`}
        >
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
};
