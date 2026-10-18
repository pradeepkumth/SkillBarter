import React, { useState } from 'react';
import { SUPABASE_PROJECT_ID, SUPABASE_URL, SQL_SETUP_SCRIPT } from '../lib/supabase';
import { SupabaseSyncStatus } from '../services/supabaseService';
import { 
  X, 
  Database, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  Server, 
  ArrowRight,
  Code
} from 'lucide-react';

interface SupabaseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: SupabaseSyncStatus | null;
  onRefreshHealth: () => void;
}

export const SupabaseStatusModal: React.FC<SupabaseStatusModalProps> = ({
  isOpen,
  onClose,
  status,
  onRefreshHealth,
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SQL_SETUP_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sqlEditorUrl = `https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--ink)]/65 backdrop-blur-xs">
      <div className="brutal-card w-full max-w-2xl bg-[var(--paper)] p-6 md:p-8 relative max-h-[92vh] overflow-y-auto">
        
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
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono-val font-bold uppercase tracking-wider text-[var(--forest)] bg-[var(--mint)] px-2.5 py-0.5 rounded border border-[var(--ink)] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              Supabase PostgreSQL Connection
            </span>
            <span className="text-xs font-mono-val font-bold text-[var(--ink)] bg-[var(--mustard)] px-2 py-0.5 rounded border border-[var(--ink)]">
              Live Project
            </span>
          </div>

          <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[var(--ink)]">
            Supabase Database Integration
          </h3>
          <p className="text-xs text-[var(--muted)] font-mono-val mt-1">
            Real-time persistence for student session bookings, escrow holds, and verified learning proof.
          </p>
        </div>

        {/* Connection Details Box */}
        <div className="p-4 bg-[var(--paper-2)] border-2 border-[var(--ink)] rounded-xl space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs font-mono-val">
            <span className="text-[var(--muted)]">Project ID:</span>
            <span className="font-bold text-[var(--forest)] font-mono-val">{SUPABASE_PROJECT_ID}</span>
          </div>

          <div className="flex items-center justify-between text-xs font-mono-val">
            <span className="text-[var(--muted)]">Supabase REST Endpoint:</span>
            <span className="font-bold text-[var(--ink)] truncate max-w-[280px] sm:max-w-md">{SUPABASE_URL}</span>
          </div>

          <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono-val">
            <span className="text-[var(--muted)]">Connection Status:</span>
            <span className="flex items-center gap-1.5 font-bold text-[var(--forest)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--forest)] animate-pulse" />
              <span>Connected &amp; Client Initialized</span>
            </span>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`p-3.5 rounded-xl border-2 mb-6 text-xs font-mono-val flex items-start gap-2.5 ${
            status.tableReady 
              ? 'bg-[var(--mint)]/40 border-[var(--forest)] text-[var(--forest)]' 
              : 'bg-[var(--mustard)]/20 border-[var(--ink)] text-[var(--ink)]'
          }`}>
            <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-[var(--forest)]" />
            <div>
              <div className="font-bold">
                {status.tableReady ? 'Database Ready for Bookings:' : 'Database Setup Tip:'}
              </div>
              <div>{status.message}</div>
            </div>
          </div>
        )}

        {/* SQL Setup Instruction Box */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-val font-bold uppercase text-[var(--forest)] flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" />
              Supabase SQL Table Schema
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySQL}
                className="brutal-btn px-2.5 py-1 bg-[var(--paper)] text-[var(--ink)] text-[11px] font-mono-val font-bold rounded flex items-center gap-1 cursor-pointer hover:bg-[var(--line)]"
              >
                {copied ? <Check className="w-3 h-3 text-[var(--forest)]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied SQL!' : 'Copy SQL Script'}</span>
              </button>

              <a
                href={sqlEditorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn px-2.5 py-1 bg-[var(--forest)] text-[var(--paper)] text-[11px] font-mono-val font-bold rounded flex items-center gap-1 cursor-pointer hover:bg-[var(--leaf)]"
              >
                <span>Open Supabase SQL Editor</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-3 bg-[var(--ink)] text-[var(--paper)] rounded-xl border-2 border-[var(--ink)] text-[11px] font-mono-val max-h-48 overflow-y-auto leading-relaxed select-all">
            <pre className="whitespace-pre-wrap">{SQL_SETUP_SCRIPT}</pre>
          </div>
          <p className="text-[11px] text-[var(--muted)] font-mono-val">
            💡 Simply paste this schema into your Supabase SQL Editor once to create the <code>sessions</code>, <code>users</code>, and <code>skills</code> tables.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono-val">
          <button
            type="button"
            onClick={onRefreshHealth}
            className="px-3 py-1.5 text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
          >
            Re-check Health
          </button>

          <button
            type="button"
            onClick={onClose}
            className="brutal-btn px-5 py-2 bg-[var(--forest)] text-[var(--paper)] font-bold rounded-lg cursor-pointer hover:bg-[var(--leaf)]"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
