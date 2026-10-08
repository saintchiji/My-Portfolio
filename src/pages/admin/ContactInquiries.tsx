import { useContent } from '../../context/ContentContext';
import { MessageSquare } from 'lucide-react';

export default function ContactInquiries() {
  const { content, updateNestedContent } = useContent();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Contact & Inquiries</h1>
      </div>

      <div className="bg-cinema-black border border-gray-800 p-8 rounded-lg max-w-4xl space-y-8">
        <div>
          <h2 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Email Address</label>
              <input 
                type="email" 
                value={content.contact.email}
                onChange={e => updateNestedContent('contact', 'email', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Location</label>
              <input 
                type="text" 
                value={content.contact.location}
                onChange={e => updateNestedContent('contact', 'location', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Contact Form Description</label>
              <textarea 
                rows={3}
                value={content.contact.description}
                onChange={e => updateNestedContent('contact', 'description', e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cinema-red outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <h2 className="text-xl font-serif text-white border-b border-gray-800 pb-2 mb-6">Inquiry Submissions</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-serif text-white mb-2">No Inquiries Yet</h3>
            <p className="text-gray-500 text-sm max-w-md">
              Inquiry tracking and email notifications will appear here when configured.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
