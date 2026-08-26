-- ============================================================
-- SamadhanSetu — SQL Schema (PostgreSQL / MySQL compatible)
-- ============================================================
-- Agar MongoDB ke bajaye SQL use karna hai (Postgres ya MySQL),
-- to yeh schema kisi bhi SQL client (pgAdmin, MySQL Workbench,
-- Supabase SQL editor, PlanetScale, etc.) mein run kar do.
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- MySQL: use CHAR(36) + UUID() instead
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255), -- bcrypt hash; NULL if user signed up via Google/GitHub
  role VARCHAR(20) NOT NULL DEFAULT 'citizen', -- citizen | university | industry | government | admin
  provider VARCHAR(20) NOT NULL DEFAULT 'local', -- local | google | github
  provider_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  state VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  address VARCHAR(255),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  affected_count INT DEFAULT 0,
  priority VARCHAR(20) DEFAULT 'Medium', -- Low | Medium | High | Critical
  status VARCHAR(30) DEFAULT 'submitted',
  reporter_name VARCHAR(255),
  reporter_contact VARCHAR(255),
  reporter_user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS problem_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
  file_url VARCHAR(500) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  departments TEXT[],   -- MySQL: use a JSON column instead of TEXT[]
  expertise TEXT[],
  labs TEXT[],
  email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS industry_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  sector VARCHAR(255),
  capabilities TEXT[],
  email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS impact_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  story_date DATE,
  summary TEXT,
  people_benefited INT DEFAULT 0,
  villages_covered INT DEFAULT 0,
  cost_saved_label VARCHAR(50)
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_problems_state ON problems(state);
CREATE INDEX IF NOT EXISTS idx_problems_category ON problems(category);
CREATE INDEX IF NOT EXISTS idx_problems_status ON problems(status);
CREATE INDEX IF NOT EXISTS idx_problems_tracking_id ON problems(tracking_id);
