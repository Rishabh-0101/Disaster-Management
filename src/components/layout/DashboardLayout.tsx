import { ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, LucideIcon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export interface DashboardNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardLayoutProps {
  title: string;
  navItems: DashboardNavItem[];
  children: ReactNode;
}

export default function DashboardLayout({ title, navItems, children }: DashboardLayoutProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-navy-950">
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-navy-900 sm:flex">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-navy-950">
            <ShieldCheck size={16} />
          </span>
          <div>
            <p className="text-sm font-bold text-white">SamadhanSetu</p>
            <p className="text-[11px] text-brand-300">{title}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-500/15 text-brand-300'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 px-3 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-white/10 bg-navy-900/60 px-4 py-3 sm:hidden">
          <Link to="/" className="flex items-center gap-2 text-white">
            <ShieldCheck size={18} /> SamadhanSetu
          </Link>
        </header>
        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
