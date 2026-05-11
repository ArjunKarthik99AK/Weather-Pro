import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import MobileSidebar from '../components/MobileSidebar.jsx';
import TopNavbar from '../components/TopNavbar.jsx';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Sidebar />
      <div className="ml-0 md:ml-[260px] min-h-screen transition-all duration-300">
        <div className="sticky top-0 z-30 flex items-center justify-between bg-bg/95 px-6 py-3 backdrop-blur-xl md:px-4">
          <MobileSidebar />
          <TopNavbar />
        </div>
        <main className="p-6 md:px-4 md:pt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

