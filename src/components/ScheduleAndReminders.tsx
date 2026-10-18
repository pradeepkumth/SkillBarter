import React, { useState } from 'react';
import { SessionRecord, SkillListing } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Bell, 
  BellRing, 
  CheckCircle2, 
  CalendarPlus, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ScheduleAndRemindersProps {
  sessions: SessionRecord[];
  allSkills: SkillListing[];
  onTakeQuiz: (session: SessionRecord) => void;
  onBrowseSkills: () => void;
  onViewPeerProfile: (partnerName: string) => void;
}

export const ScheduleAndReminders: React.FC<ScheduleAndRemindersProps> = ({
  sessions,
  allSkills,
  onTakeQuiz,
  onBrowseSkills,
  onViewPeerProfile,
}) => {
  const upcomingSessions = sessions.filter(
    (s) => s.status === 'booked_held' || s.status === 'quiz_pending'
  );

  // Reminders state (stores session id -> reminder interval in minutes)
  const [reminders, setReminders] = useState<Record<string, number>>({
    'sess-default': 30,
  });

  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  const toggleReminder = (sessionId: string, minutesBefore: number) => {
    setReminders((prev) => {
      const next = { ...prev };
      if (next[sessionId] === minutesBefore) {
        delete next[sessionId];
        setNotificationBanner(`Reminder turned off for this session.`);
      } else {
        next[sessionId] = minutesBefore;
        setNotificationBanner(`🔔 Reminder set: We will alert you ${minutesBefore} minutes before the session!`);
      }
      setTimeout(() => setNotificationBanner(null), 3500);
      return next;
    });
  };

  const handleAddToCalendar = (session: SessionRecord) => {
    const title = encodeURIComponent(`SkillBarter: ${session.skillTitle} with ${session.partnerName}`);
    const details = encodeURIComponent(`Campus peer session on SkillBarter time-bank. 2.0 credits held in escrow until proof quiz is completed.`);
    const location = encodeURIComponent(session.location);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
    setNotificationBanner(`📅 Google Calendar template opened for "${session.skillTitle}"!`);
    setTimeout(() => setNotificationBanner(null), 3500);
  };

  return (
    <div className="brutal-card p-6 md:p-8 bg-[var(--paper)] space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[var(--ink)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)]">
              Timetable &amp; Escrow Desk
            </span>
            <span className="text-xs font-mono-val text-[var(--muted)]">
              {upcomingSessions.length} active sessions scheduled
            </span>
          </div>
          <h3 className="font-serif-heading text-2xl font-bold text-[var(--ink)]">
            Session Schedule &amp; Smart Reminders
          </h3>
        </div>

        <button
          onClick={onBrowseSkills}
          className="brutal-btn px-4 py-2 bg-[var(--paper-2)] text-[var(--ink)] text-xs font-bold rounded-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer hover:bg-[var(--line)]"
        >
          <CalendarPlus className="w-4 h-4 text-[var(--forest)]" />
          <span>Book Another Slot</span>
        </button>
      </div>

      {/* Reminder Notification Alert */}
      {notificationBanner && (
        <div className="p-3 bg-[var(--mint)] border-2 border-[var(--forest)] rounded-xl text-xs font-mono-val text-[var(--forest)] font-bold flex items-center gap-2 animate-pulse">
          <BellRing className="w-4 h-4 flex-shrink-0" />
          <span>{notificationBanner}</span>
        </div>
      )}

      {/* Sessions List */}
      {upcomingSessions.length === 0 ? (
        <div className="p-8 text-center bg-[var(--paper-2)]/60 rounded-xl border border-dashed border-[var(--line)] space-y-3">
          <Clock className="w-8 h-8 mx-auto text-[var(--muted)]" />
          <p className="text-sm font-bold text-[var(--ink)]">
            No upcoming sessions currently scheduled.
          </p>
          <p className="text-xs text-[var(--muted)] max-w-md mx-auto">
            Browse skills offered by your campus peers to book a time slot in the library or hostel common room.
          </p>
          <button
            onClick={onBrowseSkills}
            className="brutal-btn px-4 py-2 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded-lg cursor-pointer hover:bg-[var(--leaf)] inline-flex items-center gap-1.5"
          >
            <span>Browse Available Peer Mentors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingSessions.map((sess) => {
            const hasReminder = !!reminders[sess.id];
            const reminderTime = reminders[sess.id] || 30;

            return (
              <div
                key={sess.id}
                className="brutal-card p-5 bg-[var(--card-bg)] space-y-4"
              >
                {/* Session Top Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--line)]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-val font-bold text-[var(--forest)] bg-[var(--mint)]/40 px-2 py-0.5 rounded border border-[var(--forest)] uppercase">
                      {sess.partnerRole === 'teacher' ? 'Learning Session' : 'Teaching Session'}
                    </span>
                    <span className="text-xs font-mono-val text-[var(--rose)] font-bold">
                      2.0 Credits Held in Escrow
                    </span>
                  </div>
                  <span className="text-xs font-mono-val text-[var(--muted)]">
                    Protected Time-Bank Hold
                  </span>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Title & Peer info */}
                  <div className="md:col-span-6 space-y-1">
                    <h4 className="font-serif-heading text-lg sm:text-xl font-bold text-[var(--ink)]">
                      {sess.skillTitle}
                    </h4>

                    <div className="flex items-center gap-2 text-xs font-mono-val">
                      <span className="text-[var(--muted)]">Peer Mentor:</span>
                      <button
                        type="button"
                        onClick={() => onViewPeerProfile(sess.partnerName)}
                        className="font-bold text-[var(--forest)] underline decoration-dotted hover:text-[var(--leaf)] cursor-pointer"
                        title="Click to inspect student profile"
                      >
                        {sess.partnerName}
                      </button>
                    </div>

                    <div className="flex items-center gap-3 pt-1 text-xs text-[var(--muted)] font-mono-val">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[var(--forest)]" />
                        {sess.slot}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[var(--forest)]" />
                        {sess.location}
                      </span>
                    </div>
                  </div>

                  {/* Reminder Controls & Actions */}
                  <div className="md:col-span-6 flex flex-col sm:flex-row sm:items-center justify-end gap-2.5">
                    
                    {/* Reminder Buttons */}
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[var(--paper-2)] border border-[var(--ink)] text-xs font-mono-val">
                      <Bell className={`w-3.5 h-3.5 ${hasReminder ? 'text-[var(--forest)] fill-[var(--forest)]' : 'text-[var(--muted)]'}`} />
                      <span className="text-[10px] text-[var(--muted)] font-bold mr-1">Alert:</span>
                      <button
                        type="button"
                        onClick={() => toggleReminder(sess.id, 15)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                          reminders[sess.id] === 15 ? 'bg-[var(--forest)] text-[var(--paper)]' : 'hover:bg-[var(--line)] text-[var(--ink)]'
                        }`}
                      >
                        15m
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleReminder(sess.id, 60)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                          reminders[sess.id] === 60 ? 'bg-[var(--forest)] text-[var(--paper)]' : 'hover:bg-[var(--line)] text-[var(--ink)]'
                        }`}
                      >
                        1hr
                      </button>
                    </div>

                    {/* Google Calendar Sync */}
                    <button
                      type="button"
                      onClick={() => handleAddToCalendar(sess)}
                      className="brutal-btn px-2.5 py-1.5 bg-[var(--paper)] text-[var(--ink)] text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer hover:bg-[var(--line)]"
                      title="Sync this slot to Google Calendar"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[var(--forest)]" />
                      <span>Sync</span>
                    </button>

                    {/* Complete Proof Button */}
                    <button
                      type="button"
                      onClick={() => onTakeQuiz(sess)}
                      className="brutal-btn px-3 py-1.5 bg-[var(--mustard)] text-[var(--ink)] text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[var(--mustard)]/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--ink)]" />
                      <span>Take Proof Quiz</span>
                    </button>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
