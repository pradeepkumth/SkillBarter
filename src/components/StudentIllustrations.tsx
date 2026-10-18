import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number;
}

// Student playing acoustic guitar (Guitarist)
export const StudentGuitarIllustration: React.FC<IllustrationProps> = ({ className = '', size = 180 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Background doodle aura */}
    <circle cx="100" cy="100" r="82" fill="#ECE5D3" stroke="#1B2420" strokeWidth="2.5" />
    
    {/* Body / Torso */}
    <path
      d="M60 170 C60 135 80 120 100 120 C120 120 140 135 140 170 Z"
      fill="#1F5C42"
      stroke="#1B2420"
      strokeWidth="2.5"
    />
    
    {/* Collar */}
    <path d="M88 120 L100 135 L112 120" stroke="#1B2420" strokeWidth="2" fill="#F6F1E7" />
    
    {/* Head & Hair */}
    <rect x="82" y="70" width="36" height="42" rx="14" fill="#F6F1E7" stroke="#1B2420" strokeWidth="2.5" />
    <path
      d="M78 78 C78 58 100 52 122 62 C125 72 120 78 118 82 C110 76 96 74 86 80 Z"
      fill="#1B2420"
    />
    {/* Eyes & warm smile */}
    <circle cx="92" cy="88" r="2.5" fill="#1B2420" />
    <circle cx="108" cy="88" r="2.5" fill="#1B2420" />
    <path d="M96 98 Q100 103 104 98" stroke="#1B2420" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Acoustic Guitar Body */}
    <g transform="rotate(-18 100 130)">
      {/* Guitar body figure-8 */}
      <ellipse cx="120" cy="130" rx="26" ry="22" fill="#E3B53C" stroke="#1B2420" strokeWidth="2.5" />
      <ellipse cx="100" cy="126" rx="19" ry="17" fill="#E3B53C" stroke="#1B2420" strokeWidth="2.5" />
      {/* Sound hole */}
      <circle cx="108" cy="128" r="7" fill="#1B2420" />
      <circle cx="108" cy="128" r="9" stroke="#F6F1E7" strokeWidth="1" strokeDasharray="2 2" fill="none" />
      {/* Fretboard neck */}
      <rect x="52" y="124" width="46" height="8" rx="2" fill="#3E8E64" stroke="#1B2420" strokeWidth="2" />
      {/* Headstock */}
      <path d="M44 122 H52 V134 H44 Z" fill="#1B2420" />
      {/* Strings */}
      <line x1="52" y1="126" x2="132" y2="128" stroke="#1B2420" strokeWidth="1" />
      <line x1="52" y1="130" x2="132" y2="132" stroke="#1B2420" strokeWidth="1" />
    </g>

    {/* Musical Notes in air */}
    <g fill="#B8325A">
      <path d="M152 58 Q158 50 164 54 V70 A4 4 0 1 1 156 66 V58 Z" />
      <path d="M42 90 Q48 85 52 88 V100 A3 3 0 1 1 46 97 V90 Z" />
    </g>
  </svg>
);

// Student coding DSA algorithms with laptop
export const StudentCoderIllustration: React.FC<IllustrationProps> = ({ className = '', size = 180 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Background doodle aura */}
    <circle cx="100" cy="100" r="82" fill="#ECE5D3" stroke="#1B2420" strokeWidth="2.5" />

    {/* Torso in mustard hoodie */}
    <path
      d="M58 175 C58 140 78 126 100 126 C122 126 142 140 142 175 Z"
      fill="#E3B53C"
      stroke="#1B2420"
      strokeWidth="2.5"
    />

    {/* Head & round glasses */}
    <rect x="82" y="68" width="36" height="42" rx="14" fill="#F6F1E7" stroke="#1B2420" strokeWidth="2.5" />
    {/* Curly dark hair */}
    <path
      d="M78 72 C76 50 124 50 122 72 C120 76 114 74 108 72 C100 70 88 70 78 72 Z"
      fill="#1B2420"
    />
    {/* Glasses */}
    <rect x="85" y="82" width="13" height="11" rx="3" stroke="#1B2420" strokeWidth="2" fill="#BFE6CF" />
    <rect x="102" y="82" width="13" height="11" rx="3" stroke="#1B2420" strokeWidth="2" fill="#BFE6CF" />
    <line x1="98" y1="87" x2="102" y2="87" stroke="#1B2420" strokeWidth="2" />
    {/* Confident smirk */}
    <path d="M96 102 Q101 106 106 101" stroke="#1B2420" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Laptop screen & base */}
    <g transform="translate(62, 126)">
      {/* Screen open */}
      <rect x="4" y="0" width="68" height="42" rx="4" fill="#1B2420" stroke="#1B2420" strokeWidth="2" />
      <rect x="7" y="3" width="62" height="36" rx="2" fill="#141A17" />
      {/* Code binary tree graphic on screen */}
      <circle cx="38" cy="11" r="3" fill="#BFE6CF" />
      <line x1="38" y1="12" x2="26" y2="20" stroke="#3E8E64" strokeWidth="1.5" />
      <line x1="38" y1="12" x2="50" y2="20" stroke="#3E8E64" strokeWidth="1.5" />
      <circle cx="26" cy="22" r="3" fill="#E3B53C" />
      <circle cx="50" cy="22" r="3" fill="#E3B53C" />
      <rect x="14" y="30" width="22" height="2" fill="#F6F1E7" />
      <rect x="40" y="30" width="18" height="2" fill="#3E8E64" />
      {/* Keyboard base */}
      <path d="M0 42 L76 42 L68 49 L8 49 Z" fill="#ECE5D3" stroke="#1B2420" strokeWidth="2" />
    </g>

    {/* Floating tags */}
    <text x="142" y="65" fill="#1F5C42" fontFamily="monospace" fontSize="11" fontWeight="bold">O(1)</text>
    <text x="28" y="82" fill="#1F5C42" fontFamily="monospace" fontSize="11" fontWeight="bold">BST</text>
  </svg>
);

// Student with Python & Data
export const StudentPythonIllustration: React.FC<IllustrationProps> = ({ className = '', size = 180 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <circle cx="100" cy="100" r="82" fill="#ECE5D3" stroke="#1B2420" strokeWidth="2.5" />

    {/* Torso in Forest shirt */}
    <path
      d="M58 175 C58 138 78 122 100 122 C122 122 142 138 142 175 Z"
      fill="#1F5C42"
      stroke="#1B2420"
      strokeWidth="2.5"
    />

    {/* Head & Ponytail */}
    <path d="M116 75 C132 80 136 102 128 112" stroke="#1B2420" strokeWidth="7" strokeLinecap="round" />
    <rect x="82" y="66" width="36" height="42" rx="14" fill="#F6F1E7" stroke="#1B2420" strokeWidth="2.5" />
    {/* Dark bangs */}
    <path d="M80 72 C80 54 120 54 120 72 C112 68 94 68 80 72 Z" fill="#1B2420" />
    <circle cx="91" cy="85" r="2.5" fill="#1B2420" />
    <circle cx="107" cy="85" r="2.5" fill="#1B2420" />
    <path d="M96 95 Q100 99 104 95" stroke="#1B2420" strokeWidth="2" strokeLinecap="round" />

    {/* Floating Notebook / Terminal */}
    <rect x="42" y="128" width="116" height="46" rx="6" fill="#F6F1E7" stroke="#1B2420" strokeWidth="2.5" />
    <rect x="48" y="134" width="104" height="10" rx="3" fill="#BFE6CF" />
    <text x="54" y="142" fill="#1F5C42" fontFamily="monospace" fontSize="7.5" fontWeight="bold">def teach_python():</text>
    <text x="64" y="156" fill="#1B2420" fontFamily="monospace" fontSize="7">credits += 5.0</text>
    <text x="64" y="167" fill="#B8325A" fontFamily="monospace" fontSize="7">return "Verified!"</text>

    {/* Python cute badge */}
    <circle cx="155" cy="75" r="16" fill="#E3B53C" stroke="#1B2420" strokeWidth="2" />
    <text x="146" y="80" fill="#1B2420" fontFamily="monospace" fontSize="13" fontWeight="bold">&gt;&gt;&gt;</text>
  </svg>
);

// Student with Excel and Data Charts
export const StudentExcelIllustration: React.FC<IllustrationProps> = ({ className = '', size = 180 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <circle cx="100" cy="100" r="82" fill="#ECE5D3" stroke="#1B2420" strokeWidth="2.5" />

    {/* Torso */}
    <path
      d="M58 175 C58 138 78 124 100 124 C122 124 142 138 142 175 Z"
      fill="#3E8E64"
      stroke="#1B2420"
      strokeWidth="2.5"
    />

    {/* Head */}
    <rect x="82" y="68" width="36" height="42" rx="14" fill="#F6F1E7" stroke="#1B2420" strokeWidth="2.5" />
    <path d="M80 74 C80 56 120 56 120 74 C114 70 96 70 80 74 Z" fill="#1B2420" />
    <circle cx="92" cy="86" r="2.5" fill="#1B2420" />
    <circle cx="108" cy="86" r="2.5" fill="#1B2420" />
    <path d="M96 97 Q100 101 104 97" stroke="#1B2420" strokeWidth="2" strokeLinecap="round" />

    {/* Excel / Spreadsheet Tablet */}
    <g transform="translate(56, 126)">
      <rect x="0" y="0" width="88" height="52" rx="5" fill="#F6F1E7" stroke="#1B2420" strokeWidth="2" />
      {/* Grid cells */}
      <line x1="0" y1="14" x2="88" y2="14" stroke="#1B2420" strokeWidth="1.5" />
      <line x1="0" y1="26" x2="88" y2="26" stroke="#D8D0BC" strokeWidth="1" />
      <line x1="0" y1="38" x2="88" y2="38" stroke="#D8D0BC" strokeWidth="1" />
      <line x1="28" y1="0" x2="28" y2="52" stroke="#1B2420" strokeWidth="1.5" />
      <line x1="58" y1="14" x2="58" y2="52" stroke="#D8D0BC" strokeWidth="1" />
      {/* Mini Bar Chart */}
      <rect x="6" y="28" width="4" height="8" fill="#1F5C42" />
      <rect x="12" y="22" width="4" height="14" fill="#E3B53C" />
      <rect x="18" y="18" width="4" height="18" fill="#3E8E64" />
      <text x="32" y="10" fill="#1F5C42" fontFamily="monospace" fontSize="7" fontWeight="bold">=XLOOKUP()</text>
    </g>

    {/* Sparkle badge */}
    <polygon
      points="160,50 163,58 172,61 163,64 160,72 157,64 148,61 157,58"
      fill="#E3B53C"
      stroke="#1B2420"
      strokeWidth="1.5"
    />
  </svg>
);

// Two students swapping skills (Hero graphic)
export const SkillSwapDuoIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 460 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-lg select-none ${className}`}
  >
    {/* Background warm card container with brutalist border */}
    <rect
      x="12"
      y="12"
      width="436"
      height="256"
      rx="16"
      fill="#ECE5D3"
      stroke="#1B2420"
      strokeWidth="2.5"
    />

    {/* Student 1 (Learner - Riya) */}
    <g transform="translate(40, 40)">
      {/* Torso */}
      <path d="M30 170 C30 135 48 120 72 120 C96 120 114 135 114 170 Z" fill="#1F5C42" stroke="#1B2420" strokeWidth="2.5" />
      {/* Head */}
      <rect x="54" y="65" width="36" height="42" rx="14" fill="#F6F1E7" stroke="#1B2420" strokeWidth="2.5" />
      <path d="M50 72 C50 50 94 50 94 72 C88 66 74 66 50 72 Z" fill="#1B2420" />
      {/* Eyes & smile */}
      <circle cx="64" cy="82" r="2.5" fill="#1B2420" />
      <circle cx="80" cy="82" r="2.5" fill="#1B2420" />
      <path d="M68 93 Q72 98 76 93" stroke="#1B2420" strokeWidth="2" strokeLinecap="round" />
      {/* Label */}
      <text x="32" y="195" fill="#1B2420" fontFamily="sans-serif" fontSize="12" fontWeight="bold">Riya (Learner)</text>
      <text x="32" y="210" fill="#6A716B" fontFamily="monospace" fontSize="10">2nd Yr CSE · MM(DU)</text>
    </g>

    {/* Center Swap Action: Mustard Credit Coin in Motion */}
    <g transform="translate(190, 80)">
      {/* Exchange dashed arrows */}
      <path d="M0 30 C20 10 60 10 80 30" stroke="#1B2420" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
      <path d="M80 60 C60 80 20 80 0 60" stroke="#1B2420" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
      <polygon points="76,22 84,30 74,34" fill="#1B2420" />
      <polygon points="4,68 -4,60 6,56" fill="#1B2420" />

      {/* Credit Coin */}
      <circle cx="40" cy="45" r="26" fill="#E3B53C" stroke="#1B2420" strokeWidth="3" />
      <text x="31" y="44" fill="#1B2420" fontFamily="monospace" fontSize="13" fontWeight="bold">TIME</text>
      <text x="30" y="56" fill="#1B2420" fontFamily="monospace" fontSize="11" fontWeight="bold">BANK</text>
      
      {/* Tag */}
      <rect x="5" y="85" width="70" height="20" rx="4" fill="#BFE6CF" stroke="#1B2420" strokeWidth="1.5" />
      <text x="12" y="99" fill="#1F5C42" fontFamily="sans-serif" fontSize="10" fontWeight="bold">2 Credits Held</text>
    </g>

    {/* Student 2 (Teacher - Aman) */}
    <g transform="translate(290, 40)">
      {/* Torso */}
      <path d="M30 170 C30 135 48 120 72 120 C96 120 114 135 114 170 Z" fill="#3E8E64" stroke="#1B2420" strokeWidth="2.5" />
      {/* Head */}
      <rect x="54" y="65" width="36" height="42" rx="14" fill="#F6F1E7" stroke="#1B2420" strokeWidth="2.5" />
      <path d="M50 70 C48 50 94 50 94 70 C86 64 74 64 50 70 Z" fill="#1B2420" />
      {/* Glasses & smile */}
      <rect x="57" y="78" width="12" height="10" rx="2" stroke="#1B2420" strokeWidth="1.5" fill="#F6F1E7" />
      <rect x="74" y="78" width="12" height="10" rx="2" stroke="#1B2420" strokeWidth="1.5" fill="#F6F1E7" />
      <line x1="69" y1="83" x2="74" y2="83" stroke="#1B2420" strokeWidth="1.5" />
      <path d="M68 95 Q72 100 76 95" stroke="#1B2420" strokeWidth="2" strokeLinecap="round" />
      {/* Guitar in hand */}
      <ellipse cx="26" cy="130" rx="14" ry="12" fill="#E3B53C" stroke="#1B2420" strokeWidth="2" />
      <rect x="22" y="100" width="6" height="30" fill="#1B2420" />
      {/* Label */}
      <text x="32" y="195" fill="#1B2420" fontFamily="sans-serif" fontSize="12" fontWeight="bold">Aman (Teacher)</text>
      <text x="32" y="210" fill="#6A716B" fontFamily="monospace" fontSize="10">Guitar · 3rd Yr ECE</text>
    </g>
  </svg>
);
