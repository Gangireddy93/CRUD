import React from 'react';
import { X, Mail, Phone, Building, Briefcase, Calendar, ShieldCheck, Edit3 } from 'lucide-react';

export default function UserDetailModal({ isOpen, onClose, user, onEdit }) {
  if (!isOpen || !user) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Inactive':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover banner */}
        <div className="h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile details */}
        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar */}
          <div className="-mt-12 mb-4 flex justify-between items-end">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-md bg-white"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`;
              }}
            />
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                user.status
              )}`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {user.status}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-sm font-medium text-indigo-600 mt-0.5">{user.role}</p>
          </div>

          {/* Info cards */}
          <div className="mt-5 space-y-2.5 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Mail className="w-4 h-4 text-slate-400" />
              <div>
                <span className="block text-slate-400 font-medium">Email Address</span>
                <span className="font-semibold text-slate-800">{user.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Phone className="w-4 h-4 text-slate-400" />
              <div>
                <span className="block text-slate-400 font-medium">Phone Number</span>
                <span className="font-semibold text-slate-800">{user.phone || 'Not specified'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Building className="w-3.5 h-3.5" />
                  <span className="font-medium">Department</span>
                </div>
                <span className="font-semibold text-slate-800">{user.department || 'General'}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-medium">Joined On</span>
                </div>
                <span className="font-semibold text-slate-800">{user.createdAt || 'Recent'}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Unique Record ID</span>
              <span className="font-mono text-[11px] bg-slate-200/70 px-2 py-0.5 rounded text-slate-700">
                #{user.id}
              </span>
            </div>
          </div>

          {/* Footer actions */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(user);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
