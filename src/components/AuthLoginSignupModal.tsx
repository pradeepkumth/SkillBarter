import React, { useState } from 'react';
import { UserProfile } from '../types';
import { SAMPLE_STUDENT_PROFILES } from '../data/sampleData';
import { authenticateUser, registerUser } from '../services/userService';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  GraduationCap, 
  Building2, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  KeyRound, 
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Eye,
  EyeOff,
  UserPlus
} from 'lucide-react';

interface AuthLoginSignupModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthLoginSignupModal: React.FC<AuthLoginSignupModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [userNotFoundError, setUserNotFoundError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupCollege, setSignupCollege] = useState('');
  const [signupDept, setSignupDept] = useState('Computer Science & Engineering');
  const [signupYear, setSignupYear] = useState('2nd Year');
  const [signupError, setSignupError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Handle Login: checks database, verifies account, notifies if not found
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setUserNotFoundError(false);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both your email address and password.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const result = await authenticateUser(loginEmail, loginPassword);

      if (result.success) {
        onLoginSuccess(result.user);
        onClose();
      } else {
        if (result.code === 'NOT_FOUND') {
          setUserNotFoundError(true);
          setLoginError('Account not found! No student account is registered with this email. Please sign up first.');
        } else {
          setLoginError(result.message);
        }
      }
    } catch (err: any) {
      setLoginError('An error occurred during sign in. Please try again in a moment.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Switch to Signup with the email already populated
  const handleSwitchToSignupFromNotFound = () => {
    setSignupEmail(loginEmail);
    setUserNotFoundError(false);
    setLoginError('');
    setMode('signup');
  };

  // Handle Quick Demo Login (also records in database)
  const handleQuickDemoLogin = async (profileKey: string) => {
    const profile = SAMPLE_STUDENT_PROFILES[profileKey];
    if (profile) {
      setIsLoggingIn(true);
      const res = await authenticateUser(profile.email, profile.password || 'password123');
      setIsLoggingIn(false);
      if (res.success) {
        onLoginSuccess(res.user);
      } else {
        onLoginSuccess(profile);
      }
      onClose();
    }
  };

  // Handle Signup: creates account, assigns 6 free credits, stores in database
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim() || !signupCollege.trim()) {
      setSignupError('Please fill in all required fields (Full Name, Email, Password, and College / University).');
      return;
    }

    setIsSigningUp(true);
    try {
      const result = await registerUser({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        college: signupCollege.trim(),
        department: signupDept,
        year: signupYear,
      });

      if (result.success) {
        onLoginSuccess(result.user);
        onClose();
      } else {
        setSignupError(result.message);
      }
    } catch (err: any) {
      setSignupError('An error occurred while creating your account. Please try again.');
    } finally {
      setIsSigningUp(false);
    }
  };

  // Handle Forgot Password
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--ink)]/75 backdrop-blur-xs">
      <div className="brutal-card w-full max-w-lg bg-[var(--paper)] p-6 md:p-8 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 brutal-btn rounded-lg bg-[var(--paper-2)] flex items-center justify-center text-[var(--ink)] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ============================================================ */}
        {/* 1. SIGN IN (LOGIN) VIEW                                      */}
        {/* ============================================================ */}
        {mode === 'login' && (
          <div>
            <div className="mb-5 pr-8">
              <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block mb-2">
                Campus Portal Verification
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[var(--ink)]">
                Student Sign In
              </h3>
              <p className="text-xs text-[var(--muted)] font-mono-val mt-1">
                Enter your Gmail / College email to verify and access your campus time-bank wallet.
              </p>
            </div>

            {/* Quick Demo Student Switcher */}
            <div className="mb-5 p-3 bg-[var(--paper-2)] border-2 border-[var(--ink)] rounded-xl">
              <span className="text-[10px] font-mono-val font-bold text-[var(--forest)] uppercase block mb-1.5">
                ⚡ Quick Demo One-Click Access (Logged into DB):
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono-val">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('user-riya-01')}
                  className="px-2.5 py-1 rounded bg-[var(--paper)] border border-[var(--ink)] hover:bg-[var(--mint)] cursor-pointer font-bold"
                >
                  Riya Sen (2nd Yr CSE)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('teacher-aman')}
                  className="px-2.5 py-1 rounded bg-[var(--paper)] border border-[var(--ink)] hover:bg-[var(--mint)] cursor-pointer font-bold"
                >
                  Aman Sharma (Guitar Tutor)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('teacher-pradeep')}
                  className="px-2.5 py-1 rounded bg-[var(--paper)] border border-[var(--ink)] hover:bg-[var(--mint)] cursor-pointer font-bold"
                >
                  Pradeep (DSA Lead)
                </button>
              </div>
            </div>

            {/* User Not Found Warning Banner with Direct Sign Up Action */}
            {userNotFoundError && (
              <div className="mb-4 p-4 rounded-xl border-2 border-[var(--rose)] bg-[var(--rose)]/10 space-y-2.5 animate-fadeIn">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-[var(--rose)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs text-[var(--rose)] font-mono-val">
                      Account Not Found (User Unregistered)
                    </h5>
                    <p className="text-xs text-[var(--ink)] mt-0.5 leading-relaxed">
                      No account was found with this email in the database. You can register your account right now and claim <strong>6 Free Starter Credits</strong>!
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSwitchToSignupFromNotFound}
                  className="w-full brutal-btn py-2.5 bg-[var(--forest)] text-[var(--paper)] text-xs font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--leaf)]"
                >
                  <UserPlus className="w-4 h-4 text-[var(--mustard)]" />
                  <span>Create Account / Sign Up Now</span>
                </button>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && !userNotFoundError && (
                <div className="p-3 bg-[var(--rose)]/15 border-2 border-[var(--rose)] text-[var(--rose)] text-xs rounded-xl font-mono-val font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Gmail / Email */}
              <div>
                <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                  Gmail / Student Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setUserNotFoundError(false);
                      setLoginError('');
                    }}
                    placeholder="e.g. rahul.sharma@gmail.com or riya.sen@mmumullana.ac.in"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] font-mono-val focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setForgotSubmitted(false);
                      setForgotEmail(loginEmail);
                    }}
                    className="text-xs font-mono-val text-[var(--forest)] font-bold hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-9 pr-10 py-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] font-mono-val focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
                    title={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="brutal-btn w-full py-3 bg-[var(--forest)] text-[var(--paper)] font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--leaf)] mt-2 disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[var(--paper)] border-t-transparent rounded-full animate-spin" />
                    <span>Checking Database...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sign In to SkillBarter</span>
                  </>
                )}
              </button>
            </form>

            {/* Switch to Signup */}
            <div className="mt-6 pt-4 border-t border-[var(--line)] text-center text-xs font-mono-val text-[var(--muted)]">
              New student on campus?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setSignupError('');
                }}
                className="text-[var(--forest)] font-bold underline cursor-pointer hover:text-[var(--leaf)]"
              >
                Create Account (Sign Up + 6 Free Credits)
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. SIGN UP VIEW                                              */}
        {/* ============================================================ */}
        {mode === 'signup' && (
          <div>
            <div className="mb-5 pr-8">
              <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mustard)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block mb-2">
                🎁 6 Free Credits on Sign Up
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[var(--ink)]">
                Create Student Account
              </h3>
              <p className="text-xs text-[var(--muted)] font-mono-val mt-1">
                Register in the campus database to receive 6 starter credits and start swapping skills.
              </p>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              {signupError && (
                <div className="p-3 bg-[var(--rose)]/15 border-2 border-[var(--rose)] text-[var(--rose)] text-xs rounded-xl font-mono-val font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{signupError}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                  Gmail / College Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="e.g. rahul.sharma@gmail.com or @mmumullana.ac.in"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] font-mono-val focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                  Set Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="w-full pl-9 pr-10 py-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] font-mono-val focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
                    title={showSignupPassword ? 'Hide password' : 'Show password'}
                  >
                    {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* College / University Name Input (Custom input, not defaulted to MMDU) */}
              <div>
                <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                  College / University Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={signupCollege}
                    onChange={(e) => setSignupCollege(e.target.value)}
                    placeholder="e.g. Stanford University, IIT Delhi, MM(DU), etc."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] focus:outline-none font-medium"
                  />
                </div>
              </div>

              {/* Department & Current Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                    Department *
                  </label>
                  <select
                    value={signupDept}
                    onChange={(e) => setSignupDept(e.target.value)}
                    className="w-full p-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] font-mono-val focus:outline-none"
                  >
                    <option value="Computer Science & Engineering">Computer Science &amp; Engg</option>
                    <option value="Electronics & Communication">Electronics &amp; Comm</option>
                    <option value="Mechanical Engineering">Mechanical Engg</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Pharmacy & Health Sciences">Pharmacy</option>
                    <option value="Management & Commerce">Management (MBA/BBA)</option>
                    <option value="Other Campus Department">Other Department</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                    Current Year *
                  </label>
                  <select
                    value={signupYear}
                    onChange={(e) => setSignupYear(e.target.value)}
                    className="w-full p-2 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] font-mono-val focus:outline-none"
                  >
                    <option value="1st Year">1st Year (Fresher)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSigningUp}
                className="brutal-btn w-full py-3 bg-[var(--forest)] text-[var(--paper)] font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--leaf)] mt-3 disabled:opacity-50"
              >
                {isSigningUp ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[var(--paper)] border-t-transparent rounded-full animate-spin" />
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[var(--mustard)]" />
                    <span>Complete Sign Up &amp; Claim 6 Free Credits</span>
                  </>
                )}
              </button>
            </form>

            {/* Switch to Login */}
            <div className="mt-5 pt-4 border-t border-[var(--line)] text-center text-xs font-mono-val text-[var(--muted)]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setSignupError('');
                }}
                className="text-[var(--forest)] font-bold underline cursor-pointer hover:text-[var(--leaf)]"
              >
                Sign In directly
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. FORGOT PASSWORD VIEW                                      */}
        {/* ============================================================ */}
        {mode === 'forgot' && (
          <div>
            <div className="mb-6 pr-8">
              <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--paper-2)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block mb-2">
                Account Recovery
              </span>
              <h3 className="font-serif-heading text-2xl font-bold text-[var(--ink)]">
                Reset Password
              </h3>
              <p className="text-xs text-[var(--muted)] font-mono-val mt-1">
                Enter your registered college or Gmail email to receive password reset instructions.
              </p>
            </div>

            {forgotSubmitted ? (
              <div className="p-4 rounded-xl bg-[var(--mint)] border-2 border-[var(--ink)] text-xs font-mono-val text-[var(--forest)] space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[var(--forest)]" />
                  <span>Password Reset Link Sent!</span>
                </div>
                <p>
                  A password reset email has been dispatched to <strong>{forgotEmail}</strong>. Please check your inbox and spam folder.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setForgotSubmitted(false);
                  }}
                  className="brutal-btn w-full py-2 bg-[var(--paper)] text-[var(--ink)] font-bold rounded-lg cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-1">
                    Registered Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="your.email@mmumullana.ac.in"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--card-bg)] text-xs text-[var(--ink)] font-mono-val focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="brutal-btn w-full py-3 bg-[var(--forest)] text-[var(--paper)] font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--leaf)]"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Send Reset Link</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs font-mono-val text-[var(--muted)] hover:text-[var(--ink)] underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
