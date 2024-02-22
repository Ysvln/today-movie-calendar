import "./style.scss";

import startIcon from "@/assets/icons/star.svg";
import reviewIcon from "@/assets/icons/review.svg";
import calendarIcon from "@/assets/icons/calendar.svg";

import Button from "../Button";
import MovieRatingModal from "@/components/ReviewModals/MovieRatingModal";
import MovieCommentModal from "@/components/ReviewModals/MovieCommentModal";
import useModal from "@/hooks/useModal";
import MovieDateModal from "../ReviewModals/MovieDateModal";
import { MovieType } from "@/@types/movie";
interface ReviewBottomSheetProps {
  close: () => void;
  movie: MovieType;
}

const ReviewBottomSheet = ({ close, movie }: ReviewBottomSheetProps) => {
  const { activeModal, openModal, closeModal } = useModal();

  return (
    <>
      <div className="review-bottom-sheet">
        <div className="review-bottom-sheet__container">
          {/* 헤더 영화 제목 */}
          <div className="review-bottom-sheet__header">
            <h3 className="review-bottom-sheet__title">{movie.title}</h3>
          </div>
          {/* 컨텐츠 */}
          <div className="review-bottom-sheet__content">
            <div
              className="review-bottom-sheet__item"
              onClick={() => openModal("rating")}
            >
              <img
                className="review-bottom-sheet__icon"
                src={startIcon}
                alt="별점 아이콘"
              />
              <p className="review-bottom-sheet__text">별점주기</p>
            </div>

            <div
              className="review-bottom-sheet__item"
              onClick={() => openModal("comment")}
            >
              <img
                className="review-bottom-sheet__icon"
                src={reviewIcon}
                alt="리뷰 아이콘"
              />
              <p className="review-bottom-sheet__text">코멘트하기</p>
            </div>

            <div
              className="review-bottom-sheet__item"
              onClick={() => openModal("date")}
            >
              <img
                className="review-bottom-sheet__icon"
                src={calendarIcon}
                alt="관람일 아이콘"
              />
              <p className="review-bottom-sheet__text">관람일</p>
            </div>
          </div>

          {/* 버튼 */}
          <div className="review-bottom-sheet__button">
            <Button onClick={close}>닫기</Button>
          </div>
        </div>
      </div>

      {activeModal === "rating" && <MovieRatingModal closeModal={closeModal} />}
      {activeModal === "comment" && (
        <MovieCommentModal closeModal={closeModal} />
      )}
      {activeModal === "date" && <MovieDateModal closeModal={closeModal} />}
    </>
  );
};

export default ReviewBottomSheet;
