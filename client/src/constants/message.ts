const MESSAGE = {
  SYNTAX: {
    NAME: "한글 또는 영문으로 2글자 이상 15자 이하로 입력해 주세요.",
    PASSWORD:
      "영문, 숫자, 특수 문자(@$!%*?&) 조합으로 8글자 이상으로 입력해 주세요.",
    EMAIL: "올바른 이메일을 입력해 주세요.",
    CODE: "숫자만 입력해 주세요.",
    PASSWORDCHECK: "비밀번호가 일치하지 않습니다.",
  },
  SIGNUP: {
    SYNTAX_NAME: "한글 또는 영문으로 2글자 이상 15자 이하로 입력해 주세요.",
    SYNTAX_PASSWORD_CHECK: "비밀번호가 일치하지 않습니다.",
    SYNTAX_CODE_CHECK: "인증번호가 일치하지 않습니다.",
    FAILURE: "회원 가입에 실패했습니다.",
  },
  LOGIN: {
    SYNTAX_EMAIL: "올바른 이메일을 입력해 주세요.",
    SYNTAX_PASSWORD:
      "영문, 숫자, 특수 문자 조합으로 8글자 이상으로 입력해 주세요.",
    FAILURE: "로그인에 실패했습니다.",
    ERROR: "로그인에 문제가 발생했습니다. 잠시 후에 다시 시도해 주세요.",
    REQUIRED: "로그인이 필요한 서비스입니다. 로그인 후에 이용해 주세요!",
  },
  ERROR: {
    DEFAULT: "다시 시도해 주세요!",
    EXPIRED: "로그인이 만료되었습니다. 다시 로그인해 주세요.",
    WRONG: "잘못된 접근입니다.",
  },
  SEARCH: {
    SYNTAX_SEARCH: "영화 제목을 입력해 주세요!",
  },
  REVIEW: {
    VIEW: "영화를 본 상태로 수정할까요?",
    DELETE: "작성한 리뷰가 삭제됩니다. 영화를 안 본 상태로 수정할까요?",
    DELETEFIN: "리뷰를 삭제했어요",
    SAVE: "작성한 코멘트를 저장할까요?",
    COMPLETE: "작성한 코멘트를 저장했어요.",
    SYNTAX_REVIEW: "0자 이상, 600자 이하의 리뷰를 작성해 주세요.",
  },
  RATING: {
    SAVE: "작성한 별점을 저장할까요?",
    COMPLETE: "작성한 별점을 저장했어요.",
  },
  DATE: {
    SAVE: "작성한 관람일을 저장할까요?",
    COMPLETE: "작성한 관람일을 저장했어요.",
  },
  MYPAGE: {
    SAVE: "프로필을 수정할까요?",
    COMPLETE: "프로필을 수정했어요.",
    LOGOUT: "로그아웃할까요?",
    WITHDRAWAL: "정말 탈퇴할까요?",
    WITHDRAWALFIN: "탈퇴 되었습니다.",
  },
} as const;

export default MESSAGE;
