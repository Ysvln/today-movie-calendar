/* eslint-disable react-hooks/exhaustive-deps */
import "./style.scss";

import { useEffect, useState } from "react";
import MovieItem from "@/components/MovieItem";
import { MovieType } from "@/@types/movie";
import MESSAGE from "@/constants/message";

interface ReviewMovieListProps {
  getMovie: () => Promise<MovieType[]>;
}

const ReviewMoviesList = ({ getMovie }: ReviewMovieListProps) => {
  const [movie, setMovie] = useState<MovieType[]>([]);
  const fetchData = async () => {
    try {
      const result = await getMovie();
      setMovie(result);
      // console.log(result);
    } catch (error) {
      alert(MESSAGE.ERROR.DEFAULT);
      // console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [getMovie]);

  return (
    <div className="my__review">
      {movie.length ? (
        <ul className="search__list">
          {movie.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <p className="search__empty">아무것도 없어요!</p>
      )}
    </div>
  );
};

export default ReviewMoviesList;
