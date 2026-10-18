import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Sparkles, 
  Lock, 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  RefreshCw, 
  AlertTriangle,
  Award,
  ArrowDown,
  ArrowRight
} from 'lucide-react';

interface FlowchartHowItWorksProps {
  onStartBookingDemo?: () => void;
}

export const FlowchartHowItWorks: React.FC<FlowchartHowItWorksProps> = ({ onStartBookingDemo }) => {
  const [activeStep, setActiveStep] = useState<number>(6); // Default highlight proof step

  const steps = [
    {
      step: 1,
      title: 'Join with College Email',
      subtitle: 'Verification & Starter Grant',
      icon: GraduationCap,
      color: 'var(--forest)',
      summary: 'Sign up with your official college email domain (e.g., @mmumullana.ac.in). You instantly receive 6.0 free starter credits to kick off your time-bank journey.',
      details: 'One-time onboarding grant. Only students from verified campuses can participate. No external spammers.',
    },
    {
      step: 2,
      title: 'Ask or Search a Skill',
      subtitle: 'Search directory or post need',
      icon: Search,
      color: 'var(--leaf)',
      summary: 'Filter through student peer listings by topic (DSA, Guitar, Python, Excel, Design) or post an open swap request.',
      details: 'Browse peer profiles, view their teaching history, feedback ratings, and available timetable slots.',
    },
    {
      step: 3,
      title: 'Match Peer & Slot',
      subtitle: 'Rule-based matching',
      icon: Sparkles,
      color: 'var(--forest)',
      summary: 'Matches you with peers whose free hours match your hostel or campus study schedule (AI-powered semantic matching planned for Phase 3).',
      details: 'Match score evaluates skill level match, mutual free periods, and location preference (Library vs. Online).',
    },
    {
      step: 4,
      title: 'Book & Escrow Hold',
      subtitle: '2.0 credits held safely',
      icon: Lock,
      color: 'var(--mustard)',
      summary: 'Select a confirmed slot. Exactly 2.0 credits are temporarily held in time-bank escrow for up to 24 hours.',
      details: 'Credits are NOT transferred yet. They sit in a protected escrow lock to ensure both parties show up on time.',
    },
    {
      step: 5,
      title: 'Learn 1-on-1',
      subtitle: 'Campus library or Meet',
      icon: BookOpen,
      color: 'var(--forest)',
      summary: 'Meet your peer mentor. 45 to 60 minutes of hands-on, live practice—finger positions on guitar, live code debugging, or Excel formulas.',
      details: 'Personalized attention with screen-sharing or face-to-face peer interaction in campus common areas.',
    },
    {
      step: 6,
      title: 'Prove the Learning',
      subtitle: 'Mini-quiz + mutual confirmation',
      icon: CheckCircle,
      color: 'var(--mustard)',
      summary: 'At the end of the session, the learner takes a short 2 to 3 question comprehension quiz and both peers tap confirm.',
      details: 'Prevents fraudulent credit generation. Fake or ghost sessions cannot pass without mutual confirmation and quiz submission.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[var(--paper)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block mb-3">
            The 6-Step Exchange Flow
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--ink)] tracking-tight">
            How a fair peer swap works.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
            Every minute of teaching is recorded. Every credit spent is backed by proof of learning. No fake sessions, no wasted time.
          </p>
        </div>

        {/* The 6 Linear Steps (Numbered Flowchart Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((item) => {
            const Icon = item.icon;
            const isSelected = activeStep === item.step;

            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`brutal-card p-6 cursor-pointer transition-all relative ${
                  isSelected 
                    ? 'ring-2 ring-[var(--forest)] bg-[var(--paper-2)] -translate-y-1' 
                    : 'bg-[var(--card-bg)] hover:-translate-y-0.5'
                }`}
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--paper)] border-2 border-[var(--ink)] flex items-center justify-center font-mono-val font-black text-sm text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]">
                    {item.step}
                  </div>
                  <span className="text-[11px] font-mono-val font-semibold text-[var(--muted)]">
                    STEP {item.step} OF 6
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-[var(--forest)] flex-shrink-0" />
                  <h3 className="font-serif-heading text-lg font-bold text-[var(--ink)]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs font-mono-val font-bold text-[var(--forest)] mb-2">
                  {item.subtitle}
                </p>

                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {item.summary}
                </p>

                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-[var(--line)] text-xs text-[var(--ink)] font-medium bg-[var(--mint)]/30 p-2 rounded">
                    📌 {item.details}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Central Dashed Flow Connector */}
        <div className="my-10 flex flex-col items-center justify-center">
          <div className="h-8 border-l-2 border-dashed border-[var(--ink)]" />
          <div className="px-4 py-2 brutal-card bg-[var(--mustard)] text-[var(--ink)] font-mono-val font-black text-xs sm:text-sm flex items-center gap-2 tilt-left">
            <HelpCircle className="w-4 h-4" />
            <span>DECISION FORK: Quiz Passed + Both Sides Confirmed?</span>
          </div>
          <div className="h-8 border-l-2 border-dashed border-[var(--ink)]" />
        </div>

        {/* Decision Split: Two Outcome Paths (YES vs NO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* YES Path (Mint / Forest) */}
          <div className="brutal-card p-6 md:p-8 bg-[var(--card-bg)] border-2 border-[var(--forest)]">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded bg-[var(--mint)] text-[var(--forest)] border border-[var(--ink)] text-xs font-mono-val font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                PATH A: YES (VERIFIED SUCCESS)
              </span>
              <span className="text-xs font-mono-val text-[var(--forest)] font-bold">Standard Outcome</span>
            </div>

            <h4 className="font-serif-heading text-xl font-bold text-[var(--forest)] mb-3">
              Credits Released &amp; Resume Record Minted
            </h4>

            <ul className="space-y-3 text-xs sm:text-sm text-[var(--ink)]">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--mint)] text-[var(--forest)] font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                <span>
                  <strong>Teacher earns 5.0 credits</strong> minted directly to their available balance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--mint)] text-[var(--forest)] font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                <span>
                  <strong>Learner receives 1.5 credits back</strong> from the 2.0 escrow hold (learner spends only 0.5 net credits!).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--mint)] text-[var(--forest)] font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                <span>
                  <strong>Reputation &amp; Badges:</strong> Trust score rises, learning streak increments by +1, and verified skill card added to student profile.
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono-val text-[var(--forest)]">
              <span>Result: Win-Win Campus Growth</span>
              <span className="font-bold">Net: Learner -0.5 credits / Teacher +5.0 credits</span>
            </div>
          </div>

          {/* NO Path (Rose / Refund & Dispute) */}
          <div className="brutal-card p-6 md:p-8 bg-[var(--card-bg)] border-2 border-[var(--rose)]">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded bg-[var(--paper-2)] text-[var(--rose)] border border-[var(--ink)] text-xs font-mono-val font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[var(--rose)]" />
                PATH B: NO (FAILED OR NO-SHOW)
              </span>
              <span className="text-xs font-mono-val text-[var(--rose)] font-bold">Protected Escrow</span>
            </div>

            <h4 className="font-serif-heading text-xl font-bold text-[var(--rose)] mb-3">
              100% Escrow Refund &amp; Safety Review
            </h4>

            <ul className="space-y-3 text-xs sm:text-sm text-[var(--ink)]">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--paper-2)] text-[var(--rose)] font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✕</span>
                <span>
                  <strong>All 2.0 credits returned:</strong> Escrow hold is released entirely back to the learner's available balance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--paper-2)] text-[var(--rose)] font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✕</span>
                <span>
                  <strong>Zero unearned credits created:</strong> The teacher earns 0 credits if the session did not take place or quiz was skipped.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--paper-2)] text-[var(--rose)] font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✕</span>
                <span>
                  <strong>Dispute &amp; Trust Penalty:</strong> Repeated no-shows or griefing lowers the user trust score and restricts booking rights.
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono-val text-[var(--rose)]">
              <span>Zero-loss guarantee for learners</span>
              <span className="font-bold">Net: Learner 0.0 credits / Teacher 0.0 credits</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
