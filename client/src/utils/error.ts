import { AxiosError, HttpStatusCode } from "axios";

interface handleApiErrorProps {
  error: AxiosError;
}

// const getErrorMessage = (statusCode: number) => {
//   switch (statusCode) {
//     case 401:
//       return {
//         title: "로그인이 필요한 서비스 입니다.",
//         content: "로그인 후 이용해 주세요.",
//       };
//     case 500:
//     default:
//       return {
//         title: "문제가 발생했어요!",
//         content: "잠시 후 다시 접속해 주세요.",
//       };
//   }
// };

const handleApiError = ({ error }: handleApiErrorProps) => {
  const errorResult = error.response;
  const statusCode = errorResult?.status;

  const getErrorMessage = (statusCode: number) => {
    // TODO : 401인 경우 따로
    switch (statusCode) {
      case HttpStatusCode.BadRequest:
        return {
          title: "잘못된 요청입니다.",
          content: "다시 시도해 주세요.",
        };
      case HttpStatusCode.InternalServerError:
      default:
        return {
          title: "문제가 발생했어요!",
          content: "잠시 후 다시 시도해주세요.",
        };
    }
  };

  // statusCode가 없을 경우 기본값 500으로 처리
  const { title, content } = getErrorMessage(statusCode || 500);

  return { title, content, statusCode };
};

export default handleApiError;
