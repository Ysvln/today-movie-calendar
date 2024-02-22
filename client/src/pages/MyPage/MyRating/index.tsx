import reviewApi from "@/apis/review";
import ReviewMoviesList from "@/components/pages/MyPage/ReviewMoviesList";

function MyRating() {
  const getRatingMovie = async () => {
    return await reviewApi.getRatingMovie();
  };
  return <ReviewMoviesList getMovie={getRatingMovie} />;
}

export default MyRating;
