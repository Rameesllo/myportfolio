import { motion } from 'framer-motion';
import { ArrowRight, Download, Network } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { usePortfolio } from '../context/PortfolioContext';

const AIOrb = () => {
  return (
    <Canvas className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} color="#8B5CF6" />
      <directionalLight position={[-2, -2, -2]} intensity={0.5} color="#06B6D4" />
      <Sphere visible args={[1, 100, 200]} scale={1.8}>
        <MeshDistortMaterial
          color="#1a0b2e"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Canvas>
  );
};

const Hero = () => {
  const { data } = usePortfolio();
  const titleParts = data.hero.title.split('Experiences');

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
      
      {/* 3D AI Orb Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40">
        <AIOrb />
      </div>

      {/* Holographic scanning line */}
      <motion.div
        animate={{ y: ['-100vh', '100vh'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent blur-[1px] opacity-30 z-0 pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
        >
          <Network size={14} className="text-primary animate-pulse" />
          <span className="text-xs font-semibold text-gray-300 tracking-widest uppercase">
            System Online // V.2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 max-w-5xl leading-tight neon-glow"
        >
          {titleParts[0]}
          {titleParts.length > 1 && (
            <>
              <span className="text-gradient">Experiences</span>{titleParts[1]}
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          {data.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-primary text-white font-bold rounded-xl overflow-hidden flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(139,92,246,0.5)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          
          <a
            href="https://wa.me/917034510537?text=Hello%20Ramees%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch%20with%20you%21"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 glass-panel glass-panel-hover text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:border-green-500/50 transition-all duration-300"
          >
            Contact Me
          </a>
          
          {data.hero.resume_url && (
            <a
              href={data.hero.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-secondary/30 text-secondary font-semibold rounded-xl hover:bg-secondary/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2"
            >
              Download Resume <Download size={18} />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
