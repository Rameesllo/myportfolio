import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login for now
    if (email === 'admin@gmail.com' && password === '123456') {
      localStorage.setItem('adminToken', 'mock-token');
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center relative overflow-hidden">
      <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 w-full max-w-md relative z-10 border-primary/50"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] mb-4">
            <Terminal size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase text-center">System Auth</h1>
          <p className="text-gray-400 text-sm mt-2 text-center">Enter credentials to access mainframe.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Identifier (Email)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="admin@gmail.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Passcode</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors pl-10"
                placeholder="••••••••"
              />
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all mt-4 uppercase tracking-widest"
          >
            Initialize Connection
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
