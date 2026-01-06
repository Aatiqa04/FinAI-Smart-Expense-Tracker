import React from 'react';

interface Props {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

export const SummaryCard: React.FC<Props> = ({ label, value, icon, color, bg }) => (
  <div className="glass p-8 rounded-3xl border border-slate-800/50 shadow-xl overflow-hidden relative group hover:border-slate-700 transition-all">
    <div className={`absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:scale-110 ${color}`}>
      {icon}
    </div>
    <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h4 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{label}</h4>
    <p className={`text-4xl font-black mt-1 ${color}`}>
      ${Math.abs(value).toLocaleString()}
    </p>
    {label === "Net Balance" && (
      <p className={`text-[10px] mt-2 font-bold uppercase tracking-widest ${value >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
        {value >= 0 ? "Surplus Growth" : "Deficit Warning"}
      </p>
    )}
  </div>
);
