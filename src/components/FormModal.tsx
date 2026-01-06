import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export const FormModal: React.FC<Props> = ({ onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="w-full max-w-lg animate-in zoom-in-95 duration-300">
      <div className="flex justify-end mb-4">
        <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 rounded-full p-2">
          <Plus className="rotate-45" size={24} />
        </button>
      </div>
      {children}
    </div>
  </div>
);
