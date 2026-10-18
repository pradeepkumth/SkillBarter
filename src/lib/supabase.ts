import { createClient } from '@supabase/supabase-js';

// Project credentials provided by the user
export const SUPABASE_PROJECT_ID = 'fcwmxyojkztebkambrsd';
export const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_72GnLkMvdMSDB6-mIr3Bxw_uoqLG2Me';

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const SQL_SETUP_SCRIPT = `-- ==========================================================
-- SkillBarter Supabase Database Setup
-- Project ID: fcwmxyojkztebkambrsd
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/fcwmxyojkztebkambrsd/sql
-- ==========================================================

-- 1. Create sessions table for booked peer sessions and escrow
CREATE TABLE IF NOT EXISTS public.sessions (
  id TEXT PRIMARY KEY,
  skill_id TEXT NOT NULL,
  skill_title TEXT NOT NULL,
  partner_name TEXT NOT NULL,
  partner_role TEXT NOT NULL DEFAULT 'teacher',
  learner_id TEXT,
  teacher_id TEXT,
  slot TEXT NOT NULL,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'booked_held',
  held_credits NUMERIC NOT NULL DEFAULT 2.0,
  credits_earned_or_spent NUMERIC DEFAULT -0.5,
  proof_passed BOOLEAN DEFAULT FALSE,
  quiz_score NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create users table for student profiles
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  college TEXT,
  department TEXT,
  year TEXT,
  avatar_url TEXT,
  available_credits NUMERIC DEFAULT 6.0,
  held_credits NUMERIC DEFAULT 0.0,
  lifetime_earned_credits NUMERIC DEFAULT 0.0,
  trust_score INTEGER DEFAULT 85,
  days_active INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create skills table for student-taught skills
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  teacher_id TEXT,
  teacher_dept TEXT,
  teacher_year TEXT,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 1,
  location_type TEXT DEFAULT 'Campus (Library/Hostel)',
  held_credits_required NUMERIC DEFAULT 2.0,
  description TEXT,
  topics TEXT[],
  available_slots TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create user_logins table to track every login event
CREATE TABLE IF NOT EXISTS public.user_logins (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  device TEXT,
  status TEXT DEFAULT 'success',
  login_time TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS) with open public policy for demo
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_logins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on sessions" ON public.sessions FOR SELECT USING (true);
CREATE POLICY "Allow public insert on sessions" ON public.sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on sessions" ON public.sessions FOR UPDATE USING (true);

CREATE POLICY "Allow public read on users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert on users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on users" ON public.users FOR UPDATE USING (true);

CREATE POLICY "Allow public read on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public insert on skills" ON public.skills FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on user_logins" ON public.user_logins FOR SELECT USING (true);
CREATE POLICY "Allow public insert on user_logins" ON public.user_logins FOR INSERT WITH CHECK (true);
`;
