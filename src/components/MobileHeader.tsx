import React from 'react';
import { Wallet, Plus } from 'lucide-react';

interface Props {
  onAddClick: () => void;
}

export const MobileHeader: React.FC<Props> = ({ onAddClick }) => (
  <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 px-6 py-5 flex items-center justify-between lg:hidden">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
        <Wallet size={20} className="text-white" />
      </div>
      <span className="font-black text-2xl tracking-tighter">FinAI</span>
    </div>
    <button
      onClick={onAddClick}
      className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-90 transition-transform"
    >
      <Plus size={24} strokeWidth={3} className="text-white" />
    </button>
  </header>
);
