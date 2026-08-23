const fs = require('fs');
let code = fs.readFileSync('src/components/blocks/PortfolioBlock.tsx', 'utf8');

const oldHeader = `        <div className="mb-16 md:mb-20">
          {section.subtitle && (
            <p className="uppercase tracking-widest text-cinema-red-light text-xs font-bold mb-4">{section.subtitle}</p>
          )}
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight">{section.title}</h2>
        </div>`;

const newHeader = `        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            {section.subtitle && (
              <p className="uppercase tracking-widest text-cinema-red-light text-xs font-bold mb-4">{section.subtitle}</p>
            )}
            <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight mb-4">{section.title}</h2>
            {section.description && (
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">{section.description}</p>
            )}
          </div>
        </div>`;

code = code.replace(oldHeader, newHeader);
fs.writeFileSync('src/components/blocks/PortfolioBlock.tsx', code);
