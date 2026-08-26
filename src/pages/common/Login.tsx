import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Github } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, UserRole } from '../../constants/roles';
import { signIn, signUp } from '../../services/authService';
import { signInWithGoogle, signInWithGithub, isFirebaseConfigured } from '../../services/firebaseClient';

type Mode = 'login' | 'signup';

export default function Login() {
  const [mode, setMode] = useState<Mode>('login');
  const [role, setRole] = useState<UserRole>('citizen');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result =
        mode === 'signup' ? await signUp(name, email, password, role) : await signIn(email, password);
      login({ id: result.id, name: result.name, email: result.email, role: (result.role as UserRole) || role });
      navigate(`/${result.role || role}/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      const user = await signInWithGoogle();
      login({ id: user.uid, name: user.displayName || 'User', email: user.email || '', role });
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed.');
    }
  };

  const handleGithub = async () => {
    setError('');
    try {
      const user = await signInWithGithub();
      login({ id: user.uid, name: user.displayName || 'User', email: user.email || '', role });
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'GitHub sign-in failed.');
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 card-glow">
        <div className="mb-6 flex flex-col items-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-navy-950">
            <ShieldCheck size={24} />
          </span>
          <h1 className="text-xl font-bold text-white">
            {mode === 'login' ? 'Log in to SamadhanSetu' : 'Create your SamadhanSetu account'}
          </h1>
          <p className="mt-1 text-center text-sm text-slate-400">
            {mode === 'login' ? 'Access your dashboard and manage your challenges.' : 'Sign up to start reporting, solving or funding challenges.'}
          </p>
        </div>

        <div className="mb-5 flex rounded-lg border border-white/10 p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-md py-1.5 font-medium transition ${mode === 'login' ? 'bg-brand-500 text-navy-950' : 'text-slate-400'}`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 rounded-md py-1.5 font-medium transition ${mode === 'signup' ? 'bg-brand-500 text-navy-950' : 'text-slate-400'}`}
          >
            Sign Up
          </button>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-2">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                role === r.id
                  ? 'border-brand-400 bg-brand-400/10 text-white'
                  : 'border-white/10 text-slate-400 hover:border-white/20'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-400"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-400"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-brand-400 to-brand-500 py-2.5 text-sm font-semibold text-navy-950 shadow-glow transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-slate-500">or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogle}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.8v3.7h5.2c-.2 1.2-1.6 3.6-5.2 3.6-3.1 0-5.7-2.6-5.7-5.7s2.6-5.7 5.7-5.7c1.8 0 3 .8 3.6 1.4l2.5-2.4C16.6 4.1 14.5 3.2 12 3.2 6.9 3.2 2.8 7.3 2.8 12.4S6.9 21.6 12 21.6c6.9 0 9.6-4.8 9.6-7.3 0-.5 0-.9-.1-1.3H12z"/></svg>
            Google
          </button>
          <button
            type="button"
            onClick={handleGithub}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <Github size={16} /> GitHub
          </button>
        </div>
        {!isFirebaseConfigured && (
          <p className="mt-2 text-center text-[11px] text-slate-500">
            Google/GitHub login needs Firebase keys in .env (see comments in src/services/firebaseClient.ts)
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          Just want to report something?{' '}
          <Link to="/report-problem" className="font-medium text-brand-300 hover:text-brand-200">
            Report a Problem without logging in
          </Link>
        </p>
      </div>
    </div>
  );
}
