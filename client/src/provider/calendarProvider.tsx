/* eslint-disable react-refresh/only-export-components */
import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface CalendarProviderProps {
  children: ReactNode;
}

interface releasedType {
  id: number;
  title: string;
  releaseDate: Date;
}

interface watchedType {
  id: number;
  title: string;
}

interface MovieInfo {
  moviesReleasedOnDate: releasedType[];
  userWatchedMoviesInDate: watchedType[];
}

export interface CalendarContextType {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  selectedDateMovie: MovieInfo;
  setSelectedDateMovie: Dispatch<SetStateAction<MovieInfo>>;
}

export const CalendarContext = createContext<CalendarContextType>({
  selectedDate: new Date(),
  setSelectedDate: () => {},
  selectedDateMovie: { moviesReleasedOnDate: [], userWatchedMoviesInDate: [] },
  setSelectedDateMovie: () => {},
});

const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [selectedDateMovie, setSelectedDateMovie] = useState<MovieInfo>({
    moviesReleasedOnDate: [],
    userWatchedMoviesInDate: [],
  });

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedDateMovie,
        setSelectedDateMovie,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);

export default CalendarProvider;
