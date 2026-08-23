const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/SectionBuilder.tsx', 'utf8');
code = code.replace("import MediaSelector from '../../components/admin/MediaSelector';", "import MediaSelector from '../../components/admin/MediaSelector';\nimport { SectionEditor } from '../../components/admin/SectionEditors';");

// Remove everything between {/* Editor Content */} and the matching </div>
const startMarker = "{/* Editor Content */}";
const endMarker = "                      )}";
let startIndex = code.indexOf(startMarker);
let endIndex = code.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = `${startMarker}\n                      {expandedId === section.id && (\n                        <SectionEditor section={section} />\n`;
  code = code.substring(0, startIndex) + newContent + code.substring(endIndex);
}

// Remove function CategoryVisibilityEditor(...) { ... }
const catStart = code.indexOf('function CategoryVisibilityEditor');
if (catStart !== -1) {
   code = code.substring(0, catStart);
}

fs.writeFileSync('src/pages/admin/SectionBuilder.tsx', code);
