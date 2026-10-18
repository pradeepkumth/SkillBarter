import React from 'react';
import { SkillListing } from '../types';
import { CreditCoin } from './CreditCoin';
import { 
  Flame, 
  TrendingUp, 
  Star, 
  UserCheck, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface PopularSwapsSectionProps {
  skills: SkillListing[];
  onSelectSkillToBook: (skill: SkillListing) => void;
  onViewTeacherProfile: (teacherId: string, teacherName: string) => void;
}

export const PopularSwapsSection: React.FC<PopularSwapsSectionProps> = ({
  skills,
  onSelectSkillToBook,
  onViewTeacherProfile,
}) => {
  // Sort skills by popularity (reviewsCount as proxy for completed swaps this week)
  const popularSwaps = [...skills]
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .slice(0, 4);

  return (
    <section className="brutal-card p-6 md:p-8 bg-[var(--paper)] space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[var(--ink)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)] flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[var(--mustard)] fill-[var(--mustard)]" />
              Campus Leaderboard
            </span>
            <span className="text-xs font-mono-val text-[var(--muted)]">
              Updated live from MM(DU) hostels &amp; labs
            </span>
          </div>
          <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[var(--ink)]">
            Most Popular Swaps This Week
          </h3>
          <p className="text-xs text-[var(--muted)] font-mono-val mt-1">
            The top skills campus students are exchanging right now. Click any student mentor to inspect their verified profile.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-val font-bold text-[var(--forest)] bg-[var(--paper-2)] px-3 py-1.5 rounded-lg border border-[var(--ink)]">
            Total 85+ Hours Swapped This Week
          </span>
        </div>
      </div>

      {/* Popular Swaps Leaderboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {popularSwaps.map((item, index) => (
          <div
            key={item.id}
            className="p-5 rounded-xl border-2 border-[var(--ink)] bg-[var(--card-bg)] brutal-shadow-sm flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
          >
            <div>
              {/* Card Header: Rank & Category */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[var(--forest)] text-[var(--paper)] font-mono-val text-xs font-bold flex items-center justify-center">
                    #{index + 1}
                  </span>
                  <span className="text-xs font-mono-val font-bold text-[var(--muted)]">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono-val text-xs font-bold text-[var(--forest)] bg-[var(--mint)]/40 px-2 py-0.5 rounded border border-[var(--forest)]">
                  <TrendingUp className="w-3 h-3" />
                  <span>{item.reviewsCount} Swaps Completed</span>
                </div>
              </div>

              {/* Skill Title */}
              <h4 className="font-serif-heading text-lg font-bold text-[var(--ink)] leading-snug mb-2">
                {item.title}
              </h4>

              <p className="text-xs text-[var(--muted)] leading-relaxed mb-4 line-clamp-2">
                {item.description}
              </p>
            </div>

            {/* Teacher Details with Clickable Profile Link */}
            <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onViewTeacherProfile(item.teacherId, item.teacherName)}
                className="text-left group cursor-pointer"
                title={`View ${item.teacherName}'s student profile & teaching stats`}
              >
                <div className="text-xs font-bold text-[var(--ink)] flex items-center gap-1.5 group-hover:text-[var(--forest)]">
                  <UserCheck className="w-3.5 h-3.5 text-[var(--forest)]" />
                  <span className="underline decoration-dotted">{item.teacherName}</span>
                </div>
                <div className="text-[11px] text-[var(--muted)] font-mono-val">
                  {item.teacherDept} · ★ {item.rating.toFixed(1)}
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectSkillToBook(item)}
                className="brutal-btn px-3 py-1.5 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer hover:bg-[var(--leaf)] flex-shrink-0"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Slot</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
