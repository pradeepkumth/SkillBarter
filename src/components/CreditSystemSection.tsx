import React, { useState } from 'react';
import { CreditCoin } from './CreditCoin';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw,
  Coins,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

export const CreditSystemSection: React.FC = () => {
  // Interactive Riya Wallet Story Step
  const [storyStep, setStoryStep] = useState<number>(0);

  // Interactive Simulator State
  const [simStarting, setSimStarting] = useState<number>(6.0);
  const [simBookings, setSimBookings] = useState<number>(1);
  const [simTeachSessions, setSimTeachSessions] = useState<number>(1);

  const riyaSteps = [
    {
      stepNum: 1,
      title: 'College Onboarding Grant',
      action: 'Riya verifies her @mmumullana.ac.in student email.',
      available: 6.0,
      held: 0.0,
      total: 6.0,
      changeText: '+6.0 starter credits',
      tag: 'One-time Grant',
      badgeColor: 'var(--mint)',
      narrative: 'Riya joins SkillBarter as a 2nd year B.Tech student. The campus time-bank immediately credits her wallet with 6.0 free starter credits.',
    },
    {
      stepNum: 2,
      title: 'Books Aman for Acoustic Guitar',
      action: 'Locks a 1-hour session on Tuesday 5:30 PM.',
      available: 4.0,
      held: 2.0,
      total: 6.0,
      changeText: '2.0 credits moved to escrow',
      tag: 'Escrow Lock',
      badgeColor: 'var(--mustard)',
      narrative: 'To ensure both students show up at the hostel common room, 2.0 credits are temporarily held in safe escrow for up to 24 hours. Available balance is now 4.0.',
    },
    {
      stepNum: 3,
      title: 'Passes Proof Quiz with Aman',
      action: 'Answers 3 chord questions correctly; both tap confirm.',
      available: 5.5,
      held: 0.0,
      total: 5.5,
      changeText: '1.5 returned (net spent: 0.5) · Aman earns 5.0',
      tag: 'Session Verified',
      badgeColor: 'var(--forest)',
      narrative: 'The proof quiz is passed! Riya gets 1.5 credits back from the 2.0 hold, so learning guitar only cost her 0.5 net credits! Aman receives 5.0 newly minted credits for his teaching hour.',
    },
    {
      stepNum: 4,
      title: 'Teaches Neha Python & OOP',
      action: 'Mentors a 1st year junior on Python functions & debugging.',
      available: 10.5,
      held: 0.0,
      total: 10.5,
      changeText: '+5.0 teaching credits earned',
      tag: 'Teaching Payout',
      badgeColor: 'var(--forest)',
      narrative: 'Riya hosts a 1-hour Python session with Neha in the CSE lab. Neha passes the proof quiz. Riya earns 5.0 credits, boosting her wallet balance to 10.5 credits!',
    },
  ];

  // Calculated values for simulator
  // Each booking held = 2, after pass returns 1.5 (net -0.5)
  // Each teach session earns +5.0
  const simCalculatedBalance = Math.max(0, simStarting - simBookings * 0.5 + simTeachSessions * 5.0);

  return (
    <section id="credit-system" className="py-16 md:py-24 bg-[var(--paper-2)] border-b-2 border-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)]">
              Anti-Inflation Time-Bank Economics
            </span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--ink)] tracking-tight">
            The Credit System: Proof, Escrow &amp; Fair Swaps
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
            A closed-loop campus micro-economy. Credits are minted only when genuine learning happens, and locked in escrow to prevent flake-outs.
          </p>

          {/* Prompt Mandatory Note */}
          <div className="mt-4 inline-flex items-center gap-2 p-2.5 bg-[var(--paper)] border-2 border-[var(--ink)] brutal-shadow-sm rounded-lg text-xs font-mono-val text-[var(--ink)]">
            <Info className="w-4 h-4 text-[var(--forest)] flex-shrink-0" />
            <span>
              <strong>Pilot Notice:</strong> All numbers are illustrative until tested in the pilot.
            </span>
          </div>
        </div>

        {/* Transaction Flow Diagram (Animated / Visual Card) */}
        <div className="mb-14 brutal-card p-6 md:p-8 bg-[var(--card-bg)]">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-[var(--mustard)]" />
              <h3 className="font-serif-heading text-xl font-bold text-[var(--ink)]">
                Standard Session Escrow &amp; Settlement Flow
              </h3>
            </div>
            <span className="text-xs font-mono-val font-bold text-[var(--forest)] hidden sm:inline">
              1 Verified Session = 1 Hour
            </span>
          </div>

          {/* Visual Step-by-Step Transaction Stages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            
            {/* Stage 1: Wallet Entry */}
            <div className="p-4 rounded-xl bg-[var(--paper-2)] border-2 border-[var(--ink)] relative">
              <span className="text-[10px] font-mono-val font-bold text-[var(--muted)] uppercase block mb-1">
                Phase 1: Booking
              </span>
              <div className="text-sm font-bold text-[var(--ink)] mb-2">Escrow Lock</div>
              <div className="flex items-center gap-2 my-2">
                <CreditCoin amount={2.0} size="sm" />
                <span className="text-xs font-mono-val text-[var(--rose)] font-semibold">Held from Learner</span>
              </div>
              <p className="text-[11px] text-[var(--muted)] leading-tight">
                Held safely for up to 24 hours until the session takes place.
              </p>
            </div>

            {/* Stage 2: Peer Session */}
            <div className="p-4 rounded-xl bg-[var(--paper-2)] border-2 border-[var(--ink)] relative">
              <span className="text-[10px] font-mono-val font-bold text-[var(--forest)] uppercase block mb-1">
                Phase 2: 1-on-1 Practice
              </span>
              <div className="text-sm font-bold text-[var(--ink)] mb-2">Campus or Meet</div>
              <div className="text-xs font-mono-val text-[var(--ink)] my-2 font-medium">
                ⏱️ 45 - 60 min session
              </div>
              <p className="text-[11px] text-[var(--muted)] leading-tight">
                Hands-on practice. Both peers meet in the hostel, library, or online.
              </p>
            </div>

            {/* Stage 3: Proof Quiz */}
            <div className="p-4 rounded-xl bg-[var(--mint)]/40 border-2 border-[var(--ink)] relative">
              <span className="text-[10px] font-mono-val font-bold text-[var(--forest)] uppercase block mb-1">
                Phase 3: Proof
              </span>
              <div className="text-sm font-bold text-[var(--ink)] mb-2">Comprehension Quiz</div>
              <div className="text-xs font-mono-val text-[var(--forest)] font-bold my-2">
                ✓ 2-3 Skill Questions
              </div>
              <p className="text-[11px] text-[var(--ink)] leading-tight">
                Learner answers core concept questions + both peers tap confirm.
              </p>
            </div>

            {/* Stage 4: Mint & Release */}
            <div className="p-4 rounded-xl bg-[var(--forest)] text-[var(--paper)] border-2 border-[var(--ink)] relative brutal-shadow-sm">
              <span className="text-[10px] font-mono-val font-bold text-[var(--mint)] uppercase block mb-1">
                Phase 4: Settlement
              </span>
              <div className="text-sm font-bold text-[var(--paper)] mb-2">Dual Payout</div>
              <div className="text-xs font-mono-val text-[var(--mint)] font-bold my-1">
                Teacher: +5.0 Credits
              </div>
              <div className="text-xs font-mono-val text-[var(--mustard)] font-bold mb-1">
                Learner Refund: +1.5 Credits
              </div>
              <p className="text-[11px] text-[var(--paper)]/80 leading-tight">
                Learner only spent 0.5 credits net! Teacher justly compensated.
              </p>
            </div>

          </div>
        </div>

        {/* Section 4.1: Example Wallet Story (Riya's Journey) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Column: Interactive Story Stepper */}
          <div className="lg:col-span-7 brutal-card p-6 md:p-8 bg-[var(--paper)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono-val font-bold text-[var(--forest)] uppercase">
                  Real Campus Walkthrough
                </span>
                <h3 className="font-serif-heading text-2xl font-bold text-[var(--ink)]">
                  Riya's Wallet Story
                </h3>
              </div>
              <div className="flex items-center gap-1 font-mono-val text-xs">
                <span>Step {storyStep + 1} of {riyaSteps.length}</span>
              </div>
            </div>

            {/* Story Navigation Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {riyaSteps.map((s, idx) => (
                <button
                  key={s.stepNum}
                  onClick={() => setStoryStep(idx)}
                  className={`brutal-btn px-3 py-1.5 rounded-lg text-xs font-mono-val font-bold whitespace-nowrap cursor-pointer ${
                    storyStep === idx
                      ? 'bg-[var(--forest)] text-[var(--paper)]'
                      : 'bg-[var(--paper-2)] text-[var(--ink)] hover:bg-[var(--line)]'
                  }`}
                >
                  Step {s.stepNum}
                </button>
              ))}
            </div>

            {/* Active Story Card */}
            <div className="p-5 bg-[var(--paper-2)] border-2 border-[var(--ink)] rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono-val font-bold border border-[var(--ink)] bg-[var(--paper)]">
                  {riyaSteps[storyStep].tag}
                </span>
                <span className="text-xs font-mono-val font-bold text-[var(--forest)]">
                  {riyaSteps[storyStep].changeText}
                </span>
              </div>

              <h4 className="font-serif-heading text-xl font-bold text-[var(--ink)]">
                {riyaSteps[storyStep].title}
              </h4>

              <p className="text-sm text-[var(--ink)] leading-relaxed">
                {riyaSteps[storyStep].narrative}
              </p>

              {/* Riya Wallet Snapshot Box */}
              <div className="p-3 bg-[var(--card-bg)] border border-[var(--ink)] rounded-lg grid grid-cols-3 gap-2 text-center font-mono-val">
                <div>
                  <div className="text-[10px] text-[var(--muted)] uppercase font-semibold">Available</div>
                  <div className="text-base font-bold text-[var(--forest)]">
                    {riyaSteps[storyStep].available.toFixed(1)} Credits
                  </div>
                </div>
                <div className="border-x border-[var(--line)]">
                  <div className="text-[10px] text-[var(--muted)] uppercase font-semibold">Held (Escrow)</div>
                  <div className={`text-base font-bold ${riyaSteps[storyStep].held > 0 ? 'text-[var(--rose)]' : 'text-[var(--muted)]'}`}>
                    {riyaSteps[storyStep].held.toFixed(1)} Credits
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--muted)] uppercase font-semibold">Total Net</div>
                  <div className="text-base font-bold text-[var(--ink)]">
                    {riyaSteps[storyStep].total.toFixed(1)} Credits
                  </div>
                </div>
              </div>

              {/* Navigation button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={storyStep === 0}
                  onClick={() => setStoryStep((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 text-xs font-bold text-[var(--ink)] disabled:opacity-30 cursor-pointer"
                >
                  ← Previous Action
                </button>
                <button
                  disabled={storyStep === riyaSteps.length - 1}
                  onClick={() => setStoryStep((prev) => Math.min(riyaSteps.length - 1, prev + 1))}
                  className="brutal-btn px-4 py-1.5 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-30"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Platform Safeguards & Rules */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="brutal-card p-6 bg-[var(--paper)]">
              <h4 className="font-serif-heading text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--forest)]" />
                Anti-Gaming Platform Rules
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-[var(--ink)]">
                <div className="p-2.5 rounded-lg bg-[var(--paper-2)] border border-[var(--line)]">
                  <strong className="text-[var(--forest)] block font-mono-val">
                    1. Pair Frequency Limit:
                  </strong>
                  Maximum 2 sessions per week between the exact same learner-teacher pair to prevent collusion circles.
                </div>

                <div className="p-2.5 rounded-lg bg-[var(--paper-2)] border border-[var(--line)]">
                  <strong className="text-[var(--forest)] block font-mono-val">
                    2. Daily Earning Cap:
                  </strong>
                  A student cannot earn more than 10.0 teaching credits in a single day, prioritizing academics over hoarding.
                </div>

                <div className="p-2.5 rounded-lg bg-[var(--paper-2)] border border-[var(--line)]">
                  <strong className="text-[var(--forest)] block font-mono-val">
                    3. Trust Score Multipliers:
                  </strong>
                  New unverified accounts earn credits at a conservative 1.0x rate. Mentors with 10+ positive verified ratings gain priority matching.
                </div>

                <div className="p-2.5 rounded-lg bg-[var(--paper-2)] border border-[var(--line)]">
                  <strong className="text-[var(--forest)] block font-mono-val">
                    4. Zero Credit Creation Without Proof:
                  </strong>
                  Credits are ONLY generated if both students submit verification and the learner passes the proof quiz.
                </div>
              </div>
            </div>

            {/* Quick Interactive Mini-Calculator */}
            <div className="brutal-card p-6 bg-[var(--card-bg)]">
              <h4 className="font-serif-heading text-base font-bold text-[var(--ink)] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[var(--mustard)]" />
                Interactive Credit Calculator
              </h4>
              <p className="text-xs text-[var(--muted)] mb-4">
                Calculate what your balance would be after learning and teaching sessions.
              </p>

              <div className="space-y-3 text-xs font-mono-val">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--ink)]">Starter Grant:</span>
                  <span className="font-bold">6.0 Credits</span>
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="sim-book" className="text-[var(--ink)]">Sessions you attend as learner (net -0.5 credits):</label>
                  <input
                    id="sim-book"
                    type="number"
                    min="0"
                    max="10"
                    value={simBookings}
                    onChange={(e) => setSimBookings(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-16 p-1 border border-[var(--ink)] rounded text-center bg-[var(--paper)] font-bold"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="sim-teach" className="text-[var(--ink)]">Sessions you teach others (+5.0 credits):</label>
                  <input
                    id="sim-teach"
                    type="number"
                    min="0"
                    max="10"
                    value={simTeachSessions}
                    onChange={(e) => setSimTeachSessions(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-16 p-1 border border-[var(--ink)] rounded text-center bg-[var(--paper)] font-bold"
                  />
                </div>

                <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="font-bold text-[var(--ink)]">Projected Wallet:</span>
                  <span className="text-base font-bold text-[var(--forest)] font-mono-val">
                    {simCalculatedBalance.toFixed(1)} Credits
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
