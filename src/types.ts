export type SkillCategory = 'Coding' | 'Music & Creative' | 'Academics & Tools' | 'Productivity & Languages';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SkillListing {
  id: string;
  title: string;
  category: SkillCategory;
  teacherName: string;
  teacherId: string;
  teacherEmail: string;
  teacherDept: string;
  teacherYear: string;
  rating: number;
  reviewsCount: number;
  availableSlots: string[];
  locationType: 'Campus (Library/Hostel)' | 'Online (Google Meet)' | 'Campus or Online';
  heldCreditsRequired: number; // standard 2
  description: string;
  topics: string[];
  accentColor: string;
  quizQuestions: QuizQuestion[];
  isCustom?: boolean;
}

export interface SessionRecord {
  id: string;
  skillId: string;
  skillTitle: string;
  partnerName: string;
  partnerRole: 'teacher' | 'learner';
  slot: string;
  location: string;
  date: string;
  status: 'booked_held' | 'quiz_pending' | 'completed' | 'disputed' | 'refunded';
  heldCredits: number;
  creditsEarnedOrSpent: number;
  proofPassed?: boolean;
  notes?: string;
  quizAnswers?: number[];
  quizScore?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string; // DP photo URL or base64 data
  college: string;
  department: string;
  year: string;
  isVerifiedCollege: boolean;
  availableCredits: number;
  heldCredits: number;
  lifetimeEarnedCredits: number;
  streakDays: number;
  trustScore: number; // 0 - 100
  joinedDate: string;
  daysActive: number; // Campus tenure in days
  level: 'Learner' | 'Apprentice' | 'Contributor' | 'Mentor';
  lastLoginAt?: string;
  totalLogins?: number;
  badges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
  }[];
  skillsOffered: string[];
  skillsWanted: string[];
}

export interface UserLoginLog {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  loginTime: string;
  device: string;
  status: 'active' | 'success';
}

