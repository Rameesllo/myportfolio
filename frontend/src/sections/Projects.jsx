import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';


const Projects = () => {
  const { data } = usePortfolio();
  const { projects } = data;

  return (
    <section id="projects" className="relative w-full py-32 z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-primary font-semibold tracking-widest uppercase text-xs">Featured Projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Some Things I've Built
            </h2>
          </motion.div>
          <motion.a 
            href="#" 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            className="hidden md:flex text-sm text-gray-400 hover:text-white items-center gap-2 group"
          >
            View All Projects <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="glass-panel p-6 group hover:border-primary/50 transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 border border-white/5">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <button className="flex items-center gap-2 text-sm text-white font-medium hover:text-primary transition-colors">
                    Live Demo <ExternalLink size={16} />
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors ml-auto">
                    <FaGithub size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
