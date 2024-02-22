import "./style.scss";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { useReviewContext } from "@/provider/reviewProvider";
import useInput from "@/hooks/useInput";
import { useValidParams } from "@/hooks/useValidParams";
import reviewApi from "@/apis/review";
import MESSAGE from "@/constants/message";
interface MovieCommentModalProps {
  closeModal: () => void;
}

const MovieCommentModal = ({ closeModal }: MovieCommentModalProps) => {
  const { setReview, review } = useReviewContext();
  const { id: MovieId } = useValidParams();
  const { watchedAt, rating, title } = review;
  const [value, setValue] = useInput(review.content ?? "");

  const handleSaveReview = async () => {
    if (value.trim().length === 0 || value.length > 600) {
      return alert(MESSAGE.REVIEW.SYNTAX_REVIEW);
    }

    if (confirm(MESSAGE.REVIEW.SAVE)) {
      try {
        const data = {
          rating,
          content: value,
          watchedAt: review ? review.watchedAt : new Date(),
        };

        if (watchedAt == null) {
          // 리뷰 작성
          const response = await reviewApi.postReview(MovieId, data);
          // console.log(response, "작성");
          setReview({ ...review, ...response });
        } else {
          // 리뷰 수정
          const response = await reviewApi.updateReview(MovieId, data);
          // console.log(response, "수정");
          setReview({ ...review, ...response });
        }
        alert(MESSAGE.REVIEW.COMPLETE);
        closeModal();
      } catch (error) {
        alert(MESSAGE.ERROR.DEFAULT);
        // console.log(error);
      }
    }
  };

  return (
    <Modal title={title} handleModalClose={closeModal}>
      <div className="movie-comment-modal__content">
        <span className="movie-comment-modal__label">코멘트</span>
        <textarea
          maxLength={600}
          name="review"
          className="movie-comment-modal__textarea"
          placeholder="코멘트를 입력해 주세요."
          value={value}
          onChange={setValue}
        />
      </div>

      <div className="button__wrapper">
        <Button onClick={handleSaveReview}>저장</Button>
      </div>
    </Modal>
  );
};
export default MovieCommentModal;
