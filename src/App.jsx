import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  ArrowUpDown,
  Plus,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { userService } from './api/api';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import UserTable from './components/UserTable';
import UserCardGrid from './components/UserCardGrid';
import UserModal from './components/UserModal';
import UserDetailModal from './components/UserDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import EmptyState from './components/EmptyState';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [serverStatus, setServerStatus] = useState('local');

  // Search & Filter & Sort
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch users from API
  const loadUsers = async (quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const result = await userService.getAllUsers();
      setUsers(Array.isArray(result?.data) ? result.data : []);
      setServerStatus(result?.source || 'local');
    } catch (err) {
      console.error('Failed to load users:', err);
      showToast('Error loading user records', 'error');
      setUsers([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadUsers(true);
  };

  // CREATE / UPDATE
  const handleSaveUser = async (formData) => {
    try {
      if (editingUser) {
        // UPDATE Operation
        const updated = await userService.updateUser(editingUser.id, formData);
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...updated } : u))
        );
        showToast(`Updated "${formData.name}" successfully!`);
      } else {
        // CREATE Operation
        const created = await userService.createUser(formData);
        setUsers((prev) => [created, ...prev]);
        showToast(`Created new user "${formData.name}" successfully!`);
      }
    } catch (err) {
      console.error('Save failed:', err);
      showToast('Failed to save user record', 'error');
    }
  };

  // DELETE
  const handleDeleteUser = async (id) => {
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      showToast('User deleted successfully!');
    } catch (err) {
      console.error('Delete failed:', err);
      showToast('Failed to delete user', 'error');
    }
  };

  // Filtered & Sorted Users
  const filteredUsers = useMemo(() => {
    const safeList = Array.isArray(users) ? users : [];
    return safeList
      .filter((user) => {
        if (!user || typeof user !== 'object') return false;
        const name = (user.name || '').toLowerCase();
        const email = (user.email || '').toLowerCase();
        const role = (user.role || '').toLowerCase();
        const query = (searchQuery || '').toLowerCase();

        const matchesSearch =
          name.includes(query) || email.includes(query) || role.includes(query);

        const matchesStatus =
          statusFilter === 'All' || user.status === statusFilter;

        const matchesDepartment =
          departmentFilter === 'All' || user.department === departmentFilter;

        return matchesSearch && matchesStatus && matchesDepartment;
      })
      .sort((a, b) => {
        let valA = a[sortBy] || '';
        let valB = b[sortBy] || '';

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [users, searchQuery, statusFilter, departmentFilter, sortBy, sortOrder]);

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setDepartmentFilter('All');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        onAddClick={() => {
          setEditingUser(null);
          setIsModalOpen(true);
        }}
        serverStatus={serverStatus}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome / Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Stack Frontend Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              User Directory & Management
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Create, read, update, filter, and delete team member profiles in real-time.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingUser(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-100 transition-all cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </button>
        </div>

        {/* Stats Overview */}
        <StatsOverview users={users} />

        {/* Controls Toolbar: Search, Filters, View Modes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all"
              />
            </div>

            {/* Filter Dropdowns & View Mode Toggles */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Department Filter */}
              <div className="relative">
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="QA">Quality Assurance</option>
                </select>
              </div>

              {/* Sort Order */}
              <button
                onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
                className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="capitalize">{sortOrder}</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-0.5">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section: Loading, Empty, or Data list */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
            <p className="text-xs font-medium text-slate-600">Loading user database...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <EmptyState
            isSearching={
              searchQuery !== '' || statusFilter !== 'All' || departmentFilter !== 'All'
            }
            onReset={resetFilters}
            onAdd={() => {
              setEditingUser(null);
              setIsModalOpen(true);
            }}
          />
        ) : viewMode === 'table' ? (
          <UserTable
            users={filteredUsers}
            onView={(user) => setViewingUser(user)}
            onEdit={(user) => {
              setEditingUser(user);
              setIsModalOpen(true);
            }}
            onDelete={(user) => setDeletingUser(user)}
          />
        ) : (
          <UserCardGrid
            users={filteredUsers}
            onView={(user) => setViewingUser(user)}
            onEdit={(user) => {
              setEditingUser(user);
              setIsModalOpen(true);
            }}
            onDelete={(user) => setDeletingUser(user)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400">
          React & Tailwind CSS CRUD Application • Built with React 19, Axios, JSON-Server & Lucide Icons
        </div>
      </footer>

      {/* Modals & Feedback */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
        editingUser={editingUser}
      />

      <UserDetailModal
        isOpen={!!viewingUser}
        onClose={() => setViewingUser(null)}
        user={viewingUser}
        onEdit={(user) => {
          setViewingUser(null);
          setEditingUser(user);
          setIsModalOpen(true);
        }}
      />

      <DeleteConfirmModal
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDeleteUser}
        user={deletingUser}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
