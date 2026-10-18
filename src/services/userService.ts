import { supabase } from '../lib/supabase';
import { UserProfile, UserLoginLog } from '../types';
import { SAMPLE_STUDENT_PROFILES } from '../data/sampleData';

const REGISTERED_USERS_KEY = 'skillbarter_registered_users';
const USER_LOGINS_KEY = 'skillbarter_user_logins';

/**
 * Detect client device / platform string for login tracking
 */
export function getClientDeviceString(): string {
  if (typeof window === 'undefined' || !window.navigator) {
    return 'Web Browser';
  }
  const ua = window.navigator.userAgent;
  let browser = 'Browser';
  if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('Chrome/')) browser = 'Chrome';
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox/')) browser = 'Firefox';

  let os = 'Desktop';
  if (/Android/i.test(ua)) os = 'Android Mobile';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS Device';
  else if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Macintosh|Mac OS/i.test(ua)) os = 'MacOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  return `${browser} (${os})`;
}

/**
 * Read all locally registered users merged with seed profiles
 */
export function getLocalRegisteredUsers(): Record<string, UserProfile> {
  const baseMap: Record<string, UserProfile> = { ...SAMPLE_STUDENT_PROFILES };
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...baseMap, ...parsed };
    }
  } catch (e) {
    console.warn('Error reading registered users from localStorage:', e);
  }
  return baseMap;
}

/**
 * Save user locally
 */
export function saveLocalUser(user: UserProfile): void {
  try {
    const current = getLocalRegisteredUsers();
    current[user.id] = user;
    // Also index by email for quick lookup
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn('Error saving local user:', e);
  }
}

/**
 * Record a login event into Supabase and localStorage
 */
export async function recordUserLogin(user: UserProfile): Promise<UserLoginLog> {
  const now = new Date();
  const log: UserLoginLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    loginTime: now.toISOString(),
    device: getClientDeviceString(),
    status: 'success',
  };

  // 1. Save to local storage
  try {
    const existingRaw = localStorage.getItem(USER_LOGINS_KEY);
    const logs: UserLoginLog[] = existingRaw ? JSON.parse(existingRaw) : [];
    logs.unshift(log);
    // Keep last 150 login events
    localStorage.setItem(USER_LOGINS_KEY, JSON.stringify(logs.slice(0, 150)));
  } catch (e) {
    console.warn('Error saving login log locally:', e);
  }

  // 2. Update user profile's lastLoginAt and totalLogins
  const updatedUser: UserProfile = {
    ...user,
    lastLoginAt: now.toISOString(),
    totalLogins: (user.totalLogins || 0) + 1,
  };
  saveLocalUser(updatedUser);

  // 3. Sync to Supabase in background
  try {
    await supabase.from('user_logins').insert({
      id: log.id,
      user_id: log.userId,
      user_name: log.userName,
      user_email: log.userEmail,
      device: log.device,
      status: log.status,
      login_time: log.loginTime,
    });
  } catch (err) {
    console.warn('Supabase login event sync note:', err);
  }

  try {
    await supabase.from('users').upsert({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      college: updatedUser.college,
      department: updatedUser.department,
      year: updatedUser.year,
      available_credits: updatedUser.availableCredits,
      held_credits: updatedUser.heldCredits,
      trust_score: updatedUser.trustScore,
      days_active: updatedUser.daysActive,
    });
  } catch {
    // Non-blocking
  }

  return log;
}

/**
 * Fetch all login logs from Supabase + localStorage
 */
export async function fetchAllLoginLogs(): Promise<UserLoginLog[]> {
  const localLogs: UserLoginLog[] = [];
  try {
    const raw = localStorage.getItem(USER_LOGINS_KEY);
    if (raw) {
      localLogs.push(...JSON.parse(raw));
    }
  } catch (e) {
    console.warn('Failed to parse local login logs:', e);
  }

  try {
    const { data, error } = await supabase
      .from('user_logins')
      .select('*')
      .order('login_time', { ascending: false })
      .limit(100);

    if (!error && data && data.length > 0) {
      const remoteLogs: UserLoginLog[] = data.map((d: any) => ({
        id: d.id,
        userId: d.user_id,
        userName: d.user_name,
        userEmail: d.user_email,
        loginTime: d.login_time || new Date().toISOString(),
        device: d.device || 'Web Browser',
        status: (d.status as 'active' | 'success') || 'success',
      }));

      // Merge and deduplicate by ID
      const map = new Map<string, UserLoginLog>();
      remoteLogs.forEach((l) => map.set(l.id, l));
      localLogs.forEach((l) => {
        if (!map.has(l.id)) map.set(l.id, l);
      });
      return Array.from(map.values()).sort(
        (a, b) => new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime()
      );
    }
  } catch (err) {
    console.warn('Error querying Supabase user_logins:', err);
  }

  // If Supabase not connected or table not created, return local logs
  return localLogs;
}

/**
 * Fetch all registered users from Supabase + localStorage
 */
export async function fetchAllRegisteredUsers(): Promise<Record<string, UserProfile>> {
  const usersMap = getLocalRegisteredUsers();

  try {
    const { data, error } = await supabase.from('users').select('*');
    if (!error && data && data.length > 0) {
      data.forEach((row: any) => {
        if (row.id) {
          const existing = usersMap[row.id] || {};
          usersMap[row.id] = {
            id: row.id,
            name: row.name || 'Student',
            email: row.email,
            password: existing.password || 'password123',
            avatarUrl: row.avatar_url || existing.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(row.name || 'Student')}`,
            college: row.college || 'MM(DU) Mullana',
            department: row.department || 'B.Tech Engineering',
            year: row.year || '2nd Year',
            isVerifiedCollege: true,
            availableCredits: Number(row.available_credits ?? 6.0),
            heldCredits: Number(row.held_credits ?? 0.0),
            lifetimeEarnedCredits: Number(row.lifetime_earned_credits ?? 0.0),
            streakDays: existing.streakDays || 1,
            trustScore: Number(row.trust_score ?? 85),
            joinedDate: existing.joinedDate || 'Oct 2026',
            daysActive: Number(row.days_active ?? 1),
            level: existing.level || 'Learner',
            lastLoginAt: existing.lastLoginAt,
            totalLogins: existing.totalLogins || 1,
            badges: existing.badges || [
              {
                id: 'b-start',
                title: 'Campus Student',
                description: 'Registered with verified college email',
                icon: 'GraduationCap',
              },
            ],
            skillsOffered: existing.skillsOffered || [],
            skillsWanted: existing.skillsWanted || [],
          };
        }
      });
    }
  } catch (e) {
    console.warn('Supabase users fetch note:', e);
  }

  return usersMap;
}

/**
 * Check if a user exists in the database by email
 */
export async function findUserByEmail(email: string): Promise<UserProfile | null> {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Check local users first
  const localMap = getLocalRegisteredUsers();
  const localMatch = Object.values(localMap).find(
    (u) => u.email.toLowerCase() === cleanEmail
  );
  if (localMatch) {
    return localMatch;
  }

  // 2. Query Supabase
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .ilike('email', cleanEmail)
      .limit(1);

    if (!error && data && data.length > 0) {
      const row = data[0];
      const user: UserProfile = {
        id: row.id,
        name: row.name,
        email: row.email,
        password: 'password123', // default if not locally cached
        college: row.college || 'MM(DU) Mullana',
        department: row.department || 'Engineering',
        year: row.year || '2nd Year',
        isVerifiedCollege: true,
        availableCredits: Number(row.available_credits ?? 6.0),
        heldCredits: Number(row.held_credits ?? 0.0),
        lifetimeEarnedCredits: Number(row.lifetime_earned_credits ?? 0.0),
        streakDays: 1,
        trustScore: Number(row.trust_score ?? 85),
        joinedDate: 'Oct 2026',
        daysActive: Number(row.days_active ?? 1),
        level: 'Learner',
        badges: [
          {
            id: 'b-remote',
            title: 'Verified Student',
            description: 'Loaded from Supabase Database',
            icon: 'GraduationCap',
          },
        ],
        skillsOffered: [],
        skillsWanted: [],
      };
      saveLocalUser(user);
      return user;
    }
  } catch (e) {
    console.warn('Supabase findUser error:', e);
  }

  return null;
}

export type SignInResult =
  | { success: true; user: UserProfile; message: string }
  | { success: false; code: 'NOT_FOUND' | 'INVALID_PASSWORD' | 'EMPTY_FIELDS'; message: string };

/**
 * Sign In flow:
 * 1. Checks if user exists in database
 * 2. If NOT found, returns NOT_FOUND (tells user to sign up)
 * 3. If found, checks password and records login in database
 */
export async function authenticateUser(
  email: string,
  password?: string
): Promise<SignInResult> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    return {
      success: false,
      code: 'EMPTY_FIELDS',
      message: 'Please enter your registered student email address.',
    };
  }

  const existingUser = await findUserByEmail(cleanEmail);

  if (!existingUser) {
    return {
      success: false,
      code: 'NOT_FOUND',
      message: 'Account not found! No account is registered with this email. Please sign up to create one.',
    };
  }

  // If password was provided and user has a password set, verify it
  if (password && existingUser.password) {
    if (existingUser.password !== password.trim()) {
      return {
        success: false,
        code: 'INVALID_PASSWORD',
        message: 'Incorrect password! Please enter the correct password or use Reset Password.',
      };
    }
  }

  // User is valid! Record login in the database
  const recordedLog = await recordUserLogin(existingUser);
  const updatedUser: UserProfile = {
    ...existingUser,
    lastLoginAt: recordedLog.loginTime,
    totalLogins: (existingUser.totalLogins || 0) + 1,
  };

  return {
    success: true,
    user: updatedUser,
    message: `Welcome back, ${existingUser.name}! Signed in successfully.`,
  };
}

export type SignUpResult =
  | { success: true; user: UserProfile; message: string }
  | { success: false; code: 'ALREADY_EXISTS' | 'EMPTY_FIELDS'; message: string };

/**
 * Sign Up flow:
 * Registers new user, awards 6 credits, stores in database, and records initial login
 */
export async function registerUser(params: {
  name: string;
  email: string;
  password: string;
  college?: string;
  department?: string;
  year?: string;
}): Promise<SignUpResult> {
  const cleanEmail = params.email.trim().toLowerCase();
  const cleanName = params.name.trim();

  if (!cleanName || !cleanEmail || !params.password.trim()) {
    return {
      success: false,
      code: 'EMPTY_FIELDS',
      message: 'Please fill in all required fields (Full Name, Email, Password).',
    };
  }

  // Check if already registered
  const existing = await findUserByEmail(cleanEmail);
  if (existing) {
    return {
      success: false,
      code: 'ALREADY_EXISTS',
      message: 'This email is already registered! Please sign in.',
    };
  }

  const newId = `user-${Date.now()}`;
  const newUser: UserProfile = {
    id: newId,
    name: cleanName,
    email: cleanEmail,
    password: params.password.trim(),
    college: params.college?.trim() || 'University Campus',
    department: params.department?.trim() || 'Computer Science & Engineering',
    year: params.year || '2nd Year',
    isVerifiedCollege: true,
    availableCredits: 6.0, // 6 Free starter credits
    heldCredits: 0.0,
    lifetimeEarnedCredits: 0.0,
    streakDays: 1,
    trustScore: 85,
    joinedDate: 'Oct 2026',
    daysActive: 1,
    level: 'Learner',
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanName)}`,
    lastLoginAt: new Date().toISOString(),
    totalLogins: 1,
    badges: [
      {
        id: 'badge-starter',
        title: 'Campus Onboarded',
        description: 'Joined SkillBarter & received 6 free credits',
        icon: 'GraduationCap',
        unlockedAt: 'Oct 2026',
      },
      {
        id: 'badge-first-login',
        title: 'First Login',
        description: 'Authenticated student session verified',
        icon: 'ShieldCheck',
        unlockedAt: 'Today',
      },
    ],
    skillsOffered: [],
    skillsWanted: [],
  };

  // Save locally
  saveLocalUser(newUser);

  // Record initial login and save to Supabase
  await recordUserLogin(newUser);

  return {
    success: true,
    user: newUser,
    message: `Account created successfully! 6.0 free credits added to your wallet.`,
  };
}
