import React, { useState, useMemo } from 'react';
import { DateSelection } from './DateSelection';
import { MetricsTable } from './MetricsTable';
import { MetricSelector } from './MetricSelector';
import { HourlyChart } from './HourlyChart';
import { CaptureRatePieChart } from './CaptureRatePieChart';
import type { RestaurantData } from '../../types';
import { calculateDailyMetrics } from '../../utils/metricsUtils';
import { isSameDay } from 'date-fns';

interface HourlyAnalysisProps {
  data: RestaurantData[];
}

export const HourlyAnalysis: React.FC<HourlyAnalysisProps> = ({ data }) => {
  const [startDate, setStartDate] = useState(new Date(data[0].timestamp));
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [benchmark, setBenchmark] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState(['customers']);
  const [customTimeRange, setCustomTimeRange] = useState<[string, string]>(['10:00', '12:00']);

  const { metrics, dayData, benchmarkData } = useMemo(() => {
    const primaryMetrics = calculateDailyMetrics(data, startDate);
    const dayData = data.filter(d => isSameDay(d.timestamp, startDate));
    const benchmarkData = benchmark && endDate 
      ? data.filter(d => isSameDay(d.timestamp, endDate))
      : undefined;

    if (benchmark && endDate) {
      const benchmarkMetrics = calculateDailyMetrics(data, endDate);
      return { 
        metrics: [primaryMetrics, benchmarkMetrics],
        dayData,
        benchmarkData
      };
    }

    return { 
      metrics: [primaryMetrics],
      dayData,
      benchmarkData
    };
  }, [data, startDate, endDate, benchmark]);

  return (
    <div>
      <DateSelection
        startDate={startDate}
        endDate={endDate}
        benchmark={benchmark}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onBenchmarkChange={setBenchmark}
      />
      <MetricsTable metrics={metrics} />
      <MetricSelector
        selectedMetrics={selectedMetrics}
        onMetricChange={setSelectedMetrics}
      />
      <div className="grid grid-cols-1 gap-6 mb-6">
        <HourlyChart
          data={dayData}
          selectedMetrics={selectedMetrics}
          benchmarkData={benchmarkData}
        />
      </div>
      <CaptureRatePieChart
        data={dayData}
        customTimeRange={customTimeRange}
        onCustomTimeRangeChange={setCustomTimeRange}
      />
    </div>
  );
};