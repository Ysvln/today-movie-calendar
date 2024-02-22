/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss";

import { useMemo, useCallback } from "react";
import { useCalendarContext } from "@/provider/calendarProvider";
import { CalendarMovieType } from "@/@types/movie";

const dayName = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarBodyProps {
  movie?: CalendarMovieType;
}

const CalendarBody = ({ movie }: CalendarBodyProps) => {
  const { selectedDate, setSelectedDate } = useCalendarContext();

  const calculateMoviesPerDay = (array: any, day: number, key: string) => {
    const moviesOnSelectedDay = array.filter(
      (movie: any) => new Date(movie[key]).getDate() === day
    );
    return moviesOnSelectedDay.length;
  };

  const [year, month] = useMemo(
    () => [selectedDate.getFullYear(), selectedDate.getMonth()],
    [selectedDate]
  );

  const [daysInMonth, firstDayOfMonth] = useMemo(
    () => [
      new Date(year, month + 1, 0).getDate(),
      new Date(year, month, 1).getDay(),
    ],
    [year, month]
  );

  const days = useMemo(
    () => Array.from({ length: daysInMonth }, (_, i) => i + 1),
    [daysInMonth]
  );

  const handleDateClick = useCallback(
    (day: number) => {
      const selectedDay = new Date(year, month, day);
      setSelectedDate(selectedDay);
    },
    [year, month, setSelectedDate]
  );

  const emptyCells = useMemo(
    () =>
      Array.from({ length: firstDayOfMonth }, (_, idx) => (
        <td className="calendar-body__cell empty" key={`empty-${idx}`}>
          <p className="calendar-body__date"></p>
          <div className="calendar-body__event"></div>
        </td>
      )),
    [firstDayOfMonth]
  );

  const dayCells = useMemo(
    () =>
      days.map((day) => {
        const released = calculateMoviesPerDay(
          movie?.moviesReleasedInMonth || [],
          day,
          "releaseDate"
        );
        const watched = calculateMoviesPerDay(
          movie?.userWatchedMoviesInMonth || [],
          day,
          "watchedAt"
        );
        const isToday = selectedDate.getDate() === day;
        return (
          <td
            className={`calendar-body__cell ${isToday ? "today" : ""}`}
            key={`day-${year}-${month}-${day}`}
            onClick={() => handleDateClick(day)}
          >
            <div className="calendar-body__date__wrapper">
              <p>{day}</p>
            </div>
            <div className="calendar-body__event">
              {released > 0 && (
                <span className="calendar-body__event--released">
                  {released}
                </span>
              )}
              {watched > 0 && (
                <span className="calendar-body__event--watched">{watched}</span>
              )}
            </div>
          </td>
        );
      }),
    [days, selectedDate, movie]
  );

  const weekRows = useMemo(() => {
    const totalCells = emptyCells.concat(dayCells);
    const rows = [];
    for (let i = 0; i < totalCells.length; i += 7) {
      const week = totalCells.slice(i, i + 7);
      rows.push(<tr key={i}>{week}</tr>);
    }
    return rows;
  }, [emptyCells, dayCells]);

  return (
    <>
      <div className="calendar-body">
        <table className="calendar-body__table">
          <thead className="calendar-body__header">
            <tr className="calendar-body__row">
              {dayName.map((day, idx) => (
                <th className="calendar-body__cell" key={idx}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="calendar-body__content">{weekRows}</tbody>
        </table>
      </div>
    </>
  );
};

export default CalendarBody;
