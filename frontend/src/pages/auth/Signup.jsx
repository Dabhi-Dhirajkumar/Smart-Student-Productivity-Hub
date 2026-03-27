import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Student' });
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center font-poppins relative overflow-hidden px-4">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card w-full max-w-md p-8 md:p-10 relative z-10 rounded-3xl shadow-[0_0_40px_rgba(232,121,249,0.2)]">
         <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">Create Account</h2>
            <p className="text-textMuted text-sm">Join Campus Companion AI today.</p>
         </div>
         
         {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm text-center">{error}</div>}

         <form onSubmit={handleSignup} className="space-y-4">
            <div>
               <label className="text-xs text-textMuted uppercase tracking-wider mb-2 block font-semibold">Full Name</label>
               <div className="relative">
                  <User className="absolute left-4 top-3.5 text-textMuted" size={18} />
                  <input type="text" required onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-12 text-white focus:outline-none focus:border-accent focus:bg-white/10 transition-colors shadow-inner" placeholder="Sarah Student" />
               </div>
            </div>

            <div>
               <label className="text-xs text-textMuted uppercase tracking-wider mb-2 block font-semibold">Email Address</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-textMuted" size={18} />
                  <input type="email" required onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-12 text-white focus:outline-none focus:border-accent focus:bg-white/10 transition-colors shadow-inner" placeholder="student@campus.edu" />
               </div>
            </div>

            <div>
               <label className="text-xs text-textMuted uppercase tracking-wider mb-2 block font-semibold">Account Role</label>
               <div className="relative">
                  <Shield className="absolute left-4 top-3.5 text-textMuted" size={18} />
                  <select required onChange={e => setFormData({...formData, role: e.target.value})} value={formData.role} className="w-full bg-background border border-white/10 rounded-xl p-3.5 pl-12 text-white focus:outline-none focus:border-accent transition-colors shadow-inner appearance-none cursor-pointer">
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Admin">Admin</option>
                  </select>
               </div>
            </div>

            <div>
               <label className="text-xs text-textMuted uppercase tracking-wider mb-2 block font-semibold">Password</label>
               <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-textMuted" size={18} />
                  <input type="password" required onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-12 text-white focus:outline-none focus:border-accent focus:bg-white/10 transition-colors shadow-inner" placeholder="••••••••" />
               </div>
            </div>

            <button type="submit" className="w-full btn-primary bg-gradient-to-r from-accent to-primary py-4 font-bold text-lg rounded-xl flex items-center justify-center mt-6">
               Sign Up <ArrowRight className="ml-2" size={18} />
            </button>
         </form>

         <p className="text-center text-sm text-textMuted mt-10">
            Already have an account? <Link to="/login" className="text-accent font-semibold hover:underline">Sign in</Link>
         </p>
      </motion.div>
    </div>
  );
}
