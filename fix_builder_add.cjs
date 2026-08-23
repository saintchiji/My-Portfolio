const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/SectionBuilder.tsx', 'utf8');

const oldHeader = "    <div className=\"space-y-6\">\\n      <DragDropContext onDragEnd={handleDragEnd}>";
const newHeader = `    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        <button onClick={() => addSection({ type: 'hero', title: 'New Hero', subtitle: '', description: '', layout: 'hero', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] }, buttons: [] })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add Hero</button>
        <button onClick={() => addSection({ type: 'portfolio', title: 'Selected Work', subtitle: '', description: '', layout: 'cinematic-grid', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] } })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add Portfolio</button>
        <button onClick={() => addSection({ type: 'about-preview', title: 'About Us', subtitle: '', description: '', layout: 'hero', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] } })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add About</button>
        <button onClick={() => addSection({ type: 'services-preview', title: 'Services', subtitle: '', description: '', layout: 'hero', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] }, items: [] })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add Services</button>
        <button onClick={() => addSection({ type: 'contact', title: 'Get In Touch', subtitle: '', description: '', layout: 'hero', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] }, buttons: [] })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add Contact</button>
        <button onClick={() => addSection({ type: 'footer', title: 'Footer', subtitle: '', description: '', footerText: '', copyright: '', layout: 'hero', background: 'cinema-black', spacing: 'normal', isHidden: false, projectSelection: { type: 'all', ids: [] }, items: [] })} className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Add Footer</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>`;

code = code.replace("    <div className=\"space-y-6\">\n      <DragDropContext onDragEnd={handleDragEnd}>", newHeader);

// We need to destructure addSection
code = code.replace("const { sections, updateSection, deleteSection, duplicateSection, reorderSections } = useSections();", "const { sections, addSection, updateSection, deleteSection, duplicateSection, reorderSections } = useSections();");

fs.writeFileSync('src/pages/admin/SectionBuilder.tsx', code);
