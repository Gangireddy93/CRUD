import React from 'react';
import { UserX, Plus } from 'lucide-react';

export default function EmptyState({ isSearching, onReset, onAdd }) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center my-6">
      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <UserX className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-slate-800">
        {isSearching ? 'No matching users found' : 'No users available'}
      </h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
        {isSearching
          ? 'Try adjusting your search criteria or resetting filters to find what you are looking for.'
          : 'Get started by creating your first employee profile in the database.'}
      </p>
      {isSearching ? (
        <button
          onClick={onReset}
          className="px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
        >
          Reset Filters
        </button>
      ) : (
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Your First User</span>
        </button>
      )}
    </div>
  );
}
