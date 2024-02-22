import "./style.scss";

import { useCallback } from "react";

import ArrowLeft from "@/components/Icons/arrowLeft";
import ArrowRight from "@/components/Icons/arrowRight";
import { useCalendarContext } from "@/provider/calendarProvider";
import { formatDate } from "@/utils/date";

const CalendarHeader = () => {
  const { selectedDate, setSelectedDate } = useCalendarContext();
  const { year, month } = formatDate(selectedDate);

  const handleClickNavigator = useCallback(
    (direction: number) => {
      const newDate = new Date(selectedDate);
      newDate.setMonth(newDate.getMonth() + direction);
      setSelectedDate(newDate);
    },
    [selectedDate]
  );

  return (
    <>
      <div className="calendar-header">
        <div
          className="calendar-header__arrow"
          onClick={() => handleClickNavigator(-1)}
        >
          <ArrowLeft />
        </div>
        <p className="calendar-header__title">
          {year}년 {month}월
        </p>
        <div
          className="calendar-header__arrow"
          onClick={() => handleClickNavigator(1)}
        >
          <ArrowRight />
        </div>
      </div>
    </>
  );
};

export default CalendarHeader;
