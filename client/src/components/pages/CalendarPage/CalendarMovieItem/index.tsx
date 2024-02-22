import "./style.scss";

import { Link } from "react-router-dom";
import ArrowRight from "@/components/Icons/arrowRight";
import Movie from "@/components/Icons/movie";

interface MovieInfo {
  id: number;
  title: string;
}

interface CalendarMovieItemProps {
  movie: MovieInfo[];
  title: string;
}

const CalendarMovieItem = ({ movie, title }: CalendarMovieItemProps) => {
  return (
    <>
      <div className="calendar-movie-item">
        <Movie />
        <p className="calendar-movie-item__title">{title}</p>
      </div>
      <ul className="calendar-movie-item__list">
        {movie.length ? (
          movie.map((el, idx) => (
            <li className="calendar-movie-item__list-item" key={idx}>
              <Link
                to={`/movie/${el.id}`}
                className="calendar-movie-item__link"
              >
                <p className="calendar-movie-item__movie-title">{el.title}</p>
                <ArrowRight />
              </Link>
            </li>
          ))
        ) : (
          <p className="calendar-movie-item__list-item empty">
            아무것도 없어요!
          </p>
        )}
      </ul>
    </>
  );
};

export default CalendarMovieItem;
