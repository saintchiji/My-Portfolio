import { MessageSquare } from 'lucide-react';

export default function Inquiries() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-white tracking-widest uppercase">Inquiries</h1>
      </div>
      <div className="bg-cinema-black border border-gray-800 rounded-lg p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 text-gray-500" />
        </div>
        <h2 className="text-xl font-serif text-white mb-2">No Inquiries Yet</h2>
        <p className="text-gray-500 text-sm max-w-md">
          The inquiries system will be fully implemented in a future update. For now, this is a placeholder.
        </p>
      </div>
    </div>
  );
}
