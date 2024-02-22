import "./style.scss";

import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import authApi from "@/apis/auth";
import userApi from "@/apis/user";
import MESSAGE from "@/constants/message";
import { useUserInfoContext } from "@/provider/userProvider";

const LogoutAndWithdrawal = () => {
  const { user } = useUserInfoContext();
  const { id } = user;

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (confirm(MESSAGE.MYPAGE.LOGOUT)) {
      try {
        await authApi.logout();
        navigate("/");
      } catch (error) {
        // console.log(error);
        alert(MESSAGE.ERROR.DEFAULT);
      }
    }
  };

  const handleWithdrawal = async () => {
    if (confirm(MESSAGE.MYPAGE.WITHDRAWAL)) {
      try {
        await userApi.deleteUser(id);
        alert(MESSAGE.MYPAGE.WITHDRAWALFIN);
        navigate("/");
      } catch (error) {
        // console.log(error);
        alert(MESSAGE.ERROR.DEFAULT);
      }
    }
  };

  return (
    <>
      <div className="my-content__actions">
        <Button onClick={handleLogout}>로그아웃</Button>
        <Button btnType="gray" onClick={handleWithdrawal}>
          탈퇴하기
        </Button>
      </div>
    </>
  );
};
export default LogoutAndWithdrawal;
