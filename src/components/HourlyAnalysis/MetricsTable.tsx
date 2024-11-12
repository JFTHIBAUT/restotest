import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faPercent, 
  faVenusMars, 
  faClock, 
  faCheckDouble 
} from '@fortawesome/free-solid-svg-icons';
import type { DailyMetrics } from '../../types';

interface MetricsTableProps {
  metrics: DailyMetrics[];
}

export const MetricsTable: React.FC<MetricsTableProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="table-header whitespace-nowrap">Date</th>
              <th className="table-header whitespace-nowrap">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                <span className="hidden sm:inline">Customers</span>
              </th>
              <th className="table-header whitespace-nowrap">
                <FontAwesomeIcon icon={faPercent} className="mr-2" />
                <span className="hidden sm:inline">Capture Rate</span>
              </th>
              <th className="table-header whitespace-nowrap">
                <FontAwesomeIcon icon={faVenusMars} className="mr-2" />
                <span className="hidden sm:inline">Gender</span>
              </th>
              <th className="table-header whitespace-nowrap">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                <span className="hidden sm:inline">Dwell Time</span>
              </th>
              <th className="table-header whitespace-nowrap">
                <FontAwesomeIcon icon={faCheckDouble} className="mr-2" />
                <span className="hidden sm:inline">Accuracy</span>
              </th>
              <th className="table-header">Weather</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="table-cell whitespace-nowrap">
                  {metric.date.toLocaleDateString()}
                </td>
                <td className="table-cell text-right">
                  {metric.customers}
                </td>
                <td className="table-cell text-right whitespace-nowrap">
                  {metric.captureRate.toFixed(1)}%
                </td>
                <td className="table-cell">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-1 sm:gap-2">
                    <span>♂️ {metric.genderDistribution.men.toFixed(1)}%</span>
                    <span>♀️ {metric.genderDistribution.women.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="table-cell text-right">
                  {metric.dwellTime}
                </td>
                <td className="table-cell text-right whitespace-nowrap">
                  {metric.dataAccuracy.toFixed(1)}%
                </td>
                <td className="table-cell text-center text-2xl">
                  {metric.weather.weatherEmoji}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};