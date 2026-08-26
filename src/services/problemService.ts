import type { ProblemStatus, Priority } from '../constants/statuses';
import {
  localReportProblem,
  localGetByTrackingId,
  localGetByContact,
  localListProblems,
  localStatsByState,
  type LocalProblem,
} from '../utils/localProblemStore';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export type Problem = LocalProblem;

// Every function here tries your real backend first (server/ Node.js or
// python-backend/ FastAPI, whichever you run — point VITE_API_BASE_URL at
// it). If that request fails because no backend is running (a network
// error), it automatically falls back to a local browser store so the
// whole Report → Track flow keeps working while you finish backend setup.

export async function reportProblem(payload: Partial<Problem>): Promise<Problem> {
  try {
    const res = await fetch(`${API_BASE}/problems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to report problem');
    return await res.json();
  } catch (err) {
    if (err instanceof TypeError) return localReportProblem(payload);
    throw err;
  }
}

export async function getProblemByTrackingId(trackingId: string): Promise<Problem> {
  try {
    const res = await fetch(`${API_BASE}/problems/track/${encodeURIComponent(trackingId)}`);
    if (!res.ok) throw new Error('not_found');
    return await res.json();
  } catch (err) {
    if (err instanceof TypeError) {
      const found = localGetByTrackingId(trackingId);
      if (!found) throw new Error('No problem found with that tracking ID');
      return found;
    }
    throw err;
  }
}

export async function getProblemsByContact(contact: string): Promise<Problem[]> {
  try {
    const res = await fetch(`${API_BASE}/problems/by-contact/${encodeURIComponent(contact)}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (err) {
    if (err instanceof TypeError) return localGetByContact(contact);
    throw err;
  }
}

export async function listProblems(filters?: { category?: string; status?: ProblemStatus }): Promise<Problem[]> {
  try {
    const params = new URLSearchParams(filters as Record<string, string>);
    const res = await fetch(`${API_BASE}/problems?${params}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (err) {
    if (err instanceof TypeError) return localListProblems(filters);
    throw err;
  }
}

export async function getStatsByState(): Promise<{ state: string; count: number }[]> {
  try {
    const res = await fetch(`${API_BASE}/problems/stats/by-state`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (err) {
    if (err instanceof TypeError) return localStatsByState();
    throw err;
  }
}

export async function updateProblemStatus(id: string, status: ProblemStatus, token?: string): Promise<Problem> {
  const res = await fetch(`${API_BASE}/problems/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return await res.json();
}

export type { Priority };
