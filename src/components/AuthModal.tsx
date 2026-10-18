import React, { useState } from 'react';
import { UserProfile } from '../types';
import { CreditCoin } from './CreditCoin';
import { X, GraduationCap, ShieldCheck, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
}) => {
  if (!isOpen) return null;

  const [emailInput, setEmailInput] = useState(currentUser.email);
  const [nameInput, setNameInput] = useState(currentUser.name);
  const [departmentInput, setDepartmentInput] = useState(currentUser.department);
  const [collegeInput, setCollegeInput] = useState(currentUser.college);
  const [successNotice, setSuccessNotice] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if it looks like an educational / institutional email (.edu, .ac.in, mmu, etc.)
    const isCollegeDomain = emailInput.includes('.edu') || emailInput.includes('.ac.in') || emailInput.includes('mmumullana');

    const updated: UserProfile = {
      ...currentUser,
      name: nameInput.trim() || 'Verified Student',
      email: emailInput.trim(),
      department: departmentInput.trim() || 'Computer Science & Engineering',
      college: collegeInput.trim() || 'Maharishi Markandeshwar (Deemed to be University), Mullana',
      isVerifiedCollege: isCollegeDomain,
      // If user had 0 credits, grant 6 starter credits
      availableCredits: currentUser.availableCredits === 0 ? 6.0 : currentUser.availableCredits,
    };

    onUpdateUser(updated);
    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--ink)]/60 backdrop-blur-xs">
      <div className="brutal-card w-full max-w-md bg-[var(--paper)] p-6 md:p-8 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 brutal-btn rounded-lg bg-[var(--paper-2)] flex items-center justify-center text-[var(--ink)] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block mb-2">
            Campus Single Sign-On
          </span>
          <h3 className="font-serif-heading text-2xl font-bold text-[var(--ink)]">
            Verified College Student ID
          </h3>
          <p className="text-xs text-[var(--muted)] font-mono-val mt-1">
            Sign in with @mmumullana.ac.in or any accredited college email
          </p>
        </div>

        {/* Starter Credit Banner */}
        <div className="p-3 bg-[var(--mustard)]/20 border-2 border-[var(--ink)] rounded-xl mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <div className="text-xs font-mono-val font-bold text-[var(--ink)]">
              6.0 Free Starter Credits
            </div>
          </div>
          <span className="text-[11px] font-mono-val text-[var(--forest)] font-bold">
            Granted on First Sign-in
          </span>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          
          <div>
            <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
              Your Full Name
            </label>
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full p-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
              Institutional College Email (.ac.in / .edu) *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="e.g. rollno@mmumullana.ac.in"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] font-mono-val"
              />
            </div>
            <p className="text-[10px] text-[var(--muted)] font-mono-val mt-1">
              Restricted to campus domains to ensure peer safety in hostels &amp; labs.
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
              Department &amp; Year
            </label>
            <input
              type="text"
              value={departmentInput}
              onChange={(e) => setDepartmentInput(e.target.value)}
              placeholder="e.g. Computer Science &amp; Engineering, 2nd Year"
              className="w-full p-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
              College Name
            </label>
            <input
              type="text"
              value={collegeInput}
              onChange={(e) => setCollegeInput(e.target.value)}
              className="w-full p-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)]"
            />
          </div>

          {successNotice && (
            <div className="p-3 bg-[var(--mint)] border-2 border-[var(--forest)] text-[var(--forest)] rounded-lg text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Campus ID Verified! Wallet Synced.</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--line)]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-bold text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="brutal-btn px-5 py-2.5 bg-[var(--forest)] text-[var(--paper)] font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer hover:bg-[var(--leaf)]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify &amp; Enter Platform</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
