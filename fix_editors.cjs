const fs = require('fs');
let code = fs.readFileSync('src/components/admin/SectionEditors.tsx', 'utf8');

const catEditor = `
function CategoryVisibilityEditor({ section }: { section: PageSection }) {
  const { updateSection } = useSections();
  const allCategories = ['Long-Form', 'Short-Form', 'Commercial', 'Wedding', 'Cinematography', 'Video Editing', 'Music Video', 'Documentary', 'Fashion'];
  
  const isAll = section.projectSelection?.type === 'all';
  const allowed = section.projectSelection?.ids || [];

  const toggleCat = (cat: string) => {
    let newAllowed = [...allowed];
    if (isAll) {
      newAllowed = allCategories.filter(c => c !== cat);
    } else {
      if (newAllowed.includes(cat)) {
        newAllowed = newAllowed.filter(c => c !== cat);
      } else {
        newAllowed.push(cat);
      }
    }
    updateSection(section.id, { projectSelection: { type: 'categories', ids: newAllowed } });
  };

  const isChecked = (cat: string) => {
    if (isAll) return true;
    return allowed.includes(cat);
  };

  return (
    <div>
      <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Category Visibility</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {allCategories.map(cat => (
          <label key={cat} className="flex items-center gap-2 cursor-pointer p-2 bg-gray-900 rounded border border-gray-800 hover:border-gray-700">
            <input 
              type="checkbox"
              checked={isChecked(cat)}
              onChange={() => toggleCat(cat)}
              className="accent-cinema-red"
            />
            <span className="text-sm text-gray-300">{cat}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
`;

code = code + '\n' + catEditor;
code = code.replace('function PortfolioEditor({ section }: { section: PageSection }) {', `function PortfolioEditor({ section }: { section: PageSection }) {`);
code = code.replace('</select>\n        </div>\n        <div>\n          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Number of Projects (0 for all)</label>', `</select>\n        </div>\n        <div>\n          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Number of Projects (0 for all)</label>`);

// Add the CategoryVisibilityEditor to PortfolioEditor
code = code.replace('</select>\n        </div>', `</select>\n        </div>\n        <div className="col-span-1 md:col-span-2">\n           <CategoryVisibilityEditor section={section} />\n        </div>`);
fs.writeFileSync('src/components/admin/SectionEditors.tsx', code);
