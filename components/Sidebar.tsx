import React from 'react';
import { LayoutDashboard, Database, Dna, BarChart2, Settings, BookOpen } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'training', label: 'Model Training', icon: Database },
    { id: 'generator', label: 'Nanobody Generator', icon: Dna },
    { id: 'analysis', label: 'Analysis', icon: BarChart2 },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-science-600 rounded-lg flex items-center justify-center font-mono text-lg">A</div>
          AnDiff
        </h1>
        <p className="text-xs text-slate-500 mt-1">Nanobody Humanization Workbench</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${isActive 
                  ? 'bg-science-600/10 text-science-400 border border-science-600/20' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button onClick={() => onNavigate('documentation')} className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${activeView === 'documentation' ? 'text-science-400' : 'text-slate-400 hover:text-white'}`}>
          <BookOpen className="w-4 h-4" />
          Documentation
        </button>
        <button onClick={() => onNavigate('settings')} className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${activeView === 'settings' ? 'text-science-400' : 'text-slate-400 hover:text-white'}`}>
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </div>
  );
};
