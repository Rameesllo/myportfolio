import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const About = () => {
  const { data } = usePortfolio();

  const stats = [
    { value: data.hero.exp_years || '0', label: 'Years Experience' },
    { value: data.hero.projects_count || '0', label: 'Projects Completed' },
    { value: data.hero.tech_count || '0', label: 'Technologies Mastered' },
    { value: data.hero.clients_count || '0', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="relative w-full py-32 z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="text-primary font-semibold tracking-widest uppercase text-sm">About Me</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
              I'm <span className="text-secondary">Mohammed Ramees T</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {data.hero.description}
            </p>

            <div className="flex items-center gap-4">
              <button className="px-6 py-3 glass-panel text-white font-medium hover:border-primary/50 transition-colors flex items-center gap-2">
                Know More About Me <span className="text-primary">→</span>
              </button>
            </div>
          </motion.div>

          {/* Hexagon Profile & Stats Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center"
          >
            {/* Hexagon Frame Glow */}
            <div className="absolute w-[320px] h-[360px] bg-primary/20 blur-[60px] rounded-full" />
            
            {/* Hexagon Image Container */}
            <div className="relative w-[300px] h-[340px] hex-clip bg-gradient-to-br from-primary to-secondary p-1">
              <div className="w-full h-full hex-clip bg-[#030014] p-2">
                <img 
                  src={data.hero.avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"} 
                  alt="Profile" 
                  className="w-full h-full object-cover hex-clip opacity-90"
                />
              </div>
            </div>

            {/* Floating Stats - Desktop Only */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
              {stats.map((stat, idx) => {
                const positions = [
                  'top-0 left-[-20px]',
                  'top-10 right-[-40px]',
                  'bottom-20 left-[-40px]',
                  'bottom-0 right-[-20px]'
                ];
                return (
                  <motion.div
                    key={idx}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5, ease: 'easeInOut' }}
                    className={`absolute ${positions[idx]} glass-panel px-6 py-4 flex flex-col items-center justify-center border-primary/50`}
                  >
                    <span className="text-2xl font-bold text-white mb-1">{stat.value}</span>
                    <span className="text-xs text-gray-400 max-w-[80px] text-center leading-tight">{stat.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats Grid for Mobile - Hidden on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4 md:hidden w-full mt-4"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel px-4 py-4 flex flex-col items-center justify-center border-primary/50 text-center"
              >
                <span className="text-2xl font-bold text-white mb-1">{stat.value}</span>
                <span className="text-xs text-gray-400 leading-tight">{stat.label}</span>
              </div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
