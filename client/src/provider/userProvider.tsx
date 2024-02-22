/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { UserInfo } from "@/@types/user";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";

interface UserProviderProps {
  children: ReactNode;
}

const initialUserInfo: UserInfo = {
  id: null,
  name: "",
  email: "",
  watchedMovieCount: null,
  commentedMovieCount: null,
  ratingMovieCount: null,
};

export interface UserInfoContextType {
  user: UserInfo;
  setUser: Dispatch<SetStateAction<UserInfo>>;
}

export const UserInfoContext = createContext<UserInfoContextType>({
  user: initialUserInfo,
  setUser: () => {},
});

const UserProvider = ({ children }: UserProviderProps) => {
  const { user, setUser } = useCheckUserInfo();

  return (
    <UserInfoContext.Provider value={{ user, setUser }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfoContext = () => useContext(UserInfoContext);

export default UserProvider;
