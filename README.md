# SamadhanSetu — React Project

Poora React (Vite + TypeScript + Tailwind) project, jisme demo mode mein
sab kuch turant kaam karta hai, aur real backend (MongoDB/SQL/Python/Firebase/
Google Maps) connect karne ke liye poori scaffold + instructions di hui hain.

## Turant chalane ke liye (demo mode — koi setup nahi chahiye)

```bash
npm install
npm run dev
```

`http://localhost:5173` khol lo. Is mode mein:
- Sign Up / Log In real email-password match karta hai (localStorage mein, koi random accept nahi hota)
- Report a Problem → Track a Problem poori tarah kaam karta hai (localStorage mein save hota hai)
- "Use my current location" real GPS use karta hai, map bhi real (free OpenStreetMap) dikhta hai
- Charts (Impact Stories, Government Dashboard) demo/submitted data se banate hain

## Real backend connect karne ke liye

Poori step-by-step guide **`INTEGRATION_GUIDE.md`** file mein hai — MongoDB,
SQL, Node.js backend, Python backend, Firebase (Google/GitHub login), Google
Maps — sabke liye "kahan kya paste karna hai" clearly likha hai.

Short version:
```bash
cd server              # ya python-backend/
cp .env.example .env   # apni MongoDB URI / DB URL + JWT secret daalo
npm install && npm run dev     # (python: pip install -r requirements.txt && uvicorn app.main:app --reload)
```
Phir root `.env` mein `VITE_API_BASE_URL=http://localhost:5000/api` set karo
— React app automatically real backend use karne lagega (localStorage
fallback band ho jaayega).

## Project structure

```
samadhansetu/
  src/
    components/{common,forms,layout}   → reusable UI (Badge, MapView, Navbar, Stepper, etc.)
    constants/                          → categories, states+districts, roles, demo data
    context/ + hooks/                    → AuthContext, useAuth, useGeolocation, useLocalStorage
    services/                            → API calls (auth, problems, firebase) with local fallback
    utils/                               → formatters, local auth/problem stores (demo fallback)
    pages/
      citizen/     → ReportProblem (5-step), TrackProblem, SubmissionSuccess
      common/      → Landing, ExploreChallenges, ChallengeDetails, Universities,
                     Industry, ImpactStories, About, HelpFAQ, Login
      government/  → Dashboard, ChallengeManagement, Clusters, AI Recommendations,
                     University Matching, Projects, Impact, Disaster Mode
      industry/    → Dashboard, Explore, Partnerships
      university/  → Dashboard, Assigned Challenges, Team Management, Project Lifecycle
  server/            → Node.js + Express + MongoDB backend (real signup/login/problems API)
  python-backend/    → same backend in Python (FastAPI) — pick one, not both
  INTEGRATION_GUIDE.md → step-by-step for every real integration
```

## Design

`tailwind.config.js` mein `navy` + `brand` color palette hai jo dark
gradient + cyan glow theme banata hai. Charts (recharts), maps (Leaflet —
free, no key needed) aur icons (lucide-react) sab already installed hain.
