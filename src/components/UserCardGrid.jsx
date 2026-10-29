import React from 'react';
import { Eye, Edit3, Trash2, Mail, Phone, Calendar } from 'lucide-react';

export default function UserCardGrid({ users, onView, onEdit, onDelete }) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 bg-slate-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`;
                  }}
                />
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-xs text-slate-500">{user.role}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusBadge(
                  user.status
                )}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    user.status === 'Active'
                      ? 'bg-emerald-500'
                      : user.status === 'Pending'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                />
                {user.status}
              </span>
            </div>

            <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.phone || 'No phone provided'}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                  {user.department || 'General'}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {user.createdAt || 'Recent'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 mt-1">
            <button
              onClick={() => onView(user)}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
            <button
              onClick={() => onEdit(user)}
              className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(user)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
