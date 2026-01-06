import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, ShieldCheck, ListChecks, Loader2 } from 'lucide-react';
import { Expense, AIInsight } from '../types';
import { getAIInsights } from '../services/aiService';

interface Props {
  expenses: Expense[];
}

export const AIInsights: React.FC<Props> = ({ expenses }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    if (expenses.length === 0) return;
    setLoading(true);
    const data = await getAIInsights(expenses);
    setInsight(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (expenses.length === 0) {
    return (
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center">
        <p className="text-slate-400">Add some transactions to see AI insights!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="text-emerald-400 w-6 h-6" />
          AI Financial Advisor
        </h2>
        <button
          onClick={fetchInsights}
          disabled={loading}
          className="text-sm bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Refresh Analysis'}
        </button>
      </div>

      {loading && !insight ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin w-12 h-12 text-emerald-500" />
        </div>
      ) : insight ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <TrendingUp className="w-5 h-5" />
              Spending Summary
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{insight.summary}</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-semibold">
              <ShieldCheck className="w-5 h-5" />
              Health Score: {insight.healthScore}%
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-1000"
                style={{ width: `${insight.healthScore}%` }}
              />
            </div>
            <p className="text-slate-300 text-sm italic">{insight.predictions}</p>
          </div>

          <div className="md:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <ListChecks className="w-5 h-5" />
              Actionable Suggestions
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {insight.suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-slate-200 text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
