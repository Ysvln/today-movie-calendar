import { MovieType } from "@/@types/movie";
import reviewApi from "@/apis/review";
import Button from "@/components/Button";
import ReviewBottomSheet from "@/components/ReviewBottomSheet";
import MESSAGE from "@/constants/message";
import { useToggle } from "@/hooks/useToggle";
import { useReviewContext } from "@/provider/reviewProvider";

interface ReviewBottomSheetProps {
  movie: MovieType;
}

const ReviewButtons = ({ movie }: ReviewBottomSheetProps) => {
  const { open, close, isOpen } = useToggle(false);
  const { review, setReview } = useReviewContext();
  const { watchedAt, id, rating, content, MovieId } = review;

  const reviewId = id;

  const handleWatchedButtonClick = async () => {
    try {
      if (!watchedAt) {
        if (confirm(MESSAGE.REVIEW.VIEW)) {
          const response = await reviewApi.postReview(MovieId, {
            rating,
            content,
          });
          setReview({ ...review, ...response });
        }
      } else {
        if (confirm(MESSAGE.REVIEW.DELETE)) {
          await reviewApi.deleteReview(MovieId, reviewId);
          setReview({
            ...review,
            content: null,
            rating: null,
            watchedAt: null,
            id: null,
          });
          alert(MESSAGE.REVIEW.DELETEFIN);
        }
      }
    } catch (error) {
      alert(MESSAGE.ERROR.DEFAULT);
      // console.log(error);
    }
  };

  return (
    <>
      {isOpen && <ReviewBottomSheet close={close} movie={movie} />}
      <div className="movie-detail__buttons">
        <Button
          btnType={watchedAt ? "secondary" : "gray"}
          onClick={handleWatchedButtonClick}
        >
          {watchedAt ? "봤어요!" : "아직 안 봤어요."}
        </Button>
        <Button onClick={open}>
          {watchedAt ? "후기 수정하기 " : "후기 남기기"}
        </Button>
      </div>
    </>
  );
};
export default ReviewButtons;
