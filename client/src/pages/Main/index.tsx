import "./style.scss";

import { Link } from "react-router-dom";
import Button from "@/components/Button";

function Main() {
  return (
    <div className="main">
      <div className="main__title">
        <p className="main__description">영화를 기록하는 새로운 달력</p>
        <h2 className="main__heading">
          오늘의 <span className="main__highlight">영화</span>
        </h2>

        <p className="main__sub-description">
          로그인 후,
          <br /> 영화 기록을 남겨 보세요!
        </p>
      </div>

      {/* 하단 버튼 */}
      <div className="main__button-group">
        <Link to="/login">
          <Button type="button">로그인</Button>
        </Link>
        <Link to="/signUp">
          <Button type="button" btnType="secondary">
            회원가입
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default Main;
