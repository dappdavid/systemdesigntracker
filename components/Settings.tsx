import React from 'react';
import { Trash2, Save } from 'lucide-react';

interface SettingsProps {
  onReset: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onReset }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Data Management</h2>
        <p className="text-slate-600 mb-6">
          Your progress is stored locally in your browser. Clearing it will reset all your mastery statuses.
        </p>
        
        <button 
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
              onReset();
            }
          }}
          className="flex items-center px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors font-medium"
        >
          <Trash2 size={18} className="mr-2" />
          Reset Progress
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">About</h2>
        <p className="text-slate-600 mb-2">
          System Design Master is designed to help engineers prepare for high-level architecture interviews.
        </p>
        <p className="text-slate-500 text-sm">
          Powered by React, Tailwind, and Gemini AI.
        </p>
      </div>
    </div>
  );
};

export default Settings;
