import React from 'react';
import { ExternalLink, BookOpen, Quote, CheckCircle } from 'lucide-react';

export const ReferencesSection: React.FC = () => {
  const references = [
    {
      citation: 'Chase, C. C., Chin, D. B., Oppezzo, M. A., & Schwartz, D. L. (2009).',
      title: 'Teachable Agents and the Protégé Effect: Increasing the Effort Towards Learning',
      source: 'Journal of Science Education and Technology, Stanford University School of Education',
      url: 'https://purl.stanford.edu/zm369yx3532',
      keyFinding: 'Students expend significantly more cognitive effort and develop deeper conceptual mastery when preparing to teach a peer than when studying purely for their own individual exam.',
      relevance: 'Forms the psychological foundation of SkillBarter: students who teach DSA or guitar crystallize their own expertise.',
    },
    {
      citation: 'Cahn, E. S., & Gray, C. (Stanford Social Innovation Review).',
      title: 'The Time Bank Solution',
      source: 'Stanford Social Innovation Review (SSIR)',
      url: 'https://ssir.org/articles/entry/the_time_bank_solution',
      keyFinding: 'Time-banking builds reciprocal social capital where every participant’s hour has equal intrinsic value, eliminating monetary barriers to vital support networks.',
      relevance: 'Demonstrates how time credits create trust in closed community campuses without wealth disparities.',
    },
    {
      citation: 'New Economics Foundation (NEF).',
      title: 'Time Banks: A Key to Co-Producing Public Services and Community Cohesion',
      source: 'New Economics Foundation Research Reports',
      url: 'https://neweconomics.org/2001/07/time-banks',
      keyFinding: 'Documented that participants in peer time exchanges developed stronger community resilience and active civic participation compared to traditional volunteer programs.',
      relevance: 'Provides economic models for credit limits, escrow protection, and peer reciprocity governance.',
    },
  ];

  return (
    <section id="references" className="py-16 md:py-24 bg-[var(--paper-2)] border-t-2 border-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block mb-3">
            Academic Research &amp; Foundations
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--ink)] tracking-tight">
            Scientific &amp; Economic References
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
            SkillBarter is not a random gimmick; it is grounded in published educational psychology on the Protégé Effect and established time-bank economics.
          </p>
        </div>

        {/* References Grid */}
        <div className="space-y-6">
          {references.map((ref, idx) => (
            <div
              key={idx}
              className="brutal-card p-6 md:p-8 bg-[var(--paper)] transition-all hover:-translate-y-0.5"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[11px] font-mono-val font-bold text-[var(--muted)] uppercase block mb-1">
                    {ref.citation}
                  </span>
                  <h3 className="font-serif-heading text-xl font-bold text-[var(--ink)] leading-snug">
                    {ref.title}
                  </h3>
                  <p className="text-xs text-[var(--forest)] font-mono-val mt-0.5">
                    {ref.source}
                  </p>
                </div>

                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn px-3 py-1.5 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded-lg flex items-center gap-1.5 whitespace-nowrap self-start cursor-pointer hover:bg-[var(--leaf)]"
                >
                  <span>Read Paper</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Finding & Relevance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[var(--line)] text-xs">
                <div className="p-3 bg-[var(--paper-2)]/70 rounded-lg border border-[var(--line)]">
                  <span className="font-bold text-[var(--forest)] font-mono-val block mb-1">
                    Key Finding:
                  </span>
                  <p className="text-[var(--ink)] leading-relaxed">
                    {ref.keyFinding}
                  </p>
                </div>

                <div className="p-3 bg-[var(--paper-2)]/70 rounded-lg border border-[var(--line)]">
                  <span className="font-bold text-[var(--forest)] font-mono-val block mb-1">
                    SkillBarter Application:
                  </span>
                  <p className="text-[var(--ink)] leading-relaxed">
                    {ref.relevance}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
