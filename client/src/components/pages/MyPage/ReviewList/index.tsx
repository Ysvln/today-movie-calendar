import "./style.scss";

import Button from "@/components/Button";
import { useUserInfoContext } from "@/provider/userProvider";
import { Link } from "react-router-dom";

const ReviewList = () => {
  const { user } = useUserInfoContext();
  const { watchedMovieCount, ratingMovieCount, commentedMovieCount } = user;

  return (
    <>
      <ul className="my-content__review-list">
        <li className="my-content__review-item">
          <Link to={"/my/watched"}>
            <Button btnType="gray" icon>
              <span>{watchedMovieCount?.toLocaleString("ko-KR")}개</span>의
              봤어요
            </Button>
          </Link>
        </li>

        <li className="my-content__review-item">
          <Link to={"/my/rating"}>
            <Button btnType="gray" icon>
              <span>{ratingMovieCount?.toLocaleString("ko-KR")}개</span>의 별점
            </Button>
          </Link>
        </li>

        <li className="my-content__review-item">
          <Link to={"/my/commented"}>
            <Button btnType="gray" icon>
              <span>{commentedMovieCount?.toLocaleString("ko-KR")}개</span>의
              코멘트
            </Button>
          </Link>
        </li>
      </ul>
    </>
  );
};
export default ReviewList;
