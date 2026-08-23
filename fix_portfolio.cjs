const fs = require('fs');
let code = fs.readFileSync('src/components/blocks/PortfolioBlock.tsx', 'utf8');

const filterLogic = `  if (section.projectSelection.type === 'manual' && section.projectSelection.ids.length > 0) {
    sectionProjects = sectionProjects.filter(p => section.projectSelection.ids.includes(p.id));
    // Sort manually selected projects based on the order in the ids array
    sectionProjects.sort((a, b) => section.projectSelection.ids.indexOf(a.id) - section.projectSelection.ids.indexOf(b.id));
  } else if (section.projectSelection.type === 'categories' && section.projectSelection.ids.length > 0) {
    sectionProjects = sectionProjects.filter(p => section.projectSelection.ids.includes(p.category));
  }

  if (section.limit && section.limit > 0) {
    sectionProjects = sectionProjects.slice(0, section.limit);
  }`;

code = code.replace(/  if \(section\.projectSelection\.type[\s\S]*?includes\(p\.category\)\);\n  \}/, filterLogic);

// Add the title and description block if it doesn't exist inside the return of PortfolioBlock
// Actually let's look at the return of PortfolioBlock
fs.writeFileSync('src/components/blocks/PortfolioBlock.tsx', code);
