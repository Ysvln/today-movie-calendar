import { MovieType } from "@/@types/movie";
import { formatDate } from "@/utils/date";
import film from "@/assets/images/film_background.png";
interface MoviePosterInfoProps {
  movie: MovieType;
}

const MoviePosterInfo = ({ movie }: MoviePosterInfoProps) => {
  const { title, releaseDate, genre, posterUrl, runtime, rating } = movie;

  const { year, formattedMonth, formattedDay } = formatDate(releaseDate);

  const decodedPosterUrl = decodeURIComponent(posterUrl).split("|")[0];

  const posterImage = {
    backgroundImage: `url(${decodedPosterUrl || film})`,
    backgroundSize: "cover",
  };

  return (
    <>
      <div className="movie-detail__header" style={posterImage}>
        <div className="movie-detail__info">
          <h2 className="movie-detail__title">{title}</h2>

          <p className="movie-detail__meta">
            {releaseDate && `${year}년 ${formattedMonth}월 ${formattedDay}일`}{" "}
            개봉 &#8226; {genre}
          </p>
          <p className="movie-detail__meta">
            {runtime}분 &#8226; {rating}
          </p>
        </div>
      </div>
    </>
  );
};
export default MoviePosterInfo;
