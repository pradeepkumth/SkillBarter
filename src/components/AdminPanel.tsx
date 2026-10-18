import React, { useState, useMemo, useEffect } from 'react';
import { SessionRecord, UserProfile, SkillListing, UserLoginLog } from '../types';
import { SUPABASE_PROJECT_ID } from '../lib/supabase';
import { fetchAllLoginLogs, fetchAllRegisteredUsers } from '../services/userService';
import { 
  ShieldCheck, 
  Lock, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Database, 
  Users, 
  FileText, 
  LogOut, 
  Eye, 
  EyeOff,
  ArrowUpDown,
  X,
  ExternalLink,
  Trash2,
  Activity,
  Laptop
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: SessionRecord[];
  allSkills: SkillListing[];
  registeredProfiles: Record<string, UserProfile>;
  onForceReleaseEscrow: (sessionId: string) => void;
  onForceRefundEscrow: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onRefreshFromSupabase: () => Promise<void>;
}

// Admin Credentials requested by user (Hidden from UI)
export const ADMIN_CREDENTIALS = {
  id: 'SkillBarter',
  password: 'SkillBarter@124',
  name: 'SkillBarter Master Admin',
  role: 'Super Admin',
};

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  sessions,
  allSkills,
  registeredProfiles,
  onForceReleaseEscrow,
  onForceRefundEscrow,
  onDeleteSession,
  onRefreshFromSupabase,
}) => {
  if (!isOpen) return null;

  // Admin authentication state with session persistence
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('skillbarter_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Active admin tab: 'sessions' | 'users' | 'logins' | 'supabase'
  const [activeTab, setActiveTab] = useState<'sessions' | 'users' | 'logins' | 'supabase'>('sessions');

  // Filtering & search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'booked_held' | 'completed' | 'refunded'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Login logs state from database
  const [loginLogs, setLoginLogs] = useState<UserLoginLog[]>([]);
  const [loginSearch, setLoginSearch] = useState('');
  const [rosterUsers, setRosterUsers] = useState<Record<string, UserProfile>>(registeredProfiles);

  // Fetch login logs and user roster when admin is authenticated
  const loadDatabaseData = async () => {
    try {
      const logs = await fetchAllLoginLogs();
      setLoginLogs(logs);

      const allUsers = await fetchAllRegisteredUsers();
      setRosterUsers({ ...registeredProfiles, ...allUsers });
    } catch (e) {
      console.warn('Error loading admin database data:', e);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      loadDatabaseData();
    }
  }, [isAdminAuthenticated]);

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const cleanId = adminEmailInput.trim().toLowerCase();
    const cleanPass = adminPasswordInput.trim();

    // Valid admin identifiers: 'skillbarter' or 'skillbarter@skillbarter.edu' or 'admin@skillbarter.edu'
    const isIdValid = 
      cleanId === 'skillbarter' || 
      cleanId === 'skillbarter@skillbarter.edu' || 
      cleanId === 'admin@skillbarter.edu';

    const isPasswordValid = cleanPass === ADMIN_CREDENTIALS.password;

    if (isIdValid && isPasswordValid) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('skillbarter_admin_authenticated', 'true');
      } catch (err) {
        console.warn('Could not set admin session', err);
      }
      setAuthError('');
      setFailedAttempts(0);
      loadDatabaseData();
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        setAuthError('Security Alert: Multiple incorrect attempts detected. Please verify credentials.');
      } else {
        setAuthError('Invalid Admin ID or Password! Please enter valid admin credentials.');
      }
    }
  };

  // Handle Admin Logout
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('skillbarter_admin_authenticated');
    } catch (err) {
      console.warn('Could not remove admin session', err);
    }
    setAdminEmailInput('');
    setAdminPasswordInput('');
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = sessions.length;
    const held = sessions.filter((s) => s.status === 'booked_held').length;
    const completed = sessions.filter((s) => s.status === 'completed').length;
    const refunded = sessions.filter((s) => s.status === 'refunded').length;
    const totalCreditsHeld = sessions
      .filter((s) => s.status === 'booked_held')
      .reduce((acc, curr) => acc + (curr.heldCredits || 2), 0);
    const totalCreditsMinted = completed * 5.0;

    return {
      total,
      held,
      completed,
      refunded,
      totalCreditsHeld,
      totalCreditsMinted,
    };
  }, [sessions]);

  // Filtered Sessions
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchesSearch =
        s.skillTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.location && s.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [sessions, searchQuery, statusFilter]);

  // Filtered Login Logs
  const filteredLoginLogs = useMemo(() => {
    return loginLogs.filter((log) => {
      return (
        log.userName.toLowerCase().includes(loginSearch.toLowerCase()) ||
        log.userEmail.toLowerCase().includes(loginSearch.toLowerCase()) ||
        log.device.toLowerCase().includes(loginSearch.toLowerCase()) ||
        log.id.toLowerCase().includes(loginSearch.toLowerCase())
      );
    });
  }, [loginLogs, loginSearch]);

  // Export Sessions to CSV
  const handleExportCSV = () => {
    const headers = ['Session ID', 'Skill Title', 'Partner Name', 'Role', 'Status', 'Slot', 'Location', 'Held Credits', 'Quiz Score', 'Date'];
    const rows = sessions.map((s) => [
      s.id,
      `"${s.skillTitle.replace(/"/g, '""')}"`,
      `"${s.partnerName}"`,
      s.partnerRole,
      s.status,
      `"${s.slot}"`,
      `"${s.location || ''}"`,
      s.heldCredits,
      s.quizScore !== undefined ? s.quizScore : 'N/A',
      s.date,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skillbarter_sessions_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export Logins to CSV
  const handleExportLoginsCSV = () => {
    const headers = ['Log ID', 'User Name', 'User Email', 'Login Timestamp', 'Device / OS', 'Status'];
    const rows = loginLogs.map((l) => [
      l.id,
      `"${l.userName.replace(/"/g, '""')}"`,
      `"${l.userEmail}"`,
      `"${new Date(l.loginTime).toLocaleString()}"`,
      `"${l.device}"`,
      l.status,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skillbarter_user_logins_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshFromSupabase();
    await loadDatabaseData();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[var(--ink)]/80 backdrop-blur-xs">
      <div className="brutal-card w-full max-w-6xl bg-[var(--paper)] max-h-[94vh] flex flex-col relative overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b-2 border-[var(--ink)] bg-[var(--paper-2)] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--forest)] text-[var(--paper)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0px_var(--ink)] font-mono-val font-black text-sm">
              🛡️ AD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-heading text-lg sm:text-2xl font-bold text-[var(--ink)]">
                  SkillBarter Master Admin Desk
                </h3>
                <span className="text-[10px] font-mono-val font-bold px-2 py-0.5 rounded bg-[var(--mustard)] text-[var(--ink)] border border-[var(--ink)]">
                  Authorized Access Only
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] font-mono-val">
                Oversight of user logins, campus session bookings, escrow deposits, and database synchronization.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={handleAdminLogout}
                className="brutal-btn px-2.5 py-1.5 bg-[var(--paper)] text-[var(--rose)] text-xs font-mono-val font-bold rounded-lg flex items-center gap-1 cursor-pointer hover:bg-[var(--line)]"
                title="Log out of Admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 brutal-btn rounded-lg bg-[var(--paper)] flex items-center justify-center text-[var(--ink)] cursor-pointer"
              aria-label="Close admin panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* LOGIN GATE (SECURE - NO PASSWORDS SHOWN ON SCREEN)           */}
        {/* ============================================================ */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex items-center justify-center">
            <div className="brutal-card w-full max-w-md p-6 sm:p-8 bg-[var(--card-bg)] space-y-5">
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[var(--forest)] text-[var(--paper)] border-2 border-[var(--ink)] brutal-shadow flex items-center justify-center mx-auto">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="font-serif-heading text-2xl font-bold text-[var(--ink)]">
                  Master Admin Login
                </h4>
                <p className="text-xs text-[var(--muted)] font-mono-val">
                  Protected administrative console. Authorized administrators only.
                </p>
              </div>

              {/* Security Badge */}
              <div className="p-3 rounded-xl bg-[var(--paper-2)] border border-[var(--ink)] flex items-center gap-2.5 text-xs font-mono-val text-[var(--ink)]">
                <ShieldCheck className="w-4 h-4 text-[var(--forest)] flex-shrink-0" />
                <div className="leading-tight">
                  <span className="font-bold text-[var(--forest)] block">End-to-End Session Security</span>
                  <span className="text-[10px] text-[var(--muted)]">All access attempts are monitored and recorded in the audit trail.</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleAdminLogin} className="space-y-4">
                {authError && (
                  <div className="p-3 bg-[var(--rose)]/15 border-2 border-[var(--rose)] text-[var(--rose)] text-xs rounded-xl font-mono-val font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                    Admin ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={adminEmailInput}
                    onChange={(e) => setAdminEmailInput(e.target.value)}
                    placeholder="Enter Admin ID"
                    className="w-full p-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--paper)] text-xs text-[var(--ink)] font-mono-val focus:outline-none"
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showAdminPassword ? 'text' : 'password'}
                      required
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      placeholder="Enter password"
                      className="w-full p-2.5 pr-10 rounded-lg border-2 border-[var(--ink)] bg-[var(--paper)] text-xs text-[var(--ink)] font-mono-val focus:outline-none"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
                      title={showAdminPassword ? 'Hide password' : 'Show password'}
                    >
                      {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="brutal-btn w-full py-3 bg-[var(--forest)] text-[var(--paper)] font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--leaf)] mt-3"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credentials &amp; Unlock Panel</span>
                </button>
              </form>

            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* AUTHENTICATED ADMIN DESK                                     */
          /* ============================================================ */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              <div className="p-4 rounded-xl border-2 border-[var(--ink)] bg-[var(--card-bg)] brutal-shadow-sm">
                <span className="text-[10px] font-mono-val font-bold text-[var(--muted)] uppercase block">
                  Total Bookings
                </span>
                <div className="mt-1 text-2xl font-mono-val font-black text-[var(--ink)]">
                  {stats.total}
                </div>
                <span className="text-[10px] font-mono-val text-[var(--forest)]">
                  Campus Peer Sessions
                </span>
              </div>

              <div className="p-4 rounded-xl border-2 border-[var(--ink)] bg-[var(--card-bg)] brutal-shadow-sm">
                <span className="text-[10px] font-mono-val font-bold text-[var(--rose)] uppercase block">
                  Active Escrow Hold
                </span>
                <div className="mt-1 text-2xl font-mono-val font-black text-[var(--rose)]">
                  {stats.totalCreditsHeld.toFixed(1)} Credits
                </div>
                <span className="text-[10px] font-mono-val text-[var(--muted)]">
                  {stats.held} sessions held in escrow
                </span>
              </div>

              <div className="p-4 rounded-xl border-2 border-[var(--ink)] bg-[var(--card-bg)] brutal-shadow-sm">
                <span className="text-[10px] font-mono-val font-bold text-[var(--forest)] uppercase block flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[var(--forest)]" />
                  User Logins in DB
                </span>
                <div className="mt-1 text-2xl font-mono-val font-black text-[var(--forest)]">
                  {loginLogs.length}
                </div>
                <span className="text-[10px] font-mono-val text-[var(--forest)]">
                  Recorded student sessions
                </span>
              </div>

              <div className="p-4 rounded-xl border-2 border-[var(--ink)] bg-[var(--card-bg)] brutal-shadow-sm">
                <span className="text-[10px] font-mono-val font-bold text-[var(--mustard)] uppercase block flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-[var(--forest)]" />
                  Supabase DB
                </span>
                <div className="mt-1 text-sm font-mono-val font-bold text-[var(--ink)] truncate">
                  {SUPABASE_PROJECT_ID}
                </div>
                <span className="text-[10px] font-mono-val text-[var(--forest)] font-bold">
                  PostgreSQL Real-time
                </span>
              </div>

            </div>

            {/* Admin Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[var(--line)] pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('sessions')}
                  className={`brutal-btn px-3 py-1.5 text-xs font-mono-val font-bold rounded-lg cursor-pointer ${
                    activeTab === 'sessions'
                      ? 'bg-[var(--forest)] text-[var(--paper)]'
                      : 'bg-[var(--paper-2)] text-[var(--ink)] hover:bg-[var(--line)]'
                  }`}
                >
                  All Booked Sessions ({sessions.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('logins')}
                  className={`brutal-btn px-3 py-1.5 text-xs font-mono-val font-bold rounded-lg cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'logins'
                      ? 'bg-[var(--forest)] text-[var(--paper)]'
                      : 'bg-[var(--paper-2)] text-[var(--ink)] hover:bg-[var(--line)]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>User Logins &amp; Activity ({loginLogs.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('users')}
                  className={`brutal-btn px-3 py-1.5 text-xs font-mono-val font-bold rounded-lg cursor-pointer ${
                    activeTab === 'users'
                      ? 'bg-[var(--forest)] text-[var(--paper)]'
                      : 'bg-[var(--paper-2)] text-[var(--ink)] hover:bg-[var(--line)]'
                  }`}
                >
                  Student Accounts ({Object.keys(rosterUsers).length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('supabase')}
                  className={`brutal-btn px-3 py-1.5 text-xs font-mono-val font-bold rounded-lg cursor-pointer ${
                    activeTab === 'supabase'
                      ? 'bg-[var(--forest)] text-[var(--paper)]'
                      : 'bg-[var(--paper-2)] text-[var(--ink)] hover:bg-[var(--line)]'
                  }`}
                >
                  Supabase Live Sync
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleManualRefresh}
                  disabled={isRefreshing}
                  className="brutal-btn px-2.5 py-1.5 bg-[var(--paper-2)] text-[var(--ink)] text-xs font-mono-val font-bold rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[var(--line)] disabled:opacity-50"
                  title="Pull latest data from Supabase & local DB"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Sync DB</span>
                </button>

                {activeTab === 'logins' ? (
                  <button
                    type="button"
                    onClick={handleExportLoginsCSV}
                    className="brutal-btn px-2.5 py-1.5 bg-[var(--mint)] text-[var(--forest)] text-xs font-mono-val font-bold rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[var(--mint)]/80"
                    title="Download all user login records as CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Logins CSV</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="brutal-btn px-2.5 py-1.5 bg-[var(--mint)] text-[var(--forest)] text-xs font-mono-val font-bold rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[var(--mint)]/80"
                    title="Download all session records as CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                )}
              </div>
            </div>

            {/* ============================================================ */}
            {/* TAB 1: ALL SESSIONS TABLE                                    */}
            {/* ============================================================ */}
            {activeTab === 'sessions' && (
              <div className="space-y-4">
                
                {/* Search & Status Filter Toolbar */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8 relative">
                    <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by student, skill, location, or session ID..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] font-mono-val"
                    />
                  </div>

                  <div className="sm:col-span-4 flex items-center gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="w-full p-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] font-mono-val"
                    >
                      <option value="all">All Statuses ({sessions.length})</option>
                      <option value="booked_held">Escrow Held ({stats.held})</option>
                      <option value="completed">Verified Completed ({stats.completed})</option>
                      <option value="refunded">Refunded / Disputed ({stats.refunded})</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="border-2 border-[var(--ink)] rounded-xl overflow-hidden bg-[var(--card-bg)]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono-val">
                      <thead className="bg-[var(--paper-2)] border-b-2 border-[var(--ink)] text-[var(--ink)] uppercase">
                        <tr>
                          <th className="p-3">Session ID</th>
                          <th className="p-3">Skill Topic</th>
                          <th className="p-3">Mentor / Peer</th>
                          <th className="p-3">Slot &amp; Venue</th>
                          <th className="p-3">Escrow Status</th>
                          <th className="p-3 text-right">Proof Score</th>
                          <th className="p-3 text-center">Admin Controls</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--line)]">
                        {filteredSessions.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-[var(--muted)] font-mono-val">
                              No matching session records found.
                            </td>
                          </tr>
                        ) : (
                          filteredSessions.map((s) => (
                            <tr key={s.id} className="hover:bg-[var(--paper-2)]/40 transition-colors">
                              
                              {/* Session ID */}
                              <td className="p-3 font-bold text-[var(--ink)]">
                                {s.id.slice(0, 14)}
                              </td>

                              {/* Skill Title */}
                              <td className="p-3 max-w-[200px]">
                                <span className="font-bold text-[var(--ink)] block truncate" title={s.skillTitle}>
                                  {s.skillTitle}
                                </span>
                                <span className="text-[10px] text-[var(--muted)]">
                                  {s.date}
                                </span>
                              </td>

                              {/* Partner */}
                              <td className="p-3">
                                <span className="font-bold text-[var(--forest)] block">
                                  {s.partnerName}
                                </span>
                                <span className="text-[10px] text-[var(--muted)] capitalize">
                                  Role: {s.partnerRole}
                                </span>
                              </td>

                              {/* Slot & Location */}
                              <td className="p-3 max-w-[180px]">
                                <span className="block truncate" title={s.slot}>{s.slot}</span>
                                <span className="text-[10px] text-[var(--muted)] block truncate">{s.location}</span>
                              </td>

                              {/* Status Badge */}
                              <td className="p-3">
                                {s.status === 'booked_held' && (
                                  <span className="px-2 py-0.5 rounded bg-[var(--mustard)]/40 text-[var(--ink)] border border-[var(--ink)] text-[10px] font-bold inline-block">
                                    ⏳ Held ({(s.heldCredits || 2).toFixed(1)} cr)
                                  </span>
                                )}
                                {s.status === 'completed' && (
                                  <span className="px-2 py-0.5 rounded bg-[var(--mint)] text-[var(--forest)] border border-[var(--ink)] text-[10px] font-bold inline-block">
                                    ✅ Settled (+5.0 cr)
                                  </span>
                                )}
                                {s.status === 'refunded' && (
                                  <span className="px-2 py-0.5 rounded bg-[var(--rose)]/20 text-[var(--rose)] border border-[var(--rose)] text-[10px] font-bold inline-block">
                                    ↩️ Refunded
                                  </span>
                                )}
                              </td>

                              {/* Proof Score */}
                              <td className="p-3 text-right">
                                {s.quizScore !== undefined ? (
                                  <span className={`font-bold ${s.quizScore >= 66 ? 'text-[var(--forest)]' : 'text-[var(--rose)]'}`}>
                                    {s.quizScore}%
                                  </span>
                                ) : (
                                  <span className="text-[var(--muted)]">Pending</span>
                                )}
                              </td>

                              {/* Controls */}
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  {s.status === 'booked_held' && (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => onForceReleaseEscrow(s.id)}
                                        className="brutal-btn px-2 py-1 bg-[var(--mint)] text-[var(--forest)] text-[10px] font-bold rounded cursor-pointer hover:bg-[var(--mint)]/80"
                                        title="Manually release escrow to teacher"
                                      >
                                        Release
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => onForceRefundEscrow(s.id)}
                                        className="brutal-btn px-2 py-1 bg-[var(--paper-2)] text-[var(--rose)] text-[10px] font-bold rounded cursor-pointer hover:bg-[var(--line)]"
                                        title="Refund credits back to learner"
                                      >
                                        Refund
                                      </button>
                                    </>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => onDeleteSession(s.id)}
                                    className="p-1 rounded text-[var(--muted)] hover:text-[var(--rose)] cursor-pointer"
                                    title="Delete session record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>

                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 2: USER LOGINS & ACTIVITY (DATABASE LIVE RECORDS)       */}
            {/* ============================================================ */}
            {activeTab === 'logins' && (
              <div className="space-y-4">
                
                {/* Login Search Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-96">
                    <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={loginSearch}
                      onChange={(e) => setLoginSearch(e.target.value)}
                      placeholder="Search logins by student name, email, or device..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] font-mono-val"
                    />
                  </div>
                  
                  <div className="text-xs font-mono-val text-[var(--forest)] font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--forest)] animate-pulse" />
                    <span>Real-time Login Audit Trail ({filteredLoginLogs.length} events)</span>
                  </div>
                </div>

                {/* Login History Table */}
                <div className="border-2 border-[var(--ink)] rounded-xl overflow-hidden bg-[var(--card-bg)]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono-val">
                      <thead className="bg-[var(--paper-2)] border-b-2 border-[var(--ink)] text-[var(--ink)] uppercase">
                        <tr>
                          <th className="p-3">Student Name</th>
                          <th className="p-3">Registered Email</th>
                          <th className="p-3">Login Date &amp; Time</th>
                          <th className="p-3">Client Device / Platform</th>
                          <th className="p-3 text-center">Auth Status</th>
                          <th className="p-3 text-right">Log Reference</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--line)]">
                        {filteredLoginLogs.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-[var(--muted)] font-mono-val">
                              No login activity found matching search criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredLoginLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-[var(--paper-2)]/40 transition-colors">
                              <td className="p-3 font-bold text-[var(--ink)]">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded bg-[var(--forest)] text-[var(--paper)] flex items-center justify-center font-bold text-[10px]">
                                    {log.userName.charAt(0)}
                                  </div>
                                  <span>{log.userName}</span>
                                </div>
                              </td>
                              <td className="p-3 text-[var(--forest)] font-semibold">
                                {log.userEmail}
                              </td>
                              <td className="p-3 text-[var(--ink)]">
                                {new Date(log.loginTime).toLocaleString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                })}
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-1.5 text-[var(--muted)]">
                                  <Laptop className="w-3.5 h-3.5 text-[var(--forest)]" />
                                  <span>{log.device}</span>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <span className="px-2 py-0.5 rounded bg-[var(--mint)] text-[var(--forest)] border border-[var(--ink)] text-[10px] font-bold inline-flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Successful</span>
                                </span>
                              </td>
                              <td className="p-3 text-right text-[10px] text-[var(--muted)]">
                                {log.id.slice(0, 16)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 3: STUDENT ROSTER                                        */}
            {/* ============================================================ */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-val font-bold uppercase text-[var(--forest)]">
                    Registered Campus Students &amp; Wallet Balances ({Object.keys(rosterUsers).length})
                  </span>
                  <span className="text-xs font-mono-val text-[var(--muted)]">
                    Verified Student Accounts
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.values(rosterUsers).map((u) => (
                    <div
                      key={u.id}
                      className="p-4 rounded-xl border-2 border-[var(--ink)] bg-[var(--card-bg)] brutal-shadow-sm flex items-start gap-3"
                    >
                      <div className="w-12 h-12 rounded-xl border border-[var(--ink)] overflow-hidden bg-[var(--paper-2)] flex-shrink-0">
                        {u.avatarUrl ? (
                          <img src={u.avatarUrl} alt={u.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[var(--forest)] text-[var(--paper)] flex items-center justify-center font-bold">
                            {u.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-serif-heading font-bold text-sm text-[var(--ink)] truncate">
                            {u.name}
                          </h5>
                          <span className="text-[10px] font-mono-val px-1.5 py-0.2 rounded bg-[var(--mint)] text-[var(--forest)] font-bold">
                            {u.totalLogins ? `${u.totalLogins} Logins` : 'Active'}
                          </span>
                        </div>

                        <div className="text-[11px] font-mono-val text-[var(--muted)] truncate">
                          {u.department} · {u.year}
                        </div>

                        <div className="text-[11px] font-mono-val text-[var(--ink)] font-bold truncate">
                          Email: {u.email}
                        </div>

                        {u.lastLoginAt && (
                          <div className="text-[10px] font-mono-val text-[var(--forest)]">
                            Last Login: {new Date(u.lastLoginAt).toLocaleDateString()} at {new Date(u.lastLoginAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}

                        <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono-val">
                          <span>Wallet: <strong>{u.availableCredits.toFixed(1)} Credits</strong></span>
                          <span>Trust: <strong className="text-[var(--forest)]">{u.trustScore}%</strong></span>
                          <span>Active: <strong>{u.daysActive}d</strong></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 4: SUPABASE DATABASE CONNECTIONS                         */}
            {/* ============================================================ */}
            {activeTab === 'supabase' && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl border-2 border-[var(--ink)] bg-[var(--paper-2)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-val font-bold uppercase text-[var(--forest)] flex items-center gap-1.5">
                      <Database className="w-4 h-4" />
                      Live Supabase Integration Specs
                    </span>
                    <a
                      href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-btn px-3 py-1 bg-[var(--forest)] text-[var(--paper)] text-xs font-mono-val font-bold rounded flex items-center gap-1 cursor-pointer hover:bg-[var(--leaf)]"
                    >
                      <span>Open Supabase Cloud Dashboard</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono-val">
                    <div className="p-3 bg-[var(--card-bg)] rounded-lg border border-[var(--line)]">
                      <span className="text-[var(--muted)] block">Project ID:</span>
                      <strong className="text-[var(--forest)]">{SUPABASE_PROJECT_ID}</strong>
                    </div>
                    <div className="p-3 bg-[var(--card-bg)] rounded-lg border border-[var(--line)]">
                      <span className="text-[var(--muted)] block">Sessions Table:</span>
                      <strong>public.sessions</strong>
                    </div>
                    <div className="p-3 bg-[var(--card-bg)] rounded-lg border border-[var(--line)]">
                      <span className="text-[var(--muted)] block">Logins Table:</span>
                      <strong>public.user_logins</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--ink)] font-mono-val leading-relaxed">
                    Whenever any student signs in or signs up, their login activity is securely stored in <code>public.user_logins</code> and their student profile in <code>public.users</code>. Booked sessions are managed in <code>public.sessions</code> with automated credit escrow protection.
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
