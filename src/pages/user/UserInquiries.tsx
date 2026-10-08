import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { MessageSquare, Send, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function UserInquiries() {
  const { currentUser, inquiries, submitInquiry } = useUser();
  const userInquiries = inquiries.filter(inq => inq.userId === currentUser.id);

  const [projectType, setProjectType] = useState('Commercial Campaign');
  const [budget, setBudget] = useState('$20,000 - $40,000');
  const [deadline, setDeadline] = useState('Q4 2026');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    submitInquiry({
      projectType,
      budget,
      deadline,
      description
    });

    setDescription('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const statusMap = {
    new: { label: 'Received / Queued', color: 'bg-yellow-950/40 text-yellow-400 border-yellow-800' },
    in_review: { label: 'Creative Review', color: 'bg-blue-950/40 text-blue-400 border-blue-800' },
    proposal_sent: { label: 'Proposal Dispatched', color: 'bg-purple-950/40 text-purple-400 border-purple-800' },
    in_production: { label: 'In Production', color: 'bg-emerald-950/40 text-emerald-400 border-emerald-800' },
    completed: { label: 'Completed', color: 'bg-gray-900 text-gray-400 border-gray-700' }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Project Inquiries & Quotes</h1>
        <p className="text-sm text-gray-400 mt-1">
          Submit new project briefs and view the timeline status of your proposals.
        </p>
      </div>

      {submitted && (
        <div className="p-4 bg-green-950/60 border border-green-800 rounded-lg text-green-300 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Your project brief has been submitted successfully! The director will review it and follow up shortly.</span>
        </div>
      )}

      {/* New Inquiry Form */}
      <div className="bg-cinema-black border border-gray-800 rounded-xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
          <div className="w-8 h-8 rounded-full bg-cinema-red/10 flex items-center justify-center text-cinema-red">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-serif text-white uppercase tracking-wider">Start a New Project Commission</h2>
            <p className="text-xs text-gray-400">Share your vision, expected timeline, and scope.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-2">
                Project Category
              </label>
              <select
                value={projectType}
                onChange={e => setProjectType(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-cinema-red outline-none text-sm"
              >
                <option value="Commercial Campaign">Commercial Campaign</option>
                <option value="Short Film & Narrative">Short Film & Narrative</option>
                <option value="Music Video">Music Video</option>
                <option value="Documentary Feature">Documentary Feature</option>
                <option value="Fashion Film">Fashion Film</option>
                <option value="Cinematography Only">Cinematography Only</option>
                <option value="Color Grading & Editorial">Color Grading & Editorial</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-2">
                Estimated Budget Range
              </label>
              <select
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-cinema-red outline-none text-sm"
              >
                <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                <option value="$30,000 - $60,000">$30,000 - $60,000</option>
                <option value="$60,000+">$60,000+ (High-End Production)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-2">
                Target Delivery Window
              </label>
              <input
                type="text"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                placeholder="e.g. Q4 2026 or Next Month"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-cinema-red outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-2">
              Project Brief & Creative Vision
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe your brand, project concept, location requirements, or specific aesthetic references..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white focus:border-cinema-red outline-none text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            className="btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Commission Brief</span>
          </button>
        </form>
      </div>

      {/* Existing Inquiries List */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif text-white tracking-wider uppercase">Submission History</h2>
        <div className="bg-cinema-black border border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-800">
          {userInquiries.length > 0 ? (
            userInquiries.map((inq) => {
              const status = statusMap[inq.status] || statusMap.new;
              return (
                <div key={inq.id} className="p-6 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg text-white">{inq.projectType}</span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      Submitted: {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">{inq.description}</p>

                  <div className="flex flex-wrap gap-6 pt-2 text-xs text-gray-400">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Budget</span>
                      <span className="text-gray-300 font-mono font-bold">{inq.budget}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Target Deadline</span>
                      <span className="text-gray-300">{inq.deadline}</span>
                    </div>
                    {inq.notes && (
                      <div className="flex-1 min-w-[200px]">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Studio Feedback</span>
                        <span className="text-cinema-red-light font-medium">{inq.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">
              No inquiries on record.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
