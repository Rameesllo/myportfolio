import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const { data } = usePortfolio();

  if (!data.testimonials || data.testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/50 text-primary text-xs font-bold tracking-widest uppercase mb-4"
          >
            System Endorsements
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter"
          >
            Client <span className="text-gradient">Feedback</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 relative group hover:border-primary/50 transition-all duration-500"
            >
              <div className="absolute top-4 right-8 text-primary/20 group-hover:text-primary/40 transition-colors">
                <Quote size={40} />
              </div>
              
              <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-colors">
                  <img 
                    src={t.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=8B5CF6&color=fff`} 
                    alt={t.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">{t.name}</h4>
                  <p className="text-primary text-[10px] font-semibold uppercase tracking-widest">
                    {t.role} {t.company && `@ ${t.company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
