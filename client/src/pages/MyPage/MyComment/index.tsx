import reviewApi from "@/apis/review";
import ReviewMoviesList from "@/components/pages/MyPage/ReviewMoviesList";

function MyComment() {
  const getCommentedMovie = async () => {
    return await reviewApi.getCommentedMovie();
  };
  return <ReviewMoviesList getMovie={getCommentedMovie} />;
}

export default MyComment;
