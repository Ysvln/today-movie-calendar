import reviewApi from "@/apis/review";
import ReviewMoviesList from "@/components/pages/MyPage/ReviewMoviesList";

function MyWatch() {
  const getWatchedMovie = async () => {
    return await reviewApi.getWatchedMovie();
  };
  return <ReviewMoviesList getMovie={getWatchedMovie} />;
}

export default MyWatch;
