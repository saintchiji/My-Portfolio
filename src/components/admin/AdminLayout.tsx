import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-cinema-dark flex">
      <AdminSidebar />
      <main className="flex-1 md:ml-64 p-6 md:p-8 mt-16 md:mt-0 transition-all w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
