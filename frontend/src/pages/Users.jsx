import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'Admin') {
      axios.get('http://localhost:5000/api/users').then(res => {
         setUsers(res.data);
         setLoading(false);
      }).catch(err => { console.error(err); setLoading(false); });
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) { alert("Failed to delete user"); }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
         <h2 className="text-3xl font-bold text-white flex items-center">User Management <UsersIcon className="ml-3 text-red-400" /></h2>
         <p className="text-textMuted text-sm mt-1">Admin control center for all platform accounts.</p>
      </div>

      <div className="glass-card p-6 overflow-x-auto">
         {loading ? <p className="text-center text-textMuted animate-pulse">Loading users...</p> : (
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-white/10 text-white/70 text-sm tracking-wider uppercase">
                    <th className="pb-3 px-4 font-semibold">ID</th>
                    <th className="pb-3 px-4 font-semibold">Name</th>
                    <th className="pb-3 px-4 font-semibold">Email</th>
                    <th className="pb-3 px-4 font-semibold">Role</th>
                    <th className="pb-3 px-4 font-semibold">Theme</th>
                    <th className="pb-3 px-4 font-semibold text-right">Actions</th>
                 </tr>
              </thead>
              <tbody>
                 {users.map((u, i) => (
                    <motion.tr initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: i*0.05}} key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                       <td className="py-4 px-4 text-white text-sm">#{u.id}</td>
                       <td className="py-4 px-4 text-white font-medium">{u.name}</td>
                       <td className="py-4 px-4 text-textMuted text-sm">{u.email}</td>
                       <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${u.role==='Admin' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : u.role==='Faculty' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-primary/20 text-primary border border-primary/30'}`}>
                             {u.role}
                          </span>
                       </td>
                       <td className="py-4 px-4 text-textMuted text-sm">{u.theme}</td>
                       <td className="py-4 px-4 text-right">
                          <button onClick={() => handleDelete(u.id)} disabled={u.id === user.id} className="p-2 bg-white/5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
                             <Trash2 size={16} />
                          </button>
                       </td>
                    </motion.tr>
                 ))}
              </tbody>
           </table>
         )}
      </div>
    </div>
  );
}
