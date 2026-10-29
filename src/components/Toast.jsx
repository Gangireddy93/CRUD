import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-xl border border-slate-200 animate-in slide-in-from-bottom-5 duration-200">
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
      )}
      <p className="text-xs font-semibold text-slate-800">{toast.message}</p>
      <button
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer ml-2"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
