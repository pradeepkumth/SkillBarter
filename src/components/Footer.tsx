import React from 'react';
import { GraduationCap, Github, Heart, Database, Shield, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenTeachModal: () => void;
  onOpenAuthModal: () => void;
  onOpenSupabaseModal?: () => void;
  onOpenAdminPanel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTeachModal,
  onOpenAuthModal,
  onOpenSupabaseModal,
  onOpenAdminPanel,
}) => {
  return (
    <footer className="border-t-2 border-[var(--ink)] bg-[var(--paper)] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[var(--line)]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--forest)] text-[var(--paper)] border-2 border-[var(--ink)] flex items-center justify-center font-serif-heading font-black text-sm">
                SB
              </div>
              <span className="font-serif-heading text-xl font-bold text-[var(--ink)]">
                SkillBarter
              </span>
            </div>
            <p className="font-serif-heading italic text-sm text-[var(--forest)] font-medium">
              "Learn a Skill. Teach a Skill. Grow Together."
            </p>
            <p className="text-xs text-[var(--muted)] leading-relaxed max-w-sm">
              A student-to-student campus time-bank. Swap DSA, guitar, Python, and design skills with verified college peers. Zero money involved.
            </p>
            <div className="text-[11px] font-mono-val text-[var(--muted)] pt-1">
              CodeStorm 2026 Hackathon · Maharishi Markandeshwar (Deemed to be University), Mullana
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <div className="font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] mb-2">
              Platform Links
            </div>
            <div className="grid grid-cols-2 gap-2 text-[var(--ink)]">
              <button
                onClick={() => onNavigate('hero')}
                className="text-left hover:text-[var(--leaf)] cursor-pointer"
              >
                Home / Overview
              </button>
              <button
                onClick={() => onNavigate('how-it-works')}
                className="text-left hover:text-[var(--leaf)] cursor-pointer"
              >
                How It Works (6 Steps)
              </button>
              <button
                onClick={() => onNavigate('credit-system')}
                className="text-left hover:text-[var(--leaf)] cursor-pointer"
              >
                Credit Flow &amp; Escrow
              </button>
              <button
                onClick={() => onNavigate('browse-skills')}
                className="text-left hover:text-[var(--leaf)] cursor-pointer"
              >
                Browse Campus Skills
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-left hover:text-[var(--leaf)] cursor-pointer"
              >
                Student Dashboard
              </button>
              <button
                onClick={() => onNavigate('about-team')}
                className="text-left hover:text-[var(--leaf)] cursor-pointer"
              >
                Team Binary Beast
              </button>
              <button
                onClick={() => onNavigate('references')}
                className="text-left hover:text-[var(--leaf)] cursor-pointer"
              >
                Academic References
              </button>
              <button
                onClick={onOpenTeachModal}
                className="text-left text-[var(--forest)] font-bold hover:underline cursor-pointer"
              >
                + Offer to Teach
              </button>
              {onOpenSupabaseModal && (
                <button
                  onClick={onOpenSupabaseModal}
                  className="text-left text-[var(--forest)] font-mono-val font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--forest)] animate-pulse" />
                  <span>Supabase DB (Live)</span>
                </button>
              )}
              {onOpenAdminPanel && (
                <button
                  onClick={onOpenAdminPanel}
                  className="text-left text-[var(--ink)] font-mono-val font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--mustard)]" />
                  <span>Admin Panel (Bookings)</span>
                </button>
              )}
            </div>
          </div>

          {/* Hackathon & Team Credits */}
          <div className="md:col-span-3 space-y-2 text-xs font-mono-val">
            <div className="font-bold uppercase tracking-wider text-[var(--forest)] mb-2">
              Team Binary Beast
            </div>
            <div className="text-[var(--ink)]">
              <strong>Pradeep Kumar</strong> (Team Leader)
            </div>
            <div className="text-[var(--ink)]">
              <strong>Dhanesh Kumar</strong> (Co-Developer)
            </div>
            <div className="text-[11px] text-[var(--muted)]">
              B.Tech CSE, 2nd Year, MM(DU)
            </div>
            <div className="pt-2">
              <span className="inline-block px-2 py-1 bg-[var(--mint)] text-[var(--forest)] text-[10px] font-bold rounded border border-[var(--ink)]">
                Campus Pilot Ready
              </span>
            </div>
          </div>

        </div>

        {/* Dedicated Supabase DB & Cloud Status Bar */}
        {onOpenSupabaseModal && (
          <div className="mt-8 p-4 rounded-xl border-2 border-[var(--ink)] bg-[var(--paper-2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[3px_3px_0px_var(--ink)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--forest)] text-[var(--paper)] border-2 border-[var(--ink)] flex items-center justify-center font-bold shadow-[1px_1px_0px_var(--ink)] shrink-0">
                <Database className="w-5 h-5 text-[var(--mustard)]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[var(--ink)]">Supabase Cloud Database</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono-val font-bold bg-[var(--mint)] text-[var(--forest)] border border-[var(--forest)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--forest)] animate-pulse" />
                    Live &amp; Connected
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] font-mono-val mt-0.5">
                  Real-time PostgreSQL engine for campus sessions, user logins, and skill escrows.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={onOpenSupabaseModal}
                className="brutal-btn px-4 py-2 text-xs font-mono-val font-bold bg-[var(--forest)] text-[var(--paper)] rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--leaf)] w-full md:w-auto shadow-[2px_2px_0px_var(--ink)]"
                title="Open Supabase Cloud Database Status & SQL Editor"
              >
                <Database className="w-3.5 h-3.5 text-[var(--mustard)]" />
                <span>Supabase DB Console</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </button>

              {onOpenAdminPanel && (
                <button
                  onClick={onOpenAdminPanel}
                  className="brutal-btn px-3.5 py-2 text-xs font-mono-val font-bold bg-[var(--paper)] text-[var(--ink)] rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[var(--line)] shrink-0"
                  title="Open Admin Desk"
                >
                  <Shield className="w-3.5 h-3.5 text-[var(--mustard)]" />
                  <span>Admin</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-val text-[var(--muted)]">
          <div>
            © 2026 SkillBarter · Built by Team Binary Beast for CodeStorm 2026.
          </div>
          <div className="text-center sm:text-right text-[11px]">
            Concept demo, sample data · All numbers are illustrative until tested in the pilot.
          </div>
        </div>

      </div>
    </footer>
  );
};
