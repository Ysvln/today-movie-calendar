import "./style.scss";

import ReviewProvider from "@/provider/reviewProvider";
import MovieDetailContent from "@/components/pages/MovieDetail/MovieDetailContent";

function MovieDetail() {
  return (
    <ReviewProvider>
      <MovieDetailContent />
    </ReviewProvider>
  );
}

export default MovieDetail;
