import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import CustomDatePicker from './components/DatePicker';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';

interface Booking {
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchCsvData = async () => {
      const response = await fetch('/hotel_bookings_1000.csv');
      const reader = response.body?.getReader();
      const result = await reader?.read();
      const decoder = new TextDecoder('utf-8');
      const csvData = decoder.decode(result?.value);

      Papa.parse(csvData, {
        header: true,
        complete: (result) => {
          const parsedData: Booking[] = result.data.map((entry: any) => ({
            arrival_date_year: Number(entry.arrival_date_year),
            arrival_date_month: entry.arrival_date_month,
            arrival_date_day_of_month: Number(entry.arrival_date_day_of_month),
            adults: Number(entry.adults),
            children: Number(entry.children),
            babies: Number(entry.babies),
            country: entry.country,
          }));
          setBookings(parsedData);
        },
      });
    };

    fetchCsvData();
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const bookingDate = new Date(
        booking.arrival_date_year,
        new Date(`${booking.arrival_date_month} 1`).getMonth(),
        booking.arrival_date_day_of_month
      );
      if (!startDate || !endDate) return true;
      return bookingDate >= startDate && bookingDate <= endDate;
    });
  }, [bookings, startDate, endDate]);

  const adultsData = filteredBookings.map((b) => b.adults);
  const childrenData = filteredBookings.map((b) => b.children);

  return (
    <div>
      <h1>Hotel Dashboard</h1>
      <CustomDatePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <TimeSeriesChart data={bookings} filteredData={filteredBookings} startDate={startDate} endDate={endDate} />
      <ColumnChart data={filteredBookings} />
      <SparklineChart label="Adult Visitors" data={adultsData} />
      <SparklineChart label="Children Visitors" data={childrenData} />
    </div>
  );
};

export default App;