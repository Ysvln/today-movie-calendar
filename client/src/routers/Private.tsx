/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import UserProvider from "@/provider/userProvider";
import { getCookie } from "@/utils/cookie";
import ScrollToTop from "@/components/ScrollToTop";
import MESSAGE from "@/constants/message";

interface PrivateProps {
  children: ReactNode;
}

const Private = ({ children }: PrivateProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isUser = getCookie("isUser");
    if (isUser === "undefined") {
      alert(MESSAGE.LOGIN.REQUIRED);
      return navigate("/");
    }
  }, [location.pathname]);

  return (
    <UserProvider>
      <ScrollToTop />
      {children}
    </UserProvider>
  );
};

export default Private;
