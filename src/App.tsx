/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { DatabaseProvider } from './context/DatabaseContext';
import { ProjectProvider } from './context/ProjectContext';
import { SectionProvider } from './context/SectionContext';
import { ThemeProvider } from './context/ThemeContext';
import { ContentProvider } from './context/ContentContext';
import { MediaProvider } from './context/MediaContext';
import { BrandingProvider } from './context/BrandingContext';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectList from './pages/admin/ProjectList';
import ProjectEditor from './pages/admin/ProjectEditor';
import SectionBuilder from './pages/admin/SectionBuilder';
import ThemeEditor from './pages/admin/ThemeEditor';
import ContentEditor from './pages/admin/ContentEditor';
import MediaLibrary from './pages/admin/MediaLibrary';
import BrandingEditor from './pages/admin/BrandingEditor';

// A wrapper to hide standard Nav/Footer for Admin routes
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cinema-dark text-gray-200 selection:bg-cinema-red selection:text-white relative flex flex-col">
      <div 
        className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-[var(--grain-intensity)]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <DatabaseProvider>
        <MediaProvider>
          <BrandingProvider>
            <ContentProvider>
              <ThemeProvider>
                <ProjectProvider>
                  <SectionProvider>
                    <ScrollToTop />
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                      <Route path="/work" element={<MainLayout><Work /></MainLayout>} />
                      <Route path="/work/:category" element={<MainLayout><Work /></MainLayout>} />
                      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                      <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
                      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                      <Route path="/project/:id" element={<MainLayout><ProjectDetail /></MainLayout>} />
                      
                      {/* Admin Routes */}
                      <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="projects" element={<ProjectList />} />
                        <Route path="projects/:id" element={<ProjectEditor />} />
                        <Route path="sections" element={<SectionBuilder />} />
                        <Route path="theme" element={<ThemeEditor />} />
                        <Route path="content" element={<ContentEditor />} />
                        <Route path="media" element={<MediaLibrary />} />
                        <Route path="branding" element={<BrandingEditor />} />
                        {/* Stub other routes to AdminDashboard for now */}
                        <Route path="*" element={<AdminDashboard />} />
                      </Route>
                    </Routes>
                  </SectionProvider>
                </ProjectProvider>
              </ThemeProvider>
            </ContentProvider>
          </BrandingProvider>
        </MediaProvider>
      </DatabaseProvider>
    </HashRouter>
  );
}
