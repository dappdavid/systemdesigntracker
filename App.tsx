import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TopicList from './components/TopicList';
import AIModal from './components/AIModal';
import Settings from './components/Settings';
import { INITIAL_TOPICS } from './constants';
import { Topic, Status } from './types';

const STORAGE_KEY = 'sys_design_tracker_v1';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [topics, setTopics] = useState<Topic[]>(() => {
    // Load from local storage or use initial
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Topic[];
        // Merge with initial to ensure new topics added in updates appear
        // This is a simple merge strategy: preserve saved status, add new topics
        const savedMap = new Map(parsed.map((t) => [t.id, t]));
        return INITIAL_TOPICS.map(initTopic => {
          const savedTopic = savedMap.get(initTopic.id);
          return savedTopic ? { ...initTopic, status: savedTopic.status, lastReviewDate: savedTopic.lastReviewDate } : initTopic;
        });
      } catch (e) {
        console.error("Failed to parse saved data", e);
        return INITIAL_TOPICS;
      }
    }
    return INITIAL_TOPICS;
  });

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // Persistence effect
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
  }, [topics]);

  const handleUpdateStatus = (id: string, newStatus: Status) => {
    setTopics(prev => prev.map(t => 
      t.id === id ? { ...t, status: newStatus, lastReviewDate: Date.now() } : t
    ));
  };

  const handleExplain = (topic: Topic) => {
    setSelectedTopic(topic);
    setAiModalOpen(true);
  };

  const handleReset = () => {
    setTopics(INITIAL_TOPICS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard topics={topics} />;
      case 'concepts':
        return (
          <TopicList 
            topics={topics} 
            isQuestionsMode={false} 
            onUpdateStatus={handleUpdateStatus} 
            onExplain={handleExplain}
          />
        );
      case 'problems':
        return (
          <TopicList 
            topics={topics} 
            isQuestionsMode={true} 
            onUpdateStatus={handleUpdateStatus}
            onExplain={handleExplain}
          />
        );
      case 'settings':
        return <Settings onReset={handleReset} />;
      default:
        return <Dashboard topics={topics} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Bar for Mobile/Context - kept simple for now */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold text-slate-800 capitalize">
            {activeTab === 'concepts' ? 'Core Concepts' : 
             activeTab === 'problems' ? 'Design Problems' : 
             activeTab}
          </h1>
          <div className="text-sm text-slate-500">
             {/* Could add user profile or global stats here */}
             System Design Tracker
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>

      <AIModal 
        isOpen={aiModalOpen} 
        onClose={() => setAiModalOpen(false)} 
        topic={selectedTopic} 
      />
    </div>
  );
};

export default App;