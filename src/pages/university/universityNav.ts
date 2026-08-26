import { LayoutDashboard, ListChecks, Users2, GitBranch } from 'lucide-react';
import type { DashboardNavItem } from '../../components/layout/DashboardLayout';

export const UNIVERSITY_NAV_ITEMS: DashboardNavItem[] = [
  { to: '/university/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/university/assigned-challenges', label: 'Assigned Challenges', icon: ListChecks },
  { to: '/university/team-management', label: 'Team Management', icon: Users2 },
  { to: '/university/project-lifecycle', label: 'Project Lifecycle', icon: GitBranch },
];
