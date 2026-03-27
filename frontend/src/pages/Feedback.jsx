import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Feedback() {
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  
  // Admin only logic
  const [feedbacks, setFeedbacks] = useState([]);
  
  useEffect(() => {
    if (user?.role === 'Admin') {
      axios.get('http://localhost:5000/api/feedback').then(res => setFeedbacks(res.data)).catch(err => console.error(err));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', { subject, message });
      setSent(true);
      setSubject('');
      setMessage('');
      setTimeout(() => setSent(false), 3000);
    } catch (err) { alert('Failed to send feedback'); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-poppins">
      <div className="mb-6">
         <h2 className="text-3xl font-bold text-white flex items-center">System Feedback <MessageSquare className="ml-3 text-accent" /></h2>
         <p className="text-textMuted text-sm mt-1">Help us improve the Campus Companion by sharing your suggestions.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 md:p-10 relative overflow-hidden group">
         <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-accent/10 blur-[80px] rounded-full group-hover:bg-accent/20 transition-all duration-700 pointer-events-none"></div>
         <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
               <label className="text-xs text-textMuted uppercase tracking-wider mb-2 block font-semibold">Subject</label>
               <input type="text" required value={subject} onChange={e=>setSubject(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent transition-colors shadow-inner" placeholder="E.g., Bug with Calendar System" />
            </div>
            <div>
               <label className="text-xs text-textMuted uppercase tracking-wider mb-2 block font-semibold">Message & Context</label>
               <textarea required rows={5} value={message} onChange={e=>setMessage(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent transition-colors shadow-inner" placeholder="Explain the feedback in detail..." />
            </div>
            <button type="submit" className="btn-primary py-4 font-bold text-lg rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(232,121,249,0.3)] min-w-[200px]">
               {sent ? "Sent Successfully!" : <><Send size={18} className="mr-2"/> Submit Feedback</>}
            </button>
         </form>
      </motion.div>

      {user?.role === 'Admin' && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Admin: User Feedbacks</h3>
          <div className="space-y-4">
             {feedbacks.length === 0 ? <p className="text-textMuted">No feedback received yet.</p> : feedbacks.map(f => (
               <div key={f.id} className="glass-card p-6 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                     <h4 className="text-lg font-bold text-white">{f.subject}</h4>
                     <span className="text-xs text-textMuted bg-white/5 px-2 py-1 rounded">{new Date(f.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-textMuted leading-relaxed mb-4">{f.message}</p>
                  <div className="flex items-center space-x-2 text-xs opacity-70">
                     <span className="font-semibold text-accent">{f.author_name}</span>
                     <span>({f.author_role})</span>
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
}
