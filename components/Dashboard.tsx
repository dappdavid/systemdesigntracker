import React from 'react';
import { Topic, Status, Category } from '../types';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { CheckCircle2, CircleDashed, Clock } from 'lucide-react';

interface DashboardProps {
  topics: Topic[];
}

const COLORS = {
  [Status.MASTERED]: '#10b981', // green-500
  [Status.IN_PROGRESS]: '#3b82f6', // blue-500
  [Status.NOT_STARTED]: '#e2e8f0', // slate-200
};

const Dashboard: React.FC<DashboardProps> = ({ topics }) => {
  // Stats Calculation
  const total = topics.length;
  const mastered = topics.filter(t => t.status === Status.MASTERED).length;
  const inProgress = topics.filter(t => t.status === Status.IN_PROGRESS).length;
  const notStarted = topics.filter(t => t.status === Status.NOT_STARTED).length;
  
  const completionRate = Math.round((mastered / total) * 100);

  const pieData = [
    { name: 'Mastered', value: mastered },
    { name: 'In Progress', value: inProgress },
    { name: 'Not Started', value: notStarted },
  ];

  // Prepare Bar Chart Data (By Category)
  const categories = Object.values(Category);
  const barData = categories.map(cat => {
    const catTopics = topics.filter(t => t.category === cat);
    return {
      name: cat.split(' ')[0], // Short name
      fullName: cat,
      Mastered: catTopics.filter(t => t.status === Status.MASTERED).length,
      InProgress: catTopics.filter(t => t.status === Status.IN_PROGRESS).length,
      Remaining: catTopics.filter(t => t.status === Status.NOT_STARTED).length,
    };
  });

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Cards */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Topics Mastered</p>
            <h3 className="text-3xl font-bold text-slate-800">{mastered} <span className="text-sm text-slate-400 font-normal">/ {total}</span></h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">In Progress</p>
            <h3 className="text-3xl font-bold text-slate-800">{inProgress}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-slate-100 rounded-full text-slate-600">
            <CircleDashed size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">To Learn</p>
            <h3 className="text-3xl font-bold text-slate-800">{notStarted}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-slate-800 w-full mb-4">Overall Progress</h3>
          <div className="relative w-48 h-48">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as unknown as Status]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-800">{completionRate}%</span>
            </div>
          </div>
          <div className="flex gap-4 mt-6 text-sm">
             <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Done</div>
             <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Active</div>
             <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-200"></div> Todo</div>
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Progress by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <RechartsTooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
                <Bar dataKey="Mastered" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="InProgress" stackId="a" fill="#3b82f6" />
                <Bar dataKey="Remaining" stackId="a" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Motivation Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Keep grinding! 🚀</h2>
            <p className="text-blue-100 max-w-xl">
              Consistency is key in System Design. Try to master one core concept and sketch out one design problem every week.
            </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-64 bg-white/5 skew-x-12 transform translate-x-20"></div>
      </div>
    </div>
  );
};

export default Dashboard;
