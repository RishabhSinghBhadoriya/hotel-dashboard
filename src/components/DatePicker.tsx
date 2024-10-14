import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<Props> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
      />
    </div>
  );
};

export default CustomDatePicker;
