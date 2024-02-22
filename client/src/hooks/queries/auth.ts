import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import authApi from "@/apis/auth";
import {
  UserLoginRequest,
  UserLoginResponse,
  UserSignUpRequest,
} from "@/@types/user";
import { AxiosError } from "axios";

const useLogin = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation<
    // TData
    UserLoginResponse,
    // TError
    AxiosError,
    // TVariables
    UserLoginRequest,
    // TContext
    unknown
  >((data: UserLoginRequest) => authApi.login(data), {
    onSuccess() {
      alert("로그인되었습니다!");
      navigate("/calendar");
    },
    onError: (error: AxiosError<unknown>) => {
      if (error.response?.data) {
        alert(error.response.data);
      }
    },
  });

  return {
    login: mutate,
  };
};

const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation<
    UserLoginResponse,
    AxiosError,
    UserSignUpRequest,
    unknown
  >((data: UserSignUpRequest) => authApi.signup(data), {
    onSuccess() {
      alert("회원가입 되었습니다!\n로그인 후 이용해 주세요!");
      navigate("/login");
    },
    onError: (error: AxiosError<unknown>) => {
      if (error.response?.data) {
        alert(error.response.data);
      }
    },
    // useErrorBoundary?
  });

  return {
    signUp: mutate,
  };
};

export { useLogin, useSignUp };
