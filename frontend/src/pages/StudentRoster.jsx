import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function StudentRoster() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/students');
        setStudents(res.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchStudents();
  }, []);

  return (
    <div className="space-y-6 font-poppins pb-10">
      <div>
         <h2 className="text-3xl font-bold text-textMain flex items-center">
           Enrolled Students <Users className="ml-3 text-secondary" />
         </h2>
         <p className="text-textMuted text-sm mt-1">Staff overview list for monitoring registered campus students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {loading && <div className="text-textMuted col-span-full">Loading database...</div>}
         {!loading && students.map((student, idx) => (
            <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay: idx*0.05}} key={student.id} className="glass-card p-6 flex flex-col relative group">
               <div className="absolute top-4 right-4"><CheckCircle size={18} className="text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] bg-black rounded-full" /></div>
               <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-secondary to-accent p-1 mb-4">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center border-2 border-background">
                     <Users size={24} className="text-textMuted" />
                  </div>
               </div>
               <h3 className="text-lg font-bold text-textMain">{student.name}</h3>
               <p className="text-xs text-textMuted mt-1 flex items-center"><Mail size={12} className="mr-2 text-primary" /> {student.email}</p>
               <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 flex items-center text-xs text-textMuted">
                 <Clock size={12} className="mr-2" /> Joined {new Date(student.created_at).toLocaleDateString()}
               </div>
            </motion.div>
         ))}
      </div>
    </div>
  );
}
