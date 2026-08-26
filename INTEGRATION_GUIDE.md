# SamadhanSetu — Integration Guide (सारे backend setup एक जगह)

Yeh guide bataata hai ki har integration ke liye **kya karna hai aur kahan
paste karna hai**. Aapko sirf apni free API keys/accounts banani hain aur
neeche di gayi jagah paste karni hain — code already ban chuka hai.

---

## 1) MongoDB (real database)

**Kahan:** `server/.env` (Node backend) ya `python-backend/.env` (Python backend)

1. https://www.mongodb.com/cloud/atlas par free account banao
2. "Build a Database" → Free tier (M0) cluster banao
3. "Connect" → "Drivers" → connection string copy karo
4. `.env` file mein:
   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/samadhansetu
   ```

## 2) SQL (agar MongoDB ke bajaye SQL chahiye)

**File:** `server/sql/schema.sql`

1. Koi bhi Postgres/MySQL hosting lo (Neon, Supabase DB, PlanetScale, ya apna local Postgres)
2. `server/sql/schema.sql` ki poori content us database mein run kar do (SQL editor mein paste karke Run)
3. `python-backend/.env` mein `DATABASE_URL=postgresql://user:pass@host:5432/dbname` daal do

## 3) Node.js Backend (Express + MongoDB)

**Folder:** `server/`

```bash
cd server
cp .env.example .env      # MONGODB_URI + JWT_SECRET daalo (upar dekho)
npm install
npm run dev
```
Server `http://localhost:5000` par chalega. Phir React app ke `.env` mein:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 4) Python Backend (FastAPI) — Node ka alternative

**Folder:** `python-backend/`

```bash
cd python-backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # MONGODB_URI ya DATABASE_URL + JWT_SECRET
uvicorn app.main:app --reload --port 8000
```
Phir React app ke `.env` mein:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

> **Note:** Node aur Python dono ek saath chalane ki zaroorat nahi — jo bhi
> language comfortable lage, us backend ko run karo, doosre ko ignore karo.

## 5) Firebase (Google / GitHub Login)

**Kahan:** React app ka `.env`

1. https://console.firebase.google.com → "Add project" (free)
2. Build → Authentication → Get Started → Sign-in method:
   - **Google** → Enable karo (ek click)
   - **GitHub** → Enable karo (GitHub OAuth App banana hoga:
     https://github.com/settings/developers → "New OAuth App" →
     Authorization callback URL Firebase console khud dikhata hai, wahi paste karo → Client ID/Secret Firebase mein daalo)
3. Project Settings (⚙️) → "Your apps" → Web app (`</>`) add karo
4. Wahan se milne wali values `.env` mein daalo:
   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_APP_ID=
   ```
5. `npm install` (firebase package already `package.json` mein hai)
6. Login page ke "Continue with Google" / "Continue with GitHub" buttons ab kaam karenge.

**Backend side verify karne ke liye** (optional, extra security):
`server/src/routes/auth.js` aur `python-backend/app/routes/auth.py` ke
bottom mein comment kiya hua starter code hai — Firebase Admin SDK install
karke uncomment kar do.

## 6) Google Maps (agar free Leaflet map ke bajaye Google Maps chahiye)

**File:** `src/components/common/GoogleMapView.tsx` (already ready hai)

1. https://console.cloud.google.com → naya project
2. "APIs & Services" → "Library" → **"Maps JavaScript API"** enable karo
3. "Credentials" → "Create Credentials" → "API Key" copy karo
4. React app ke `.env` mein:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_key_here
   ```
5. Jahan bhi `<MapView .../>` use ho raha hai (e.g.
   `src/components/forms/LocationSelector.tsx`), usko `<GoogleMapView .../>`
   se replace kar do — same props leta hai.

> Free `MapView.tsx` (OpenStreetMap) bina kisi key ke already kaam karta
> hai — Google Maps sirf tab zaroori hai jab aapko Google ka look/style

### 6b) Google Maps — bina key wala iframe embed (option 2)

**File:** `src/components/common/GoogleMapEmbedView.tsx` (already ready hai, koi setup nahi chahiye)

Agar aap bilkul koi API key ya Google Cloud account nahi banana chahte, is
component ko `<MapView .../>` ki jagah use kar sakte ho — same props leta
hai, koi `.env` change nahi chahiye.

⚠️ **Honestly:** yeh Google ka officially-documented API nahi hai — ek
purana `?output=embed` query-trick hai jo abhi kaam karta hai par Google
kabhi bhi bina notice ke band kar sakta hai (koi guarantee nahi). Isliye
default `MapView.tsx` (OpenStreetMap) zyada reliable hai — wahi already
production mein use ho raha hai poore project mein. Yeh sirf ek extra
option hai agar aapko specifically Google ka look chahiye.

> ya unke extra features chahiye ho.

## 7) Geo Location (browser GPS)

Yeh already **kaam karta hai**, koi key nahi chahiye — `src/hooks/useGeolocation.ts`
browser ke built-in Geolocation API se real GPS location leta hai, aur free
OpenStreetMap Nominatim se state/district/city naam mein convert karta hai.
Report a Problem ke Location step mein "Use my current location" button
isi ko call karta hai.

## 8) Cloud Storage (evidence photos/videos)

Abhi evidence files sirf browser memory mein preview hoti hain (submit hone
tak). Real storage ke liye koi bhi ek use kar sakte ho:

- **Firebase Storage** (agar Firebase already setup kar liya): `firebase/storage`
  se `uploadBytes()` use karo, mila hua URL `evidenceUrls` array mein save karo
  (`server/src/models/Problem.js` mein already field bana hua hai)
- **Cloudinary** (free tier, sabse aasan): unsigned upload preset banao,
  `FileUploader.tsx` ke andar file select hone par seedha Cloudinary API ko
  POST kar do

---

## Quick checklist

| Cheez              | File kahan hai                                  | Key kahan daalein          |
|---------------------|--------------------------------------------------|------------------------------|
| MongoDB             | `server/src/config/db.js`                        | `server/.env`                |
| SQL schema          | `server/sql/schema.sql`                           | apne SQL client mein run     |
| Node backend        | `server/`                                          | `server/.env`                |
| Python backend       | `python-backend/`                                  | `python-backend/.env`        |
| Firebase (OAuth)     | `src/services/firebaseClient.ts`                   | React app ka `.env`          |
| Google Maps          | `src/components/common/GoogleMapView.tsx`          | React app ka `.env`          |
| Geolocation          | `src/hooks/useGeolocation.ts`                      | — (already works) |

Sab kuch already code mein wired hai aur graceful fallback ke saath hai —
matlab jab tak aap real keys nahi daaloge, app demo/local mode mein poori
tarah kaam karta rahega, aur jaise hi key daaloge wo hissa automatically
real backend use karne lagega.
