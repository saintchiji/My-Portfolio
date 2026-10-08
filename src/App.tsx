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
import { UserProvider } from './context/UserContext';

// Admin Dashboard Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import HeroSection from './pages/admin/HeroSection';
import ProjectList from './pages/admin/ProjectList';
import ProjectEditor from './pages/admin/ProjectEditor';
import PageBuilder from './pages/admin/PageBuilder';
import Categories from './pages/admin/Categories';
import AdminServices from './pages/admin/Services';
import Branding from './pages/admin/Branding';
import Theme from './pages/admin/Theme';
import NavigationSettings from './pages/admin/NavigationSettings';
import SocialMedia from './pages/admin/SocialMedia';
import ContactInquiries from './pages/admin/ContactInquiries';
import UserManagement from './pages/admin/UserManagement';

// User Dashboard Components
import UserLayout from './components/user/UserLayout';
import UserDashboard from './pages/user/UserDashboard';
import UserInquiries from './pages/user/UserInquiries';
import UserProfile from './pages/user/UserProfile';

// Public layout wrapper with noise grain overlay
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cinema-dark text-gray-200 selection:bg-cinema-red selection:text-white relative flex flex-col">
      <div 
        className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-[var(--grain-intensity)]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
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
                    <UserProvider>
                      <ScrollToTop />
                      <Routes>
                        {/* 1. PUBLIC WEBSITE INTERFACE */}
                        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                        <Route path="/work" element={<MainLayout><Work /></MainLayout>} />
                        <Route path="/work/:category" element={<MainLayout><Work /></MainLayout>} />
                        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
                        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                        <Route path="/project/:id" element={<MainLayout><ProjectDetail /></MainLayout>} />
                        
                        {/* 2. USER DASHBOARD (CLIENT PORTAL) INTERFACE */}
                        <Route path="/dashboard" element={<UserLayout />}>
                          <Route index element={<UserDashboard />} />
                          <Route path="inquiries" element={<UserInquiries />} />
                          <Route path="profile" element={<UserProfile />} />
                          <Route path="*" element={<UserDashboard />} />
                        </Route>

                        {/* 3. ADMIN DASHBOARD INTERFACE */}
                        <Route path="/admin" element={<AdminLayout />}>
                          <Route index element={<AdminDashboard />} />
                          <Route path="hero" element={<HeroSection />} />
                          <Route path="branding" element={<Branding />} />
                          <Route path="projects" element={<ProjectList />} />
                          <Route path="projects/:id" element={<ProjectEditor />} />
                          <Route path="pages" element={<PageBuilder />} />
                          <Route path="categories" element={<Categories />} />
                          <Route path="services" element={<AdminServices />} />
                          <Route path="users" element={<UserManagement />} />
                          <Route path="theme" element={<Theme />} />
                          <Route path="navigation" element={<NavigationSettings />} />
                          <Route path="social" element={<SocialMedia />} />
                          <Route path="inquiries" element={<ContactInquiries />} />
                          {/* Fallback */}
                          <Route path="*" element={<AdminDashboard />} />
                        </Route>
                      </Routes>
                    </UserProvider>
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
