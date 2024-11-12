import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { RestaurantData, CaptureRateCategory } from '../../types';
import { format } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CaptureRatePieChartProps {
  data: RestaurantData[];
  customTimeRange: [string, string];
  onCustomTimeRangeChange: (range: [string, string]) => void;
}

const calculateCaptureRate = (data: RestaurantData[], startHour: string, endHour: string) => {
  const filteredData = data.filter(d => {
    const hour = format(d.timestamp, 'HH:mm');
    return hour >= startHour && hour <= endHour;
  });

  const totalCustomers = filteredData.reduce((sum, d) => sum + d.customers, 0);
  const totalPassersby = filteredData.reduce((sum, d) => sum + d.passersby, 0);

  return totalPassersby > 0 ? (totalCustomers / totalPassersby) * 100 : 0;
};

export const CaptureRatePieChart: React.FC<CaptureRatePieChartProps> = ({
  data,
  customTimeRange,
  onCustomTimeRangeChange,
}) => {
  const categories: CaptureRateCategory[] = [
    { label: 'Morning', timeRange: ['07:00', '10:00'], value: 0 },
    { label: 'Noon', timeRange: ['12:00', '14:00'], value: 0 },
    { label: 'Afternoon', timeRange: ['16:00', '20:00'], value: 0 },
    { label: 'Custom', timeRange: customTimeRange, value: 0 },
  ];

  categories.forEach(category => {
    category.value = calculateCaptureRate(data, category.timeRange[0], category.timeRange[1]);
  });

  const chartData = {
    labels: categories.map(c => `${c.label} (${c.value.toFixed(1)}%)`),
    datasets: [
      {
        data: categories.map(c => c.value),
        backgroundColor: ['#2f7622', '#f39700', '#c5d469', '#666666'],
        borderColor: ['#ffffff'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      title: {
        display: true,
        text: 'Capture Rate by Time Period',
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[300px] sm:h-[400px] lg:h-[300px]">
          <Pie data={chartData} options={options} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Custom Time Range</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Start Time</label>
              <input
                type="time"
                value={customTimeRange[0]}
                onChange={(e) => onCustomTimeRangeChange([e.target.value, customTimeRange[1]])}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">End Time</label>
              <input
                type="time"
                value={customTimeRange[1]}
                onChange={(e) => onCustomTimeRangeChange([customTimeRange[0], e.target.value])}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};