import React from 'react';
import { DailyChart } from './DailyChart';
import { TopPerformers } from './TopPerformers';
import type { RestaurantData } from '../../types';

interface DailyOverviewProps {
  data: RestaurantData[];
}

export const DailyOverview: React.FC<DailyOverviewProps> = ({ data }) => {
  return (
    <div>
      <DailyChart data={data} />
      <TopPerformers data={data} />
    </div>
  );
};