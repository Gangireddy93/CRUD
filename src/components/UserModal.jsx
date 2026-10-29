import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Briefcase, Building, ShieldCheck, Image } from 'lucide-react';

export default function UserModal({ isOpen, onClose, onSave, editingUser = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: 'Engineering',
    status: 'Active',
    avatar: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name || '',
        email: editingUser.email || '',
        phone: editingUser.phone || '',
        role: editingUser.role || '',
        department: editingUser.department || 'Engineering',
        status: editingUser.status || 'Active',
        avatar: editingUser.avatar || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: 'Engineering',
        status: 'Active',
        avatar: '',
      });
    }
    setErrors({});
  }, [editingUser, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Job title/role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {editingUser ? 'Edit User Profile' : 'Add New User'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {editingUser
                ? 'Update the employee details and save changes'
                : 'Fill in the information to add a team member'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                  errors.name
                    ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                } focus:outline-hidden focus:ring-2`}
              />
            </div>
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                    errors.email
                      ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } focus:outline-hidden focus:ring-2`}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden focus:ring-2"
                />
              </div>
            </div>
          </div>

          {/* Role & Department Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Role / Title <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. React Developer"
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${
                    errors.role
                      ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
                      : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                  } focus:outline-hidden focus:ring-2`}
                />
              </div>
              {errors.role && <p className="text-xs text-rose-500 mt-1">{errors.role}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden focus:ring-2"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="QA">Quality Assurance</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>
            </div>
          </div>

          {/* Status Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Account Status
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Active', 'Pending', 'Inactive'].map((status) => (
                <label
                  key={status}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border cursor-pointer text-xs font-medium transition-all ${
                    formData.status === status
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Optional Avatar URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Custom Avatar URL <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Image className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden focus:ring-2"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting
                ? 'Saving...'
                : editingUser
                ? 'Update User'
                : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
