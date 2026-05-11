import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './views/Dashboard';
import { Generator } from './views/Generator';
import { Training } from './views/Training';
import { Analysis } from './views/Analysis';
import { Documentation } from './views/Documentation';
import { SettingsView } from './views/Settings';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard />;
      case 'generator': return <Generator />;
      case 'training': return <Training />;
      case 'analysis': return <Analysis />;
      case 'documentation': return <Documentation />;
      case 'settings': return <SettingsView />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeView={currentView} onNavigate={setCurrentView} />
      
      <main className="ml-64 p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-science-100/50 to-transparent -z-10 pointer-events-none ml-64" />
    </div>
  );
}
