import "./style.scss";
import { Link } from "react-router-dom";
import { MovieType } from "@/@types/movie";
import film from "@/assets/images/film_background.png";

interface MovieItemProps {
  movie: MovieType;
}

const MovieItem = ({ movie }: MovieItemProps) => {
  const { title, posterUrl, directorNm } = movie;
  const decodedPosterUrl = decodeURIComponent(posterUrl).split("|")[0];

  const posterImage = {
    backgroundImage:
      posterUrl !== "" ? `url(${decodedPosterUrl})` : `url(${film})`,
    backgroundSize: "cover",
  };

  return (
    <>
      <Link to={`/movie/${movie.id}`}>
        <li className="search__item">
          <div className="search__poster" style={posterImage}></div>
          <div className="search__info">
            <h4 className="search__title">{title}</h4>
            <p className="search__description">{directorNm}</p>
          </div>
        </li>
      </Link>
    </>
  );
};

export default MovieItem;
