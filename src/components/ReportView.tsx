import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { FormattedReport } from './FormattedReport';

interface Props {
  report: string | null;
  onClose: () => void;
}

export const ReportView: React.FC<Props> = ({ report, onClose }) => (
  <div className="max-w-4xl mx-auto glass p-10 rounded-3xl shadow-2xl animate-in zoom-in duration-500">
    <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800">
      <div>
        <h2 className="text-4xl font-black text-white flex items-center gap-4">
          <FileText className="text-emerald-500 w-10 h-10" />
          AI Audit Report
        </h2>
        <p className="text-slate-500 mt-1 font-medium italic">Executive summary of your financial trajectory</p>
      </div>
      <button
        onClick={onClose}
        className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-2xl text-slate-300 font-bold transition-all border border-slate-700"
      >
        Close Report
      </button>
    </div>
    {report ? (
      <div className="bg-slate-900/40 p-10 rounded-2xl border border-slate-800 shadow-inner">
        <FormattedReport content={report} />
      </div>
    ) : (
      <div className="h-96 flex flex-col items-center justify-center gap-6 text-center">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center animate-bounce">
          <Sparkles className="text-emerald-500 w-10 h-10" />
        </div>
        <div>
          <p className="text-xl font-bold text-white mb-2">Insight Engine Dormant</p>
          <p className="text-slate-500 max-w-xs mx-auto">Trigger a report generation from the dashboard to activate the analysis.</p>
        </div>
      </div>
    )}
  </div>
);
