import "./style.scss";

import { FC } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import getErrorMessage from "@/utils/errorMessage";

interface FallbackProps {
  error: AxiosError;
  reset: () => void;
}

const ErrorFallback: FC<FallbackProps> = ({ error, reset }) => {
  const err = error.response;
  const status = err?.status;
  const navigate = useNavigate();
  // 이런 식으로 에러 처리를 해주면, token의 isUser값을 체크 안 해줘도 되는지?
  const isNotAuthorized = status === 401;
  const buttonText = isNotAuthorized ? "로그인" : "새로고침";

  const onClickHandler = () => {
    if (isNotAuthorized) {
      navigate("/login");
    } else {
      reset();
    }
  };

  if (status) {
    const { title, content } = getErrorMessage(status);

    return (
      <div className="error">
        <p>{title}</p>
        <p>{content}</p>
        <button onClick={onClickHandler}>{buttonText}</button>
      </div>
    );
  }

  return (
    <div className="error">
      <p>문제가 발생했어요!</p>
      <button onClick={reset}>다시 시도하기</button>
    </div>
  );
};

export default ErrorFallback;
