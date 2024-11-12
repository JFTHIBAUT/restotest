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
import { format } from 'date-fns';
import type { RestaurantData } from '../../types';

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

interface HourlyChartProps {
  data: RestaurantData[];
  selectedMetrics: string[];
  benchmarkData?: RestaurantData[];
}

const metricConfigs = {
  customers: { label: 'Customers', color: '#2f7622' },
  passersby: { label: 'Passersby', color: '#f39700' },
  captureRate: { label: 'Capture Rate', color: '#c5d469' },
  men: { label: 'Men', color: '#4299e1' },
  women: { label: 'Women', color: '#ed64a6' },
  group: { label: 'Group', color: '#9f7aea' },
  customersLive: { label: 'Live Customers', color: '#48bb78' }
};

export const HourlyChart: React.FC<HourlyChartProps> = ({ 
  data, 
  selectedMetrics,
  benchmarkData 
}) => {
  const getMetricValue = (item: RestaurantData, metric: string) => {
    if (metric === 'captureRate') {
      return (item.customers / item.passersby) * 100;
    }
    return item[metric as keyof RestaurantData] as number;
  };

  const datasets = selectedMetrics.flatMap(metric => {
    const config = metricConfigs[metric as keyof typeof metricConfigs];
    const mainDataset = {
      label: config.label,
      data: data.map(d => getMetricValue(d, metric)),
      backgroundColor: config.color,
      borderColor: config.color,
      type: 'bar' as const,
    };

    if (benchmarkData) {
      const benchmarkDataset = {
        label: `${config.label} (Benchmark)`,
        data: benchmarkData.map(d => getMetricValue(d, metric)),
        backgroundColor: `${config.color}80`, // 50% transparency
        borderColor: `${config.color}80`,
        type: 'bar' as const,
      };
      return [mainDataset, benchmarkDataset];
    }

    return [mainDataset];
  });

  const chartData = {
    labels: data.map(d => format(d.timestamp, 'HH:mm')),
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Hourly Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: selectedMetrics.includes('captureRate') ? 'Value / Percentage (%)' : 'Count',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};