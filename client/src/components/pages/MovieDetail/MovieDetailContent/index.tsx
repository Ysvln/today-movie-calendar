/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import MoviePosterInfo from "@/components/pages/MovieDetail/MoviePosterInfo";
import ReviewButtons from "@/components/pages/MovieDetail/ReviewButtons";
import SummaryAndCredits from "@/components/pages/MovieDetail/SummaryAndCredits";
import Review from "@/components/pages/MovieDetail/Review";
import movieApi from "@/apis/movie";
import { MovieType } from "@/@types/movie";

import { useValidParams } from "@/hooks/useValidParams";
import { useReviewContext } from "@/provider/reviewProvider";

const defaultMovieInfo: MovieType = {
  id: null,
  actorNm: "",
  company: "",
  directorNm: "",
  genre: "",
  plot: "",
  posterUrl: "",
  prodYear: "",
  rating: "",
  releaseDate: null,
  runtime: "",
  title: "",
};

const MovieDetailContent = () => {
  const [movie, setMovie] = useState<MovieType>(defaultMovieInfo);
  const { setReview, review } = useReviewContext();
  const { id: MovieId } = useValidParams();

  const getMovieDetailInfo = async () => {
    const response = await movieApi.getMovieDetailInfo(MovieId);
    setMovie(response);
    if (response.Review) {
      setReview({
        ...response.Review,
        MovieId,
        title: response.title,
      });
    } else {
      setReview({
        ...review,
        MovieId,
        title: response.title,
      });
    }
  };

  useEffect(() => {
    getMovieDetailInfo();
  }, []);

  return (
    <div className="movie-detail">
      {/* 상단 영화 포스터 및 영화 정보 요약 */}
      <MoviePosterInfo movie={movie} />

      <div className="movie-detail__content">
        {/* 후기 남기기 , 봤어요 버튼 */}
        <ReviewButtons movie={movie} />

        {/* 영화 줄거리 및 감독 출연 요약 */}
        <SummaryAndCredits movie={movie} />

        {/* 내 리뷰 */}
        <Review />
      </div>
    </div>
  );
};

export default MovieDetailContent;
