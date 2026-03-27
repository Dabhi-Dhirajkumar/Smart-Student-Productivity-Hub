import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center font-poppins relative overflow-hidden px-4">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card w-full max-w-md p-8 md:p-10 relative z-10 rounded-3xl shadow-[0_0_40px_rgba(107,33,168,0.2)]">
         <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">Welcome Back</h2>
            <p className="text-textMuted text-sm">Login to your Campus Companion AI.</p>
         </div>

         {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm text-center">{error}</div>}

         <form onSubmit={handleLogin} className="space-y-5">
            <div>
               <label className="text-xs text-textMuted uppercase tracking-wider mb-2 block font-semibold">Email Address</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-textMuted" size={18} />
                  <input type="email" required onChange={e => setEmail(e.target.value)} value={email} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-12 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-colors shadow-inner" placeholder="student@campus.edu" />
               </div>
            </div>

            <div>
               <div className="flex justify-between items-center mb-2">
                  <label className="text-xs text-textMuted uppercase tracking-wider block font-semibold">Password</label>
                  <Link to="/forgot-password" className="text-xs text-accent hover:underline">Forgot password?</Link>
               </div>
               <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-textMuted" size={18} />
                  <input type="password" required onChange={e => setPassword(e.target.value)} value={password} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-12 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-colors shadow-inner" placeholder="••••••••" />
               </div>
            </div>

            <button type="submit" className="w-full btn-primary py-4 font-bold text-lg rounded-xl flex items-center justify-center mt-6">
               Sign In <ArrowRight className="ml-2" size={18} />
            </button>
         </form>

         <p className="text-center text-sm text-textMuted mt-10">
            Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
         </p>
      </motion.div>
    </div>
  );
}
