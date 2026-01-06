import React from 'react';
import { Wallet, Sparkles, History, LayoutDashboard, FileText } from 'lucide-react';
import { SidebarLink } from './SidebarLink';

type TabType = 'dashboard' | 'transactions' | 'insights' | 'report';

interface Props {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Sidebar: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="hidden lg:flex flex-col w-80 bg-slate-950 border-r border-slate-900 p-8 sticky top-0 h-screen">
      {/* Logo */}
      <div className="flex items-center gap-4 mb-16 px-2">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 group">
          <Wallet className="text-white group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <span className="text-3xl font-black tracking-tighter text-white block leading-none">FinAI</span>
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Copilot</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-3 flex-1">
        <SidebarLink
          active={activeTab === 'dashboard'}
          onClick={() => onTabChange('dashboard')}
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
        />
        <SidebarLink
          active={activeTab === 'transactions'}
          onClick={() => onTabChange('transactions')}
          icon={<History size={20} />}
          label="System Ledger"
        />
        <SidebarLink
          active={activeTab === 'insights'}
          onClick={() => onTabChange('insights')}
          icon={<Sparkles size={20} />}
          label="Intelligence"
        />
        <SidebarLink
          active={activeTab === 'report'}
          onClick={() => onTabChange('report')}
          icon={<FileText size={20} />}
          label="Executive Audit"
        />
      </nav>

      {/* Security Status */}
      <div className="mt-auto pt-8 border-t border-slate-900">
        <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-5 scale-150">
            <Sparkles />
          </div>
          <p className="text-[10px] text-emerald-500 font-black mb-1 uppercase tracking-widest">Security Status</p>
          <p className="text-sm font-bold text-white mb-4">Encryption Active</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-full animate-pulse" />
          </div>
        </div>
      </div>
    </aside>
  );
};
