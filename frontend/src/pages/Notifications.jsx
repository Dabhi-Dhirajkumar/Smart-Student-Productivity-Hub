import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle, Info, Trash2 } from 'lucide-react';

const initialNotifs = [
  { id: 1, type: 'warning', text: "System predicts your 'Maths Assignment' will be delayed.", time: '10 mins ago', read: false },
  { id: 2, type: 'info', text: "Suggested schedule generated for remaining tasks.", time: '2 hours ago', read: false },
  { id: 3, type: 'success', text: "Task 'Web Tech Lab' completed successfully.", time: '1 day ago', read: true },
];

export default function Notifications() {
  const [notifications, setNotifs] = useState(initialNotifs);

  const getIconAndStyle = (type) => {
    switch (type) {
      case 'warning': return { icon: <AlertTriangle size={20} className="text-red-400" />, style: 'border-l-4 border-red-400 bg-white/5' };
      case 'info': return { icon: <Info size={20} className="text-secondary" />, style: 'border-l-4 border-secondary bg-white/5' };
      case 'success': return { icon: <CheckCircle size={20} className="text-green-400" />, style: 'border-l-4 border-green-400 bg-white/5' };
      default: return { icon: <Bell size={20} />, style: 'border-l-4 border-gray-400 bg-white/5' };
    }
  };

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const deleteNotif = (id) => setNotifs(n => n.filter(x => x.id !== id));

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-poppins">
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <div>
           <h2 className="text-3xl font-bold text-white flex items-center">
             Notifications <Bell className="ml-3 text-primary animate-pulse" />
           </h2>
           <p className="text-textMuted text-sm mt-1">Smart alerts managed by your Virtual Companion.</p>
        </div>
        <button onClick={markAllRead} className="text-sm font-medium text-textMuted hover:text-white transition-colors">Mark all reading</button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {notifications.length === 0 ? (
             <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="glass-card p-10 text-center text-textMuted">You have no new notifications.</motion.div>
          ) : (
            notifications.map((notif) => {
              const { icon, style } = getIconAndStyle(notif.type);
              return (
                <motion.div 
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`glass-card p-4 sm:p-6 flex items-start sm:items-center justify-between transition-all hover:bg-white/10 ${style} ${notif.read ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start sm:items-center space-x-4">
                     <div className="p-2 bg-black/20 rounded-xl relative">
                        {icon}
                        {!notif.read && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background animate-pulse"></span>}
                     </div>
                     <div>
                        <p className={`text-sm ${notif.read ? 'text-textMuted' : 'text-white'}`}>{notif.text}</p>
                        <p className="text-xs text-textMuted mt-1">{notif.time}</p>
                     </div>
                  </div>
                  <button onClick={() => deleteNotif(notif.id)} className="p-2 text-textMuted hover:text-red-400 transition-colors bg-black/20 rounded-lg shrink-0 sm:ml-4">
                     <Trash2 size={16} />
                  </button>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
