import { supabase, SUPABASE_PROJECT_ID } from '../lib/supabase';
import { SessionRecord, UserProfile, SkillListing } from '../types';

export interface SupabaseSyncStatus {
  connected: boolean;
  tableReady: boolean;
  message: string;
  projectId: string;
}

/**
 * Check Supabase connection and whether the `sessions` table is ready
 */
export async function checkSupabaseHealth(): Promise<SupabaseSyncStatus> {
  try {
    const { data, error } = await supabase.from('sessions').select('id').limit(1);

    if (error) {
      // If error code is 42P01 (relation does not exist) or similar table missing error
      if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist')) {
        return {
          connected: true,
          tableReady: false,
          message: 'Connected to Supabase, but the "sessions" table needs to be created in the SQL Editor.',
          projectId: SUPABASE_PROJECT_ID,
        };
      }
      return {
        connected: true,
        tableReady: false,
        message: `Supabase reached: ${error.message}`,
        projectId: SUPABASE_PROJECT_ID,
      };
    }

    return {
      connected: true,
      tableReady: true,
      message: 'Supabase database is connected and ready to store sessions in real-time.',
      projectId: SUPABASE_PROJECT_ID,
    };
  } catch (err: any) {
    return {
      connected: false,
      tableReady: false,
      message: err.message || 'Unable to connect to Supabase endpoint.',
      projectId: SUPABASE_PROJECT_ID,
    };
  }
}

/**
 * Save a newly booked session into Supabase
 */
export async function saveSessionToSupabase(
  session: SessionRecord,
  learnerId?: string,
  teacherId?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      id: session.id,
      skill_id: session.skillId,
      skill_title: session.skillTitle,
      partner_name: session.partnerName,
      partner_role: session.partnerRole,
      learner_id: learnerId || 'user-riya-01',
      teacher_id: teacherId || session.skillId,
      slot: session.slot,
      location: session.location,
      status: session.status,
      held_credits: session.heldCredits,
      credits_earned_or_spent: session.creditsEarnedOrSpent,
      proof_passed: session.proofPassed || false,
      quiz_score: session.quizScore || null,
      notes: session.notes || null,
    };

    const { error } = await supabase.from('sessions').upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase session save error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('Supabase unexpected error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch all booked sessions from Supabase
 */
export async function fetchSessionsFromSupabase(): Promise<SessionRecord[]> {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      skillId: row.skill_id,
      skillTitle: row.skill_title,
      partnerName: row.partner_name,
      partnerRole: row.partner_role as 'teacher' | 'learner',
      slot: row.slot,
      location: row.location || 'Campus Library',
      date: new Date(row.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      status: row.status as any,
      heldCredits: Number(row.held_credits) || 0,
      creditsEarnedOrSpent: Number(row.credits_earned_or_spent) || 0,
      proofPassed: row.proof_passed,
      quizScore: row.quiz_score ? Number(row.quiz_score) : undefined,
      notes: row.notes || undefined,
    }));
  } catch (err) {
    console.warn('Failed to fetch from Supabase:', err);
    return [];
  }
}

/**
 * Update settled proof result in Supabase
 */
export async function updateSessionProofInSupabase(
  sessionId: string,
  score: number,
  notes?: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('sessions')
      .update({
        status: 'completed',
        held_credits: 0,
        proof_passed: true,
        quiz_score: score,
        notes: notes || `Proof quiz verified with ${score}% score.`,
      })
      .eq('id', sessionId);

    return !error;
  } catch {
    return false;
  }
}

/**
 * Update dispute or refund in Supabase
 */
export async function updateSessionDisputeInSupabase(
  sessionId: string,
  reason: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('sessions')
      .update({
        status: 'refunded',
        held_credits: 0,
        proof_passed: false,
        notes: `Refunded: ${reason}`,
      })
      .eq('id', sessionId);

    return !error;
  } catch {
    return false;
  }
}

/**
 * Save user profile to Supabase
 */
export async function saveUserToSupabase(user: UserProfile): Promise<boolean> {
  try {
    const { error } = await supabase.from('users').upsert({
      id: user.id,
      name: user.name,
      email: user.email,
      college: user.college,
      department: user.department,
      year: user.year,
      avatar_url: user.avatarUrl,
      available_credits: user.availableCredits,
      held_credits: user.heldCredits,
      lifetime_earned_credits: user.lifetimeEarnedCredits,
      trust_score: user.trustScore,
      days_active: user.daysActive,
    });

    return !error;
  } catch {
    return false;
  }
}
