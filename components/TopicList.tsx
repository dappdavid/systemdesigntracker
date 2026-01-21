import React, { useState } from 'react';
import { Topic, Status, Category } from '../types';
import TopicCard from './TopicCard';
import { Search, Filter } from 'lucide-react';

interface TopicListProps {
  topics: Topic[];
  isQuestionsMode: boolean;
  onUpdateStatus: (id: string, status: Status) => void;
  onExplain: (topic: Topic) => void;
}

const TopicList: React.FC<TopicListProps> = ({ topics, isQuestionsMode, onUpdateStatus, onExplain }) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status | 'ALL'>('ALL');

  // Filter based on mode (Concepts vs Questions)
  const baseList = topics.filter(t => t.isQuestion === isQuestionsMode);

  // Apply search and status filters
  const filteredList = baseList.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Group by Category if viewing concepts, just simple list if questions (usually questions are one category in this app, but let's keep it flexible)
  // Actually, let's group by category for both to stay organized.
  const categoriesPresent = Array.from(new Set(filteredList.map(t => t.category)));

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-0 z-10">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {isQuestionsMode ? 'System Design Problems' : 'Core Concepts'}
          </h2>
          <p className="text-sm text-slate-500">
            {filteredList.length} items found
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search topics..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm hover:bg-slate-100 text-slate-600">
              <Filter size={16} />
              <span>{filterStatus === 'ALL' ? 'All Status' : filterStatus}</span>
            </button>
            {/* Simple dropdown for status */}
            <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg hidden group-hover:block p-1">
              {['ALL', Status.NOT_STARTED, Status.IN_PROGRESS, Status.MASTERED].map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s as any)}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md"
                >
                  {s === 'ALL' ? 'All' : s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {filteredList.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400">No topics found matching your filters.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {categoriesPresent.map(cat => {
            const catTopics = filteredList.filter(t => t.category === cat);
            if (catTopics.length === 0) return null;
            return (
              <div key={cat} className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  {cat}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {catTopics.map(topic => (
                    <TopicCard 
                      key={topic.id} 
                      topic={topic} 
                      onUpdateStatus={onUpdateStatus}
                      onExplain={onExplain}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopicList;
