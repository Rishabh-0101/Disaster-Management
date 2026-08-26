export type ProblemStatus =
  | 'submitted'
  | 'under_review'
  | 'assigned'
  | 'in_progress'
  | 'solution_proposed'
  | 'resolved'
  | 'routed';

export const STATUS_LABELS: Record<ProblemStatus, string> = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  assigned: 'Assigned to Institution',
  in_progress: 'In Progress',
  solution_proposed: 'Solution Proposed',
  resolved: 'Resolved',
  routed: 'Routed',
};

export const STATUS_COLORS: Record<ProblemStatus, string> = {
  submitted: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
  under_review: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  assigned: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  in_progress: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  solution_proposed: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  resolved: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  routed: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
};

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export const PRIORITY_COLORS: Record<Priority, string> = {
  Low: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
  Medium: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  High: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  Critical: 'bg-red-500/20 text-red-300 border-red-500/40',
};
