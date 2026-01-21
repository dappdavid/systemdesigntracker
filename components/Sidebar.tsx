import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  BrainCircuit, 
  Settings,
  Hexagon
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'concepts', label: 'Core Concepts', icon: BookOpen },
    { id: 'problems', label: 'Design Problems', icon: BrainCircuit },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-full flex flex-col shadow-xl flex-shrink-0 z-20">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-700">
        <Hexagon className="text-blue-500 w-8 h-8 fill-blue-500/20" />
        <span className="text-lg font-bold tracking-tight">systemdesign<span className="text-blue-500">tracker</span></span>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-1">Study Streak</p>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">4</span>
            <span className="text-sm text-blue-400">days 🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;