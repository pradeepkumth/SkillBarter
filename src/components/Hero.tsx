import React from 'react';
import { 
  SkillSwapDuoIllustration, 
  StudentGuitarIllustration, 
  StudentCoderIllustration, 
  StudentPythonIllustration, 
  StudentExcelIllustration 
} from './StudentIllustrations';
import { SquiggleUnderline } from './SquiggleUnderline';
import { ArrowRight, GraduationCap, ShieldCheck, Clock, Users, BookOpen, LogIn } from 'lucide-react';

import { UserProfile } from '../types';

interface HeroProps {
  user: UserProfile | null;
  onJoinClick: () => void;
  onLoginClick: () => void;
  onBrowseClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  user,
  onJoinClick,
  onLoginClick,
  onBrowseClick,
  onHowItWorksClick,
}) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      
      {/* Hand-crafted sticker badge at top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--paper-2)] border-2 border-[var(--ink)] brutal-shadow-sm rounded-lg tilt-left hover:rotate-0 transition-transform cursor-pointer"
             onClick={user ? undefined : onJoinClick}>
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--forest)] animate-pulse" />
          <span className="text-xs font-mono-val font-bold text-[var(--ink)]">
            🎓 CodeStorm 2026 Hackathon Project · Team Binary Beast
          </span>
          <span className="text-xs font-bold text-[var(--forest)] bg-[var(--mint)] px-1.5 py-0.5 rounded border border-[var(--ink)]">
            MM(DU) Mullana
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Bold Asymmetric Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="relative">
              <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] leading-[1.1] tracking-tight">
                You know guitar. <br />
                Your hostel-mate knows DSA. <br />
                <span className="relative inline-block text-[var(--forest)]">
                  Swap.
                  <SquiggleUnderline color="var(--mustard)" className="absolute -bottom-2 left-0 right-0 w-full" />
                </span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-[var(--ink)] font-normal leading-relaxed max-w-xl">
              <span className="font-bold">SkillBarter</span> is a campus-only skill-swap platform for college students. 
              Teach what you know to earn time credits. Spend them to learn what you need from a peer. 
              <span className="font-bold underline decoration-[var(--mustard)] decoration-2"> Zero money involved.</span>
            </p>

            {/* Real Campus Hostel Story Callout Box */}
            <div className="p-4 bg-[var(--paper-2)] border-2 border-[var(--ink)] brutal-shadow rounded-xl max-w-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl select-none">🎸</span>
                <div className="text-sm text-[var(--ink)] space-y-1">
                  <p className="font-bold text-xs uppercase tracking-wider text-[var(--forest)] font-mono-val">
                    The Campus Dilemma
                  </p>
                  <p className="leading-snug">
                    Someone in your hostel corridor plays acoustic guitar, and you know binary search trees for upcoming placement rounds. 
                    Without a campus time-bank, you two might never connect.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs and 6 Free Credits Sticker */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              
              {!user ? (
                <>
                  <button
                    onClick={onJoinClick}
                    className="brutal-btn px-6 py-3.5 bg-[var(--forest)] text-[var(--paper)] font-bold rounded-xl text-sm sm:text-base flex items-center gap-2 cursor-pointer hover:bg-[var(--leaf)]"
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Sign Up (6 Free Credits)</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  <button
                    onClick={onLoginClick}
                    className="brutal-btn px-5 py-3.5 bg-[var(--paper-2)] text-[var(--ink)] font-bold rounded-xl text-sm sm:text-base flex items-center gap-2 cursor-pointer hover:bg-[var(--line)] border-2 border-[var(--ink)]"
                  >
                    <LogIn className="w-4 h-4 text-[var(--forest)]" />
                    <span>Log In to Account</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[var(--mint)] border-2 border-[var(--ink)] rounded-xl text-xs font-mono-val font-bold text-[var(--forest)] flex items-center gap-2">
                    <span>👋 Logged in as {user.name}</span>
                    <span>({user.availableCredits.toFixed(1)} Credits)</span>
                  </div>
                </div>
              )}

              <button
                onClick={onBrowseClick}
                className="brutal-btn px-4 py-3 bg-[var(--paper)] text-[var(--ink)] font-semibold rounded-xl text-sm flex items-center gap-2 cursor-pointer hover:bg-[var(--line)]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Browse Skills</span>
              </button>

              {/* Hand-made sticker */}
              <div className="tilt-right inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--mustard)] text-[var(--ink)] border-2 border-[var(--ink)] brutal-shadow-sm rounded-lg font-mono-val text-xs font-black select-none">
                <span>🎁</span>
                <span>6 FREE STARTER CREDITS</span>
              </div>
            </div>

            {/* Trust Points - Clean unboxed text as per design principles */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5 text-[var(--ink)] font-medium">
                <ShieldCheck className="w-4 h-4 text-[var(--forest)]" /> Verified college IDs only
              </span>
              <span aria-hidden="true" className="text-[var(--line)]">·</span>
              <span className="inline-flex items-center gap-1.5 text-[var(--ink)] font-medium">
                <Clock className="w-4 h-4 text-[var(--forest)]" /> Time-bank escrow (2 held)
              </span>
              <span aria-hidden="true" className="text-[var(--line)]">·</span>
              <span className="inline-flex items-center gap-1.5 text-[var(--ink)] font-medium">
                <Users className="w-4 h-4 text-[var(--forest)]" /> Proof quiz unlocks credits
              </span>
            </div>

          </div>

          {/* Right Column: Hand-crafted Student Swap Illustration & Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* The main swap graphic */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <SkillSwapDuoIllustration className="w-full brutal-shadow-lg" />
              
              {/* Floating sticky-note style card */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-[var(--mint)] border-2 border-[var(--ink)] brutal-shadow p-3.5 rounded-xl max-w-[240px] tilt-left hidden sm:block">
                <div className="text-[11px] font-mono-val font-bold uppercase text-[var(--forest)]">
                  Live Exchange Rule
                </div>
                <p className="text-xs text-[var(--ink)] mt-1 font-medium leading-tight">
                  Pass the 3-question mini-quiz together. Teacher gets 5 credits, Learner pays only 0.5 credits net.
                </p>
              </div>

              {/* Corner badge */}
              <div className="absolute -top-4 -right-2 bg-[var(--paper)] border-2 border-[var(--ink)] px-2.5 py-1 rounded-md brutal-shadow-sm font-mono-val text-[11px] text-[var(--ink)] font-bold">
                1 Hour = 1 Fair Swap
              </div>
            </div>

          </div>

        </div>

        {/* Small Cartoon Student Mini-Gallery: 4 Skills Swapped */}
        <div className="mt-14 pt-8 border-t-2 border-[var(--line)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--muted)]">
              Popular Swaps on Campus This Week
            </span>
            <button
              onClick={onHowItWorksClick}
              className="text-xs font-bold text-[var(--forest)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              See how the 6-step flow works →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="brutal-card p-3 flex items-center gap-3 bg-[var(--paper)] hover:-translate-y-1 transition-transform cursor-pointer"
                 onClick={onBrowseClick}>
              <div className="w-14 h-14 flex-shrink-0">
                <StudentGuitarIllustration size={56} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[var(--ink)] truncate">Acoustic Guitar</div>
                <div className="text-[11px] text-[var(--muted)] font-mono-val">Aman · 16 swaps</div>
              </div>
            </div>

            <div className="brutal-card p-3 flex items-center gap-3 bg-[var(--paper)] hover:-translate-y-1 transition-transform cursor-pointer"
                 onClick={onBrowseClick}>
              <div className="w-14 h-14 flex-shrink-0">
                <StudentCoderIllustration size={56} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[var(--ink)] truncate">DSA & Trees</div>
                <div className="text-[11px] text-[var(--muted)] font-mono-val">Pradeep · 22 swaps</div>
              </div>
            </div>

            <div className="brutal-card p-3 flex items-center gap-3 bg-[var(--paper)] hover:-translate-y-1 transition-transform cursor-pointer"
                 onClick={onBrowseClick}>
              <div className="w-14 h-14 flex-shrink-0">
                <StudentPythonIllustration size={56} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[var(--ink)] truncate">Python & Pandas</div>
                <div className="text-[11px] text-[var(--muted)] font-mono-val">Dhanesh · 19 swaps</div>
              </div>
            </div>

            <div className="brutal-card p-3 flex items-center gap-3 bg-[var(--paper)] hover:-translate-y-1 transition-transform cursor-pointer"
                 onClick={onBrowseClick}>
              <div className="w-14 h-14 flex-shrink-0">
                <StudentExcelIllustration size={56} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[var(--ink)] truncate">Excel & Models</div>
                <div className="text-[11px] text-[var(--muted)] font-mono-val">Ananya · 11 swaps</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
