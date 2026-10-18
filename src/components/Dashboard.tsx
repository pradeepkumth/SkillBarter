import React from 'react';
import { UserProfile, SessionRecord, SkillListing } from '../types';
import { CreditCoin } from './CreditCoin';
import { 
  Flame, 
  ShieldCheck, 
  GraduationCap, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  RefreshCw,
  FileText,
  AlertCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  sessions: SessionRecord[];
  allSkills: SkillListing[];
  onTakeQuiz: (session: SessionRecord) => void;
  onBrowseSkills: () => void;
  onResetDemo: () => void;
  onClaimStarterCredits: () => void;
  onOpenProfileModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  sessions,
  allSkills,
  onTakeQuiz,
  onBrowseSkills,
  onResetDemo,
  onClaimStarterCredits,
  onOpenProfileModal,
}) => {
  const upcomingSessions = sessions.filter((s) => s.status === 'booked_held' || s.status === 'quiz_pending');
  const pastSessions = sessions.filter((s) => s.status === 'completed' || s.status === 'refunded');

  return (
    <section id="dashboard" className="py-16 md:py-24 bg-[var(--paper-2)] border-y-2 border-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with DP and Profile Controls */}
        <div className="brutal-card p-6 md:p-8 bg-[var(--paper)] mb-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* DP / Avatar */}
            <div className="relative">
              <div 
                onClick={onOpenProfileModal}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-[var(--ink)] overflow-hidden brutal-shadow bg-[var(--paper-2)] cursor-pointer hover:scale-105 transition-transform"
                title="Click to view & change DP"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[var(--forest)] text-[var(--paper)] flex items-center justify-center font-bold text-2xl font-serif-heading">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)]">
                  {user.level} · Active Student
                </span>
                <span className="text-xs font-mono-val text-[var(--muted)]">
                  Joined {user.joinedDate} ({user.daysActive} days active)
                </span>
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[var(--ink)] tracking-tight">
                {user.name}'s Time-Bank Desk
              </h2>

              <div className="text-xs font-mono-val text-[var(--ink)] font-semibold flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
                <span>{user.department}</span>
                <span aria-hidden="true" className="text-[var(--muted)]">·</span>
                <span>{user.year}</span>
                <span aria-hidden="true" className="text-[var(--muted)]">·</span>
                <span className="text-[var(--forest)]">{user.college}</span>
              </div>

              {/* Email Privacy Notice */}
              <div className="pt-1.5 flex items-center justify-center sm:justify-start gap-2 text-xs font-mono-val">
                <span className="text-[var(--forest)] font-bold flex items-center gap-1 bg-[var(--mint)]/30 px-2 py-0.5 rounded border border-[var(--forest)]">
                  <span>✉ {user.email}</span>
                  <span className="text-[10px] text-[var(--muted)] font-normal">(Private to your account)</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenProfileModal}
              className="brutal-btn px-3.5 py-2 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded-lg cursor-pointer hover:bg-[var(--leaf)]"
            >
              Edit DP &amp; Profile
            </button>
            <button
              onClick={onResetDemo}
              className="brutal-btn px-3 py-2 bg-[var(--paper-2)] text-[var(--ink)] text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[var(--line)]"
              title="Reset sample state back to initial Riya demo"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Available Wallet Balance / Budget */}
          <div className="brutal-card p-5 bg-[var(--paper)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-val text-[var(--muted)] mb-1">
                <span>TIME-BANK BUDGET</span>
                <span className="w-2 h-2 rounded-full bg-[var(--forest)]" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <CreditCoin amount={user.availableCredits} size="lg" />
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[var(--line)] text-[11px] font-mono-val text-[var(--forest)]">
              Spendable credits on campus
            </div>
          </div>

          {/* Lifetime Credits Earned */}
          <div className="brutal-card p-5 bg-[var(--paper)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-val text-[var(--muted)] mb-1">
                <span>TOTAL CREDITS EARNED</span>
                <Award className="w-4 h-4 text-[var(--forest)]" />
              </div>
              <div className="mt-2 text-2xl font-serif-heading font-black text-[var(--forest)] font-mono-val">
                +{user.lifetimeEarnedCredits.toFixed(1)} <span className="text-sm font-sans font-normal text-[var(--muted)]">Credits</span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[var(--line)] text-[11px] font-mono-val text-[var(--muted)]">
              Earned by teaching classmates
            </div>
          </div>

          {/* Days active / streak metrics */}
          <div className="brutal-card p-5 bg-[var(--paper)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-val text-[var(--muted)] mb-1">
                <span>DAYS ACTIVE &amp; STREAK</span>
                <Flame className="w-4 h-4 text-[var(--mustard)] fill-[var(--mustard)]" />
              </div>
              <div className="mt-2 text-2xl font-serif-heading font-black text-[var(--ink)] font-mono-val">
                {user.daysActive} <span className="text-sm font-sans font-normal text-[var(--muted)]">Days</span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[var(--line)] text-[11px] font-mono-val text-[var(--forest)]">
              {user.streakDays}-day active learning streak
            </div>
          </div>

          {/* Trust Score & Level */}
          <div className="brutal-card p-5 bg-[var(--paper)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-val text-[var(--muted)] mb-1">
                <span>CAMPUS TRUST SCORE</span>
                <ShieldCheck className="w-4 h-4 text-[var(--forest)]" />
              </div>
              <div className="mt-2 text-2xl font-serif-heading font-black text-[var(--forest)] font-mono-val">
                {user.trustScore} <span className="text-sm font-sans font-normal text-[var(--muted)]">/ 100</span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[var(--line)] text-[11px] font-mono-val text-[var(--ink)] font-semibold">
              Level: {user.level} (Fast Settlement)
            </div>
          </div>

        </div>

        {/* Two-Column Layout: Left = Upcoming & History, Right = Badges & Resume Record */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Upcoming Sessions & Action Queue */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Upcoming Sessions Box */}
            <div className="brutal-card p-6 bg-[var(--paper)]">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)] mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[var(--forest)]" />
                  <h3 className="font-serif-heading text-lg font-bold text-[var(--ink)]">
                    Upcoming Booked Sessions
                  </h3>
                </div>
                <span className="text-xs font-mono-val font-bold text-[var(--muted)]">
                  {upcomingSessions.length} Pending
                </span>
              </div>

              {upcomingSessions.length === 0 ? (
                <div className="p-8 text-center bg-[var(--paper-2)]/60 rounded-xl border border-dashed border-[var(--line)] space-y-3">
                  <Clock className="w-8 h-8 mx-auto text-[var(--muted)]" />
                  <p className="text-sm font-bold text-[var(--ink)]">
                    No active sessions locked in escrow right now.
                  </p>
                  <p className="text-xs text-[var(--muted)] max-w-sm mx-auto">
                    Browse classmate skills to book your next session (holds 2.0 credits until quiz completion).
                  </p>
                  <button
                    onClick={onBrowseSkills}
                    className="brutal-btn px-4 py-2 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Find a Campus Mentor
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingSessions.map((sess) => (
                    <div
                      key={sess.id}
                      className="p-4 rounded-xl border-2 border-[var(--ink)] bg-[var(--card-bg)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 brutal-shadow-sm"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono-val font-bold text-[var(--forest)] uppercase">
                            {sess.partnerRole === 'teacher' ? 'Learning Session' : 'Teaching Session'}
                          </span>
                          <span className="text-[11px] font-mono-val px-1.5 py-0.2 rounded bg-[var(--mustard)]/40 text-[var(--ink)] font-bold">
                            2.0 Credits Held in Escrow
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[var(--ink)] font-serif-heading">
                          {sess.skillTitle}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted)] font-mono-val">
                          <span>Peer: {sess.partnerName}</span>
                          <span aria-hidden="true">·</span>
                          <span>Slot: {sess.slot}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onTakeQuiz(sess)}
                        className="brutal-btn px-4 py-2 bg-[var(--mustard)] text-[var(--ink)] text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto hover:bg-[var(--mustard)]/90"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Take Proof Quiz &amp; Settle</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Teaching History & Verified Past Sessions */}
            <div className="brutal-card p-6 bg-[var(--paper)]">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)] mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[var(--forest)]" />
                  <h3 className="font-serif-heading text-lg font-bold text-[var(--ink)]">
                    Verified Session History
                  </h3>
                </div>
                <span className="text-xs font-mono-val text-[var(--muted)]">
                  Cryptographically immutable
                </span>
              </div>

              {pastSessions.length === 0 ? (
                <p className="text-xs text-[var(--muted)]">No past completed sessions yet.</p>
              ) : (
                <div className="divide-y divide-[var(--line)]">
                  {pastSessions.map((sess) => (
                    <div key={sess.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-[var(--ink)] flex items-center gap-2">
                          <span>{sess.skillTitle}</span>
                          {sess.status === 'completed' ? (
                            <span className="text-[10px] font-mono-val text-[var(--forest)] font-bold bg-[var(--mint)] px-1.5 py-0.2 rounded">
                              VERIFIED PASSED
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono-val text-[var(--rose)] font-bold bg-[var(--paper-2)] px-1.5 py-0.2 rounded">
                              REFUNDED (DISPUTE)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[var(--muted)] font-mono-val mt-0.5">
                          With {sess.partnerName} · {sess.date}
                        </div>
                        {sess.notes && (
                          <div className="text-[11px] text-[var(--ink)] mt-1 italic">
                            "{sess.notes}"
                          </div>
                        )}
                      </div>

                      <div className="text-right font-mono-val text-xs">
                        {sess.status === 'completed' ? (
                          <span className="text-[var(--forest)] font-bold">
                            {sess.creditsEarnedOrSpent > 0 ? `+${sess.creditsEarnedOrSpent.toFixed(1)}` : sess.creditsEarnedOrSpent.toFixed(1)} Credits
                          </span>
                        ) : (
                          <span className="text-[var(--rose)] font-bold">
                            +2.0 Credits Refunded
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Badges, Level Progression, and Verified Teaching Portfolio */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Gamification / Badges & Levels */}
            <div className="brutal-card p-6 bg-[var(--paper)]">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)] mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[var(--mustard)]" />
                  <h3 className="font-serif-heading text-lg font-bold text-[var(--ink)]">
                    Badges &amp; Peer Milestones
                  </h3>
                </div>
                <span className="text-xs font-mono-val font-bold text-[var(--forest)]">
                  {user.badges.length} Unlocked
                </span>
              </div>

              <div className="space-y-3">
                {user.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-3 rounded-lg border-2 border-[var(--line)] bg-[var(--paper-2)]/60 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--mint)] border border-[var(--ink)] flex items-center justify-center flex-shrink-0 text-[var(--forest)] font-bold text-xs mt-0.5">
                      ★
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--ink)] flex items-center justify-between">
                        <span>{badge.title}</span>
                        {badge.unlockedAt && (
                          <span className="text-[10px] font-mono-val text-[var(--muted)]">
                            {badge.unlockedAt}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--muted)] mt-0.5 leading-snug">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume-Ready Verified Record Export */}
            <div className="brutal-card p-6 bg-[var(--card-bg)] border-2 border-[var(--forest)]">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-[var(--forest)]" />
                <h4 className="font-serif-heading text-lg font-bold text-[var(--forest)]">
                  Resume-Ready Teaching Record
                </h4>
              </div>
              <p className="text-xs text-[var(--muted)] mb-4">
                Proof of peer teaching for internships and placement interviews. Demonstrates communication and domain mastery.
              </p>

              <div className="p-3 bg-[var(--paper-2)] border border-[var(--ink)] rounded-lg text-xs font-mono-val space-y-1 mb-4">
                <div className="font-bold text-[var(--ink)]">
                  Student: {user.name} ({user.department})
                </div>
                <div className="text-[var(--forest)]">
                  Institution: {user.college}
                </div>
                <div className="text-[var(--ink)]">
                  Verified Teaching Topics: {user.skillsOffered.join(', ')}
                </div>
                <div className="text-[var(--ink)]">
                  Trust Rating: {user.trustScore}/100 · 100% Peer Proof Score
                </div>
              </div>

              <button
                onClick={() => alert(`Verified Student Record for ${user.name}:\n\nInstitution: ${user.college}\nVerified Email: ${user.email}\nStatus: Level ${user.level} Peer Mentor\nTeaching Inventory: ${user.skillsOffered.join(', ')}\n\nThis record is ready to link on LinkedIn or resume!`)}
                className="brutal-btn w-full py-2 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[var(--leaf)]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Export Verified Record for Resume</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
