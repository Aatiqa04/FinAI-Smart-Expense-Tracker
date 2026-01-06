import React from 'react';
import { FileText } from 'lucide-react';

interface Props {
  onGenerate: () => void;
  isGenerating: boolean;
  disabled: boolean;
}

export const HealthSynopsis: React.FC<Props> = ({ onGenerate, isGenerating, disabled }) => (
  <div className="glass p-8 rounded-2xl border border-emerald-500/20 relative overflow-hidden group">
    <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all" />
    <h3 className="font-bold text-white flex items-center gap-2 mb-4">
      <FileText size={20} className="text-emerald-500" />
      Health Synopsis
    </h3>
    <p className="text-sm text-slate-400 leading-relaxed mb-6">
      Our AI-powered analysis deep-dives into your spending logic to find hidden leakages and optimize your savings rate.
    </p>
    <button
      onClick={onGenerate}
      disabled={isGenerating || disabled}
      className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 py-4 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {isGenerating ? 'Processing Intelligence...' : 'Generate Monthly Audit'}
    </button>
  </div>
);
