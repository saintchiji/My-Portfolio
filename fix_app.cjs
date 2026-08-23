const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const importLocation = "import { HashRouter, Routes, Route } from 'react-router-dom';";
code = code.replace(importLocation, "import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';");

const oldMainLayout = `function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cinema-dark text-gray-200 selection:bg-cinema-red selection:text-white relative flex flex-col">
      <div 
        className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-[var(--grain-intensity)]" 
        style={{ backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")\` }}
      ></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
}`;

const newMainLayout = `function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-cinema-dark text-gray-200 selection:bg-cinema-red selection:text-white relative flex flex-col">
      <div 
        className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-[var(--grain-intensity)]" 
        style={{ backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")\` }}
      ></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">{children}</main>
        {location.pathname !== '/' && <Footer />}
      </div>
    </div>
  );
}`;

code = code.replace(oldMainLayout, newMainLayout);
fs.writeFileSync('src/App.tsx', code);
