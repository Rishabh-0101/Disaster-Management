import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Common pages
import Landing from './pages/common/Landing';
import ExploreChallenges from './pages/common/ExploreChallenges';
import ChallengeDetails from './pages/common/ChallengeDetails';
import UniversityNetwork from './pages/common/UniversityNetwork';
import IndustryNetwork from './pages/common/IndustryNetwork';
import ImpactStories from './pages/common/ImpactStories';
import About from './pages/common/About';
import HelpFAQ from './pages/common/HelpFAQ';
import Login from './pages/common/Login';

// Citizen pages
import ReportProblem from './pages/citizen/ReportProblem';
import SubmissionSuccess from './pages/citizen/SubmissionSuccess';
import TrackProblem from './pages/citizen/TrackProblem';
import CitizenDashboard from './pages/citizen/CitizenDashboard';

// Government pages
import GovDashboard from './pages/government/GovDashboard';
import ChallengeManagement from './pages/government/ChallengeManagement';
import ProblemClusters from './pages/government/ProblemClusters';
import AIRecommendations from './pages/government/AIRecommendations';
import UniversityMatching from './pages/government/UniversityMatching';
import GovProjects from './pages/government/GovProjects';
import GovImpact from './pages/government/GovImpact';
import DisasterMode from './pages/government/DisasterMode';

// Industry pages
import IndustryDashboard from './pages/industry/IndustryDashboard';
import IndustryExplore from './pages/industry/IndustryExplore';
import IndustryPartnerships from './pages/industry/IndustryPartnerships';

// University pages
import UniversityDashboard from './pages/university/UniversityDashboard';
import AssignedChallenges from './pages/university/AssignedChallenges';
import TeamManagement from './pages/university/TeamManagement';
import ProjectLifecycle from './pages/university/ProjectLifecycle';

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-white">404</h1>
      <p className="mt-2 text-sm text-slate-400">The page you're looking for doesn't exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/explore-challenges" element={<ExploreChallenges />} />
        <Route path="/challenges/:id" element={<ChallengeDetails />} />
        <Route path="/universities" element={<UniversityNetwork />} />
        <Route path="/industry" element={<IndustryNetwork />} />
        <Route path="/impact-stories" element={<ImpactStories />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<HelpFAQ />} />
        <Route path="/login" element={<Login />} />

        <Route path="/report-problem" element={<ReportProblem />} />
        <Route path="/report-problem/success" element={<SubmissionSuccess />} />
        <Route path="/track-problem" element={<TrackProblem />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Citizen portal */}
      <Route path="/citizen/dashboard" element={<CitizenDashboard />} />

      {/* Government portal (uses its own DashboardLayout, no public Navbar/Footer) */}
      <Route path="/government/dashboard" element={<GovDashboard />} />
      <Route path="/government/challenges" element={<ChallengeManagement />} />
      <Route path="/government/clusters" element={<ProblemClusters />} />
      <Route path="/government/ai-recommendations" element={<AIRecommendations />} />
      <Route path="/government/matching" element={<UniversityMatching />} />
      <Route path="/government/projects" element={<GovProjects />} />
      <Route path="/government/impact" element={<GovImpact />} />
      <Route path="/government/disaster-mode" element={<DisasterMode />} />

      {/* Industry portal */}
      <Route path="/industry/dashboard" element={<IndustryDashboard />} />
      <Route path="/industry/explore" element={<IndustryExplore />} />
      <Route path="/industry/partnerships" element={<IndustryPartnerships />} />

      {/* University portal */}
      <Route path="/university/dashboard" element={<UniversityDashboard />} />
      <Route path="/university/assigned-challenges" element={<AssignedChallenges />} />
      <Route path="/university/team-management" element={<TeamManagement />} />
      <Route path="/university/project-lifecycle" element={<ProjectLifecycle />} />
    </Routes>
  );
}
