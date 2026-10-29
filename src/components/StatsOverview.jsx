import React from 'react';
import { Users, UserCheck, Clock, UserX } from 'lucide-react';

export default function StatsOverview({ users = [] }) {
  const safeUsers = Array.isArray(users) ? users : [];
  const total = safeUsers.length;
  const active = safeUsers.filter((u) => u && u.status === 'Active').length;
  const pending = safeUsers.filter((u) => u && u.status === 'Pending').length;
  const inactive = safeUsers.filter((u) => u && u.status === 'Inactive').length;

  const stats = [
    {
      label: 'Total Users',
      value: total,
      icon: Users,
      bgColor: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-100',
    },
    {
      label: 'Active Accounts',
      value: active,
      icon: UserCheck,
      bgColor: 'bg-emerald-50 text-emerald-600',
      borderColor: 'border-emerald-100',
    },
    {
      label: 'Pending Approval',
      value: pending,
      icon: Clock,
      bgColor: 'bg-amber-50 text-amber-600',
      borderColor: 'border-amber-100',
    },
    {
      label: 'Inactive Users',
      value: inactive,
      icon: UserX,
      bgColor: 'bg-rose-50 text-rose-600',
      borderColor: 'border-rose-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`bg-white rounded-xl p-5 border ${stat.borderColor} shadow-xs hover:shadow-md transition-shadow duration-200 flex items-center justify-between`}
          >
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
