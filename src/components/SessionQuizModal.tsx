import React, { useState } from 'react';
import { SessionRecord, SkillListing } from '../types';
import { CreditCoin } from './CreditCoin';
import { 
  X, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  Award, 
  ThumbsUp, 
  CheckSquare, 
  Square,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SessionQuizModalProps {
  session: SessionRecord | null;
  skill: SkillListing | null;
  isOpen: boolean;
  onClose: () => void;
  onPassQuiz: (sessionId: string, score: number) => void;
  onDisputeRefund: (sessionId: string, reason: string) => void;
}

export const SessionQuizModal: React.FC<SessionQuizModalProps> = ({
  session,
  skill,
  isOpen,
  onClose,
  onPassQuiz,
  onDisputeRefund,
}) => {
  if (!isOpen || !session || !skill) return null;

  const questions = skill.quizQuestions || [];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [learnerConfirmed, setLearnerConfirmed] = useState(true);
  const [teacherConfirmed, setTeacherConfirmed] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [disputeMode, setDisputeMode] = useState(false);
  const [disputeReason, setDisputeReason] = useState('Teacher did not show up at the scheduled library table.');

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  const handleSubmitProof = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scorePct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 100;
    setQuizScore(scorePct);
    setShowResult(true);

    if (scorePct >= 50 && learnerConfirmed && teacherConfirmed) {
      onPassQuiz(session.id, scorePct);
    }
  };

  const handleExecuteDispute = () => {
    onDisputeRefund(session.id, disputeReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--ink)]/60 backdrop-blur-xs">
      <div className="brutal-card w-full max-w-2xl bg-[var(--paper)] p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 brutal-btn rounded-lg bg-[var(--paper-2)] flex items-center justify-center text-[var(--ink)] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!disputeMode && !showResult && (
          <div>
            {/* Header */}
            <div className="mb-6 pr-8">
              <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block mb-2">
                Proof of Learning Verification
              </span>
              <h3 className="font-serif-heading text-2xl font-bold text-[var(--ink)]">
                {session.skillTitle}
              </h3>
              <p className="text-xs text-[var(--muted)] font-mono-val mt-1">
                Teacher: {session.partnerName} · Held in Escrow: 2.0 Credits
              </p>
            </div>

            {/* Explanation Banner */}
            <div className="p-3 bg-[var(--paper-2)] border-2 border-[var(--ink)] rounded-xl mb-6 text-xs text-[var(--ink)] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[var(--mustard)] flex-shrink-0 mt-0.5" />
              <div>
                <strong>Why this quiz exists:</strong> Fake peer sessions cannot generate unearned credits. 
                Answer these 2-3 quick questions from your session to verify you actively learned together.
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6 mb-8">
              {questions.map((q, qIdx) => (
                <div key={q.id} className="p-4 rounded-xl border-2 border-[var(--line)] bg-[var(--card-bg)] space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--forest)] text-[var(--paper)] font-mono-val text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-[var(--ink)]">
                      {q.question}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectAnswer(qIdx, optIdx)}
                        className={`text-left p-3 rounded-lg border-2 text-xs transition-colors cursor-pointer flex items-center justify-between ${
                          selectedAnswers[qIdx] === optIdx
                            ? 'border-[var(--forest)] bg-[var(--mint)]/40 font-bold text-[var(--ink)]'
                            : 'border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--paper-2)]'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedAnswers[qIdx] === optIdx && (
                          <CheckCircle className="w-4 h-4 text-[var(--forest)] flex-shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Dual Confirmation Box */}
            <div className="p-4 rounded-xl border-2 border-[var(--ink)] bg-[var(--paper-2)] mb-6 space-y-3">
              <div className="text-xs font-mono-val font-bold text-[var(--forest)] uppercase">
                Dual Peer Attestation
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[var(--ink)]">
                <input
                  type="checkbox"
                  checked={learnerConfirmed}
                  onChange={(e) => setLearnerConfirmed(e.target.checked)}
                  className="mt-0.5 accent-[var(--forest)] w-4 h-4"
                />
                <span>
                  <strong>Learner Attestation:</strong> I confirm this 1-on-1 session took place and active mentoring was delivered.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[var(--ink)]">
                <input
                  type="checkbox"
                  checked={teacherConfirmed}
                  onChange={(e) => setTeacherConfirmed(e.target.checked)}
                  className="mt-0.5 accent-[var(--forest)] w-4 h-4"
                />
                <span>
                  <strong>Teacher Attestation:</strong> Teacher ({session.partnerName}) verified completion of the lesson plan.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[var(--line)]">
              <button
                type="button"
                onClick={() => setDisputeMode(true)}
                className="text-xs font-mono-val text-[var(--rose)] hover:underline cursor-pointer flex items-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Simulate No-Show / Request Full Refund</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitProof}
                disabled={!learnerConfirmed || !teacherConfirmed}
                className="brutal-btn w-full sm:w-auto px-6 py-2.5 bg-[var(--forest)] text-[var(--paper)] font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--leaf)] disabled:opacity-40"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Submit Proof &amp; Settle Credits</span>
              </button>
            </div>
          </div>
        )}

        {/* Dispute Mode / Refund Screen */}
        {disputeMode && (
          <div className="space-y-4">
            <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--rose)] bg-[var(--paper-2)] px-2 py-0.5 rounded border border-[var(--ink)] inline-block">
              Simulate Escrow Dispute (Path B)
            </span>
            <h3 className="font-serif-heading text-2xl font-bold text-[var(--ink)]">
              Flag Session &amp; Trigger Full Refund
            </h3>
            <p className="text-xs text-[var(--muted)]">
              If a peer mentor fails to show up or the session did not happen, the 2.0 escrow credits are immediately returned in full to your available balance.
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-mono-val font-bold text-[var(--ink)]">
                Reason for Refund Request:
              </label>
              <textarea
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-lg border-2 border-[var(--ink)] bg-[var(--paper-2)] text-xs text-[var(--ink)]"
              />
            </div>

            <div className="p-3 bg-[var(--paper-2)] border border-[var(--line)] rounded-lg text-xs font-mono-val">
              <div className="text-[var(--forest)] font-bold">Guaranteed Refund Math:</div>
              <div>• Escrow held: 2.0 Credits</div>
              <div>• Credits returned to learner: +2.0 Credits (100%)</div>
              <div>• Credits awarded to teacher: 0.0 Credits</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDisputeMode(false)}
                className="px-3 py-1.5 text-xs text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
              >
                Back to Quiz
              </button>
              <button
                type="button"
                onClick={handleExecuteDispute}
                className="brutal-btn px-4 py-2 bg-[var(--rose)] text-[var(--paper)] text-xs font-bold rounded-lg cursor-pointer"
              >
                Execute Full 2.0 Credits Escrow Refund
              </button>
            </div>
          </div>
        )}

        {/* Result Screen */}
        {showResult && (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-[var(--mint)] border-2 border-[var(--ink)] flex items-center justify-center mx-auto text-[var(--forest)] shadow-[3px_3px_0px_var(--ink)]">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono-val font-bold text-[var(--forest)] uppercase">
                Proof Verified by Smart Escrow
              </span>
              <h3 className="font-serif-heading text-2xl font-bold text-[var(--ink)] mt-1">
                Skill Swap Completed!
              </h3>
              <p className="text-xs font-mono-val text-[var(--muted)] mt-1">
                Quiz Score: {quizScore}% · Both Peers Confirmed
              </p>
            </div>

            {/* Receipt Box */}
            <div className="max-w-md mx-auto p-4 bg-[var(--paper-2)] border-2 border-[var(--ink)] brutal-shadow-sm rounded-xl text-left space-y-2 font-mono-val text-xs">
              <div className="font-bold text-[var(--ink)] pb-1 border-b border-[var(--line)]">
                Settlement Breakdown
              </div>
              <div className="flex justify-between">
                <span>Escrow Hold Released:</span>
                <span className="font-bold text-[var(--forest)]">-2.0 Credits</span>
              </div>
              <div className="flex justify-between">
                <span>Learner Escrow Refund:</span>
                <span className="font-bold text-[var(--forest)]">+1.5 Credits</span>
              </div>
              <div className="flex justify-between text-[var(--muted)] text-[11px]">
                <span>Net Learner Cost:</span>
                <span className="font-bold text-[var(--rose)]">-0.5 Credits</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[var(--line)]">
                <span>Teacher ({session.partnerName}) Earned:</span>
                <span className="font-bold text-[var(--forest)]">+5.0 Credits</span>
              </div>
              <div className="flex justify-between text-[var(--leaf)]">
                <span>Campus Trust Score:</span>
                <span className="font-bold">+3 points</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="brutal-btn px-6 py-2.5 bg-[var(--forest)] text-[var(--paper)] font-bold text-xs rounded-xl cursor-pointer hover:bg-[var(--leaf)] inline-flex items-center gap-1.5"
            >
              <span>Back to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
