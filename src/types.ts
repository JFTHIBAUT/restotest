export interface RestaurantData {
  timestamp: Date;
  customers: number;
  customersOut: number;
  men: number;
  menOut: number;
  women: number;
  womenOut: number;
  group: number;
  groupOut: number;
  passersby: number;
  aCustomers: number;
  aCustomersOut: number;
  customersLive: number;
  dwelltime: string;
  weather?: WeatherData;
}

export interface WeatherData {
  temperature: number;
  precipitation: number;
  windSpeed: number;
  cloudCover: number;
  weatherCode: number;
  weatherEmoji: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
    type?: string;
    yAxisID?: string;
  }[];
}

export interface DailyMetrics {
  date: Date;
  customers: number;
  captureRate: number;
  genderDistribution: {
    men: number;
    women: number;
  };
  dwellTime: string;
  dataAccuracy: number;
  weather: WeatherData;
}

export interface CaptureRateCategory {
  label: string;
  timeRange: [string, string];
  value: number;
}