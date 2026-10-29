import React from 'react';
import { Eye, Edit3, Trash2, Mail, Phone, Calendar } from 'lucide-react';

export default function UserTable({ users, onView, onEdit, onDelete }) {
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

  const getDepartmentBadge = (dept) => {
    switch (dept) {
      case 'Engineering':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Design':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Product':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Marketing':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'QA':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <tr>
            <th scope="col" className="px-6 py-4">User</th>
            <th scope="col" className="px-6 py-4">Department & Role</th>
            <th scope="col" className="px-6 py-4">Contact Info</th>
            <th scope="col" className="px-6 py-4">Status</th>
            <th scope="col" className="px-6 py-4">Joined Date</th>
            <th scope="col" className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-slate-50/80 transition-colors duration-150 group"
            >
              {/* User Avatar + Name */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 bg-slate-100"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`;
                    }}
                  />
                  <div>
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {user.name}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>

              {/* Department & Role */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-slate-800">{user.role}</div>
                <div className="mt-0.5">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-medium rounded-md border ${getDepartmentBadge(
                      user.department
                    )}`}
                  >
                    {user.department || 'General'}
                  </span>
                </div>
              </td>

              {/* Contact */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user.phone || 'N/A'}</span>
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusBadge(
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
              </td>

              {/* Joined Date */}
              <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user.createdAt || 'Recent'}</span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => onView(user)}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit User"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete User"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
