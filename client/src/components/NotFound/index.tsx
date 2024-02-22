import "./style.scss";

import Button from "../Button";
import SpeechImage from "@/assets/images/speech.jpg";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="not-found">
      <div className="not-found__image">
        <img src={SpeechImage} alt="Speech" />
      </div>
      <div className="not-found__content">
        <h2 className="not-found__title">페이지를 찾을 수 없어요!</h2>
        <p className="not-found__message">
          입력하신 주소가 정확한지 다시 한 번 확인해 주세요.
        </p>
        <div className="not-found__button">
          <Button onClick={handleGoBack}>돌아가기</Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
