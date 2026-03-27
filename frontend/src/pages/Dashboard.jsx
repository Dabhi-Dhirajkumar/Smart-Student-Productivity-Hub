import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, BookOpen, Clock, AlertTriangle, ShieldCheck, Users, Megaphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Dashboard() {
  const { user } = useAuth();
  
  if (user?.role === 'Admin') return <AdminDashboard />;
  if (user?.role === 'Faculty') return <FacultyDashboard />;
  return <StudentDashboard />;
}

// Student Dashboard
function StudentDashboard() {
  const [stats, setStats] = useState({ pending: 0, completed: 0, studyHours: 24, alerts: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks').then(res => {
      const p = res.data.filter(t => t.status === 'Pending').length;
      const c = res.data.filter(t => t.status === 'Completed').length;
      setStats(prev => ({...prev, pending: p, completed: c}));
    }).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Activity className="text-secondary" />} title="Tasks Completed" value={stats.completed} desc="This week" />
        <StatCard icon={<Clock className="text-primary" />} title="Pending Tasks" value={stats.pending} desc="Needs attention" />
        <StatCard icon={<BookOpen className="text-accent" />} title="Study Hours" value={stats.studyHours + 'h'} desc="Logged" />
        <StatCard icon={<AlertTriangle className="text-red-400" />} title="AI Warnings" value={stats.alerts} desc="Overdue likely" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 glass-card p-6 h-96 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-primary/20 blur-[50px] rounded-full group-hover:bg-primary/40 transition-all duration-700"></div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 font-poppins relative z-10">Productivity Analytics</h3>
            <p className="text-sm text-textMuted mb-6 relative z-10">AI Predicted completion rates mapped out visually.</p>
          </div>
          <div className="flex-1 flex items-end space-x-2 md:space-x-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
              const height = [40, 70, 50, 90, 60, 30, 80][idx];
              return (
                <div key={day} className="flex-1 flex flex-col items-center justify-end space-y-2 group/bar">
                  <div className="w-full relative rounded-t-lg bg-white/5 overflow-hidden flex justify-end flex-col h-48 border border-white/5 transition-colors">
                     <motion.div initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ duration: 1, delay: idx * 0.1 }} className="w-full bg-gradient-to-t from-primary/50 to-accent shadow-neon rounded-t-md relative z-10"></motion.div>
                  </div>
                  <span className="text-xs text-textMuted">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-6 border-t-4 border-t-accent flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4 font-poppins flex items-center">
            <span className="bg-accent/20 p-2 rounded-full mr-3 border border-accent/30"><Activity size={16} className="text-accent shadow-neon" /></span>
            AI Insights
          </h3>
          <div className="space-y-4 flex-1">
             <InsightCard title="Optimal Study Time" desc="You are 35% more productive between 8PM and 11PM." type="success" />
             <InsightCard title="Task Prioritization" desc="Check 'High Priority' tab for upcoming deadlines." type="info" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Faculty Dashboard
function FacultyDashboard() {
  const [stats, setStats] = useState({ activeStudents: 145, notices: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/notices').then(res => {
      setStats(prev => ({...prev, notices: res.data.length}));
    }).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={<Users className="text-secondary" />} title="Total Students" value={stats.activeStudents} desc="Tracking progress" />
        <StatCard icon={<Megaphone className="text-primary" />} title="Total Notices" value={stats.notices} desc="Published" />
        <StatCard icon={<BookOpen className="text-accent" />} title="Shared Blocks" value="12" desc="Schedules" />
      </div>

      <div className="glass-card p-8 text-center mt-6">
         <ShieldCheck size={48} className="mx-auto text-primary mb-4" />
         <h3 className="text-2xl font-bold text-white mb-2">Faculty Resource Center</h3>
         <p className="text-textMuted max-w-lg mx-auto">Use the sidebar to post new campus-wide Notices, monitor your class Schedule, and provide Feedback to system Administrators.</p>
      </div>
    </div>
  );
}

// Admin Dashboard
function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, feedbacks: 0, notices: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const u = await axios.get('http://localhost:5000/api/users').catch(()=>({data:[]}));
      const f = await axios.get('http://localhost:5000/api/feedback').catch(()=>({data:[]}));
      const n = await axios.get('http://localhost:5000/api/notices').catch(()=>({data:[]}));
      setStats({ users: u.data.length, feedbacks: f.data.length, notices: n.data.length });
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users className="text-primary" />} title="Registered Users" value={stats.users} desc="Total acc. scope" />
        <StatCard icon={<AlertTriangle className="text-secondary" />} title="Feedback Submitted" value={stats.feedbacks} desc="User complaints" />
        <StatCard icon={<Megaphone className="text-accent" />} title="Global Notices" value={stats.notices} desc="Active broadcasts" />
      </div>

      <div className="glass-card p-8 text-center mt-6">
         <Activity size={48} className="mx-auto text-red-400 mb-4" />
         <h3 className="text-2xl font-bold text-white mb-2">Global System Operations</h3>
         <p className="text-textMuted max-w-lg mx-auto">You have full superuser rights. Visit the User Management tab to delete users, or review Feedbacks and moderate global API limits securely via logging blocks.</p>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, desc }) {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-card p-6 relative overflow-hidden group cursor-pointer border-transparent hover:border-white/10">
      <div className="absolute -right-4 -bottom-4 opacity-10 blur-xl group-hover:opacity-30 transform scale-150 transition-all">{icon}</div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-textMuted text-sm font-medium">{title}</p>
          <h4 className="text-3xl font-bold text-white mt-2 font-poppins">{value}</h4>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/30 transition-colors">{icon}</div>
      </div>
      <p className="text-xs text-textMuted mt-4 flex items-center">
        <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span> {desc}
      </p>
    </motion.div>
  );
}

function InsightCard({ title, desc, type }) {
  const colors = {
    warning: 'border-red-500/50 bg-red-500/10 text-red-200',
    success: 'border-green-500/50 bg-green-500/10 text-green-200',
    info: 'border-blue-500/50 bg-blue-500/10 text-blue-200',
  };
  return (
    <div className={`p-4 rounded-xl border ${colors[type]} transition-all hover:bg-opacity-20 cursor-pointer`}>
      <h5 className="font-semibold text-sm mb-1">{title}</h5>
      <p className="text-xs opacity-80 leading-relaxed">{desc}</p>
    </div>
  );
}
