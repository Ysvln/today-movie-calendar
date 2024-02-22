import "./style.scss";

import Profile from "@/components/pages/MyPage/Profile";
import ReviewList from "@/components/pages/MyPage/ReviewList";
import LogoutAndWithdrawal from "@/components/pages/MyPage/LogoutAndWithdrawal";

function MyContent() {
  return (
    <>
      <div className="my-content">
        {/* 프로필 수정 */}
        <Profile />

        {/* 리뷰 목록 */}
        <ReviewList />

        {/* 로그아웃, 탈퇴 버튼 */}
        <LogoutAndWithdrawal />
      </div>
    </>
  );
}

export default MyContent;
