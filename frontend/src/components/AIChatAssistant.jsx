import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const AIChatAssistant = () => {
  const { data } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "System initialized. I am Ramees's AI Assistant. How can I help you explore his career matrix today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateResponse = (userQuery) => {
    const query = userQuery.toLowerCase();
    
    // Knowledge Base extraction
    const skills = data.skills.map(s => s.name).join(', ');
    const projectTitles = data.projects.map(p => p.title).join(', ');
    const exp = data.experiences.map(e => `${e.role} at ${e.org}`).join('. ');

    if (query.includes('skill') || query.includes('tech') || query.includes('know')) {
      return `Ramees is a master of several technologies, including: ${skills}. He specializes in full-stack development with a focus on futuristic UI/UX.`;
    }
    if (query.includes('project') || query.includes('build') || query.includes('work')) {
      return `Ramees has completed some impressive projects like: ${projectTitles}. You can see full details in the Project Database section!`;
    }
    if (query.includes('experience') || query.includes('job') || query.includes('career')) {
      return `His career logs show experience as: ${exp}. He is currently open to new high-impact opportunities.`;
    }
    if (query.includes('contact') || query.includes('hire') || query.includes('email')) {
      return "You can reach Ramees directly through the 'Connect Node' section at the bottom of this page, or via his Instagram/GitHub links in the footer.";
    }
    if (query.includes('who') || query.includes('about')) {
      return "Ramees is a visionary developer focused on creating premium digital experiences. He combines clean code with cutting-edge 3D aesthetics.";
    }

    return "I've analyzed your query. While my neural links are still expanding, I can tell you about Ramees's skills, projects, or how to contact him. What would you like to know?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const assistantMessage = { role: 'assistant', content: generateResponse(userMessage.content) };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center justify-center border border-white/20"
      >
        <Bot size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#030014] animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, x: 20 }}
            className="fixed bottom-24 right-8 z-[100] w-[350px] h-[500px] glass-panel border-white/10 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-primary/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Ramees AI</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-gray-400 uppercase">Neural Link Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.role === 'assistant' 
                    ? 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none' 
                    : 'bg-primary text-white rounded-tr-none shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce delay-75" />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 bg-[#030014] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:border-primary outline-none"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatAssistant;
