import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/explore-challenges', label: 'Explore Challenges' },
  { to: '/universities', label: 'Universities' },
  { to: '/industry', label: 'Industry' },
  { to: '/impact-stories', label: 'Impact Stories' },
  { to: '/about', label: 'About' },
  { to: '/help', label: 'Help' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-navy-950">
            <ShieldCheck size={20} />
          </span>
          <span>
            <span className="block text-base font-bold leading-none text-white">SamadhanSetu</span>
            <span className="block text-[10px] leading-none text-brand-300">Report. Solve. Impact.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => navigate('/report-problem')}
            className="rounded-lg bg-gradient-to-r from-brand-400 to-brand-500 px-4 py-2 text-sm font-semibold text-navy-950 shadow-glow transition hover:opacity-90"
          >
            Report a Problem
          </button>
          <button
            onClick={() => navigate('/track-problem')}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Track
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-navy-950"
              >
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-lg border border-white/10 bg-navy-900 py-1 shadow-lg">
                  <Link
                    to={`/${user?.role}/dashboard`}
                    className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      navigate('/');
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-white/5"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white"
            >
              Log In <ChevronDown size={14} />
            </Link>
          )}
        </div>

        <button className="lg:hidden text-white" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-950 px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white"
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                navigate('/report-problem');
              }}
              className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-navy-950"
            >
              Report a Problem
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate('/track-problem');
              }}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white"
            >
              Track
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                  navigate('/');
                }}
                className="text-sm font-medium text-slate-300 text-left"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-300">
                Log In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
