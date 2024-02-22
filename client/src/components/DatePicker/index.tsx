import "./style.scss";

import { useCalendarContext } from "@/provider/calendarProvider";

import CalendarIcon from "@/components/Icons/calendar";
import Calendar from "../Calendar";

import { formatDate } from "@/utils/date";
import { useToggle } from "@/hooks/useToggle";

const DatePicker = () => {
  const { selectedDate } = useCalendarContext();
  const { year, formattedMonth, formattedDay } = formatDate(selectedDate);
  const { isOpen, toggle } = useToggle(false);

  return (
    <>
      <div className="date-picker">
        <div className="date-picker__container">
          <div className="date-picker__icon" onClick={toggle}>
            <CalendarIcon color="#000" width="18" height="21" />
          </div>
          <p className="date-picker__date">
            {year}년 {formattedMonth}월 {formattedDay}일
          </p>
        </div>
      </div>
      {isOpen && (
        <div className="date-picker__calendar">
          <Calendar />
        </div>
      )}
    </>
  );
};

export default DatePicker;
