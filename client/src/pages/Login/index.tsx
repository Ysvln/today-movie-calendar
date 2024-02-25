/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.scss";

import { useRef } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useLogin } from "@/hooks/queries/auth";

function Login() {
  const initialState = {
    email: "",
    password: "",
  };

  const inputRefs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const { formState, handleInputChange, error, handleSubmit } =
    useFormValidation(initialState, inputRefs);

  const { login } = useLogin();

  // 카카오 로그인
  const handleKakaoLogin = () => {
    window.location.href = "http://todaymovie.site:4080/api/auth/kakao";
  };

  return (
    <div className="login">
      <h2 className="login__title">로그인</h2>

      <form
        className="login__form"
        onSubmit={handleSubmit(() => login(formState))}
      >
        <div className="login__input-group">
          <Input
            label="이메일"
            name="email"
            ref={inputRefs.email}
            value={formState.email}
            onChange={handleInputChange("email")}
            error={error.email}
            placeholder="이메일을 입력해 주세요."
          />
        </div>
        <div className="login__input-group">
          <Input
            label="비밀번호"
            type="password"
            name="password"
            ref={inputRefs.password}
            value={formState.password}
            onChange={handleInputChange("password")}
            error={error.password}
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>

        <div className="login__button-group">
          <Button>로그인</Button>
          <Button type="button" btnType="kakao" onClick={handleKakaoLogin}>
            카카오로 간편 로그인
          </Button>
        </div>
      </form>

      <p className="login__signup-link">
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
}
export default Login;
