# SamadhanSetu — Node.js + Express + MongoDB Backend

Yeh real backend hai jo React frontend ko real signup/login (bcrypt password
hashing) aur real problem-report/tracking data (MongoDB mein save) deta hai.

## Setup steps (aap khud karo)

1. **MongoDB Atlas** (free) par account banao: https://www.mongodb.com/cloud/atlas
   - Cluster banao → "Connect" → "Drivers" → connection string copy karo
2. Is folder mein:
   ```
   cp .env.example .env
   ```
   phir `.env` mein `MONGODB_URI=` ke aage apni connection string paste karo,
   aur `JWT_SECRET=` mein koi bhi lamba random string daal do.
3. Install + run:
   ```
   npm install
   npm run dev
   ```
   Server `http://localhost:5000` par chalega.
4. React frontend ke `.env` mein `VITE_API_BASE_URL=http://localhost:5000/api`
   daal do (already scaffold hai) — frontend ab is real backend se baat karega.

## Google/GitHub Login (OAuth)

Iske liye sabse aasan raasta **Firebase Authentication** hai (frontend mein
`src/services/firebaseClient.ts` already ban chuka hai). Yeh backend file
(`src/routes/auth.js`) ke andar ek starter comment diya hai ki Firebase ka
verified token yahan kaise receive karke apna JWT issue karna hai — bas
`firebase-admin` package install karke wahan diya code uncomment kar dena.

## Folder structure

```
server/
  src/
    config/db.js          → MongoDB connect
    models/User.js         → user schema + password hashing
    models/Problem.js       → problem/report schema
    middleware/auth.js      → JWT protect middleware
    routes/auth.js          → signup / login / OAuth extension point
    routes/problems.js      → report / track / list / stats
    index.js                → Express app entry point
```

## API endpoints

| Method | Route                              | Purpose                          |
|--------|-------------------------------------|-----------------------------------|
| POST   | /api/auth/signup                    | Create account (real password)   |
| POST   | /api/auth/login                     | Login (real password match)      |
| POST   | /api/problems                       | Report a problem                 |
| GET    | /api/problems/track/:trackingId     | Track by tracking ID             |
| GET    | /api/problems/by-contact/:contact   | Track by phone/email             |
| GET    | /api/problems                       | List / filter problems           |
| PATCH  | /api/problems/:id/status            | Update status (login required)   |
| GET    | /api/problems/stats/by-state        | State-wise counts (for charts)   |
