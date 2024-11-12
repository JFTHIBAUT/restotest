import React from 'react';
import { format, startOfDay } from 'date-fns';
import type { RestaurantData } from '../../types';

interface TopPerformersProps {
  data: RestaurantData[];
}

export const TopPerformers: React.FC<TopPerformersProps> = ({ data }) => {
  const dailyData = data.reduce((acc: { [key: string]: any }, curr) => {
    const day = format(startOfDay(curr.timestamp), 'yyyy-MM-dd');
    if (!acc[day]) {
      acc[day] = {
        date: curr.timestamp,
        customers: 0,
        passersby: 0,
        weather: curr.weather,
      };
    }
    acc[day].customers += curr.customers;
    acc[day].passersby += curr.passersby;
    return acc;
  }, {});

  const dailyMetrics = Object.values(dailyData);

  const topCustomers = [...dailyMetrics]
    .sort((a: any, b: any) => b.customers - a.customers)
    .slice(0, 3);

  const topCaptureRate = [...dailyMetrics]
    .sort((a: any, b: any) => 
      (b.customers / b.passersby) - (a.customers / a.passersby)
    )
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Top Customer Days</h3>
        <table className="w-full min-w-[300px]">
          <thead>
            <tr>
              <th className="table-header rounded-tl-lg whitespace-nowrap">Date</th>
              <th className="table-header whitespace-nowrap">Total Customers</th>
              <th className="table-header rounded-tr-lg">Weather</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((day: any, i: number) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="table-cell whitespace-nowrap">{format(day.date, 'MM/dd/yyyy')}</td>
                <td className="table-cell text-right">{day.customers}</td>
                <td className="table-cell text-center">{day.weather?.weatherEmoji}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Top Capture Rate Days</h3>
        <table className="w-full min-w-[300px]">
          <thead>
            <tr>
              <th className="table-header rounded-tl-lg whitespace-nowrap">Date</th>
              <th className="table-header whitespace-nowrap">Daily Rate</th>
              <th className="table-header rounded-tr-lg">Weather</th>
            </tr>
          </thead>
          <tbody>
            {topCaptureRate.map((day: any, i: number) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="table-cell whitespace-nowrap">{format(day.date, 'MM/dd/yyyy')}</td>
                <td className="table-cell text-right">
                  {((day.customers / day.passersby) * 100).toFixed(1)}%
                </td>
                <td className="table-cell text-center">{day.weather?.weatherEmoji}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};