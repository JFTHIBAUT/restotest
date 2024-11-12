import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import type { RestaurantData } from '../../types';
import { format, startOfDay } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DailyChartProps {
  data: RestaurantData[];
}

export const DailyChart: React.FC<DailyChartProps> = ({ data }) => {
  const dailyData = data.reduce((acc: { [key: string]: any }, curr) => {
    const day = format(startOfDay(curr.timestamp), 'yyyy-MM-dd');
    if (!acc[day]) {
      acc[day] = {
        date: curr.timestamp,
        customers: 0,
        passersby: 0,
        dwelltime: curr.dwelltime,
        weather: curr.weather,
        temperature: curr.weather?.temperature || 0
      };
    }
    acc[day].customers += curr.customers;
    acc[day].passersby += curr.passersby;
    return acc;
  }, {});

  const sortedDays = Object.values(dailyData).sort((a: any, b: any) => 
    a.date.getTime() - b.date.getTime()
  );

  const chartData = {
    labels: sortedDays.map((d: any) => format(d.date, 'dd/MM/yyyy')),
    datasets: [
      {
        type: 'bar' as const,
        label: 'Daily Customers',
        data: sortedDays.map((d: any) => d.customers),
        backgroundColor: '#2f7622',
        yAxisID: 'customers',
      },
      {
        type: 'line' as const,
        label: 'Daily Passersby',
        data: sortedDays.map((d: any) => d.passersby),
        borderColor: '#f39700',
        yAxisID: 'passersby',
      },
      {
        type: 'line' as const,
        label: 'Temperature (°C)',
        data: sortedDays.map((d: any) => d.temperature),
        borderColor: '#ff4444',
        yAxisID: 'temperature',
      }
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      customers: {
        type: 'linear' as const,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Daily Customers',
        },
      },
      passersby: {
        type: 'linear' as const,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Daily Passersby',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      temperature: {
        type: 'linear' as const,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Performance Overview',
      },
      tooltip: {
        callbacks: {
          afterBody: (context: any) => {
            const index = context[0].dataIndex;
            const day = sortedDays[index];
            return `Weather: ${day.weather.weatherEmoji}
Temperature: ${day.weather.temperature}°C
Precipitation: ${day.weather.precipitation}mm
Wind Speed: ${day.weather.windSpeed}km/h`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Chart type="bar" data={chartData} options={options} />
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {sortedDays.map((d: any, i: number) => (
          <div key={i} className="text-center bg-gray-50 p-2 rounded-lg">
            <span className="text-2xl block mb-1">{d.weather?.weatherEmoji}</span>
            <span className="text-sm block">{format(d.date, 'dd/MM')}</span>
            <span className="text-xs text-gray-600">{d.weather?.temperature}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
};