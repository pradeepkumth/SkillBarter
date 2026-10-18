import React, { useState } from 'react';
import { SkillListing, UserProfile } from '../types';
import { CreditCoin } from './CreditCoin';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface BookingModalProps {
  skill: SkillListing | null;
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (skill: SkillListing, slot: string, location: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  skill,
  user,
  isOpen,
  onClose,
  onConfirmBooking,
}) => {
  if (!isOpen || !skill) return null;

  const [selectedSlot, setSelectedSlot] = useState(skill.availableSlots[0] || 'Today 5:00 PM');
  const [selectedLocation, setSelectedLocation] = useState(skill.locationType);

  const canAfford = user.availableCredits >= skill.heldCreditsRequired;

  const handleBooking = () => {
    if (!canAfford) return;
    onConfirmBooking(skill, selectedSlot, selectedLocation);
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
            Campus Session Booking
          </span>
          <h3 className="font-serif-heading text-2xl font-bold text-[var(--ink)] leading-snug">
            {skill.title}
          </h3>
          <p className="text-xs text-[var(--muted)] font-mono-val mt-1">
            Teacher: {skill.teacherName} ({skill.teacherDept})
          </p>
        </div>

        {/* Escrow Math Explainer */}
        <div className="p-4 bg-[var(--paper-2)] border-2 border-[var(--ink)] rounded-xl mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono-val">
            <span className="font-bold text-[var(--ink)]">Your Available Balance:</span>
            <span className="font-bold text-[var(--forest)]">{user.availableCredits.toFixed(1)} Credits</span>
          </div>

          <div className="flex items-center justify-between text-xs font-mono-val">
            <span className="text-[var(--rose)] font-bold">Escrow Hold Required:</span>
            <span className="text-[var(--rose)] font-bold">-2.0 Credits</span>
          </div>

          <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono-val">
            <span className="text-[var(--forest)] font-bold">After Quiz Passed:</span>
            <span className="text-[var(--forest)] font-bold">+1.5 Refund (Net -0.5)</span>
          </div>
        </div>

        {/* Form Selection */}
        <div className="space-y-4 mb-6">
          
          <div>
            <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-2">
              Select Time Slot
            </label>
            <div className="space-y-2">
              {skill.availableSlots.map((slot) => (
                <label
                  key={slot}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedSlot === slot
                      ? 'border-[var(--forest)] bg-[var(--mint)]/30 font-bold'
                      : 'border-[var(--line)] bg-[var(--card-bg)] hover:bg-[var(--paper-2)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="slot"
                    value={slot}
                    checked={selectedSlot === slot}
                    onChange={() => setSelectedSlot(slot)}
                    className="accent-[var(--forest)]"
                  />
                  <Clock className="w-4 h-4 text-[var(--forest)] flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[var(--ink)]">{slot}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-val font-bold text-[var(--ink)] uppercase mb-2">
              Preferred Meeting Spot
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-lg border-2 border-[var(--line)] bg-[var(--card-bg)] text-xs text-[var(--ink)]">
              <MapPin className="w-4 h-4 text-[var(--forest)] flex-shrink-0" />
              <span>Campus Central Library, Hostel Common Room, or Google Meet</span>
            </div>
          </div>

        </div>

        {/* Warning if insufficient credits */}
        {!canAfford && (
          <div className="p-3 bg-[var(--rose)]/10 border border-[var(--rose)] rounded-lg text-xs text-[var(--rose)] mb-4 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              You need at least 2.0 available credits to lock a booking escrow. 
              Teach a classmate or check in to restore credits.
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--line)]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
          >
            Cancel
          </button>

          <button
            disabled={!canAfford}
            onClick={handleBooking}
            className="brutal-btn px-5 py-2.5 bg-[var(--forest)] text-[var(--paper)] font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer hover:bg-[var(--leaf)] disabled:opacity-40"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Lock Escrow &amp; Book (2.0 Credits)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
