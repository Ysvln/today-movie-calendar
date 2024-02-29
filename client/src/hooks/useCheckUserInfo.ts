import { useEffect, useState, Dispatch, SetStateAction } from "react";

import { UserInfo } from "@/@types/user";
import userApi from "@/apis/user";
import MESSAGE from "@/constants/message";

const defaultUserInfo: UserInfo = {
  id: null,
  name: "",
  email: "",
  watchedMovieCount: null,
  commentedMovieCount: null,
  ratingMovieCount: null,
};

const useCheckUserInfo = () => {
  const [user, setUser] = useState(defaultUserInfo);
  const checkUser = async () => {
    try {
      const userInfo = await userApi.getUserInfo();
      setUser(userInfo);
    } catch (err) {
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return {
    user,
    setUser: setUser as Dispatch<SetStateAction<UserInfo>>,
  };
};

export default useCheckUserInfo;
