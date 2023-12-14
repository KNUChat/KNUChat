import styled from "styled-components";
import { useState } from "react";

interface DataRangePickerProps {
  DefaultStartDate?: string;
  DefaultEndDate?: string;
  setDefaultEndDate?: React.Dispatch<React.SetStateAction<string>>;
  setDefaultStartDate?: React.Dispatch<React.SetStateAction<string>>;
}

// ... (existing imports and code remain unchanged)

const DateRangePicker = ({ DefaultStartDate, DefaultEndDate, setDefaultEndDate, setDefaultStartDate }: DataRangePickerProps) => {
  const DateChange = (temp: string) => {
    const dateString = temp;
    const year = Number(dateString.substring(0, 4)); // Assume 22 corresponds to 2022
    const month = Number(dateString.substring(4, 6)) - 1; // Month starts from 0 (January is 0)

    const date: Date = new Date(year, month, 1); // Set day to 01 for display purposes
    return date;
  };

  const [startYear, startMonth] = DefaultStartDate ? [DefaultStartDate.substring(0, 4), DefaultStartDate.substring(5, 7)] : [null, null];
  const [endYear, endMonth] = DefaultEndDate ? [DefaultEndDate.substring(0, 4), DefaultEndDate.substring(5, 7)] : [null, null];

  const initialStartDate = DefaultStartDate ? DateChange(DefaultStartDate) : null;
  const initialEndDate = DefaultEndDate ? DateChange(DefaultEndDate) : null;

  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setStartDate(date);
    console.log(date);
    // Pass the updated start date to the parent component
    if (setDefaultStartDate) {
      setDefaultStartDate(date.toISOString().split("T")[0]);
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setEndDate(date);
    console.log(date);
    // Pass the updated end date to the parent component
    if (setDefaultEndDate) {
      setDefaultEndDate(date.toISOString().split("T")[0]);
    }
  };

  return (
    <PickerWrapper>
      <Box>
        <label>시작일</label>
        <input
          type="month"
          value={startDate ? `${startDate.getFullYear()}-${`0${startDate.getMonth() + 1}`.slice(-2)}` : ""}
          onChange={handleStartDateChange}
        />
      </Box>
      <Box>
        <label>종료일</label>
        <input
          type="month"
          value={endDate ? `${endDate.getFullYear()}-${`0${endDate.getMonth() + 1}`.slice(-2)}` : ""}
          onChange={handleEndDateChange}
        />
      </Box>
    </PickerWrapper>
  );
};

export default DateRangePicker;

const PickerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;
