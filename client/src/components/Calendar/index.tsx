import "./style.scss";

import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";
import { CalendarMovieType } from "@/@types/movie";

interface CalendarProps {
  movie?: CalendarMovieType;
  isLoading?: boolean;
}

const Calendar = ({ movie }: CalendarProps) => {
  return (
    <>
      <div className="calendar">
        <div className="calendar__header">
          <CalendarHeader />
        </div>
        <div className="calendar__body">
          <CalendarBody movie={movie} />
        </div>
      </div>
    </>
  );
};

export default Calendar;
