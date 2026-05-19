import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaJs, FaGithub, FaHtml5 } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiMongodb, SiExpress, SiSupabase } from 'react-icons/si';

import { usePortfolio } from '../context/PortfolioContext';

// Icon mapping dictionary
const iconMap = {
  'React': FaReact,
  'Node.js': FaNodeJs,
  'JavaScript': FaJs,
  'TypeScript': SiTypescript,
  'MongoDB': SiMongodb,
  'Tailwind CSS': SiTailwindcss,
  'Express.js': SiExpress,
  'Git & GitHub': FaGithub,
  'Supabase': SiSupabase,
};

const Skills = () => {
  const { data } = usePortfolio();
  const { skills } = data;
  return (
    <section id="skills" className="relative w-full py-32 z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-secondary/5 blur-[150px] pointer-events-none rounded-[100%]" />
      
      <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-primary"></div>
            <span className="text-primary font-semibold tracking-widest uppercase text-xs">My Tech Stack</span>
            <div className="w-8 h-[1px] bg-primary"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Technologies I Work With
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {skills.map((skill, idx) => {
            const Icon = iconMap[skill.name] || FaJs; // Fallback icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass-panel w-32 h-32 flex flex-col items-center justify-center gap-3 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon size={40} style={{ color: skill.color }} className="group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 relative z-10" />
                <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors relative z-10">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
