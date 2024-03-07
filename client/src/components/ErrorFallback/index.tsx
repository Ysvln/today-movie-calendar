import "./style.scss";

import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import handleApiError from "@/utils/error";

interface FallbackProps {
  error: AxiosError;
  reset: () => void;
}

const ErrorFallback = ({ error, reset }: FallbackProps) => {
  const navigate = useNavigate();
  const { title, content, statusCode } = handleApiError({
    error,
  });
  const isNotAuthorized = statusCode === 401;
  const buttonText = isNotAuthorized ? "로그인" : "새로고침";

  const onClickHandler = () => {
    if (isNotAuthorized) {
      navigate("/login");
    } else {
      reset();
    }
  };

  return (
    <div className="error">
      <p>{title}</p>
      <p>{content}</p>
      <button onClick={onClickHandler}>{buttonText}</button>
    </div>
  );
};

export default ErrorFallback;
