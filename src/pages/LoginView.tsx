import React, { useState, useEffect } from 'react';
import { 
  User, Lock, Eye, EyeOff, Shield, Sparkles, CheckCircle2, 
  ArrowRight, Key, AlertTriangle, HelpCircle, Check, X, ShieldAlert,
  Fingerprint, Laptop
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { authService } from '../services/authService';
import { PharmaCosmeticsOrbitBackground } from '../components/PharmaCosmeticsOrbitBackground';
import confetti from 'canvas-confetti';

export const LoginView: React.FC = () => {
  const { setCurrentUser, setCurrentView, addAuditLog } = useApp();
  
  // Normal staff login form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rateLimitLockout, setRateLimitLockout] = useState<number>(0);

  // Hidden Owner / Super Admin modal state (Activated by subtle "C" near © 2026)
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [ownerMasterPassword, setOwnerMasterPassword] = useState('');
  const [ownerTwoFactorPin, setOwnerTwoFactorPin] = useState('');
  const [ownerShowPassword, setOwnerShowPassword] = useState(false);
  const [ownerLoading, setOwnerLoading] = useState(false);
  const [ownerErrorMessage, setOwnerErrorMessage] = useState('');

  // Quick staff helper chips for authorized demo verification
  const [showStaffGuide, setShowStaffGuide] = useState(false);

  // Check rate limit timer on mount and tick down + Secret Alt+C shortcut
  useEffect(() => {
    const timer = setInterval(() => {
      const status = authService.checkRateLimit();
      if (status.isLocked) {
        setRateLimitLockout(status.remainingSeconds);
      } else {
        setRateLimitLockout(0);
      }
    }, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key combination: Alt + C or Ctrl + Shift + C
      if ((e.altKey && e.key.toLowerCase() === 'c') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c')) {
        e.preventDefault();
        setShowOwnerModal(true);
        setOwnerErrorMessage('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Normal Staff Authentication flow
  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setErrorMessage('Please provide both username/email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await authService.authenticateStaff(identifier, password);
      
      if (!result.success) {
        setErrorMessage(result.error || 'Authentication rejected by security policy.');
        if (result.lockoutRemainingSeconds) {
          setRateLimitLockout(result.lockoutRemainingSeconds);
        }
        setIsLoading(false);
        return;
      }

      // Successful staff login
      if (result.user) {
        setCurrentUser(result.user);
        addAuditLog('STAFF_LOGIN', 'Auth', `Staff logged in: ${result.user.name} (${result.user.role})`);
        
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#0d9488', '#0284c7', '#ffffff']
          });
        } catch {}

        setCurrentView('dashboard');
      }
    } catch (err: any) {
      setErrorMessage('An unexpected security verification failure occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Hidden Owner / Super Admin Authentication flow (Triggered via discreet "C")
  const handleOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerMasterPassword) {
      setOwnerErrorMessage('Master passphrase is required.');
      return;
    }

    setOwnerLoading(true);
    setOwnerErrorMessage('');

    try {
      const result = await authService.authenticateOwner(ownerMasterPassword, ownerTwoFactorPin);

      if (!result.success) {
        setOwnerErrorMessage(result.error || 'Owner verification failed. Identity could not be validated.');
        if (result.lockoutRemainingSeconds) {
          setRateLimitLockout(result.lockoutRemainingSeconds);
        }
        setOwnerLoading(false);
        return;
      }

      // Successful owner authentication
      if (result.user) {
        setCurrentUser(result.user);
        addAuditLog('OWNER_AUTHENTICATED', 'Security Gateway', `Owner / Super Admin verified via discreet portal: ${result.user.name}`);
        
        try {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#831843', '#be185d', '#0d9488', '#fbbf24', '#ffffff']
          });
        } catch {}

        setShowOwnerModal(false);
        setCurrentView('dashboard');
      }
    } catch (err) {
      setOwnerErrorMessage('Cryptographic owner authorization error.');
    } finally {
      setOwnerLoading(false);
    }
  };

  const populateQuickStaff = (email: string) => {
    setIdentifier(email);
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      
      {/* 3D Orbiting Medicines & Cosmetics Background */}
      <PharmaCosmeticsOrbitBackground variant="plum-velvet" />

      {/* Main Software Authentication Container */}
      <div className="relative z-10 w-full max-w-[880px] bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-[32px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6),0_0_1px_1px_rgba(255,255,255,0.4)] overflow-hidden flex flex-col md:flex-row min-h-[550px] animate-fadeIn border border-white/50">
        
        {/* =========================================================================
            LEFT PANEL: Software Branding & Geometric Plum Ribbon Aesthetic
            ========================================================================= */}
        <div className="relative md:w-[42%] bg-gradient-to-br from-[#831843] via-[#701a40] to-[#500724] p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none text-white">
          
          {/* Layered Origami Folds */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute -top-12 -left-12 w-64 h-80 bg-[#701a40] rotate-[35deg] shadow-2xl opacity-90"
              style={{ clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0% 100%)' }}
            />
            <div 
              className="absolute top-10 -left-16 w-80 h-96 bg-[#9d174d] rotate-[25deg] shadow-[0_15px_35px_rgba(0,0,0,0.35)] opacity-85"
              style={{ clipPath: 'polygon(0 0, 100% 15%, 85% 100%, 0% 100%)' }}
            />
            <div 
              className="absolute top-36 -left-10 w-72 h-80 bg-[#be185d] rotate-[15deg] opacity-75"
              style={{ clipPath: 'polygon(0 0, 95% 0, 75% 100%, 0% 85%)' }}
            />
          </div>

          {/* Software Header Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center p-1.5 shadow-inner">
                <img src="/pharmaglow-logo.png" alt="PharmaGlow Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-heading font-black text-xl text-white tracking-wide">
                  Pharma<span className="text-pink-300">Glow</span>
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-pink-200/90 font-bold">
                  Management System • ERP Pro
                </span>
              </div>
            </div>
          </div>

          {/* Software System Capabilities Brief */}
          <div className="relative z-10 my-8 space-y-3">
            <div className="px-3.5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-pink-100">
              <div className="font-bold text-white flex items-center gap-2 mb-1">
                <Laptop className="w-4 h-4 text-pink-300" />
                <span>Enterprise Pharmacy & Cosmetics</span>
              </div>
              <p className="text-[11px] text-pink-200/80 leading-relaxed">
                FEFO-certified medicine dispensing, cosmetics supply, orders fulfillment, and team duty schedules.
              </p>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-black/20 border border-white/10 text-[11px] text-pink-200/90 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-pink-300 shrink-0" />
              <span>Role-Based Access Control & Tamper Audit Logs</span>
            </div>
          </div>

          {/* Left Footer System Security Note */}
          <div className="relative z-10 text-[10px] text-pink-200/75 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Security Engine v2.4 Active</span>
            </div>
            <span>Encrypted AES-256</span>
          </div>
        </div>

        {/* =========================================================================
            RIGHT PANEL: Professional Login Form
            ========================================================================= */}
        <div className="relative md:w-[58%] bg-white p-7 sm:p-10 flex flex-col justify-between">
          
          <div>
            {/* Header Title with Avatar */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative group mb-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#701a40] via-[#9d174d] to-[#be185d] p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#831843] to-[#500724] flex items-center justify-center text-white">
                    <User className="w-7 h-7" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
              </div>

              <h2 className="font-heading font-extrabold text-2xl text-[#701a40] tracking-wider">
                STAFF LOGIN
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Enter your authorized credentials to access your management dashboard
              </p>
            </div>

            {/* Lockout Banner if rate limit active */}
            {rateLimitLockout > 0 && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-shake">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <span className="font-bold">Security Lockout Active:</span> Too many failed attempts. Cooldown expires in <span className="font-bold text-rose-900">{rateLimitLockout}s</span>.
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center animate-shake">
                {errorMessage}
              </div>
            )}

            {/* Staff Login Form */}
            <form onSubmit={handleStaffLogin} className="space-y-4">
              
              {/* Username / Email Field */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Email or Staff Username
                </label>
                <div className="flex items-center gap-2.5 pb-2 border-b-2 border-slate-200 focus-within:border-[#9d174d] transition-colors">
                  <User className="w-4 h-4 text-slate-400 focus-within:text-[#9d174d]" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. pharmacist@pharmaglow.com"
                    disabled={rateLimitLockout > 0 || isLoading}
                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Demo Staff Credentials: Password is "admin123" for registered accounts (pharmacist, cashier, inventory, admin).')}
                    className="text-[11px] text-[#9d174d] hover:underline font-semibold"
                  >
                    Need Credentials?
                  </button>
                </div>
                <div className="flex items-center gap-2.5 pb-2 border-b-2 border-slate-200 focus-within:border-[#9d174d] transition-colors">
                  <Lock className="w-4 h-4 text-slate-400 focus-within:text-[#9d174d]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={rateLimitLockout > 0 || isLoading}
                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-[#9d174d] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={rateLimitLockout > 0 || isLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#831843] to-[#be185d] hover:from-[#701a40] hover:to-[#9d174d] text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Authenticating...</span>
                    </span>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Staff Helper (Toggleable for quick testing without role dropdowns) */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowStaffGuide(!showStaffGuide)}
                className="text-[11px] text-slate-500 hover:text-slate-700 flex items-center gap-1 font-semibold"
              >
                <span>{showStaffGuide ? '▼ Hide Quick Fill Accounts' : '▶ Quick Test Staff Credentials'}</span>
              </button>

              {showStaffGuide && (
                <div className="mt-2 grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200 text-[10px]">
                  <button
                    type="button"
                    onClick={() => populateQuickStaff('pharmacist@pharmaglow.com')}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-pink-300 text-left hover:bg-pink-50/50"
                  >
                    <span className="font-bold text-slate-800 block">Pharmacist</span>
                    <span className="text-slate-400">pharmacist@pharmaglow.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => populateQuickStaff('cashier@pharmaglow.com')}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-pink-300 text-left hover:bg-pink-50/50"
                  >
                    <span className="font-bold text-slate-800 block">Cashier</span>
                    <span className="text-slate-400">cashier@pharmaglow.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => populateQuickStaff('inventory@pharmaglow.com')}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-pink-300 text-left hover:bg-pink-50/50"
                  >
                    <span className="font-bold text-slate-800 block">Inventory Staff</span>
                    <span className="text-slate-400">inventory@pharmaglow.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => populateQuickStaff('admin@pharmaglow.com')}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-pink-300 text-left hover:bg-pink-50/50"
                  >
                    <span className="font-bold text-slate-800 block">Admin</span>
                    <span className="text-slate-400">admin@pharmaglow.com</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              FOOTER: Contains the exact Discreet Owner Entry Point (Subtle "c" near © 2026)
              ========================================================================= */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-400 select-none">
            <p className="flex items-center justify-center gap-1 text-[11px] flex-wrap">
              {/* Clickable © 2026 as well to ensure foolproof access */}
              <span 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowOwnerModal(true);
                  setOwnerErrorMessage('');
                }}
                className="cursor-pointer hover:text-slate-600 transition-colors py-1"
                title="Owner Gateway Trigger"
              >
                © 2026
              </span>
              
              {/* HIDDEN OWNER ENTRY POINT: Discreet letter "c" with comfortable clickable hit area & clear pointer */}
              <button
                type="button"
                id="hidden-owner-gateway-c"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowOwnerModal(true);
                  setOwnerErrorMessage('');
                }}
                title="Owner Security Gateway (Click or press Alt+C)"
                aria-label="Owner Security Gateway"
                className="relative z-20 inline-flex items-center justify-center px-1.5 py-0.5 rounded cursor-pointer text-[11px] font-mono font-bold text-slate-400 hover:text-[#9d174d] hover:bg-pink-100/70 active:scale-95 transition-all opacity-40 hover:opacity-100 border border-transparent hover:border-pink-200 focus:outline-hidden"
              >
                c
              </button>
              
              <span>PharmaGlow Care & Cosmetics. All rights reserved.</span>
            </p>
          </div>

        </div>
      </div>

      {/* =========================================================================
          OWNER / SUPER ADMIN AUTHENTICATION DIALOG (Discreet Master Gateway)
          ========================================================================= */}
      {showOwnerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#180e0a] text-[#f5ebe6] rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-[#3d2419] max-w-md w-full p-6 sm:p-8 animate-scaleUp relative overflow-hidden">
            
            {/* Top Security Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#be185d] via-[#0d9488] to-[#c2784d]" />

            <div className="flex items-center justify-between pb-4 border-b border-[#301c15] mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#c2784d]/20 border border-[#c2784d]/40 flex items-center justify-center text-[#e89a6c]">
                  <Fingerprint className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white">
                    Master Security Gateway
                  </h3>
                  <span className="text-[10px] text-[#bdaaa0]">Discreet Owner Verification</span>
                </div>
              </div>

              <button
                onClick={() => setShowOwnerModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {ownerErrorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs text-center font-medium animate-shake">
                {ownerErrorMessage}
              </div>
            )}

            <form onSubmit={handleOwnerLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#d6c7bc] mb-1">
                  Owner Passphrase / Master Key
                </label>
                <div className="relative">
                  <input
                    type={ownerShowPassword ? 'text' : 'password'}
                    required
                    value={ownerMasterPassword}
                    onChange={(e) => setOwnerMasterPassword(e.target.value)}
                    placeholder="Enter owner passphrase"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#281711] border border-[#4a2a1f] text-white text-xs placeholder-[#7c5e52] focus:outline-hidden focus:border-[#c2784d]"
                  />
                  <button
                    type="button"
                    onClick={() => setOwnerShowPassword(!ownerShowPassword)}
                    className="absolute right-3 top-2.5 text-[#8f7468] hover:text-white"
                  >
                    {ownerShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[10px] text-[#8f7468] mt-1 block">
                  Demo Owner Passphrase: <code className="text-[#e09e75]">admin123</code>
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#d6c7bc] mb-1">
                  Optional Two-Factor Token (2FA PIN)
                </label>
                <input
                  type="text"
                  value={ownerTwoFactorPin}
                  onChange={(e) => setOwnerTwoFactorPin(e.target.value)}
                  placeholder="2026 or leave blank for default"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#281711] border border-[#4a2a1f] text-white text-xs placeholder-[#7c5e52] focus:outline-hidden focus:border-[#c2784d]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-[#301c15]">
                <button
                  type="button"
                  onClick={() => setShowOwnerModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#bdaaa0] hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={ownerLoading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c2784d] to-[#be185d] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  {ownerLoading ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <Shield className="w-3.5 h-3.5" />
                      <span>Authenticate Owner</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
