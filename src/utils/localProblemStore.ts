// ============================================================
// Local fallback problem store — used ONLY when no real backend
// (server/ or python-backend/) is connected yet. This is what makes
// Report a Problem + Track a Problem actually work end-to-end out
// of the box: a submitted problem is saved here and can immediately
// be found again by its tracking ID or by reporter contact.
//
// Once you connect a real backend, this stops being used automatically
// (see problemService.ts) and everything is stored in your real
// MongoDB/SQL database instead.
// ============================================================

import { generateTrackingId } from './formatters';
import type { ProblemStatus, Priority } from '../constants/statuses';

export interface LocalProblem {
  id: string;
  tracking_id: string;
  title: string;
  description: string;
  category: string;
  state: string;
  district: string;
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  affected_count: number;
  priority: Priority;
  status: ProblemStatus;
  reporter_name?: string;
  reporter_contact?: string;
  created_at: string;
}

const KEY = 'samadhansetu_local_problems';

function getAll(): LocalProblem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAll(problems: LocalProblem[]) {
  localStorage.setItem(KEY, JSON.stringify(problems));
}

export function localReportProblem(payload: Partial<LocalProblem>): LocalProblem {
  const problems = getAll();
  const problem: LocalProblem = {
    id: crypto.randomUUID(),
    tracking_id: generateTrackingId(),
    title: payload.title || 'Untitled problem',
    description: payload.description || '',
    category: payload.category || 'other',
    state: payload.state || '',
    district: payload.district || '',
    city: payload.city,
    address: payload.address,
    latitude: payload.latitude,
    longitude: payload.longitude,
    affected_count: payload.affected_count || 0,
    priority: payload.priority || 'Medium',
    status: 'submitted',
    reporter_name: payload.reporter_name,
    reporter_contact: payload.reporter_contact,
    created_at: new Date().toISOString(),
  };
  problems.unshift(problem);
  saveAll(problems);
  return problem;
}

export function localGetByTrackingId(trackingId: string): LocalProblem | null {
  const problems = getAll();
  return problems.find((p) => p.tracking_id.toLowerCase() === trackingId.trim().toLowerCase()) || null;
}

export function localGetByContact(contact: string): LocalProblem[] {
  const problems = getAll();
  return problems.filter((p) => p.reporter_contact && p.reporter_contact.trim() === contact.trim());
}

export function localListProblems(filters?: { category?: string; status?: ProblemStatus }): LocalProblem[] {
  let problems = getAll();
  if (filters?.category) problems = problems.filter((p) => p.category === filters.category);
  if (filters?.status) problems = problems.filter((p) => p.status === filters.status);
  return problems;
}

export function localStatsByState(): { state: string; count: number }[] {
  const problems = getAll();
  const map = new Map<string, number>();
  problems.forEach((p) => {
    if (!p.state) return;
    map.set(p.state, (map.get(p.state) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count);
}
