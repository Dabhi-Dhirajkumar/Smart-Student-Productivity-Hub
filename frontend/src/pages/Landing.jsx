import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Brain, Clock, Shield, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-textMain font-poppins relative overflow-hidden flex flex-col">
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 md:px-12 relative z-10 glass-card m-4 rounded-full">
         <div className="text-xl font-bold neon-text tracking-wide flex items-center">
            <Sparkles className="mr-2" size={24} /> CampusHub
         </div>
         <div className="flex space-x-4">
            <Link to="/login" className="px-6 py-2 rounded-full font-medium text-white hover:bg-white/10 transition-colors">Login</Link>
            <Link to="/signup" className="btn-primary rounded-full">Get Started</Link>
         </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 mt-10 md:mt-20">
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="px-4 py-1.5 rounded-full text-xs font-medium border border-accent/50 bg-accent/10 text-accent uppercase tracking-wider mb-6 inline-block shadow-neon">
               The Future of Student Productivity
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mt-4">
               Meet Your <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">AI Powered</span> <br/> Campus Companion
            </h1>
            <p className="mt-8 text-lg text-textMuted max-w-2xl mx-auto leading-relaxed">
               Intelligently organize your tasks, get dynamic schedule optimizations, and stay ahead of your deadlines with our predictive AI engine designed strictly for students.
            </p>
         </motion.div>
         
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/signup" className="btn-primary px-8 py-4 text-lg rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(232,121,249,0.5)]">
               Start for Free <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link to="/login" className="btn-secondary px-8 py-4 text-lg rounded-full flex items-center justify-center text-white border-white/20 hover:bg-white/5">
               View Demo
            </Link>
         </motion.div>
      </div>

      {/* Features */}
      <div className="py-20 px-6 md:px-12 relative z-10 mt-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard 
               icon={<Brain size={32} className="text-primary" />} 
               title="Smart Prioritization" 
               desc="AI analyzes your upcoming deadlines and suggests the optimal task ordering." 
            />
            <FeatureCard 
               icon={<Clock size={32} className="text-secondary" />} 
               title="Schedule Optimization" 
               desc="Auto-generate timelines that fit classes, study hours, and important breaks perfectly." 
            />
            <FeatureCard 
               icon={<Shield size={32} className="text-accent" />} 
               title="Analytics & Tracking" 
               desc="Understand exactly how your productivity drops off with highly detailed graph reports." 
            />
         </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="glass-card p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
       <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 shadow-inner">
          {icon}
       </div>
       <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
       <p className="text-textMuted leading-relaxed">{desc}</p>
    </motion.div>
  );
}
