import { useState } from "react";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
