import { RestaurantData, DailyMetrics } from '../types';
import { startOfDay, isSameDay } from 'date-fns';

export const calculateDailyMetrics = (data: RestaurantData[], date: Date): DailyMetrics => {
  const dayData = data.filter(d => isSameDay(d.timestamp, date));
  
  const customers = dayData.reduce((sum, d) => sum + d.customers, 0);
  const passersby = dayData.reduce((sum, d) => sum + d.passersby, 0);
  const captureRate = (customers / passersby) * 100;

  const totalGender = dayData.reduce((sum, d) => sum + d.men + d.women, 0);
  const menPercentage = (dayData.reduce((sum, d) => sum + d.men, 0) / totalGender) * 100;
  const womenPercentage = (dayData.reduce((sum, d) => sum + d.women, 0) / totalGender) * 100;

  const customersOut = dayData.reduce((sum, d) => sum + d.customersOut, 0);
  const dataAccuracy = customers <= customersOut 
    ? (customers / customersOut) * 100 
    : (customersOut / customers) * 100;

  return {
    date: startOfDay(date),
    customers,
    captureRate,
    genderDistribution: {
      men: menPercentage,
      women: womenPercentage
    },
    dwellTime: dayData[0]?.dwelltime || '0:00',
    dataAccuracy,
    weather: dayData[0]?.weather || {
      temperature: 0,
      precipitation: 0,
      windSpeed: 0,
      cloudCover: 0,
      weatherCode: 0,
      weatherEmoji: '❓'
    }
  };
};