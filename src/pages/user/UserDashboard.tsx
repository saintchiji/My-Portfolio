import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useProjects } from '../../context/ProjectContext';
import ProjectCard from '../../components/ProjectCard';
import { Bookmark, MessageSquare, Compass, ArrowRight, Clock, CheckCircle2, Film } from 'lucide-react';

export default function UserDashboard() {
  const { currentUser, inquiries, toggleSavedProject } = useUser();
  const { projects } = useProjects();

  const userInquiries = inquiries.filter(inq => inq.userId === currentUser.id);
  const savedProjectsList = projects.filter(p => currentUser.savedProjects.includes(p.id));

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="bg-cinema-black border border-gray-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[10px] text-cinema-red font-bold uppercase tracking-widest bg-cinema-red/10 px-2.5 py-1 rounded inline-block mb-3">
            Client Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-serif text-white tracking-wide">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-xl">
            Track your ongoing project inquiries, manage your saved moodboard, and collaborate with the studio.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/dashboard/inquiries"
            className="btn-primary px-5 py-3 text-xs uppercase tracking-wider font-bold flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Request New Quote</span>
          </Link>
          <Link
            to="/work"
            className="px-5 py-3 border border-gray-700 hover:border-gray-500 text-white rounded text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2"
          >
            <Compass className="w-3.5 h-3.5 text-cinema-red" />
            <span>Browse Portfolio</span>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-cinema-black border border-gray-800 p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-cinema-red/10 flex items-center justify-center text-cinema-red">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Saved Projects</p>
            <p className="text-2xl font-serif text-white">{savedProjectsList.length}</p>
          </div>
        </div>

        <div className="bg-cinema-black border border-gray-800 p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-950/40 flex items-center justify-center text-blue-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Active Inquiries</p>
            <p className="text-2xl font-serif text-white">{userInquiries.length}</p>
          </div>
        </div>

        <div className="bg-cinema-black border border-gray-800 p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-950/40 flex items-center justify-center text-green-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Account Status</p>
            <p className="text-sm font-bold text-green-400 uppercase tracking-wider">Verified Client</p>
          </div>
        </div>
      </div>

      {/* Inquiries Status Pipeline Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-serif text-white tracking-wider uppercase">Active Inquiries & Proposals</h2>
            <p className="text-xs text-gray-400">Real-time status of your production proposals and creative briefs.</p>
          </div>
          <Link
            to="/dashboard/inquiries"
            className="text-xs font-bold text-cinema-red hover:text-white uppercase tracking-wider flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-cinema-black border border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-800">
          {userInquiries.length > 0 ? (
            userInquiries.map((inq) => {
              const statusMap = {
                new: { label: 'New / Received', color: 'bg-yellow-950/40 text-yellow-400 border-yellow-800' },
                in_review: { label: 'In Review', color: 'bg-blue-950/40 text-blue-400 border-blue-800' },
                proposal_sent: { label: 'Proposal Sent', color: 'bg-purple-950/40 text-purple-400 border-purple-800' },
                in_production: { label: 'In Production', color: 'bg-emerald-950/40 text-emerald-400 border-emerald-800' },
                completed: { label: 'Completed', color: 'bg-gray-900 text-gray-400 border-gray-700' }
              };
              const status = statusMap[inq.status] || statusMap.new;

              return (
                <div key={inq.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-900/40 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white">{inq.projectType}</span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1">{inq.description}</p>
                    {inq.notes && (
                      <p className="text-[11px] text-cinema-red-light/80 italic mt-1">
                        Note: {inq.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-xs text-gray-400">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Budget</span>
                      <span className="font-mono text-gray-300 font-bold">{inq.budget}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Target</span>
                      <span className="text-gray-300">{inq.deadline}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">
              You haven't submitted any inquiries yet. Click "Request New Quote" to begin.
            </div>
          )}
        </div>
      </div>

      {/* Moodboard / Saved Portfolio Projects */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-serif text-white tracking-wider uppercase">Saved Moodboard</h2>
            <p className="text-xs text-gray-400">Selected cinematic projects you've bookmarked for creative reference.</p>
          </div>
          <Link
            to="/work"
            className="text-xs font-bold text-cinema-red hover:text-white uppercase tracking-wider flex items-center gap-1"
          >
            <span>Explore More Work</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {savedProjectsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProjectsList.map((project, index) => (
              <div key={project.id} className="relative group">
                <ProjectCard project={project} index={index} />
                <button
                  type="button"
                  onClick={() => toggleSavedProject(project.id)}
                  className="absolute top-3 right-3 z-30 p-2 bg-black/80 hover:bg-cinema-red text-white rounded-full text-xs transition-colors shadow-lg"
                  title="Remove from moodboard"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-cinema-black border border-gray-800 rounded-xl p-12 text-center space-y-4">
            <Film className="w-12 h-12 text-gray-600 mx-auto opacity-50" />
            <h3 className="text-lg font-serif text-white">Your moodboard is currently empty</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Browse our portfolio of films, commercials, and cinematography. Bookmark frames and projects to assemble your custom moodboard.
            </p>
            <Link
              to="/work"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-bold"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Selected Work</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
