import { LayoutDashboard, ListChecks, Network, Sparkles, GitMerge, FolderKanban, BarChart3, AlertTriangle } from 'lucide-react';
import type { DashboardNavItem } from '../../components/layout/DashboardLayout';

export const GOV_NAV_ITEMS: DashboardNavItem[] = [
  { to: '/government/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/government/challenges', label: 'Challenges', icon: ListChecks },
  { to: '/government/clusters', label: 'Clusters', icon: Network },
  { to: '/government/ai-recommendations', label: 'AI Analysis', icon: Sparkles },
  { to: '/government/matching', label: 'Matching', icon: GitMerge },
  { to: '/government/projects', label: 'Projects', icon: FolderKanban },
  { to: '/government/impact', label: 'Impact', icon: BarChart3 },
  { to: '/government/disaster-mode', label: 'Disaster Mode', icon: AlertTriangle },
];
