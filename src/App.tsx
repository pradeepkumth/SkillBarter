import React, { useState, useEffect } from 'react';
import { UserProfile, SkillListing, SessionRecord } from './types';
import { INITIAL_USER, INITIAL_SKILLS, INITIAL_PAST_SESSIONS, SAMPLE_STUDENT_PROFILES } from './data/sampleData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { FlowchartHowItWorks } from './components/FlowchartHowItWorks';
import { CreditSystemSection } from './components/CreditSystemSection';
import { BrowseSkills } from './components/BrowseSkills';
import { Dashboard } from './components/Dashboard';
import { AboutTeam } from './components/AboutTeam';
import { ReferencesSection } from './components/ReferencesSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { SessionQuizModal } from './components/SessionQuizModal';
import { TeachSkillModal } from './components/TeachSkillModal';
import { AuthLoginSignupModal } from './components/AuthLoginSignupModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { PopularSwapsSection } from './components/PopularSwapsSection';
import { ScheduleAndReminders } from './components/ScheduleAndReminders';
import { SupabaseStatusModal } from './components/SupabaseStatusModal';
import { AdminPanel } from './components/AdminPanel';
import { 
  checkSupabaseHealth, 
  saveSessionToSupabase, 
  fetchSessionsFromSupabase, 
  updateSessionProofInSupabase, 
  updateSessionDisputeInSupabase, 
  SupabaseSyncStatus 
} from './services/supabaseService';
import { getLocalRegisteredUsers } from './services/userService';
import { 
  Sparkles, 
  Calendar, 
  Flame, 
  Search, 
  PlusCircle, 
  Layers, 
  CheckCircle2, 
  BookOpen,
  Database,
  LogIn
} from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // User Authentication State: Default to null so user arrives on the landing page first
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = sessionStorage.getItem('skillbarter_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // App Data State
  const [skills, setSkills] = useState<SkillListing[]>(INITIAL_SKILLS);
  const [sessions, setSessions] = useState<SessionRecord[]>(INITIAL_PAST_SESSIONS);

  // Logged-in view mode ('workspace' for student portal, 'overview' for how-it-works / about)
  const [activeTab, setActiveTab] = useState<'workspace' | 'overview'>('workspace');

  // Navigation tracking
  const [currentSection, setCurrentSection] = useState('hero');

  // Modals state
  const [loginSignupModalOpen, setLoginSignupModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [inspectingProfile, setInspectingProfile] = useState<UserProfile | null>(null);

  const [bookingSkill, setBookingSkill] = useState<SkillListing | null>(null);
  const [quizSession, setQuizSession] = useState<{ session: SessionRecord; skill: SkillListing } | null>(null);
  const [teachModalOpen, setTeachModalOpen] = useState(false);

  // Supabase Database Sync State
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseSyncStatus | null>(null);

  // Admin Desk State
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  // Live Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Check Supabase connection and load remote sessions
  useEffect(() => {
    async function initSupabase() {
      try {
        const health = await checkSupabaseHealth();
        setSupabaseStatus(health);

        const remoteSessions = await fetchSessionsFromSupabase();
        if (remoteSessions.length > 0) {
          setSessions((prev) => {
            const existingIds = new Set(prev.map((s) => s.id));
            const freshRemote = remoteSessions.filter((s) => !existingIds.has(s.id));
            return [...freshRemote, ...prev];
          });
        }
      } catch (e) {
        console.warn('Supabase initialization caught error:', e);
      }
    }
    initSupabase();
  }, []);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigate = (sectionId: string) => {
    setCurrentSection(sectionId);
    if (currentUser && (sectionId === 'how-it-works' || sectionId === 'credit-system' || sectionId === 'about-team' || sectionId === 'references')) {
      setActiveTab('overview');
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open Auth modal in specific mode
  const handleOpenLogin = () => {
    setAuthMode('login');
    setLoginSignupModalOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthMode('signup');
    setLoginSignupModalOpen(true);
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    try {
      sessionStorage.removeItem('skillbarter_current_user');
    } catch (e) {
      console.warn('Could not clear user session', e);
    }
    showToast('👋 You have signed out. Welcome to the SkillBarter guest portal.');
  };

  // Login / Signup success
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      sessionStorage.setItem('skillbarter_current_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save user session', e);
    }
    setActiveTab('workspace');
    showToast(`🎉 Welcome, ${user.name}! Your campus time-bank wallet is now active.`);
  };

  // Open full profile modal for current user
  const handleOpenMyProfile = () => {
    if (currentUser) {
      setInspectingProfile(currentUser);
      setProfileModalOpen(true);
    } else {
      handleOpenLogin();
    }
  };

  // Inspect any peer's public profile (from BrowseSkills, Popular Swaps, or Schedule)
  const handleViewTeacherProfile = (teacherId: string, teacherName: string) => {
    let foundProfile: UserProfile | undefined = SAMPLE_STUDENT_PROFILES[teacherId];

    if (!foundProfile) {
      // Check if teacherName matches any known student profile
      foundProfile = Object.values(SAMPLE_STUDENT_PROFILES).find(
        (p) => p.name.toLowerCase() === teacherName.toLowerCase()
      );
    }

    if (!foundProfile && currentUser && (currentUser.id === teacherId || currentUser.name === teacherName)) {
      foundProfile = currentUser;
    }

    if (!foundProfile) {
      // Dynamic fallback profile
      foundProfile = {
        id: teacherId,
        name: teacherName,
        email: `${teacherName.toLowerCase().replace(/\s+/g, '.')}@mmumullana.ac.in`,
        college: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
        department: 'B.Tech Engineering',
        year: '2nd Year',
        isVerifiedCollege: true,
        availableCredits: 10.0,
        heldCredits: 0.0,
        lifetimeEarnedCredits: 18.0,
        streakDays: 6,
        trustScore: 92,
        joinedDate: 'Sep 2026',
        daysActive: 30,
        level: 'Contributor',
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(teacherName)}`,
        badges: [
          {
            id: 'b-peer',
            title: 'Verified Peer Mentor',
            description: 'Taught verified sessions on campus',
            icon: 'Award',
            unlockedAt: 'Sep 2026',
          },
        ],
        skillsOffered: ['Campus Peer Mentoring'],
        skillsWanted: ['DSA', 'Python'],
      };
    }

    setInspectingProfile(foundProfile);
    setProfileModalOpen(true);
  };

  // Update DP / Avatar
  const handleUpdateAvatar = (newAvatarUrl: string) => {
    if (currentUser) {
      const updated = { ...currentUser, avatarUrl: newAvatarUrl };
      setCurrentUser(updated);
      setInspectingProfile(updated);
      showToast('📸 Profile Display Picture (DP) updated successfully!');
    }
  };

  // Booking Flow: Holds 2 credits in escrow
  const handleSelectSkillToBook = (skill: SkillListing) => {
    if (!currentUser) {
      showToast('⚠️ Please Sign In or Sign Up first to book a session and hold escrow!');
      handleOpenLogin();
      return;
    }
    setBookingSkill(skill);
  };

  const handleConfirmBooking = (skill: SkillListing, slot: string, location: string) => {
    if (!currentUser) return;

    if (currentUser.availableCredits < skill.heldCreditsRequired) {
      showToast('⚠️ Insufficient credits to hold escrow. You need at least 2.0 credits.');
      return;
    }

    // Deduct 2.0 from available, add 2.0 to held
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            availableCredits: Math.max(0, prev.availableCredits - skill.heldCreditsRequired),
            heldCredits: prev.heldCredits + skill.heldCreditsRequired,
          }
        : null
    );

    const newSession: SessionRecord = {
      id: `sess-${Date.now()}`,
      skillId: skill.id,
      skillTitle: skill.title,
      partnerName: skill.teacherName,
      partnerRole: 'teacher',
      slot,
      location,
      date: 'Today',
      status: 'booked_held',
      heldCredits: skill.heldCreditsRequired,
      creditsEarnedOrSpent: -0.5,
    };

    setSessions((prev) => [newSession, ...prev]);
    setBookingSkill(null);

    // Save session in background to Supabase project fcwmxyojkztebkambrsd
    saveSessionToSupabase(newSession, currentUser.id, skill.teacherId).then((res) => {
      if (res.success) {
        showToast(`✅ Booked with ${skill.teacherName}! 2.0 credits held in escrow (Stored in Supabase DB).`);
      } else {
        showToast(`✅ Booked with ${skill.teacherName}! 2.0 credits held in escrow.`);
      }
    });

    // Automatically prompt user to try the proof quiz
    setTimeout(() => {
      setQuizSession({ session: newSession, skill });
    }, 700);
  };

  // Proof Quiz Success: Releases 2.0 held credits, refunds 1.5 to learner, teacher earns 5.0
  const handlePassQuiz = (sessionId: string, score: number) => {
    if (!currentUser) return;

    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            heldCredits: Math.max(0, prev.heldCredits - 2.0),
            availableCredits: prev.availableCredits + 1.5, // learner gets 1.5 back (net 0.5 spent)
            trustScore: Math.min(100, prev.trustScore + 3),
            streakDays: prev.streakDays + 1,
            lifetimeEarnedCredits: prev.lifetimeEarnedCredits,
          }
        : null
    );

    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              status: 'completed',
              heldCredits: 0,
              proofPassed: true,
              quizScore: score,
              notes: `Proof quiz verified (${score}% score). 1.5 credits refunded, teacher earned 5.0 credits.`,
            }
          : s
      )
    );

    // Update in Supabase
    updateSessionProofInSupabase(sessionId, score);

    showToast('🎉 Proof verified! 1.5 credits returned to wallet (net spent: 0.5 credits). Updated in Supabase!');
  };

  // Dispute / No-Show: 100% full 2.0 credits refunded to learner
  const handleDisputeRefund = (sessionId: string, reason: string) => {
    if (!currentUser) return;

    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            heldCredits: Math.max(0, prev.heldCredits - 2.0),
            availableCredits: prev.availableCredits + 2.0, // Full 2.0 refund
          }
        : null
    );

    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              status: 'refunded',
              heldCredits: 0,
              proofPassed: false,
              notes: `Escrow refund issued: ${reason}`,
            }
          : s
      )
    );

    // Update in Supabase
    updateSessionDisputeInSupabase(sessionId, reason);

    showToast('🛡️ Escrow protection executed: Full 2.0 credits refunded (Updated in Supabase).');
  };

  // Student offers a new skill
  const handleOpenTeach = () => {
    if (!currentUser) {
      showToast('⚠️ Please Sign In or Sign Up first to offer a skill and earn credits!');
      handleOpenLogin();
      return;
    }
    setTeachModalOpen(true);
  };

  const handleAddSkill = (newSkill: SkillListing) => {
    setSkills((prev) => [newSkill, ...prev]);
    if (currentUser) {
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              skillsOffered: [...prev.skillsOffered, newSkill.title],
            }
          : null
      );
    }
    showToast(`🚀 "${newSkill.title}" published! Fellow students can now book your slot.`);
  };

  // Reset demo back to clean initial state
  const handleResetDemo = () => {
    setCurrentUser(INITIAL_USER);
    setSkills(INITIAL_SKILLS);
    setSessions(INITIAL_PAST_SESSIONS);
    showToast('🔄 Demo state reset to initial Riya Sen profile.');
  };

  // Claim starter bonus
  const handleClaimStarter = () => {
    if (!currentUser) return;
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            availableCredits: prev.availableCredits + 6.0,
          }
        : null
    );
    showToast('🎁 6.0 pilot starter credits added to your wallet!');
  };

  const handleOpenQuizForSession = (session: SessionRecord) => {
    const matchedSkill = skills.find((s) => s.id === session.skillId) || skills[0];
    setQuizSession({ session, skill: matchedSkill });
  };

  // Student Profiles Map for Admin Desk Inspection (Sample + Local + Supabase Registered Users)
  const allProfilesMap = React.useMemo(() => {
    const localUsers = getLocalRegisteredUsers();
    const map: Record<string, UserProfile> = { ...SAMPLE_STUDENT_PROFILES, ...localUsers };
    if (currentUser) {
      map[currentUser.id] = currentUser;
    }
    return map;
  }, [currentUser]);

  // Admin Actions for Escrow & Session Management
  const handleAdminForceRelease = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              status: 'completed',
              heldCredits: 0,
              proofPassed: true,
              quizScore: 100,
              notes: 'Admin manual release: Escrow released and session completed.',
            }
          : s
      )
    );
    updateSessionProofInSupabase(sessionId, 100);
    showToast('⚡ Admin Override: Escrow released & session marked completed.');
  };

  const handleAdminForceRefund = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              status: 'refunded',
              heldCredits: 0,
              proofPassed: false,
              notes: 'Admin manual refund: Escrow returned to learner wallet.',
            }
          : s
      )
    );
    updateSessionDisputeInSupabase(sessionId, 'Admin manual dispute override');
    showToast('🛡️ Admin Override: Escrow refunded to learner wallet.');
  };

  const handleAdminDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    showToast('🗑️ Session record deleted from active view.');
  };

  const handleAdminRefreshFromSupabase = async () => {
    try {
      const remoteSessions = await fetchSessionsFromSupabase();
      if (remoteSessions.length > 0) {
        setSessions((prev) => {
          const remoteIds = new Set(remoteSessions.map((s) => s.id));
          const localOnly = prev.filter((s) => !remoteIds.has(s.id));
          return [...remoteSessions, ...localOnly];
        });
        showToast(`🔄 Synced ${remoteSessions.length} sessions directly from Supabase DB.`);
      } else {
        showToast('ℹ️ Supabase queried: No new remote session rows found.');
      }
    } catch (err) {
      console.error('Admin refresh error:', err);
      showToast('⚠️ Could not refresh from Supabase.');
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)] transition-colors selection:bg-[var(--mustard)] selection:text-[var(--ink)]">
      
      {/* Paper grain subtle overlay */}
      <div className="fixed inset-0 paper-grain pointer-events-none z-50" />

      {/* Live Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 brutal-card bg-[var(--paper)] border-2 border-[var(--ink)] text-xs font-mono-val font-bold text-[var(--ink)] flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        user={currentUser}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenTeachModal={handleOpenTeach}
        onOpenLoginModal={handleOpenLogin}
        onOpenSignupModal={handleOpenSignup}
        onOpenProfileModal={handleOpenMyProfile}
        onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
        onOpenAdminPanel={() => setAdminPanelOpen(true)}
        onLogout={handleLogout}
        currentSection={currentSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main>
        {/* ============================================================ */}
        {/* STATE A: LOGGED-IN STUDENT COMMAND CENTER                    */}
        {/* ============================================================ */}
        {currentUser ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            
            {/* Top Workspace Tab Switcher Bar */}
            <div className="brutal-card p-4 bg-[var(--paper-2)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('workspace')}
                  className={`brutal-btn px-4 py-2 rounded-xl text-xs font-bold font-mono-val flex items-center gap-2 cursor-pointer ${
                    activeTab === 'workspace'
                      ? 'bg-[var(--forest)] text-[var(--paper)]'
                      : 'bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[var(--mustard)]" />
                  <span>My Active Campus Desk</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`brutal-btn px-4 py-2 rounded-xl text-xs font-bold font-mono-val flex items-center gap-2 cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-[var(--forest)] text-[var(--paper)]'
                      : 'bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>How It Works &amp; Rules</span>
                </button>
              </div>

              {/* Quick Teach CTA */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenTeach}
                  className="brutal-btn px-4 py-2 bg-[var(--mint)] text-[var(--ink)] text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-[var(--mint)]/80"
                >
                  <PlusCircle className="w-4 h-4 text-[var(--forest)]" />
                  <span>Offer a Skill to Teach</span>
                </button>
              </div>
            </div>

            {activeTab === 'workspace' ? (
              <div className="space-y-12">
                
                {/* 1. Student Personal Profile & Wallet Dashboard */}
                <Dashboard
                  user={currentUser}
                  sessions={sessions}
                  allSkills={skills}
                  onTakeQuiz={handleOpenQuizForSession}
                  onBrowseSkills={() => {
                    const el = document.getElementById('browse-skills');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onResetDemo={handleResetDemo}
                  onClaimStarterCredits={handleClaimStarter}
                  onOpenProfileModal={handleOpenMyProfile}
                />

                {/* 2. Most Popular Swaps This Week on Campus */}
                <PopularSwapsSection
                  skills={skills}
                  onSelectSkillToBook={handleSelectSkillToBook}
                  onViewTeacherProfile={handleViewTeacherProfile}
                />

                {/* 3. Session Schedule & Smart Reminders */}
                <ScheduleAndReminders
                  sessions={sessions}
                  allSkills={skills}
                  onTakeQuiz={handleOpenQuizForSession}
                  onBrowseSkills={() => {
                    const el = document.getElementById('browse-skills');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onViewPeerProfile={(name) => handleViewTeacherProfile(name, name)}
                />

                {/* 4. Browse & Search All Skills on Campus */}
                <BrowseSkills
                  skills={skills}
                  onSelectSkillToBook={handleSelectSkillToBook}
                  onOpenTeachModal={handleOpenTeach}
                  onViewTeacherProfile={handleViewTeacherProfile}
                />

              </div>
            ) : (
              /* Overview & Rules Tab (Accessible anytime by logged-in users) */
              <div className="space-y-12">
                <FlowchartHowItWorks onStartBookingDemo={() => setActiveTab('workspace')} />
                <CreditSystemSection />
                <ProblemSolution onExploreSystem={() => {}} />
                <AboutTeam />
                <ReferencesSection />
              </div>
            )}

          </div>
        ) : (
          /* ============================================================ */
          /* STATE B: GUEST LANDING PAGE (NOT LOGGED IN)                  */
          /* Explains everything about SkillBarter + Login/Signup buttons */
          /* ============================================================ */
          <>
            {/* 1. Hero Section */}
            <Hero
              user={null}
              onJoinClick={handleOpenSignup}
              onLoginClick={handleOpenLogin}
              onBrowseClick={() => handleNavigate('browse-skills')}
              onHowItWorksClick={() => handleNavigate('how-it-works')}
            />

            {/* Dedicated Welcome & Campus Access Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-10">
              <div className="p-5 sm:p-6 bg-[var(--paper-2)] border-2 border-[var(--ink)] brutal-shadow rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--mustard)] border-2 border-[var(--ink)] flex items-center justify-center text-2xl select-none flex-shrink-0 brutal-shadow-sm">
                    🎓
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)]">
                        Campus Time-Bank Access
                      </span>
                      <span className="text-[11px] font-mono-val text-[var(--muted)]">
                        Zero Money · Pure Peer Exchange
                      </span>
                    </div>
                    <h3 className="font-serif-heading font-bold text-lg sm:text-xl text-[var(--ink)] mt-1">
                      Ready to swap skills with classmates?
                    </h3>
                    <p className="text-xs text-[var(--muted)] font-mono-val mt-0.5">
                      Sign in with your college email or create an account to get 6 starter credits and start booking peer sessions.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-shrink-0">
                  <button
                    onClick={handleOpenLogin}
                    className="flex-1 md:flex-none brutal-btn px-5 py-2.5 bg-[var(--paper)] text-[var(--ink)] font-bold rounded-xl text-xs sm:text-sm border-2 border-[var(--ink)] hover:bg-[var(--line)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4 text-[var(--forest)]" />
                    <span>Log In</span>
                  </button>
                  <button
                    onClick={handleOpenSignup}
                    className="flex-1 md:flex-none brutal-btn px-5 py-2.5 bg-[var(--forest)] text-[var(--paper)] font-bold rounded-xl text-xs sm:text-sm hover:bg-[var(--leaf)] cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[var(--mustard)]" />
                    <span>Sign Up (6 Free Credits)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Problem & Solution Section */}
            <ProblemSolution
              onExploreSystem={() => handleNavigate('credit-system')}
            />

            {/* 3. How It Works (Numbered Flowchart + Decision Tree) */}
            <FlowchartHowItWorks
              onStartBookingDemo={() => handleNavigate('browse-skills')}
            />

            {/* 4. Credit System, Escrow Diagram & Riya Wallet Story */}
            <CreditSystemSection />

            {/* 5. Popular Swaps on Campus (Preview for guests) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <PopularSwapsSection
                skills={skills}
                onSelectSkillToBook={handleSelectSkillToBook}
                onViewTeacherProfile={handleViewTeacherProfile}
              />
            </div>

            {/* 6. Browse Skills Catalog (Search, Filter, Book with auth gate) */}
            <BrowseSkills
              skills={skills}
              onSelectSkillToBook={handleSelectSkillToBook}
              onOpenTeachModal={handleOpenTeach}
              onViewTeacherProfile={handleViewTeacherProfile}
            />

            {/* 7. About Team Binary Beast (CodeStorm 2026, 3 Phases, Roadmap) */}
            <AboutTeam />

            {/* 8. Scientific & Economic References (Stanford, SSIR, NEF) */}
            <ReferencesSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTeachModal={handleOpenTeach}
        onOpenAuthModal={handleOpenSignup}
        onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
        onOpenAdminPanel={() => setAdminPanelOpen(true)}
      />

      {/* Modals */}
      {/* 1. Login / Signup / Forgot Password Modal */}
      <AuthLoginSignupModal
        isOpen={loginSignupModalOpen}
        initialMode={authMode}
        onClose={() => setLoginSignupModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 2. Student Profile Modal (With DP change, Name, Dept, Year, College, Credits, Tenure - Email protected!) */}
      <StudentProfileModal
        profileUser={inspectingProfile}
        currentUser={currentUser}
        isOpen={profileModalOpen}
        onClose={() => {
          setProfileModalOpen(false);
          setInspectingProfile(null);
        }}
        onUpdateAvatar={handleUpdateAvatar}
      />

      {/* 3. Booking Escrow Modal */}
      {currentUser && (
        <BookingModal
          skill={bookingSkill}
          user={currentUser}
          isOpen={!!bookingSkill}
          onClose={() => setBookingSkill(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* 4. Session Quiz Proof Modal */}
      <SessionQuizModal
        session={quizSession?.session || null}
        skill={quizSession?.skill || null}
        isOpen={!!quizSession}
        onClose={() => setQuizSession(null)}
        onPassQuiz={handlePassQuiz}
        onDisputeRefund={handleDisputeRefund}
      />

      {/* 5. Teach Skill Modal */}
      {currentUser && (
        <TeachSkillModal
          isOpen={teachModalOpen}
          onClose={() => setTeachModalOpen(false)}
          user={currentUser}
          onAddSkill={handleAddSkill}
        />
      )}

      {/* 6. Supabase Database Status Modal */}
      <SupabaseStatusModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
        status={supabaseStatus}
        onRefreshHealth={async () => {
          const health = await checkSupabaseHealth();
          setSupabaseStatus(health);
          showToast(`⚡ Supabase Health Check: ${health.message}`);
        }}
      />

      {/* 7. Dedicated Admin Panel (Sessions, Escrow Control, Supabase Live sync) */}
      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        sessions={sessions}
        allSkills={skills}
        registeredProfiles={allProfilesMap}
        onForceReleaseEscrow={handleAdminForceRelease}
        onForceRefundEscrow={handleAdminForceRefund}
        onDeleteSession={handleAdminDeleteSession}
        onRefreshFromSupabase={handleAdminRefreshFromSupabase}
      />

    </div>
  );
}
