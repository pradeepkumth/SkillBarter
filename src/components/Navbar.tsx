import React, { useState } from 'react';
import { CreditCoin } from './CreditCoin';
import { UserProfile } from '../types';
import { 
  Sun, 
  Moon, 
  GraduationCap, 
  PlusCircle, 
  Menu, 
  X, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  user: UserProfile | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenTeachModal: () => void;
  onOpenLoginModal: () => void;
  onOpenSignupModal: () => void;
  onOpenProfileModal: () => void;
  onOpenSupabaseModal?: () => void;
  onOpenAdminPanel?: () => void;
  onLogout: () => void;
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  darkMode,
  onToggleDarkMode,
  onOpenTeachModal,
  onOpenLoginModal,
  onOpenSignupModal,
  onOpenProfileModal,
  onOpenSupabaseModal,
  onOpenAdminPanel,
  onLogout,
  currentSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'credit-system', label: 'Credit Flow' },
    { id: 'browse-skills', label: 'Browse Skills' },
    ...(user ? [{ id: 'dashboard', label: 'My Dashboard' }] : []),
    { id: 'about-team', label: 'Team Binary Beast' },
    { id: 'references', label: 'References' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--paper)]/95 backdrop-blur-xs border-b-2 border-[var(--ink)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer shrink-0"
        >
          <div className="w-11 h-11 rounded-xl bg-[var(--forest)] text-[var(--paper)] border-2 border-[var(--ink)] flex items-center justify-center font-serif-heading font-black text-2xl shadow-[2px_2px_0px_var(--ink)] group-hover:-rotate-3 transition-transform">
            SB
          </div>
          <div>
            <span className="font-serif-heading text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] block">
              SkillBarter
            </span>
            <p className="text-xs text-[var(--muted)] font-mono-val tracking-tight">
              Student Time-Bank
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3 text-xs xl:text-sm font-medium whitespace-nowrap">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-left cursor-pointer relative py-1.5 px-3 rounded-lg transition-all duration-200 ease-out transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-95 ${
                currentSection === link.id
                  ? 'text-[var(--forest)] font-bold bg-[var(--mint)]/40 border-2 border-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]'
                  : 'text-[var(--ink)] border-2 border-transparent hover:text-[var(--forest)] hover:bg-[var(--paper-2)] hover:border-[var(--ink)] hover:shadow-[3px_3px_0px_var(--ink)]'
              }`}
            >
              {link.label}
              {currentSection === link.id && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[var(--forest)] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls & Wallet Indicator */}
        <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0">
          
          {user ? (
            <>
              {/* Wallet Balance Chip */}
              <div 
                onClick={() => handleLinkClick('dashboard')}
                title="Click to view wallet & escrow breakdown"
                className="cursor-pointer brutal-card px-3 py-1.5 flex items-center gap-2 bg-[var(--paper-2)] hover:bg-[var(--mint)]/30 transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-[4px_5px_0px_var(--ink)]"
              >
                <CreditCoin amount={user.availableCredits} size="sm" />
                {user.heldCredits > 0 && (
                  <span className="text-[11px] font-mono-val text-[var(--rose)] font-semibold border-l border-[var(--line)] pl-2">
                    ({user.heldCredits.toFixed(1)} held)
                  </span>
                )}
              </div>

              {/* Teach a Skill Button */}
              <button
                onClick={onOpenTeachModal}
                className="brutal-btn px-3 py-1.5 text-xs font-semibold bg-[var(--mint)] text-[var(--ink)] rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[var(--mint)]/80 whitespace-nowrap transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-[4px_5px_0px_var(--ink)] active:translate-y-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Teach</span>
              </button>

              {/* Profile with DP Button */}
              <button
                onClick={onOpenProfileModal}
                className="brutal-btn px-2.5 py-1 text-xs font-semibold bg-[var(--paper-2)] text-[var(--ink)] rounded-lg flex items-center gap-2 cursor-pointer hover:bg-[var(--line)] whitespace-nowrap transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-[4px_5px_0px_var(--ink)] active:translate-y-0"
                title="View & Edit your Profile / DP"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-6 h-6 rounded-md object-cover border border-[var(--ink)]" />
                ) : (
                  <div className="w-6 h-6 rounded-md bg-[var(--forest)] text-[var(--paper)] flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="truncate max-w-[90px] font-bold">{user.name.split(' ')[0]}</span>
              </button>

              {/* Admin Panel Trigger */}
              {onOpenAdminPanel && (
                <button
                  onClick={onOpenAdminPanel}
                  className="brutal-btn px-3 py-1.5 text-xs font-mono-val font-bold bg-[var(--paper-2)] text-[var(--ink)] rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[var(--mustard)]/40 whitespace-nowrap transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-[4px_5px_0px_var(--ink)] active:translate-y-0"
                  title="Admin Panel: Inspect All Bookings, Escrow & User Logins"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--mustard)]" />
                  <span>Admin</span>
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="text-xs font-mono-val text-[var(--muted)] hover:text-[var(--rose)] px-1 cursor-pointer whitespace-nowrap transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105"
                title="Sign out"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Guest State Controls: Login and Signup */}
              <button
                onClick={onOpenLoginModal}
                className="brutal-btn px-3.5 py-1.5 text-xs font-bold bg-[var(--paper-2)] text-[var(--ink)] rounded-lg cursor-pointer hover:bg-[var(--line)] whitespace-nowrap transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-[4px_5px_0px_var(--ink)] active:translate-y-0"
              >
                Sign In
              </button>

              <button
                onClick={onOpenSignupModal}
                className="brutal-btn px-3.5 py-1.5 text-xs font-bold bg-[var(--forest)] text-[var(--paper)] rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[var(--leaf)] whitespace-nowrap shadow-[2px_2px_0px_var(--ink)] transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-[5px_6px_0px_var(--ink)] active:translate-y-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--mustard)]" />
                <span>Sign Up<span className="hidden xl:inline"> (6 Free Credits)</span></span>
              </button>

              {/* Admin Panel Trigger */}
              {onOpenAdminPanel && (
                <button
                  onClick={onOpenAdminPanel}
                  className="brutal-btn px-3 py-1.5 text-xs font-mono-val font-bold bg-[var(--paper-2)] text-[var(--ink)] rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[var(--mustard)]/40 whitespace-nowrap transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-[4px_5px_0px_var(--ink)] active:translate-y-0"
                  title="Admin Panel: Inspect All Bookings, Escrow & User Logins"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--mustard)]" />
                  <span>Admin</span>
                </button>
              )}
            </>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="w-9 h-9 brutal-btn rounded-lg bg-[var(--paper-2)] flex items-center justify-center text-[var(--ink)] cursor-pointer shrink-0 transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-[4px_5px_0px_var(--ink)] active:translate-y-0"
            title={darkMode ? 'Switch to warm paper mode' : 'Switch to dark ink mode'}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[var(--mustard)]" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {user && (
            <button 
              onClick={() => handleLinkClick('dashboard')}
              className="sm:hidden flex items-center gap-1 px-2 py-1 brutal-card text-xs font-mono-val"
            >
              <CreditCoin amount={user.availableCredits} size="sm" />
            </button>
          )}

          <button
            onClick={onToggleDarkMode}
            className="w-9 h-9 brutal-btn rounded-lg bg-[var(--paper-2)] flex items-center justify-center text-[var(--ink)]"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[var(--mustard)]" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 brutal-btn rounded-lg bg-[var(--paper-2)] flex items-center justify-center text-[var(--ink)]"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-[var(--ink)] bg-[var(--paper)] px-4 py-5 space-y-4">
          {user ? (
            <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
              <div className="flex items-center gap-2.5" onClick={() => { onOpenProfileModal(); setMobileMenuOpen(false); }}>
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-lg object-cover border border-[var(--ink)]" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-[var(--forest)] text-[var(--paper)] flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-[var(--ink)]">{user.name}</div>
                  <div className="text-[10px] text-[var(--muted)] font-mono-val">{user.department}</div>
                </div>
              </div>
              <div className="font-mono-val text-xs text-[var(--forest)] font-bold">
                {user.availableCredits.toFixed(1)} Credits
              </div>
            </div>
          ) : (
            <div className="p-3 bg-[var(--paper-2)] border border-[var(--ink)] rounded-xl flex items-center justify-between">
              <div className="text-xs font-mono-val">
                <span className="font-bold text-[var(--forest)] block">Welcome, Guest!</span>
                <span className="text-[10px] text-[var(--muted)]">Sign in to unlock 6 free credits</span>
              </div>
              <button
                onClick={() => { onOpenLoginModal(); setMobileMenuOpen(false); }}
                className="brutal-btn px-3 py-1 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded"
              >
                Sign In
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2 rounded-lg border border-transparent transition-all cursor-pointer ${
                  currentSection === link.id
                    ? 'bg-[var(--forest)] text-[var(--paper)] font-bold'
                    : 'text-[var(--ink)] hover:bg-[var(--paper-2)]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            {user ? (
              <>
                <button
                  onClick={() => {
                    onOpenTeachModal();
                    setMobileMenuOpen(false);
                  }}
                  className="brutal-btn py-2 text-xs font-semibold bg-[var(--mint)] text-[var(--ink)] rounded-lg flex items-center justify-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  Teach Skill
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="brutal-btn py-2 text-xs font-semibold bg-[var(--paper-2)] text-[var(--rose)] rounded-lg flex items-center justify-center gap-1.5"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onOpenLoginModal();
                    setMobileMenuOpen(false);
                  }}
                  className="brutal-btn py-2 text-xs font-semibold bg-[var(--paper-2)] text-[var(--ink)] rounded-lg flex items-center justify-center gap-1.5"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onOpenSignupModal();
                    setMobileMenuOpen(false);
                  }}
                  className="brutal-btn py-2 text-xs font-semibold bg-[var(--forest)] text-[var(--paper)] rounded-lg flex items-center justify-center gap-1.5"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Admin Quick Access */}
          {onOpenAdminPanel && (
            <div className="pt-2 border-t border-[var(--line)]">
              <button
                onClick={() => {
                  onOpenAdminPanel();
                  setMobileMenuOpen(false);
                }}
                className="w-full brutal-btn py-2 text-xs font-mono-val font-bold bg-[var(--paper-2)] text-[var(--ink)] rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--mustard)]/30"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--mustard)]" />
                <span>Admin Panel (Bookings & Security)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
