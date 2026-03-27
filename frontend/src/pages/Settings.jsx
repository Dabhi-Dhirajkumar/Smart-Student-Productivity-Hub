import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Moon, Sun, Monitor, Bell, Lock, Activity, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Settings() {
  const { user, updateThemeSync } = useAuth();
  const [theme, setTheme] = useState(user?.theme || 'dark');
  const [aiEnabled, setAiEnabled] = useState(true);
  const [notifs, setNotifs] = useState(true);

  const handleThemeChange = async (newTheme) => {
    setTheme(newTheme);
    updateThemeSync(newTheme);
    try {
      await axios.put('http://localhost:5000/api/users/profile', { name: user.name, theme: newTheme });
    } catch(err) { console.error('Failed to save theme'); }
  };

  return (
    <div className="max-w-5xl mx-auto font-poppins pb-10">
      <div className="mb-8">
         <h2 className="text-3xl font-bold text-white flex items-center">
           Preferences <SettingsIcon className="ml-3 text-secondary animate-[spin_4s_linear_infinite]" />
         </h2>
         <p className="text-textMuted text-sm mt-1">Customize your AI experience and application appearance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="col-span-1 space-y-2">
            {[
              { id: 'appearance', label: 'Appearance', icon: Monitor },
              { id: 'ai', label: 'AI Engine', icon: Sparkles },
              { id: 'notifs', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Privacy & Security', icon: Lock },
            ].map((tab, idx) => (
              <button key={tab.id} className={`w-full flex items-center p-4 rounded-xl transition-all ${idx === 0 ? 'bg-primary/20 text-white border border-primary/50 shadow-neon' : 'text-textMuted hover:bg-white/5 hover:text-white glass-card border-transparent'} font-medium`}>
                 <tab.icon size={20} className="mr-3" /> {tab.label}
              </button>
            ))}
         </div>

         <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="glass-card p-8">
               <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Theme Settings</h3>
               <div className="grid grid-cols-3 gap-4">
                  <div onClick={() => handleThemeChange('dark')} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${theme === 'dark' ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(107,33,168,0.5)]' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                     <Moon size={28} className={theme === 'dark' ? 'text-primary' : 'text-textMuted'} />
                     <span className="mt-3 text-sm font-medium">Dark Mode</span>
                  </div>
                  <div onClick={() => handleThemeChange('light')} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${theme === 'light' ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(107,33,168,0.5)]' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                     <Sun size={28} className={theme === 'light' ? 'text-primary' : 'text-textMuted'} />
                     <span className="mt-3 text-sm font-medium">Light Mode</span>
                  </div>
                  <div onClick={() => handleThemeChange('system')} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${theme === 'system' ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(107,33,168,0.5)]' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                     <Monitor size={28} className={theme === 'system' ? 'text-primary' : 'text-textMuted'} />
                     <span className="mt-3 text-sm font-medium">System</span>
                  </div>
               </div>
            </div>

            <div className="glass-card p-8 group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full group-hover:bg-accent/30 transition-colors"></div>
               <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 relative z-10 flex items-center"><Sparkles size={20} className="mr-2 text-accent"/> AI Agent Toggles</h3>
               
               <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                     <div>
                        <h4 className="font-semibold text-white">Smart Prioritization</h4>
                        <p className="text-xs text-textMuted mt-1 max-w-[80%]">Allow AI to automatically rank your tasks based on analytical predictions and deadlines.</p>
                     </div>
                     <button onClick={() => setAiEnabled(!aiEnabled)} className={`w-12 h-6 rounded-full transition-colors relative ${aiEnabled ? 'bg-accent' : 'bg-white/20'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-md ${aiEnabled ? 'left-[26px]' : 'left-0.5'}`}></div>
                     </button>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                     <div>
                        <h4 className="font-semibold text-white">Predictive Analytics alerts</h4>
                        <p className="text-xs text-textMuted mt-1 max-w-[80%]">Get notified when you are falling behind your normal velocity.</p>
                     </div>
                     <button onClick={() => setNotifs(!notifs)} className={`w-12 h-6 rounded-full transition-colors relative ${notifs ? 'bg-primary' : 'bg-white/20'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-md ${notifs ? 'left-[26px]' : 'left-0.5'}`}></div>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
