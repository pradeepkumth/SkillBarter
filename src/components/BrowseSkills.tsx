import React, { useState, useMemo } from 'react';
import { SkillListing, SkillCategory } from '../types';
import { CreditCoin } from './CreditCoin';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star, 
  UserCheck, 
  BookOpen, 
  Calendar,
  Sparkles,
  CheckCircle2,
  Plus
} from 'lucide-react';

interface BrowseSkillsProps {
  skills: SkillListing[];
  onSelectSkillToBook: (skill: SkillListing) => void;
  onOpenTeachModal: () => void;
  onViewTeacherProfile?: (teacherId: string, teacherName: string) => void;
}

export const BrowseSkills: React.FC<BrowseSkillsProps> = ({
  skills,
  onSelectSkillToBook,
  onOpenTeachModal,
  onViewTeacherProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');

  const categories = ['All', 'Coding', 'Music & Creative', 'Academics & Tools', 'Productivity & Languages'];

  const filteredSkills = useMemo(() => {
    return skills.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;

      const matchesLoc =
        selectedLocation === 'All' ||
        (selectedLocation === 'Campus' && item.locationType.includes('Campus')) ||
        (selectedLocation === 'Online' && item.locationType.includes('Online'));

      return matchesSearch && matchesCat && matchesLoc;
    });
  }, [skills, searchQuery, selectedCategory, selectedLocation]);

  return (
    <section id="browse-skills" className="py-16 md:py-24 bg-[var(--paper)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)]">
                Peer Marketplace
              </span>
              <span className="text-xs font-mono-val text-[var(--muted)]">
                Sample data – MM(DU) Campus Pilot
              </span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--ink)] tracking-tight">
              Browse Campus Skills
            </h2>
            <p className="mt-2 text-base text-[var(--muted)] max-w-2xl">
              Real college peers offering 1-on-1 time for code, music, design, and exams. 
              Booking holds 2.0 credits in escrow until your proof quiz is passed.
            </p>
          </div>

          <button
            onClick={onOpenTeachModal}
            className="brutal-btn px-4 py-2.5 bg-[var(--forest)] text-[var(--paper)] font-bold text-xs rounded-xl flex items-center gap-2 self-start md:self-auto cursor-pointer hover:bg-[var(--leaf)]"
          >
            <Plus className="w-4 h-4" />
            <span>Offer a Skill You Know</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="brutal-card p-4 md:p-6 bg-[var(--paper-2)] mb-8 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills (e.g. 'DSA', 'Acoustic Guitar', 'Python', 'Excel', 'Aman')..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] text-sm placeholder:text-[var(--muted)] focus:outline-none"
              />
            </div>

            {/* Location Filter */}
            <div className="md:col-span-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--muted)] flex-shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full py-2.5 px-3 rounded-lg border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] text-sm font-medium focus:outline-none"
              >
                <option value="All">All Locations (Campus &amp; Online)</option>
                <option value="Campus">Hostel &amp; Library Only</option>
                <option value="Online">Google Meet Only</option>
              </select>
            </div>
          </div>

          {/* Interactive Category Segmented Tabs (Functional filter controls) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            <span className="text-xs font-mono-val font-bold text-[var(--muted)] uppercase mr-1 hidden sm:inline">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`brutal-btn px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--forest)] text-[var(--paper)] font-bold'
                    : 'bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Results Count & Sample Data Tag */}
        <div className="flex items-center justify-between text-xs font-mono-val text-[var(--muted)] mb-6 px-1">
          <span>Showing {filteredSkills.length} available peer skills</span>
          <span className="font-semibold text-[var(--forest)]">
            Rule-based match score active
          </span>
        </div>

        {/* Skill Cards Grid */}
        {filteredSkills.length === 0 ? (
          <div className="brutal-card p-12 text-center bg-[var(--paper)] space-y-3">
            <p className="font-serif-heading text-xl font-bold text-[var(--ink)]">
              No matching campus skills found.
            </p>
            <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
              Be the first to list this topic! Teach a classmate and earn 5.0 credits towards your next skill swap.
            </p>
            <button
              onClick={onOpenTeachModal}
              className="brutal-btn px-4 py-2 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded-lg cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> List "{searchQuery || 'Skill'}" to Teach
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((item) => (
              <div
                key={item.id}
                className="brutal-card bg-[var(--card-bg)] flex flex-col justify-between hover:-translate-y-1 transition-transform relative group"
              >
                
                {/* Card Top: Quiet Unboxed Metadata (Design Constitution Rule) */}
                <div className="p-6 pb-4">
                  
                  {/* Clean unboxed text line instead of badges */}
                  <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mb-2 font-mono-val">
                    <span className="font-semibold text-[var(--forest)]">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.locationType}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-heading text-xl font-bold text-[var(--ink)] leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[var(--muted)] leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Topics Covered (Quiet text list) */}
                  <div className="mb-4 pt-3 border-t border-[var(--line)]">
                    <span className="text-[10px] font-mono-val font-bold uppercase tracking-wider text-[var(--muted)] block mb-1.5">
                      Session Highlights
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] font-mono-val text-[var(--ink)]">
                      {item.topics.map((topic, i) => (
                        <span key={i} className="bg-[var(--paper-2)] px-2 py-0.5 rounded border border-[var(--line)]">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Teacher & Rating Meta (Clean unboxed format) */}
                  <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => onViewTeacherProfile && onViewTeacherProfile(item.teacherId, item.teacherName)}
                      className="text-left group/teacher cursor-pointer"
                      title="View student profile & teaching stats"
                    >
                      <div className="font-bold text-[var(--ink)] flex items-center gap-1.5 group-hover/teacher:text-[var(--forest)]">
                        <UserCheck className="w-3.5 h-3.5 text-[var(--forest)]" />
                        <span className="underline decoration-dotted">{item.teacherName}</span>
                      </div>
                      <div className="text-[11px] text-[var(--muted)] font-mono-val">
                        {item.teacherDept}
                      </div>
                    </button>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-[var(--ink)] font-bold font-mono-val">
                        <Star className="w-3.5 h-3.5 fill-[var(--mustard)] text-[var(--mustard)]" />
                        {item.rating.toFixed(1)}
                      </div>
                      <div className="text-[10px] text-[var(--muted)] font-mono-val">
                        {item.reviewsCount} verified swaps
                      </div>
                    </div>
                  </div>

                </div>

                {/* Card Bottom: Slots, Escrow note & Book Button */}
                <div className="p-4 bg-[var(--paper-2)]/60 border-t-2 border-[var(--ink)] rounded-b-xl space-y-3">
                  
                  {/* Next Available Slot */}
                  <div className="flex items-center gap-1.5 text-xs text-[var(--ink)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--forest)] flex-shrink-0" />
                    <span className="truncate font-medium">
                      Next: {item.availableSlots[0]}
                    </span>
                  </div>

                  {/* Escrow terms + Action button */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-left">
                      <div className="flex items-center gap-1">
                        <CreditCoin amount={item.heldCreditsRequired} size="sm" />
                        <span className="text-[11px] font-mono-val font-bold text-[var(--rose)]">
                          HELD
                        </span>
                      </div>
                      <div className="text-[10px] text-[var(--muted)] font-mono-val">
                        (Net cost: 0.5 credits)
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectSkillToBook(item)}
                      className="brutal-btn px-4 py-2 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[var(--leaf)]"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Session</span>
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
