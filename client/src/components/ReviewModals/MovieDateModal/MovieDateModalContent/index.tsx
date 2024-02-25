import "./style.scss";

import { useEffect } from "react";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import { useReviewContext } from "@/provider/reviewProvider";
import { useCalendarContext } from "@/provider/calendarProvider";
import MESSAGE from "@/constants/message";
import reviewApi from "@/apis/review";

interface MovieDateModalContentProps {
  closeModal: () => void;
}

const MovieDateModalContent = ({ closeModal }: MovieDateModalContentProps) => {
  const { setReview, review } = useReviewContext();
  const { watchedAt, MovieId } = review;
  const { selectedDate, setSelectedDate } = useCalendarContext();

  useEffect(() => {
    if (watchedAt !== null) {
      setSelectedDate(new Date(watchedAt));
    }
  }, [watchedAt, setSelectedDate]);

  const handleSaveDate = async () => {
    if (confirm(MESSAGE.DATE.SAVE)) {
      try {
        const data = {
          watchedAt: selectedDate,
        };

        if (watchedAt == null) {
          const response = await reviewApi.postReview(MovieId, data);
          setReview({ ...review, ...response });
        } else {
          const response = await reviewApi.updateReview(MovieId, data);
          setReview({ ...review, ...response });
        }
        alert(MESSAGE.DATE.COMPLETE);
        closeModal();
      } catch (error) {
        alert(MESSAGE.ERROR.DEFAULT);
        // console.log(error);
      }
    }
  };

  return (
    <>
      <div className="movie-date-modal__content">
        <p className="movie-date-modal__label">관람일</p>
        <DatePicker />
      </div>
      <div className="button__wrapper">
        <Button onClick={handleSaveDate}>저장</Button>
      </div>
    </>
  );
};
export default MovieDateModalContent;
