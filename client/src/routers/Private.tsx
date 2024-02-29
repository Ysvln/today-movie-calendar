/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import UserProvider from "@/provider/userProvider";
import ScrollToTop from "@/components/ScrollToTop";
import MESSAGE from "@/constants/message";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";

interface PrivateProps {
  children: ReactNode;
}

const Private = ({ children }: PrivateProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useCheckUserInfo();

  useEffect(() => {
    if (!user.id) {
      alert(MESSAGE.LOGIN.REQUIRED);
      return navigate("/");
    }
  }, [location.pathname, user]);

  return (
    <UserProvider>
      <ScrollToTop />
      {children}
    </UserProvider>
  );
};

export default Private;
