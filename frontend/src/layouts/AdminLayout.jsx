import { Outlet, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { LayoutDashboard, LogOut, Briefcase, FileText, MessageSquare, Quote, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const [activeSidebarTab, setActiveSidebarTab] = useState('hero');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Mock auth check
  const isAuthenticated = localStorage.getItem('adminToken');

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const handleTabClick = (tab) => {
    setActiveSidebarTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white flex flex-col md:flex-row relative overflow-x-hidden">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 glass-panel border-l-0 border-t-0 border-r-0 border-b border-primary/50 relative z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold">R</div>
          <span className="text-lg font-bold tracking-widest uppercase text-sm">System Admin</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-400 hover:text-white focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 w-64 glass-panel border-l-0 border-t-0 border-b-0 rounded-none p-6 flex flex-col z-40 md:z-20
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out h-full md:h-auto
      `}>
        <div className="flex items-center justify-between md:justify-start gap-2 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold">R</div>
            <span className="text-xl font-bold tracking-widest uppercase text-sm">System Admin</span>
          </div>
          <button 
            className="md:hidden p-1 text-gray-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2">
          <button 
            onClick={() => handleTabClick('hero')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeSidebarTab === 'hero' ? 'bg-primary/20 text-primary border border-primary/50' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            onClick={() => handleTabClick('projects')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeSidebarTab === 'projects' ? 'bg-primary/20 text-primary border border-primary/50' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Briefcase size={18} /> Projects
          </button>
          <button 
            onClick={() => handleTabClick('skills')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeSidebarTab === 'skills' ? 'bg-primary/20 text-primary border border-primary/50' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <FileText size={18} /> Skills & Content
          </button>
          <button 
            onClick={() => handleTabClick('messages')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeSidebarTab === 'messages' ? 'bg-primary/20 text-primary border border-primary/50' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <MessageSquare size={18} /> Messages
          </button>
          <button 
            onClick={() => handleTabClick('testimonials')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeSidebarTab === 'testimonials' ? 'bg-primary/20 text-primary border border-primary/50' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Quote size={18} /> Testimonials
          </button>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors mt-auto">
          <LogOut size={18} /> Disconnect
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 relative z-10 overflow-y-auto w-full">
        <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none z-0" />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <Outlet context={{ activeSidebarTab, setActiveSidebarTab }} />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
