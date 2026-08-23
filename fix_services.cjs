const fs = require('fs');
let code = fs.readFileSync('src/components/blocks/ServicesPreviewBlock.tsx', 'utf8');

const oldServices = "  const previewServices = content.services.filter(s => s.isVisible).slice(0, 3);";
const newServices = "  const previewServices = (section.items || []).filter(s => s.isVisible);";
code = code.replace(oldServices, newServices);

const oldDesc = "          {section.subtitle && (\\n            <h3 className=\"uppercase tracking-widest text-xs font-bold text-cinema-red mb-4\">{section.subtitle}</h3>\\n          )}\\n          <h2 className=\"font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight\">{section.title}</h2>";
const newDesc = `          {section.subtitle && (
            <h3 className="uppercase tracking-widest text-xs font-bold text-cinema-red mb-4">{section.subtitle}</h3>
          )}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-4">{section.title}</h2>
          {section.description && (
             <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">{section.description}</p>
          )}`;

code = code.replace(/          \{section\.subtitle && \(\s*<h3.*?h3>\s*\)\}\s*<h2.*?h2>/, newDesc);

fs.writeFileSync('src/components/blocks/ServicesPreviewBlock.tsx', code);
