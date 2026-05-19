import { Terminal } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
  const { data } = usePortfolio();
  return (
    <footer className="relative w-full pt-20 pb-10 border-t border-white/5 overflow-hidden bg-[#030014]">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-40 bg-primary/10 blur-[120px] pointer-events-none rounded-t-full" />
      
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="flex flex-col items-start">
          <a href="#home" className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2 mb-4 group">
            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              <Terminal size={16} className="text-white" />
            </div>
            <span>Ramees OS</span>
          </a>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            Creating futuristic digital experiences with modern full-stack technologies. Elevating the standard of the web.
          </p>
        </div>

        <div className="flex flex-col md:items-center">
          <h4 className="text-white font-semibold mb-4 uppercase tracking-widest text-sm">System Links</h4>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li><a href="#about" className="hover:text-primary transition-colors">About Protocol</a></li>
            <li><a href="#projects" className="hover:text-primary transition-colors">Project Database</a></li>
            <li><a href="#experience" className="hover:text-primary transition-colors">Journey Logs</a></li>
          </ul>
        </div>

        <div className="flex flex-col md:items-end">
          <h4 className="text-white font-semibold mb-4 uppercase tracking-widest text-sm">Connect Node</h4>
          <div className="flex gap-4">
            <a
              href={data.hero.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all duration-300"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={data.hero.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all duration-300"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={data.hero.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all duration-300"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400/60 pt-8 border-t border-white/5">
        <p>© {new Date().getFullYear()} Mohammed Ramees T. System All Rights Reserved.</p>
        <p className="mt-2 md:mt-0 uppercase tracking-widest">Powered by React Fiber & Vite</p>
      </div>
    </footer>
  );
};

export default Footer;
