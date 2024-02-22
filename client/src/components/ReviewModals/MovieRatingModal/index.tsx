import "./style.scss";

import { useState } from "react";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Star from "@/components/Icons/star";

import MESSAGE from "@/constants/message";
import { useReviewContext } from "@/provider/reviewProvider";
import reviewApi from "@/apis/review";

interface MovieRatingModalProps {
  closeModal: () => void;
}

const ratingArr = [1, 2, 3, 4, 5];

const MovieRatingModal = ({ closeModal }: MovieRatingModalProps) => {
  const { review, setReview } = useReviewContext();
  const { content, watchedAt, MovieId, title } = review;

  const [rating, setRating] = useState<number | null>(review.rating || null);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSaveRating = async () => {
    if (confirm(MESSAGE.RATING.SAVE)) {
      try {
        const data = {
          rating,
          content,
          watchedAt: review ? watchedAt : new Date(),
        };

        if (!watchedAt) {
          // 리뷰 작성
          const response = await reviewApi.postReview(MovieId, data);
          setReview({ ...review, ...response });
        } else {
          // 리뷰 수정
          const response = await reviewApi.updateReview(MovieId, data);
          setReview({ ...review, ...response });
        }
        alert(MESSAGE.RATING.COMPLETE);
        closeModal();
      } catch (error) {
        alert(MESSAGE.ERROR.DEFAULT);
        // console.log(error);
      }
    }
  };

  return (
    <Modal title={title} handleModalClose={closeModal}>
      <div className="movie-rating-modal__content">
        <span className="movie-rating-modal__label">별점</span>
        <div className="movie-rating-modal__stars">
          {ratingArr.map((value) => (
            <div onClick={() => handleStarClick(value)} key={value}>
              <Star color={value <= (rating || 0) ? "gold" : "#D4D4D4"} />
            </div>
          ))}
        </div>
      </div>

      <div className="button__wrapper">
        <Button onClick={handleSaveRating}>저장</Button>
      </div>
    </Modal>
  );
};
export default MovieRatingModal;
