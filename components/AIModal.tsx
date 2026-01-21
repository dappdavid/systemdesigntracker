import React, { useEffect, useState } from 'react';
import { Topic, AIResponse } from '../types';
import { explainTopic } from '../services/geminiService';
import { X, Sparkles, BookOpen, Lightbulb, ExternalLink, Loader2, AlertCircle } from 'lucide-react';

interface AIModalProps {
  topic: Topic | null;
  isOpen: boolean;
  onClose: () => void;
}

const AIModal: React.FC<AIModalProps> = ({ topic, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && topic) {
      setData(null);
      setError(null);
      setLoading(true);
      
      explainTopic(topic)
        .then(response => {
          setData(response);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError("Failed to fetch explanation. Please check your API Key and connection.");
          setLoading(false);
        });
    }
  }, [isOpen, topic]);

  if (!isOpen || !topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Sparkles className="text-purple-600 w-5 h-5" />
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">AI Tutor</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{topic.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{topic.category}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              <p className="text-slate-500 animate-pulse">Consulting the system design oracle...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-rose-500 space-y-3">
              <AlertCircle size={40} />
              <p>{error}</p>
            </div>
          ) : data ? (
            <div className="space-y-8">
              {/* Explanation */}
              <div className="prose prose-slate max-w-none">
                <h3 className="flex items-center text-lg font-semibold text-slate-800 mb-3">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                  Overview
                </h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {data.explanation}
                </p>
              </div>

              {/* Key Points */}
              <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                <h3 className="flex items-center text-lg font-semibold text-indigo-900 mb-3">
                  <Lightbulb className="w-5 h-5 mr-2 text-indigo-600" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2">
                  {data.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start text-indigo-800 text-sm">
                      <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related */}
              <div>
                <h3 className="flex items-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.relatedTopics.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIModal;
