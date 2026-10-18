import React from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProblemSolutionProps {
  onExploreSystem: () => void;
}

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({ onExploreSystem }) => {
  const problemPairs = [
    {
      num: '01',
      problemTitle: 'Courses and tutors cost real money',
      problemDesc: 'Paid bootcamps cost thousands. Students on tight hostel allowances get locked out of learning guitar, spoken languages, or advanced design tools.',
      solutionTitle: '100% Student Time-Bank. Zero Rupees.',
      solutionDesc: 'You pay with your knowledge, not your UPI or pocket money. Teach 1 hour of Python, earn credits to learn 1 hour of guitar.',
      accent: 'var(--forest)',
    },
    {
      num: '02',
      problemTitle: 'YouTube videos are strictly one-way',
      problemDesc: 'When you get stuck on a compiler bug or fret buzzing at 11 PM, video tutorials cannot answer back or watch your fingers move.',
      solutionTitle: 'Real 1-on-1 peer mentoring with instant feedback',
      solutionDesc: 'Meet in the central library, hostel common room, or jump on Google Meet. Ask "Why did my recursive base case fail?" and get an instant answer.',
      accent: 'var(--leaf)',
    },
    {
      num: '03',
      problemTitle: 'WhatsApp peer help is scattered and thankless',
      problemDesc: 'You spend two hours debugging a classmate\'s assignment in a group chat, but nobody remembers it tomorrow and it does not help your resume.',
      solutionTitle: 'Verified teaching records that bolster your resume',
      solutionDesc: 'Every verified session creates a public cryptographic-grade proof record. Show campus recruiters that you actively taught 15+ peers.',
      accent: 'var(--mustard)',
    },
  ];

  return (
    <section id="problem-solution" className="py-16 md:py-24 bg-[var(--paper-2)] border-y-2 border-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block mb-3">
            The Campus Reality
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--ink)] tracking-tight">
            Why college peer-learning is currently broken.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
            We are surrounded by hundreds of smart classmates in classrooms and hostels, yet we pay outside companies or struggle alone in front of pre-recorded screens.
          </p>
        </div>

        {/* 3 Problem-Solution Comparison Cards (Asymmetric Cards) */}
        <div className="space-y-6">
          {problemPairs.map((item, idx) => (
            <div 
              key={item.num}
              className="brutal-card bg-[var(--paper)] overflow-hidden transition-all hover:-translate-y-0.5"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Problem Half */}
                <div className="p-6 md:p-8 md:col-span-5 bg-[var(--paper-2)]/50 border-b-2 md:border-b-0 md:border-r-2 border-[var(--line)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono-val font-bold text-[var(--rose)] uppercase flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> The Broken Normal
                    </span>
                    <span className="font-mono-val text-sm font-bold text-[var(--muted)]">
                      {item.num}
                    </span>
                  </div>
                  <h3 className="font-serif-heading text-xl font-bold text-[var(--ink)] mb-2">
                    {item.problemTitle}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {item.problemDesc}
                  </p>
                </div>

                {/* Solution Half (Highlighted) */}
                <div className="p-6 md:p-8 md:col-span-7 bg-[var(--card-bg)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono-val font-bold text-[var(--forest)] uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> The SkillBarter Fix
                      </span>
                      <span className="text-xs font-mono-val text-[var(--muted)] font-medium">
                        Student Time-Bank
                      </span>
                    </div>
                    <h3 className="font-serif-heading text-xl font-bold text-[var(--forest)] mb-2">
                      {item.solutionTitle}
                    </h3>
                    <p className="text-sm text-[var(--ink)] leading-relaxed">
                      {item.solutionDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono-val text-[var(--muted)]">
                    <span>Guaranteed by proof-of-learning</span>
                    <span className="text-[var(--forest)] font-bold">1 hr taught = credits earned</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Real Life Hostel Story Footer Note */}
        <div className="mt-10 p-6 brutal-card bg-[var(--paper)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono-val font-bold text-[var(--forest)] uppercase">
              Hostel 2 &amp; Central Library Pilot Note
            </span>
            <p className="text-sm text-[var(--ink)] font-medium">
              "You don't need a ₹15,000 course to master Git, LeetCode, or open chords. Your senior down the hall already knows it."
            </p>
          </div>
          <button
            onClick={onExploreSystem}
            className="brutal-btn px-4 py-2.5 bg-[var(--forest)] text-[var(--paper)] font-bold text-xs rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer hover:bg-[var(--leaf)]"
          >
            <span>See Credit Rules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
