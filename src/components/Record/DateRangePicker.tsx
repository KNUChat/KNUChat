import styled from "styled-components";
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
    <PickerWrapper>
      <Box>
        <label>시작일</label>
        <input type="date" value={startDate ? startDate.toISOString().slice(0, 10) : ""} onChange={handleStartDateChange} />
      </Box>
      <Box>
        <label>종료일</label>
        <input type="date" value={endDate ? endDate.toISOString().slice(0, 10) : ""} onChange={handleEndDateChange} />
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
