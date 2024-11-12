import React, { useState } from 'react';
import { TabSystem } from './components/TabSystem';
import { DailyOverview } from './components/DailyOverview';
import { HourlyAnalysis } from './components/HourlyAnalysis';
import { useRestaurantData } from './hooks/useRestaurantData';

function App() {
  const [activeTab, setActiveTab] = useState('daily');
  const { data, loading, error } = useRestaurantData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Error Loading Data</h2>
          <p className="text-red-600 break-words">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Restaurant Analytics Dashboard</h1>
        <TabSystem activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'daily' && <DailyOverview data={data} />}
        {activeTab === 'hourly' && <HourlyAnalysis data={data} />}
      </div>
    </div>
  );
}

export default App;