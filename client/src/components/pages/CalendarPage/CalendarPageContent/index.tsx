/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss";

import { useEffect, useState } from "react";
import calendarApi from "@/apis/calendar";
import { useCalendarContext } from "@/provider/calendarProvider";
import Calendar from "@/components/Calendar";
import CalendarMovieItem from "../CalendarMovieItem";
import { formatDate } from "@/utils/date";
import { CalendarMovieType } from "@/@types/movie";
import MESSAGE from "@/constants/message";

const CalendarPageContent = () => {
  const [movie, setMovie] = useState<CalendarMovieType>({
    moviesReleasedInMonth: [],
    userWatchedMoviesInMonth: [],
  });

  const { selectedDate, setSelectedDateMovie, selectedDateMovie } =
    useCalendarContext();
  const { year, formattedMonth, formattedDay, month } =
    formatDate(selectedDate);

  const date = `${year}-${formattedMonth}-${formattedDay}`;

  const getDayMovieInfo = async () => {
    try {
      const response = await calendarApi.getMovieListByDate(date);
      // console.log(response, "오늘******************");
      setSelectedDateMovie(response);
    } catch (err) {
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  const getMonthMovieInfo = async () => {
    try {
      const response = await calendarApi.getMovieList(year, month);
      // console.log(response, "이번달******************");
      setMovie(response);
    } catch (err) {
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  useEffect(() => {
    getDayMovieInfo();
    getMonthMovieInfo();
  }, [selectedDate]);

  return (
    <div className="calendar-container">
      <div className="calendar-container-content">
        <Calendar movie={movie} />
      </div>
      {selectedDate && (
        <>
          <div className="calendar-container-item-wrapper">
            <CalendarMovieItem
              title={"오늘 개봉 영화"}
              movie={selectedDateMovie.moviesReleasedOnDate}
            />
          </div>
          <CalendarMovieItem
            title={"오늘 본 영화"}
            movie={selectedDateMovie.userWatchedMoviesInDate}
          />
        </>
      )}
    </div>
  );
};

export default CalendarPageContent;
