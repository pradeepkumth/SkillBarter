import React, { useState } from 'react';
import { UserProfile } from '../types';
import { CreditCoin } from './CreditCoin';
import { 
  X, 
  Camera, 
  Mail, 
  Building2, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Award, 
  Lock, 
  CheckCircle2, 
  Coins, 
  ShieldCheck,
  Flame,
  Upload,
  UserCheck
} from 'lucide-react';

interface StudentProfileModalProps {
  profileUser: UserProfile | null;
  currentUser: UserProfile | null; // Currently logged in user (or null if guest)
  isOpen: boolean;
  onClose: () => void;
  onUpdateAvatar?: (newAvatarUrl: string) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  profileUser,
  currentUser,
  isOpen,
  onClose,
  onUpdateAvatar,
}) => {
  if (!isOpen || !profileUser) return null;

  // Check if viewing own profile
  const isOwner = currentUser?.id === profileUser.id;

  const [avatarPreview, setAvatarPreview] = useState<string>(
    profileUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  );
  const [showAvatarChooser, setShowAvatarChooser] = useState(false);

  // Preset illustrated avatars
  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        if (onUpdateAvatar) {
          onUpdateAvatar(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPreset = (url: string) => {
    setAvatarPreview(url);
    if (onUpdateAvatar) {
      onUpdateAvatar(url);
    }
    setShowAvatarChooser(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--ink)]/65 backdrop-blur-xs">
      <div className="brutal-card w-full max-w-2xl bg-[var(--paper)] p-6 md:p-8 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 brutal-btn rounded-lg bg-[var(--paper-2)] flex items-center justify-center text-[var(--ink)] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Profile Header with DP */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b-2 border-[var(--ink)]">
          
          {/* Display Picture (DP) Container */}
          <div className="relative group flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-[var(--ink)] overflow-hidden brutal-shadow bg-[var(--paper-2)]">
              <img
                src={avatarPreview}
                alt={profileUser.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* DP Change Button (Visible only to owner) */}
            {isOwner && (
              <button
                type="button"
                onClick={() => setShowAvatarChooser(!showAvatarChooser)}
                className="absolute -bottom-2 -right-2 brutal-btn px-2 py-1 bg-[var(--mustard)] text-[var(--ink)] rounded-lg text-[10px] font-mono-val font-bold flex items-center gap-1 cursor-pointer hover:bg-[var(--mustard)]/90"
                title="Change your Display Picture"
              >
                <Camera className="w-3 h-3" />
                <span>Change DP</span>
              </button>
            )}
          </div>

          {/* Student Info */}
          <div className="text-center sm:text-left flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)]">
                {profileUser.level}
              </span>
              {isOwner ? (
                <span className="text-xs font-mono-val font-bold text-[var(--paper)] bg-[var(--forest)] px-2 py-0.5 rounded border border-[var(--ink)]">
                  Your Active Account
                </span>
              ) : (
                <span className="text-xs font-mono-val text-[var(--muted)]">
                  Campus Peer Profile
                </span>
              )}
            </div>

            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[var(--ink)]">
              {profileUser.name}
            </h3>

            {/* Department, Year & College */}
            <div className="text-xs font-mono-val text-[var(--ink)] font-semibold flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
              <span>{profileUser.department}</span>
              <span aria-hidden="true" className="text-[var(--muted)]">·</span>
              <span>{profileUser.year}</span>
            </div>

            <div className="text-xs text-[var(--muted)] flex items-center justify-center sm:justify-start gap-1 font-mono-val">
              <Building2 className="w-3.5 h-3.5 text-[var(--forest)]" />
              <span>{profileUser.college}</span>
            </div>

            {/* CRITICAL PRIVACY RULE IMPLEMENTATION */}
            {/* Student email is visible only to the authenticated profile owner */}
            <div className="pt-2">
              {isOwner ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--mint)]/40 border border-[var(--forest)] text-xs font-mono-val text-[var(--forest)] font-bold">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{profileUser.email}</span>
                  <span className="text-[10px] text-[var(--muted)] font-normal ml-1">
                    (Private to you)
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--paper-2)] border border-[var(--line)] text-xs font-mono-val text-[var(--muted)]">
                  <Lock className="w-3.5 h-3.5 text-[var(--rose)]" />
                  <span>Email hidden for student privacy</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* DP Chooser / Uploader (Toggled if owner clicks "Change DP") */}
        {isOwner && showAvatarChooser && (
          <div className="my-4 p-4 bg-[var(--paper-2)] border-2 border-[var(--ink)] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-val font-bold uppercase text-[var(--forest)]">
                Choose Profile Photo (DP)
              </span>
              <button
                type="button"
                onClick={() => setShowAvatarChooser(false)}
                className="text-xs text-[var(--muted)] hover:underline"
              >
                Close
              </button>
            </div>

            {/* File Upload Option */}
            <div>
              <label className="brutal-btn px-3 py-2 bg-[var(--paper)] text-[var(--ink)] text-xs font-bold rounded-lg inline-flex items-center gap-2 cursor-pointer hover:bg-[var(--line)]">
                <Upload className="w-3.5 h-3.5 text-[var(--forest)]" />
                <span>Upload Custom Photo from Device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Presets */}
            <div>
              <span className="text-[11px] font-mono-val text-[var(--muted)] block mb-2">
                Or select an illustrated student avatar:
              </span>
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {presetAvatars.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectPreset(url)}
                    className="w-12 h-12 rounded-xl border-2 border-[var(--ink)] overflow-hidden flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
                  >
                    <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Metrics Requested (Visible to Everyone) */}
        {/* Name, Department, Year, College, Credit Earned, Budget, Campus Tenure in Days */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
          
          {/* Credit Earned */}
          <div className="p-3 rounded-xl bg-[var(--paper-2)] border-2 border-[var(--ink)] brutal-shadow-sm">
            <span className="text-[10px] font-mono-val font-bold text-[var(--forest)] uppercase block">
              Credits Earned
            </span>
            <div className="mt-1 text-lg font-mono-val font-black text-[var(--forest)]">
              +{profileUser.lifetimeEarnedCredits.toFixed(1)} Credits
            </div>
            <span className="text-[10px] text-[var(--muted)] font-mono-val">
              From peer teaching
            </span>
          </div>

          {/* Budget / Available Credits */}
          <div className="p-3 rounded-xl bg-[var(--paper-2)] border-2 border-[var(--ink)] brutal-shadow-sm">
            <span className="text-[10px] font-mono-val font-bold text-[var(--mustard)] uppercase block">
              Time-Bank Budget
            </span>
            <div className="mt-1 text-lg font-mono-val font-black text-[var(--ink)]">
              {profileUser.availableCredits.toFixed(1)} Credits
            </div>
            <span className="text-[10px] text-[var(--muted)] font-mono-val">
              Spendable credits
            </span>
          </div>

          {/* Campus Tenure / Days Active */}
          <div className="p-3 rounded-xl bg-[var(--paper-2)] border-2 border-[var(--ink)] brutal-shadow-sm col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono-val font-bold text-[var(--ink)] uppercase block flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[var(--forest)]" />
              Campus Tenure &amp; Activity
            </span>
            <div className="mt-1 text-lg font-mono-val font-black text-[var(--ink)]">
              {profileUser.daysActive} Days
            </div>
            <span className="text-[10px] text-[var(--muted)] font-mono-val">
              Joined {profileUser.joinedDate}
            </span>
          </div>

        </div>

        {/* Skills Offered & Wanted */}
        <div className="space-y-4 mb-6">
          
          <div className="p-4 rounded-xl border-2 border-[var(--line)] bg-[var(--card-bg)]">
            <span className="text-xs font-mono-val font-bold text-[var(--forest)] uppercase block mb-2">
              Skills This Student Can Teach:
            </span>
            {profileUser.skillsOffered.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {profileUser.skillsOffered.map((sk, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-[var(--mint)]/40 border border-[var(--ink)] text-xs font-mono-val font-bold text-[var(--ink)]"
                  >
                    ✓ {sk}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--muted)]">No skills listed to teach yet.</p>
            )}
          </div>

          <div className="p-4 rounded-xl border-2 border-[var(--line)] bg-[var(--card-bg)]">
            <span className="text-xs font-mono-val font-bold text-[var(--muted)] uppercase block mb-2">
              Interested in Learning:
            </span>
            {profileUser.skillsWanted.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {profileUser.skillsWanted.map((sk, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-[var(--paper-2)] border border-[var(--line)] text-xs font-mono-val text-[var(--ink)]"
                  >
                    • {sk}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--muted)]">Looking for all campus opportunities.</p>
            )}
          </div>

        </div>

        {/* Badges Earned */}
        <div>
          <span className="text-xs font-mono-val font-bold uppercase text-[var(--forest)] block mb-3">
            Campus Badges &amp; Achievements
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {profileUser.badges.map((b) => (
              <div
                key={b.id}
                className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--paper-2)]/60 flex items-center gap-2.5 text-xs font-mono-val"
              >
                <div className="w-7 h-7 rounded-md bg-[var(--mustard)] border border-[var(--ink)] flex items-center justify-center font-bold text-[var(--ink)] flex-shrink-0">
                  ★
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[var(--ink)] truncate">{b.title}</div>
                  <div className="text-[10px] text-[var(--muted)] truncate">{b.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono-val text-[var(--muted)]">
          <span>Verified Student Profile</span>
          <button
            type="button"
            onClick={onClose}
            className="brutal-btn px-4 py-2 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded-lg cursor-pointer"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};
