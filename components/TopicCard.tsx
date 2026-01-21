import React from 'react';
import { Topic, Status, Difficulty } from '../types';
import { CheckCircle, Circle, PlayCircle, BookOpen, Bot } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  onUpdateStatus: (id: string, status: Status) => void;
  onExplain: (topic: Topic) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onUpdateStatus, onExplain }) => {
  const getDifficultyColor = (diff?: Difficulty) => {
    switch (diff) {
      case Difficulty.EASY: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case Difficulty.MEDIUM: return 'bg-amber-100 text-amber-700 border-amber-200';
      case Difficulty.HARD: return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = () => {
    switch (topic.status) {
      case Status.MASTERED: return <CheckCircle className="text-green-500 w-5 h-5" />;
      case Status.IN_PROGRESS: return <PlayCircle className="text-blue-500 w-5 h-5" />;
      default: return <Circle className="text-slate-300 w-5 h-5" />;
    }
  };

  const nextStatus = {
    [Status.NOT_STARTED]: Status.IN_PROGRESS,
    [Status.IN_PROGRESS]: Status.MASTERED,
    [Status.MASTERED]: Status.NOT_STARTED,
  };

  return (
    <div className={`
      relative bg-white rounded-xl p-5 border shadow-sm transition-all duration-200 hover:shadow-md
      ${topic.status === Status.MASTERED ? 'border-green-200 bg-green-50/30' : 'border-slate-200'}
    `}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          {topic.difficulty && (
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getDifficultyColor(topic.difficulty)}`}>
              {topic.difficulty}
            </span>
          )}
        </div>
        <button 
          onClick={() => onUpdateStatus(topic.id, nextStatus[topic.status])}
          className="hover:scale-110 transition-transform"
          title={`Current: ${topic.status} (Click to advance)`}
        >
          {getStatusIcon()}
        </button>
      </div>

      <h3 className="text-lg font-semibold text-slate-800 leading-tight mb-2">
        {topic.title}
      </h3>
      
      <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">
        {topic.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <button 
          onClick={() => onExplain(topic)}
          className="flex items-center space-x-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
        >
          <Bot size={14} />
          <span>Ask AI Tutor</span>
        </button>

        {topic.lastReviewDate && (
           <span className="text-[10px] text-slate-400">
             Last: {new Date(topic.lastReviewDate).toLocaleDateString()}
           </span>
        )}
      </div>
    </div>
  );
};

export default TopicCard;
