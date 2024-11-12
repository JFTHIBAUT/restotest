import React from 'react';

interface TabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabSystem: React.FC<TabProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4 mb-6">
      <button
        className={`px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base ${
          activeTab === 'daily' ? 'tab-active' : 'bg-gray-100 hover:bg-gray-200'
        }`}
        onClick={() => onTabChange('daily')}
      >
        Daily Overview
      </button>
      <button
        className={`px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base ${
          activeTab === 'hourly' ? 'tab-active' : 'bg-gray-100 hover:bg-gray-200'
        }`}
        onClick={() => onTabChange('hourly')}
      >
        Hourly Analysis
      </button>
    </div>
  );
};