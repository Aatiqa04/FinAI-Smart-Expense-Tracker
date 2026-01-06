import React from 'react';

interface Props {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export const SidebarLink: React.FC<Props> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group ${
      active
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-2xl shadow-emerald-500/5'
        : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900/50'
    }`}
  >
    <div className={`transition-transform group-hover:scale-110 ${active ? 'text-emerald-400' : 'text-slate-600'}`}>
      {icon}
    </div>
    <span className="font-bold tracking-tight">{label}</span>
    {active && (
      <div className="absolute left-0 w-1.5 h-6 bg-emerald-500 rounded-full -ml-0.75 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
    )}
  </button>
);
