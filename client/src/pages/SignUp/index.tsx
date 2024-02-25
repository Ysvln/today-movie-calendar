/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.scss";

import { useState, MouseEvent, useRef } from "react";
import { Link } from "react-router-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Timer from "@/components/Timer";

import { useFormValidation } from "@/hooks/useFormValidation";
import { useSignUp } from "@/hooks/queries/auth";

import authApi from "@/apis/auth";

function SignUp() {
  const initialState = {
    email: "",
    code: "",
    name: "",
    password: "",
    passwordCheck: "",
  };

  const inputRefs = {
    email: useRef<HTMLInputElement>(null),
    code: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    passwordCheck: useRef<HTMLInputElement>(null),
  };

  const { formState, handleInputChange, error, handleSubmit } =
    useFormValidation(initialState, inputRefs);

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [checkMail, setCheckMail] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);

  const { signUp } = useSignUp();

  const handleSendEmail = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!error.email && formState.email.length) {
      try {
        await authApi.sendEmail({ email: formState.email });
        setIsCodeSent(true);
      } catch (error: any) {
        alert(error.response.data.message);
      }
    }
  };

  const handleCheckCode = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 시간 경과
    if (isTimeOver) {
      setIsCodeSent(false);
      alert("다시 요청해 주세요.");
      return;
    }
    if (!error.code && formState.code.length) {
      try {
        await authApi.checkCode({
          email: formState.email,
          code: formState.code,
        });
        alert("이메일 인증이 완료 되었어요.");
        setIsTimeOver(true);
        setCheckMail(true);
        setIsCodeSent(false);
      } catch (error: any) {
        alert(error.response.data.message);
      }
    }
  };

  // 카카오 로그인
  const handleKakaoLogin = () => {
    window.location.href = "http://todaymovie.site:4000/api/auth/kakao";
  };

  const isFormValid =
    checkMail &&
    !Object.keys(error).length &&
    formState.password &&
    formState.passwordCheck &&
    formState.password == formState.passwordCheck;

  return (
    <div className="signUp">
      <h2 className="signUp__title">회원가입</h2>

      <form
        className="signUp__form"
        onSubmit={handleSubmit(() => signUp(formState))}
      >
        <div className="signUp__group">
          <Input
            placeholder="이메일을 입력해 주세요."
            label="이메일"
            name="email"
            ref={inputRefs.email}
            disabled={checkMail}
            value={formState.email}
            onChange={handleInputChange("email")}
            error={error.email}
          />
          <button
            className={"auth__button auth__button--request"}
            onClick={handleSendEmail}
          >
            인증 요청
          </button>
        </div>
        <div className="email-auth-input__wrapper">
          <Input
            placeholder="인증 번호를 입력해 주세요."
            name="code"
            ref={inputRefs.code}
            disabled={!isCodeSent}
            error={error.code}
            onChange={handleInputChange("code")}
          />
          {isCodeSent && (
            <div className="email-auth-timer__wrapper">
              <Timer minutes={3} setIsTimeOver={setIsTimeOver} />
              <button
                className="auth__button auth__button--confirm"
                onClick={handleCheckCode}
              >
                인증 확인
              </button>
            </div>
          )}
        </div>

        <div className="signUp__group">
          <Input
            placeholder="이름을 입력해 주세요."
            label="이름"
            name="name"
            ref={inputRefs.name}
            value={formState.name}
            onChange={handleInputChange("name")}
            error={error.name}
          />
        </div>
        <div className="signUp__group">
          <Input
            placeholder="비밀번호를 입력해 주세요."
            label="비밀번호"
            type="password"
            name="password"
            ref={inputRefs.password}
            value={formState.password}
            onChange={handleInputChange("password")}
            error={error.password}
          />
        </div>
        <div className="signUp__group">
          <Input
            name="passwordCheck"
            onChange={handleInputChange("passwordCheck")}
            value={formState.passwordCheck}
            ref={inputRefs.passwordCheck}
            type="password"
            placeholder="비밀번호를 다시 한번 입력해 주세요."
            label="비밀번호 확인"
            error={error.passwordCheck}
          />
        </div>

        <Button type="submit" disabled={!isFormValid}>
          회원가입
        </Button>
        <Button onClick={handleKakaoLogin} btnType="kakao">
          카카오로 간편하게 시작하기
        </Button>
      </form>

      <p className="signUp__login-link">
        이미 가입하셨나요? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
}
export default SignUp;
