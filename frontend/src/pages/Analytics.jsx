import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, PieChart as PieChartIcon, Activity } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6 font-poppins">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-bold font-poppins text-white flex items-center">
             Analytics & Reports <BarChart2 className="ml-3 text-accent" />
           </h2>
           <p className="text-textMuted text-sm mt-1">System detailed insights on your productivity trends.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Weekly Productivity */}
        <div className="col-span-1 lg:col-span-2 glass-card p-6 h-80 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-secondary/10 blur-[60px] rounded-full group-hover:bg-secondary/30 transition-all duration-700"></div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 relative z-10 flex items-center"><TrendingUp size={18} className="mr-2 text-secondary" /> Weekly Productivity</h3>
          </div>
          <div className="flex-1 flex items-end space-x-3 mt-4 relative z-10">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, idx) => {
              const h1 = [30, 50, 40, 70][idx];
              const h2 = [20, 30, 60, 40][idx];
              return (
                <div key={week} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full flex justify-center items-end space-x-1 h-48">
                     <motion.div initial={{ height: 0 }} animate={{ height: `${h1}%` }} transition={{ duration: 1, delay: idx * 0.1 }} className="w-1/3 bg-primary rounded-t-sm opacity-80"></motion.div>
                     <motion.div initial={{ height: 0 }} animate={{ height: `${h2}%` }} transition={{ duration: 1, delay: idx * 0.1 + 0.2 }} className="w-1/3 bg-accent rounded-t-sm shadow-[0_0_10px_rgba(232,121,249,0.5)]"></motion.div>
                  </div>
                  <span className="text-xs text-textMuted mt-3">{week}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Distribution */}
        <div className="col-span-1 glass-card p-6 h-80 flex flex-col relative overflow-hidden group">
           <h3 className="text-lg font-semibold text-white mb-6 relative z-10 flex items-center"><PieChartIcon size={18} className="mr-2 text-primary" /> Task Distro</h3>
           <div className="flex-1 relative flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-[16px] border-textMuted/10 relative">
                 <div className="absolute inset-0 rounded-full border-[16px] border-primary" style={{clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 50%)'}}></div>
                 <div className="absolute inset-0 rounded-full border-[16px] border-accent shadow-neon" style={{clipPath: 'polygon(50% 50%, 0 50%, 0 0, 100% 0)'}}></div>
              </div>
              <div className="absolute flex flex-col items-center justify-center">
                 <span className="text-2xl font-bold">12</span>
                 <span className="text-xs text-textMuted">Total</span>
              </div>
           </div>
           <div className="flex justify-center space-x-4 mt-6">
              <div className="flex items-center text-xs"><span className="w-3 h-3 rounded-full bg-accent mr-2"></span> Assignments</div>
              <div className="flex items-center text-xs"><span className="w-3 h-3 rounded-full bg-primary mr-2"></span> Reading</div>
           </div>
        </div>

      </div>

      <div className="glass-card p-6">
         <h3 className="text-lg font-semibold text-white mb-6 flex items-center"><Activity size={18} className="mr-2 text-green-400" /> Recent System Activity Logs</h3>
         <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex justify-between">
               <div>
                  <p className="text-sm text-white">"Show my urgent tasks"</p>
                  <p className="text-xs text-textMuted mt-1">System prioritized 3 tasks successfully.</p>
               </div>
               <span className="text-xs text-textMuted">2 mins ago</span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex justify-between">
               <div>
                  <p className="text-sm text-white">"Create a schedule for tomorrow"</p>
                  <p className="text-xs text-textMuted mt-1">System updated calendar conflicts.</p>
               </div>
               <span className="text-xs text-textMuted">5 hrs ago</span>
            </div>
         </div>
      </div>
    </div>
  );
}
