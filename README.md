# SkillBarter – Student Time-Bank
**Tagline:** *"Learn a Skill. Teach a Skill. Grow Together."*

Built by **Team "Binary Beast"** for the **CodeStorm 2026** Hackathon:
- **Pradeep Kumar** (Team Leader, B.Tech CSE 2nd Year, Maharishi Markandeshwar (Deemed to be University), Mullana)
- **Dhanesh Kumar** (Co-Developer, B.Tech CSE 2nd Year, Maharishi Markandeshwar (Deemed to be University), Mullana)

---

## 1. What SkillBarter Is
A campus-only peer skill-swap platform for college students. Students earn credits by teaching a skill they know and spend credits to learn a skill from a peer. **No money is involved.** A verified profile records what each student can teach and has successfully mentored.

### The Real-Life Problem It Solves:
1. **Learning costs money:** Courses, bootcamps, and private tutors cost thousands, locking out students on tight hostel budgets.
2. **Videos are one-way:** Pre-recorded videos offer zero feedback when you get stuck on a compiler error or guitar fret buzz.
3. **Peer help is random:** Group-chat help is scattered, unacknowledged, and provides no record for resumes.
*Campus Example:* Someone in Hostel 3 plays acoustic guitar, and you know binary search trees for upcoming placement tests, but without a campus time-bank you might never meet.

---

## 2. The Time-Bank Credit & Escrow Engine
- **Starter Grant:** Learner receives **6.0 free starter credits** once upon signing in with their college email (`@mmumullana.ac.in` or accredited `.edu` / `.ac.in` domains).
- **Booking Escrow Hold:** Booking a 1-on-1 session places **2.0 credits on hold in escrow** for up to 24 hours to prevent no-shows.
- **Proof-of-Learning Settlement:**
  - After the session, the learner passes a 2–3 question comprehension quiz and both peers tap confirmation.
  - **Teacher earns 5.0 credits.**
  - **Learner receives 1.5 credits back** from the escrow hold (net cost: **0.5 credits spent**).
- **Escrow Refund Guarantee (No-Show or Failed Proof):** If a mentor fails to show up or proof fails, all **2.0 credits are immediately returned** to the learner's available wallet balance.
- **Anti-Gaming Rules:**
  - Max 2 sessions per week between the same learner-teacher pair.
  - Daily earning cap (10.0 credits max/day).
  - Trust score system rewards consistent mentors.
- *Notice:* All numbers are illustrative until tested in the pilot.

### Example Wallet Story (Riya):
1. Starts with **6.0 credits** from college onboarding.
2. Books Aman for guitar: **4.0 available + 2.0 held in escrow**.
3. Passes the proof quiz with Aman: **5.5 available** (net -0.5 spent; Aman earned 5.0).
4. Later teaches Neha Python OOP: earns **+5.0 credits** $\rightarrow$ **10.5 total balance**!

---

## 3. Tech Stack

### Frontend (Active Production Demo):
- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4** with a custom human-crafted warm brutalist aesthetic:
  - Tokens: `--paper` (`#F6F1E7`), `--paper-2` (`#ECE5D3`), `--ink` (`#1B2420`), `--forest` (`#1F5C42`), `--leaf` (`#3E8E64`), `--mint` (`#BFE6CF`), `--mustard` (`#E3B53C`), `--rose` (`#B8325A`).
  - Dark mode toggle with deep ink palette (`#141A17`).
  - Flat cartoon SVG illustrations with 2.5px ink lineart and flat color fills.
  - Hard brutalist shadows (`4px 4px 0px var(--ink)`).
  - Typography: **Fraunces** (headings), **DM Sans** (body & UI), **JetBrains Mono** (numbers & credits).
- **Lucide React** line icons.

### Backend (Planned Production Architecture):
- **Runtime:** Node.js + Express REST API
- **Database:** MongoDB with Mongoose ODM
- **Auth:** Firebase Authentication restricted to verified college email domains
- **Calendar & Alerts:** Google Calendar API, Nodemailer, Firebase Cloud Messaging (FCM)

---

## 4. Folder Structure
```
/
├── index.html                   # HTML entry point with Fraunces, DM Sans, JetBrains Mono
├── metadata.json                # Project identity metadata
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript compiler config
├── vite.config.ts               # Vite configuration with Tailwind CSS v4
├── README.md                    # Project documentation
└── src/
    ├── main.tsx                 # React DOM root
    ├── App.tsx                  # Main application orchestrator & global state
    ├── index.css                # CSS variables, brutalist shadow utilities & paper grain
    ├── types.ts                 # TypeScript types (UserProfile, SkillListing, SessionRecord)
    ├── data/
    │   └── sampleData.ts        # Sample skills, quiz questions, and initial user profiles
    └── components/
        ├── Navbar.tsx           # Brand, live wallet indicator, theme toggle, nav links
        ├── Hero.tsx             # Asymmetric hero, student voice copy, sticker badges
        ├── ProblemSolution.tsx  # 3 campus problems vs. SkillBarter time-bank fixes
        ├── FlowchartHowItWorks.tsx # Numbered 6-step flow + Decision Fork (Path A / Path B)
        ├── CreditSystemSection.tsx # Escrow diagram, Riya story stepper, rules, calculator
        ├── PopularSwapsSection.tsx # Leaderboard of the most popular campus swaps this week
        ├── ScheduleAndReminders.tsx # Upcoming session schedule with smart notification alerts
        ├── BrowseSkills.tsx     # Filterable & searchable skill cards with unboxed metadata
        ├── Dashboard.tsx        # Personal profile, wallet breakdown, tenure, resume export
        ├── BookingModal.tsx     # 1-on-1 slot selector with 2.0 escrow hold
        ├── SessionQuizModal.tsx # Proof-of-learning quiz, dual attestation, refund test
        ├── TeachSkillModal.tsx  # Modal to offer a skill and author quiz questions
        ├── AuthLoginSignupModal.tsx # Login with Gmail/Password, Signup & Forgot Password
        ├── StudentProfileModal.tsx  # Peer profile with DP change, stats & private email protection
        ├── AboutTeam.tsx        # Binary Beast bios, CodeStorm 2026, 3-phase roadmap
        ├── ReferencesSection.tsx# Stanford Protégé effect, SSIR, NEF time-banking citations
        ├── Footer.tsx           # Brutalist footer with team attribution and disclaimers
        ├── CreditCoin.tsx       # Mustard credit coin component in JetBrains Mono
        ├── SquiggleUnderline.tsx# Hand-drawn squiggly SVG text decoration
        └── StudentIllustrations.tsx # Custom cartoon SVG illustrations
```

---

## 5. How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the Vite development server on port 3000
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 6. Live Supabase Database Connection
SkillBarter is connected to your Supabase PostgreSQL cloud instance:
- **Project ID:** `fcwmxyojkztebkambrsd`
- **REST Endpoint:** `https://fcwmxyojkztebkambrsd.supabase.co`
- **API Key:** `sb_publishable_72GnLkMvdMSDB6-mIr3Bxw_uoqLG2Me`

### Tables & Real-Time Sync:
- `public.sessions`: Stores all peer session bookings, time slots, locations, escrow locks (2.0 credits held), proof quiz scores, and settlement status (`booked_held`, `completed`, `refunded`).
- `public.users`: Stores student profiles, departments, credits earned, and spendable budget.
- `public.skills`: Stores student-taught skills and topics.

### One-Click SQL Setup:
Run the SQL script directly in your [Supabase SQL Editor](https://supabase.com/dashboard/project/fcwmxyojkztebkambrsd/sql) (or click the **Supabase DB** status button in the app navigation) to initialize the tables with Row-Level Security (RLS).

---

## 7. Master Admin Desk
SkillBarter includes a dedicated, secure **Admin Panel** to inspect all peer session bookings, oversee escrow holds, and manage student accounts across campus:
- **Direct Access:** Click the **Admin** button in the top navigation bar or footer.
- **Admin ID:** `admin@skillbarter.edu`
- **Master Password:** `BinaryBeastAdmin2026!`
- **Capabilities:**
  - View real-time KPI metrics (Total Bookings, Active Escrow, Settled Sessions, Credits Minted).
  - Search, filter, and inspect detailed session metadata (ID, learner, teacher, slot, location, status, quiz score).
  - Administrative Escrow Overrides: Force release escrow or force 100% refund.
  - Export full booking ledger to CSV.
  - Student roster inspection with credit and tenure data.
  - Direct live sync with Supabase project `fcwmxyojkztebkambrsd`.

---

## 8. Deploying to Netlify

SkillBarter is pre-configured with `netlify.toml` and `public/_redirects` for seamless zero-config Netlify deployment.

### Option A: Deploy via GitHub (Recommended)
1. Push this codebase to your GitHub repository.
2. In [Netlify Dashboard](https://app.netlify.com/):
   - Click **"Add new site"** > **"Import an existing project"**.
   - Choose **GitHub** and select your repository.
3. Build Settings (auto-detected from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Environment Variables (optional, defaults are already pre-baked into the code):
   - `VITE_SUPABASE_URL`: `https://fcwmxyojkztebkambrsd.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `sb_publishable_72GnLkMvdMSDB6-mIr3Bxw_uoqLG2Me`
5. Click **"Deploy site"** — your site will be live on Netlify with SSL in ~1 minute!

### Option B: Deploy via Netlify Drop (Manual Drag & Drop)
1. Run `npm run build` locally to generate the `dist` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` directory into the upload box.
4. Netlify will deploy it instantly!
