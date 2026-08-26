import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-navy-950">
                <ShieldCheck size={16} />
              </span>
              <span className="font-bold text-white">SamadhanSetu</span>
            </div>
            <p className="text-sm text-slate-400">
              A national platform connecting citizens, government, universities, and industry to
              solve societal challenges collaboratively.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/explore-challenges" className="hover:text-white">Explore Challenges</Link></li>
              <li><Link to="/report-problem" className="hover:text-white">Report a Problem</Link></li>
              <li><Link to="/track-problem" className="hover:text-white">Track Problem</Link></li>
              <li><Link to="/impact-stories" className="hover:text-white">Impact Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Network</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/universities" className="hover:text-white">University Network</Link></li>
              <li><Link to="/industry" className="hover:text-white">Industry Network</Link></li>
              <li><Link to="/about" className="hover:text-white">About Platform</Link></li>
              <li><Link to="/help" className="hover:text-white">Help &amp; FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Mail size={14} /> contact@samadhansetu.in</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +91 1800 XXX XXXX</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> National Innovation Hub, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          <p>(c) {new Date().getFullYear()} SamadhanSetu. A Government of India initiative. Demo data shown is for illustration purposes.</p>
          <p className="mt-1">Built for India&apos;s innovation ecosystem.</p>
        </div>
      </div>
    </footer>
  );
}
