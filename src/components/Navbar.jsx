import React from 'react';
import { Users, Plus, RefreshCw, Server, HardDrive } from 'lucide-react';

export default function Navbar({ onAddClick, serverStatus, onRefresh, isRefreshing }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                  UserSphere
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  CRUD App
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                React 19 + Tailwind CSS + Axios + JSON-Server
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            {/* Server Status Pill */}
            <div
              className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                serverStatus === 'server'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
              title={
                serverStatus === 'server'
                  ? 'Connected to json-server at http://localhost:5001'
                  : 'json-server offline, operating in localStorage mode'
              }
            >
              {serverStatus === 'server' ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Server className="w-3.5 h-3.5" />
                  <span>JSON-Server: Online</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Local Storage Mode</span>
                </>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-600' : ''}`} />
            </button>

            {/* Add User Button */}
            <button
              onClick={onAddClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
