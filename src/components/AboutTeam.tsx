import React from 'react';
import { Users, Code, Award, Layers, Terminal, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutTeam: React.FC = () => {
  const teamMembers = [
    {
      name: 'Pradeep Kumar',
      role: 'Team Leader & Full-Stack Architect',
      degree: 'B.Tech CSE, 2nd Year',
      college: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
      focus: 'System Architecture, Time-Bank Escrow Mechanics, Proof Verification & Algorithms',
      skills: ['DSA', 'React', 'Node.js', 'System Design'],
    },
    {
      name: 'Dhanesh Kumar',
      role: 'Co-Developer & Peer-Matching Engineer',
      degree: 'B.Tech CSE, 2nd Year',
      college: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
      focus: 'Rule-Based Time-Slot Matching, UI Architecture & Anti-Gaming Controls',
      skills: ['Python', 'Tailwind CSS', 'API Design', 'State Flow'],
    },
  ];

  const phases = [
    {
      phase: 'Phase 1: Core App MVP',
      status: 'Implemented in Demo',
      color: 'var(--forest)',
      badge: 'Live Interactive',
      items: [
        'Campus-only email verification (@mmumullana.ac.in)',
        'Student profile & teaching record ledger',
        'Directory of campus skills (coding, guitar, excel, design)',
        'Search & category filtering by location/hostel/library',
      ],
    },
    {
      phase: 'Phase 2: Sessions & Escrow Engine',
      status: 'Implemented in Demo',
      color: 'var(--leaf)',
      badge: 'Interactive Flow',
      items: [
        'Time-bank escrow holding 2.0 credits on booking',
        'Dual peer session attestation (learner + teacher)',
        'Anti-gaming guardrails (2 sessions/week per pair, daily cap)',
        'Wallet ledger tracking available vs. locked credits',
      ],
    },
    {
      phase: 'Phase 3: Pilot Rollout & Automation',
      status: 'Planned for Production',
      color: 'var(--mustard)',
      badge: 'Pilot Architecture',
      items: [
        'MM(DU) hostel & library pilot with 200 student cohort',
        'Google Calendar API auto-sync for classroom free hours',
        'Nodemailer & Firebase Cloud Messaging (FCM) session reminders',
        'MongoDB persistent database + verified LinkedIn resume badge export',
      ],
    },
  ];

  return (
    <section id="about-team" className="py-16 md:py-24 bg-[var(--paper)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block mb-3">
            Hackathon Submission · CodeStorm 2026
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--ink)] tracking-tight">
            Built by Team Binary Beast
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
            Developed by 2nd-year B.Tech CSE students at Maharishi Markandeshwar (Deemed to be University), Mullana, to democratize campus learning without high subscription fees.
          </p>
        </div>

        {/* Team Cards (Brutalist style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="brutal-card p-6 md:p-8 bg-[var(--paper-2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono-val font-bold text-[var(--forest)] uppercase">
                    Binary Beast Core
                  </span>
                  <span className="font-mono-val text-xs text-[var(--muted)]">
                    MM(DU) Mullana
                  </span>
                </div>

                <h3 className="font-serif-heading text-2xl font-bold text-[var(--ink)] mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-mono-val font-bold text-[var(--forest)] mb-3">
                  {member.role}
                </p>

                <p className="text-xs text-[var(--muted)] font-mono-val mb-4">
                  {member.degree} · {member.college}
                </p>

                <p className="text-sm text-[var(--ink)] leading-relaxed mb-4">
                  {member.focus}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--line)]">
                <span className="text-[10px] font-mono-val font-bold uppercase tracking-wider text-[var(--muted)] block mb-2">
                  Technical Domains
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono-val px-2.5 py-1 rounded bg-[var(--paper)] border border-[var(--ink)] text-[var(--ink)] font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Roadmap: The Three Phases */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block mb-2">
              Implementation Roadmap
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[var(--ink)]">
              The Three Phases of SkillBarter
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((ph, idx) => (
              <div
                key={ph.phase}
                className="brutal-card p-6 bg-[var(--card-bg)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono-val text-xs font-bold text-[var(--muted)]">
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-[11px] font-mono-val font-bold px-2 py-0.5 rounded border border-[var(--ink)] ${
                        ph.status.includes('Implemented')
                          ? 'bg-[var(--mint)] text-[var(--forest)]'
                          : 'bg-[var(--paper-2)] text-[var(--muted)]'
                      }`}
                    >
                      {ph.status}
                    </span>
                  </div>

                  <h4 className="font-serif-heading text-xl font-bold text-[var(--ink)] mb-4">
                    {ph.phase}
                  </h4>

                  <ul className="space-y-2.5 text-xs text-[var(--ink)]">
                    {ph.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--forest)] font-bold mt-0.5">✓</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--line)] text-[11px] font-mono-val text-[var(--muted)]">
                  {ph.badge}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Blueprint & Backend Plug-in Note */}
        <div className="brutal-card p-6 md:p-8 bg-[var(--paper-2)]">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-[var(--forest)]" />
            <h4 className="font-serif-heading text-xl font-bold text-[var(--ink)]">
              Architecture &amp; Production Stack Blueprint
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed mb-6">
            To ensure zero friction during the CodeStorm 2026 hackathon demo, the application runs on a fully functional, highly responsive frontend architecture with local state escrow logic. The codebase is organized cleanly so the REST API backend can be plugged in directly with zero refactoring.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono-val">
            <div className="p-3 bg-[var(--paper)] rounded-lg border border-[var(--line)]">
              <span className="text-[var(--forest)] font-bold block mb-1">Frontend (Active):</span>
              <span>React 19 + TypeScript + Vite + Tailwind CSS (Custom Brutalist tokens)</span>
            </div>
            <div className="p-3 bg-[var(--paper)] rounded-lg border border-[var(--line)]">
              <span className="text-[var(--forest)] font-bold block mb-1">Backend (Planned):</span>
              <span>Node.js + Express REST API endpoints (/api/sessions, /api/escrow)</span>
            </div>
            <div className="p-3 bg-[var(--paper)] rounded-lg border border-[var(--line)]">
              <span className="text-[var(--forest)] font-bold block mb-1">Database (Planned):</span>
              <span>MongoDB with Mongoose schemas for Users, Skills, and Proof Ledger</span>
            </div>
            <div className="p-3 bg-[var(--paper)] rounded-lg border border-[var(--line)]">
              <span className="text-[var(--forest)] font-bold block mb-1">Integrations (Planned):</span>
              <span>Firebase Auth, Google Calendar API for slots, FCM alerts</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
