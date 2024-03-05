const getErrorMessage = (status: number) => {
  switch (status) {
    case 401:
      return {
        title: "로그인이 필요한 서비스 입니다.",
        content: "로그인 후 이용해 주세요.",
      };
    case 500:
    default:
      return {
        title: "문제가 발생했어요!",
        content: "잠시 후 다시 접속해 주세요.",
      };
  }
};

export default getErrorMessage;
