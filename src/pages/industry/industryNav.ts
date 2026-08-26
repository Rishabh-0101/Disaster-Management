import { LayoutDashboard, Compass, Handshake } from 'lucide-react';
import type { DashboardNavItem } from '../../components/layout/DashboardLayout';

export const INDUSTRY_NAV_ITEMS: DashboardNavItem[] = [
  { to: '/industry/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/industry/explore', label: 'Explore Challenges', icon: Compass },
  { to: '/industry/partnerships', label: 'Partnerships', icon: Handshake },
];
