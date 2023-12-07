import { useState } from "react";

interface DataRangePickerProps {
  DefaultStartDate?: string;
  DefaultEndDate?: string;
}

const DateRangePicker = ({ DefaultStartDate, DefaultEndDate }: DataRangePickerProps) => {
  const DateChange = (temp: string) => {
    const dateString = temp;
    const year = Number(dateString.substring(0, 2)); // Assume 22 corresponds to 2022
    const month = Number(dateString.substring(2, 4)) - 1; // Month starts from 0 (January is 0)
    const day = Number(dateString.substring(4, 6));

    const date: Date = new Date(2000 + year, month, day); // Adjust year according to your needs
    return date;
  };

  const [startDate, setStartDate] = useState<Date | null>(DefaultStartDate ? DateChange(DefaultStartDate) : null);
  const [endDate, setEndDate] = useState<Date | null>(DefaultEndDate ? DateChange(DefaultEndDate) : null);
  console.log(startDate, endDate);
  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setStartDate(date);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setEndDate(date);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ marginRight: "10px" }}>
        <label>
          시작일
          <input type="date" value={startDate ? startDate.toISOString().slice(0, 10) : ""} onChange={handleStartDateChange} />
        </label>
      </div>
      <div>
        <label>
          종료일
          <input type="date" value={endDate ? endDate.toISOString().slice(0, 10) : ""} onChange={handleEndDateChange} />
        </label>
      </div>
    </div>
  );
};

export default DateRangePicker;
