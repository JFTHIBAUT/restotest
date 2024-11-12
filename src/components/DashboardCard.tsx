import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="text-blue-500">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {trend !== undefined && (
            <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};