import React, { useEffect, useState } from 'react';
import { Topic, AIResponse } from '../types';
import { explainTopic } from '../services/geminiService';
import { X, Sparkles, BookOpen, Lightbulb, ExternalLink, Loader2, AlertCircle, Layers } from 'lucide-react';

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
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50 flex-shrink-0">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Sparkles className="text-purple-600 w-5 h-5" />
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">AI Tutor (Deep Dive)</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{topic.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{topic.category}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-0 overflow-y-auto custom-scrollbar flex-1 bg-white">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-6">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
              <div className="text-center space-y-2">
                <p className="text-lg font-medium text-slate-700">Generating comprehensive guide...</p>
                <p className="text-sm text-slate-400">This may take a few seconds as we compile detailed steps.</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center text-rose-500 space-y-3 p-8">
              <AlertCircle size={40} />
              <p className="font-medium">{error}</p>
            </div>
          ) : data ? (
            <div className="flex flex-col md:flex-row h-full">
              
              {/* Main Content (Left/Top) */}
              <div className="flex-1 p-8 space-y-8">
                {/* Summary */}
                <div className="prose prose-slate max-w-none">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                    <h3 className="flex items-center text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Executive Summary
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-sm">
                      {data.explanation}
                    </p>
                  </div>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-8">
                  {data.sections.map((section, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-slate-200">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white"></div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 leading-none flex items-center">
                        <span className="mr-3 text-slate-400 font-mono text-sm">0{idx + 1}</span>
                        {section.title}
                      </h3>
                      <p className="text-slate-600 leading-7 whitespace-pre-wrap text-[15px]">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar (Right/Bottom) */}
              <div className="w-full md:w-80 bg-slate-50 border-l border-slate-100 p-6 space-y-8 flex-shrink-0">
                {/* Key Points */}
                <div>
                  <h3 className="flex items-center text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />
                    Key Takeaways
                  </h3>
                  <ul className="space-y-3">
                    {data.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start text-slate-600 text-sm leading-snug bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <span className="mr-2.5 mt-1 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Topics */}
                <div>
                  <h3 className="flex items-center text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">
                    <Layers className="w-4 h-4 mr-2 text-slate-500" />
                    Related Concepts
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.relatedTopics.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white text-slate-600 rounded-md text-xs font-medium border border-slate-200 shadow-sm hover:border-blue-300 transition-colors cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex justify-end flex-shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIModal;