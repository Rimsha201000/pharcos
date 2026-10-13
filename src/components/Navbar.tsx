import React, { useState } from 'react';
import { 
  Bell, ShoppingCart, UserCheck, Shield, ChevronDown, 
  Menu, X, Sparkles, ExternalLink, LogOut, CheckCircle2,
  AlertTriangle, Clock, Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AIVoiceSearchBar } from './AIVoiceSearchBar';
import { UserRole } from '../types';

export const Navbar: React.FC<{ onToggleMobileMenu: () => void }> = ({ onToggleMobileMenu }) => {
  const { 
    currentUser, switchRole, logout, currentView, setCurrentView, 
    cart, medicines, cosmetics, settings 
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  // Calculate live notification alerts
  const now = new Date();
  const getDaysUntilExpiry = (dateStr: string) => {
    const diffTime = new Date(dateStr).getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const expiringMeds = medicines.filter(m => {
    const days = getDaysUntilExpiry(m.expiryDate);
    return days <= 60 && !m.isQuarantined;
  });

  const lowStockItems = [
    ...medicines.filter(m => m.quantity <= m.reorderLevel),
    ...cosmetics.filter(c => c.quantity <= c.reorderLevel)
  ];

  const totalAlerts = expiringMeds.length + lowStockItems.length;

  const roles: { role: UserRole; title: string; desc: string }[] = [
    { role: 'SUPER_ADMIN', title: 'Super Admin', desc: 'Full Enterprise Access & System Auditing' },
    { role: 'ADMIN', title: 'Admin', desc: 'Operations & Management Oversight' },
    { role: 'PHARMACIST', title: 'Pharmacist', desc: 'FEFO Medicine Dispensing & Rx Validation' },
    { role: 'INVENTORY_MANAGER', title: 'Inventory Manager', desc: 'Stock Batches, Receiving & Suppliers' },
    { role: 'CASHIER', title: 'POS Cashier', desc: 'Point-of-Sale, Checkout & Receipts' },
    { role: 'STAFF', title: 'Staff', desc: 'Catalog Inquiries & Customer Guidance' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-[1600px] mx-auto flex items-center justify-between h-16 gap-3">
        
        {/* Left: Hamburger (mobile) + Logo & Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform bg-white border border-slate-100 flex items-center justify-center p-0.5">
              <img
                src="/pharmaglow-logo.png"
                alt="PharmaGlow Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xl text-slate-900 tracking-tight">
                  Pharma<span className="text-[#c2784d]">Glow</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-[#831843]/10 text-[#831843] uppercase tracking-wider">
                  AI Pro
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5">
                Pharmacy & Cosmetics System
              </p>
            </div>
          </button>
        </div>

        {/* Center: Bilingual AI Voice Search Bar */}
        <div className="flex-1 max-w-xl mx-2 hidden md:block">
          <AIVoiceSearchBar />
        </div>

        {/* Right: Quick Action, Alerts, Cart, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              title="Alerts & Expiry Radar"
            >
              <Bell className="w-5 h-5 text-slate-700" />
              {totalAlerts > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {totalAlerts}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-fadeIn">
                <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span className="font-semibold text-sm">System Alerts & Radar</span>
                  </div>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                    {totalAlerts} Active
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 p-2">
                  {totalAlerts === 0 ? (
                    <div className="py-6 text-center text-slate-500 text-xs">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1.5" />
                      All inventory stock & expiry dates are in optimal status!
                    </div>
                  ) : (
                    <>
                      {expiringMeds.map(m => (
                        <div key={m.id} className="p-2.5 hover:bg-amber-50/60 rounded-xl flex items-start gap-2.5 transition-colors">
                          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div className="flex-1 text-xs">
                            <div className="font-semibold text-slate-800">{m.name}</div>
                            <div className="text-slate-500">
                              Batch <code className="bg-slate-100 px-1 py-0.2 rounded">{m.batchNumber}</code> expires on <span className="font-semibold text-rose-600">{m.expiryDate}</span>
                            </div>
                            <button
                              onClick={() => {
                                setCurrentView('expiry');
                                setShowNotifMenu(false);
                              }}
                              className="mt-1 text-[11px] text-teal-700 font-semibold hover:underline"
                            >
                              Review in Expiry Radar →
                            </button>
                          </div>
                        </div>
                      ))}

                      {lowStockItems.map(item => (
                        <div key={item.id} className="p-2.5 hover:bg-rose-50/60 rounded-xl flex items-start gap-2.5 transition-colors">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <div className="flex-1 text-xs">
                            <div className="font-semibold text-slate-800">{item.name}</div>
                            <div className="text-slate-500">
                              Low Stock: <span className="font-bold text-rose-600">{item.quantity}</span> left (Minimum: {item.reorderLevel})
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setCurrentView('expiry');
                      setShowNotifMenu(false);
                    }}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                  >
                    View All Radar Reports
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* POS Cart Badge */}
          <button
            onClick={() => setCurrentView('pos')}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            title="Open POS Register"
          >
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {cart.length}
              </span>
            )}
          </button>

          {/* User Profile & Secure Session Menu */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-2xl bg-gradient-to-r from-teal-50 to-slate-100 hover:from-teal-100 hover:to-slate-200 border border-teal-200/80 transition-all text-xs font-medium text-slate-800 shadow-2xs"
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover border border-teal-600 shrink-0"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
                  {currentUser?.role?.charAt(0) || 'U'}
                </div>
              )}
              <div className="text-left hidden sm:block">
                <span className="block font-semibold text-slate-800 leading-tight">
                  {currentUser?.name ? currentUser.name.split(' ')[0] : 'User'}
                </span>
                <span className="block text-[9px] text-teal-700 font-bold uppercase tracking-wider">
                  {currentUser?.role.replace('_', ' ')}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Profile Dropdown */}
            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-fadeIn">
                <div className="p-3 bg-gradient-to-r from-teal-800 via-slate-900 to-[#701a40] text-white">
                  <div className="text-[10px] text-teal-200 font-bold uppercase tracking-wider">Authenticated Session</div>
                  <div className="font-bold text-sm truncate mt-0.5">{currentUser?.name}</div>
                  <div className="text-[11px] text-slate-300 truncate">{currentUser?.email}</div>
                  <div className="mt-2 inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-white/20 text-white border border-white/25 uppercase tracking-wider">
                    Role: {currentUser?.role.replace('_', ' ')}
                  </div>
                </div>

                <div className="p-2 space-y-1 text-xs">
                  {currentUser?.role === 'SUPER_ADMIN' && (
                    <button
                      onClick={() => {
                        setCurrentView('users');
                        setShowRoleMenu(false);
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4 text-[#831843]" />
                      <span>User Management & RBAC</span>
                    </button>
                  )}

                  {currentUser?.role === 'SUPER_ADMIN' && (
                    <button
                      onClick={() => {
                        setCurrentView('audit');
                        setShowRoleMenu(false);
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Security Audit Logs</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setCurrentView('settings');
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-teal-700" />
                    <span>System Preferences</span>
                  </button>
                </div>

                <div className="p-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">Session ID Active</span>
                  <button
                    onClick={() => {
                      logout();
                      setShowRoleMenu(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Mobile search bar if on small screen */}
      <div className="md:hidden px-4 pb-3">
        <AIVoiceSearchBar compact />
      </div>
    </header>
  );
};
