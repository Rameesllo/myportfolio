import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/3d/ParticlesBackground';
import CustomCursor from '../components/CustomCursor';
import AIChatAssistant from '../components/AIChatAssistant';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-white bg-[#030014]">
      {/* Cyber Grid Base Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none cyber-grid opacity-40" />
      
      {/* 3D Particles Layer */}
      <ParticlesBackground />
      
      {/* Interactive Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="relative z-10 flex flex-col items-center w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
