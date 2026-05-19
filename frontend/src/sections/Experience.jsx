import { motion } from 'framer-motion';

import { usePortfolio } from '../context/PortfolioContext';

const Experience = () => {
  const { data } = usePortfolio();
  const { experiences } = data;

  return (
    <section id="experience" className="relative w-full py-32 z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          <span className="text-primary font-semibold tracking-widest uppercase text-xs">My Journey</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
            Experience & Leadership
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
            <motion.div 
              className="w-full bg-gradient-to-b from-primary to-secondary"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  {/* Node */}
                  <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#030014] border border-primary flex items-center justify-center z-10 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                  </div>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}
                  >
                    <div className="glass-panel p-6 hover:border-primary/50 transition-colors group">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{exp.role}</h3>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">{exp.org}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">{exp.desc_text}</p>
                      <span className="text-xs font-semibold text-secondary">{exp.date}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
