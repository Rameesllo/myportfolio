import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const { error } = await supabase
        .from('messages')
        .insert([formData]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/50 text-primary text-xs font-bold tracking-widest uppercase mb-4"
          >
            Contact
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter"
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Have a project in mind? Send me a message and I will get back to you as soon as possible.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12 border-white/10 relative overflow-hidden">
            {/* Success Overlay */}
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-50 bg-[#030014]/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <ShieldCheck size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. I have received your message.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={12} className="text-primary" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={12} className="text-primary" /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={12} className="text-primary" /> Subject
                </label>
                <input
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="What is this message about?"
                  className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={12} className="text-primary" /> Your Message
                </label>
                <textarea
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Write your message here..."
                  className="w-full bg-[#030014] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                disabled={status === 'sending'}
                className="w-full relative group overflow-hidden bg-primary py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === 'sending' ? (
                    'Sending Message...'
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </span>
              </button>
              
              {status === 'error' && (
                <p className="text-red-500 text-xs text-center font-semibold uppercase tracking-widest">
                  Signal Error: Failed to establish secure connection. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
