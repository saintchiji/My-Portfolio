import SectionBuilder from './SectionBuilder';

export default function PageBuilder() {
  return (
    <div className="pb-24 max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase mb-2">Page Builder</h1>
          <p className="text-gray-500 text-sm">Control the public homepage sections, content, and category visibility.</p>
        </div>
      </div>

      <div className="mt-8">
        <SectionBuilder />
      </div>
    </div>
  );
}
