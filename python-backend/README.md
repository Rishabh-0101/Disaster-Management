# SamadhanSetu — Python (FastAPI) Backend

Yeh Node.js backend ka **alternative** hai (dono ek saath run karne ki zaroorat
nahi — jo bhi language aapko comfortable lage, wahi use karo).

## Setup steps (aap khud karo)

1. Virtual environment banao aur activate karo:
   ```
   python -m venv venv
   source venv/bin/activate      # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
2. ```
   cp .env.example .env
   ```
   phir MongoDB ka connection string (`MONGODB_URI`) ya Postgres ka
   (`DATABASE_URL`) daalo, aur `JWT_SECRET` mein random string daalo.
3. Run:
   ```
   uvicorn app.main:app --reload --port 8000
   ```
   Docs yahan milegi: `http://localhost:8000/docs`

## Google/GitHub OAuth

`app/routes/auth.py` ke bottom mein Firebase-based OAuth ka poora starter
code comment mein diya hai — bas `firebase-admin` install karke uncomment
kar dena aur apni Firebase service-account key ka path daal dena.

## Folder structure

```
python-backend/
  app/
    core/
      database.py    → MongoDB connection (motor)
      security.py     → password hashing + JWT
    models/schemas.py  → request/response models
    routes/
      auth.py          → signup / login / OAuth extension point
      problems.py       → report / track / list / stats
    main.py             → FastAPI app entry point
  requirements.txt
  .env.example
```
