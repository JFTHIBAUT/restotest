import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';

interface DateSelectionProps {
  startDate: Date;
  endDate: Date | null;
  benchmark: boolean;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date | null) => void;
  onBenchmarkChange: (checked: boolean) => void;
}

export const DateSelection: React.FC<DateSelectionProps> = ({
  startDate,
  endDate,
  benchmark,
  onStartDateChange,
  onEndDateChange,
  onBenchmarkChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-lg">
      <div className="relative w-full sm:w-auto">
        <DatePicker
          selected={startDate}
          onChange={onStartDateChange}
          className="datepicker-input pr-10 w-full sm:w-auto"
          dateFormat="MM/dd/yyyy"
        />
        <FontAwesomeIcon 
          icon={faCalendar} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="benchmark"
          checked={benchmark}
          onChange={(e) => onBenchmarkChange(e.target.checked)}
          className="custom-checkbox"
        />
        <label htmlFor="benchmark" className="text-sm font-medium whitespace-nowrap">
          Benchmark
        </label>
      </div>

      {benchmark && (
        <>
          <FontAwesomeIcon icon={faArrowsLeftRight} className="hidden sm:block text-gray-400" />
          <div className="relative w-full sm:w-auto">
            <DatePicker
              selected={endDate}
              onChange={onEndDateChange}
              className="datepicker-input pr-10 w-full sm:w-auto"
              dateFormat="MM/dd/yyyy"
            />
            <FontAwesomeIcon 
              icon={faCalendar} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </>
      )}
    </div>
  );
};