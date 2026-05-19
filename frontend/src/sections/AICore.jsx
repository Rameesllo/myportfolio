import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';

const questions = [
  { q: 'Who are you?', a: "I'm Mohammed Ramees T, a passionate and self-driven Full Stack Web Developer." },
  { q: 'What technologies do you use?', a: "My stack heavily relies on React, Node.js, Express, Socket.io, and Supabase. I focus on clean UI/UX and scalable web solutions." },
  { q: 'What projects have you built?', a: "I've built a real-time messaging application with voice/video calls, and a complete bus tracking system with QR boarding." },
  { q: 'What is your background?', a: "I am currently pursuing a Bachelor of Computer Science at EMEA College of Arts and Science (2023-2026)." }
];

const AICore = () => {
  const [activeQ, setActiveQ] = useState(0);

  return (
    <section className="relative w-full py-32 z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* AI Visualizer */}
          <div className="relative flex justify-center items-center h-[400px]">
            {/* Pulsing rings */}
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute w-[300px] h-[300px] rounded-full border border-primary/50"
            />
            <motion.div 
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute w-[300px] h-[300px] rounded-full border border-secondary/50"
            />
            
            {/* Core Orb */}
            <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_50px_rgba(139,92,246,0.6)] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 animate-pulse" />
              <Cpu size={48} className="text-white relative z-10" />
            </div>
          </div>

          {/* Chat Interface */}
          <div className="glass-panel p-6 border-primary/50">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <Terminal className="text-secondary" />
              <span className="font-semibold text-white tracking-widest uppercase text-sm">System.AI.Core</span>
              <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {questions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveQ(idx)}
                  className={`text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                    activeQ === idx 
                      ? 'bg-primary/20 border border-primary text-white' 
                      : 'bg-white/5 border border-transparent text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {q.q}
                </button>
              ))}
            </div>

            <div className="bg-[#030014] rounded-lg p-4 border border-white/5 min-h-[100px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeQ}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-gray-400 text-sm leading-relaxed"
                >
                  <span className="text-secondary mr-2">{'>'}</span>
                  {questions[activeQ].a}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AICore;
