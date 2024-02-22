import { MovieType } from "@/@types/movie";

interface SummaryAndCreditsProps {
  movie: MovieType;
}

const SummaryAndCredits = ({ movie }: SummaryAndCreditsProps) => {
  const { plot, directorNm, actorNm } = movie;

  const actors = actorNm.split(",");
  const displayedActors = actors.slice(0, 5).join(", ");

  return (
    <>
      <div className="movie-detail__summary">
        <h3 className="movie-detail__subtitle">줄거리</h3>

        <p className="movie-detail__text">{plot}</p>
      </div>

      <div className="movie-detail__credits">
        <h3 className="movie-detail__subtitle">감독/출연</h3>

        <ul className="movie-detail__credits-list">
          <li className="movie-detail__credit-item">
            <span className="movie-detail__credit-label">감독</span>{" "}
            <p className="movie-detail__credit-name">{directorNm}</p>
          </li>
          <li className="movie-detail__credit-item">
            <span className="movie-detail__credit-label">출연</span>{" "}
            <p className="movie-detail__credit-name">{displayedActors}</p>
          </li>
        </ul>
      </div>
    </>
  );
};
export default SummaryAndCredits;
