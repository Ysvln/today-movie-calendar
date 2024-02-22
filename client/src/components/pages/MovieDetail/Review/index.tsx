import { useReviewContext } from "@/provider/reviewProvider";
import { formatDate } from "@/utils/date";

const Review = () => {
  const { review } = useReviewContext();
  const { content, rating, watchedAt } = review;
  const { year, formattedMonth, formattedDay } = formatDate(watchedAt);

  return (
    <>
      <div className="movie-detail__reviews">
        <h3 className="movie-detail__subtitle">내 후기</h3>

        <ul className="movie-detail__review-list">
          <li className="movie-detail__review-item">
            <span className="movie-detail__review-label">관람일</span>
            <div className="movie-detail__review-content-wrapper">
              <p className="movie-detail__review-content">
                {watchedAt
                  ? `${year}년 ${formattedMonth}월 ${formattedDay}일`
                  : "아직 안 봤어요."}
              </p>
            </div>
          </li>
          <li className="movie-detail__review-item">
            <span className="movie-detail__review-label">별점</span>
            <div className="movie-detail__review-content-wrapper">
              <p className="movie-detail__review-content">
                {rating ? rating + "점" : "-"}
              </p>
            </div>
          </li>
          <li className="movie-detail__review-item">
            <span className="movie-detail__review-label">코멘트</span>
            <div className="movie-detail__review-content-wrapper">
              <p className="movie-detail__review-content">
                {content ? content : "-"}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Review;
