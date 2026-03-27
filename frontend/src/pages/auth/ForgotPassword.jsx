import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleForgot = (e) => {
    e.preventDefault();
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center font-poppins relative overflow-hidden px-4">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card w-full max-w-md p-8 md:p-10 relative z-10 rounded-3xl">
         <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">Forgot Password</h2>
            <p className="text-textMuted text-sm">Enter your email and we'll send you an OTP.</p>
         </div>

         <form onSubmit={handleForgot} className="space-y-5">
            <div>
               <label className="text-xs text-textMuted uppercase tracking-wider mb-2 block font-semibold">Email Address</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-textMuted" size={18} />
                  <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pl-12 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-colors shadow-inner" placeholder="student@campus.edu" />
               </div>
            </div>

            <button type="submit" className="w-full btn-primary py-4 font-bold text-lg rounded-xl flex items-center justify-center mt-6 shadow-neon">
               Send OTP <ArrowRight className="ml-2" size={18} />
            </button>
         </form>

         <div className="mt-8 text-center text-sm">
            <Link to="/login" className="text-textMuted hover:text-white transition-colors flex items-center justify-center">
               <ArrowLeft size={16} className="mr-2" /> Back to Login
            </Link>
         </div>
      </motion.div>
    </div>
  );
}
