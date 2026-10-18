import React, { useState } from 'react';
import { SkillListing, SkillCategory, UserProfile } from '../types';
import { X, Plus, BookOpen, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface TeachSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onAddSkill: (newSkill: SkillListing) => void;
}

export const TeachSkillModal: React.FC<TeachSkillModalProps> = ({
  isOpen,
  onClose,
  user,
  onAddSkill,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SkillCategory>('Coding');
  const [description, setDescription] = useState('');
  const [slot, setSlot] = useState('Tomorrow 5:00 PM (Hostel / Library)');
  const [locationType, setLocationType] = useState<'Campus (Library/Hostel)' | 'Online (Google Meet)' | 'Campus or Online'>('Campus (Library/Hostel)');
  const [questionText, setQuestionText] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [wrongOption1, setWrongOption1] = useState('');
  const [topicsInput, setTopicsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const topics = topicsInput.split(',').map((t) => t.trim()).filter(Boolean);

    const newSkill: SkillListing = {
      id: `skill-custom-${Date.now()}`,
      title: title.trim(),
      category,
      teacherName: user.name,
      teacherId: user.id,
      teacherEmail: user.email,
      teacherDept: `${user.department}, ${user.year}`,
      teacherYear: user.year,
      rating: 5.0,
      reviewsCount: 1,
      availableSlots: [slot.trim() || 'Tomorrow 5:00 PM'],
      locationType,
      heldCreditsRequired: 2,
      description: description.trim(),
      topics: topics.length > 0 ? topics : ['Core concepts', 'Hands-on practice', 'Doubt clearing'],
      accentColor: '#1F5C42',
      isCustom: true,
      quizQuestions: [
        {
          id: `q-${Date.now()}`,
          question: questionText.trim() || `What is the core takeaway when practicing ${title}?`,
          options: [
            correctOption.trim() || 'Consistent fundamental practice and clear understanding of principles',
            wrongOption1.trim() || 'Skipping the basics and guessing randomly',
            'None of the above',
          ],
          correctIndex: 0,
          explanation: 'Fundamental knowledge verified during the 1-on-1 session.',
        },
      ],
    };

    onAddSkill(newSkill);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--ink)]/60 backdrop-blur-xs">
      <div className="brutal-card w-full max-w-lg bg-[var(--paper)] p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 brutal-btn rounded-lg bg-[var(--paper-2)] flex items-center justify-center text-[var(--ink)] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block mb-2">
            Offer a Skill &amp; Earn Credits
          </span>
          <h3 className="font-serif-heading text-2xl font-bold text-[var(--ink)]">
            Teach a Fellow Classmate
          </h3>
          <p className="text-xs text-[var(--muted)] font-mono-val mt-1">
            Teacher: {user.name} ({user.department}) · Earn 5.0 Credits per verified hour
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
              Skill Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. C++ STL Vectors &amp; Maps, Chess Openings, React Hooks..."
              className="w-full p-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SkillCategory)}
                className="w-full p-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)]"
              >
                <option value="Coding">Coding</option>
                <option value="Music &amp; Creative">Music &amp; Creative</option>
                <option value="Academics &amp; Tools">Academics &amp; Tools</option>
                <option value="Productivity &amp; Languages">Productivity &amp; Languages</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                Location Mode
              </label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)]"
              >
                <option value="Campus (Library/Hostel)">Campus (Library/Hostel)</option>
                <option value="Online (Google Meet)">Online (Google Meet)</option>
                <option value="Campus or Online">Campus or Online</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
              Short Description &amp; What You will Teach *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What can a student expect to master in your 1-hour session?"
              className="w-full p-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
              Key Topics (comma-separated)
            </label>
            <input
              type="text"
              value={topicsInput}
              onChange={(e) => setTopicsInput(e.target.value)}
              placeholder="e.g. Iterators, Vector Capacity, Practical LeetCode Example"
              className="w-full p-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
              Your Available Slot
            </label>
            <input
              type="text"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              placeholder="e.g. Thursday 6:00 PM (Hostel 2 study room)"
              className="w-full p-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)]"
            />
          </div>

          {/* Proof Question Builder */}
          <div className="p-3 bg-[var(--paper-2)] border-2 border-[var(--ink)] rounded-lg space-y-2">
            <span className="text-[11px] font-mono-val font-bold text-[var(--forest)] uppercase block">
              Proof-of-Learning Quiz Question
            </span>
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Question to test if learner paid attention"
              className="w-full p-2 rounded border border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)]"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
                placeholder="Correct answer"
                className="p-1.5 rounded border border-[var(--forest)] bg-[var(--mint)]/20 text-xs text-[var(--ink)]"
              />
              <input
                type="text"
                value={wrongOption1}
                onChange={(e) => setWrongOption1(e.target.value)}
                placeholder="Incorrect distractor"
                className="p-1.5 rounded border border-[var(--line)] bg-[var(--card-bg)] text-xs text-[var(--ink)]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--line)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="brutal-btn px-5 py-2.5 bg-[var(--forest)] text-[var(--paper)] font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-[var(--leaf)]"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Listing (Earn 5.0 Credits)</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
