/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useState, FormEvent, RefObject } from "react";
import MESSAGE from "@/constants/message";
import VALIDATE from "@/utils/regex";

export interface FormErrorType {
  readonly [name: string]: string;
}
export interface PatternsType {
  [key: string]: RegExp;
}

export const validatePasswordMatch = (
  password: string,
  passwordCheck: string
) => {
  return password === passwordCheck;
};

export const useFormValidation = <T extends Record<string, string>>(
  initialState: T,
  inputRefs?: { [key: string]: RefObject<HTMLInputElement> }
) => {
  const [value, setValue] = useState<T>(initialState);
  const [error, setError] = useState<FormErrorType>({});
  const patterns: PatternsType = VALIDATE;

  const validateInputValue = (name: string, inputValue: string) => {
    // 유효성 검사 필요 없을 때
    if (!patterns[name]) return true;

    const result = patterns[name].test(inputValue);
    if (!result) {
      const key = name.toLocaleUpperCase() as keyof (typeof MESSAGE)["SYNTAX"];
      setError((prev) => ({
        ...prev,
        // key가 MESSAGE.SYNTAX 객체의 키 중 하나일 것이라 단언
        // MESSAGE.SYNTAX 객체의 특정 키에 해당하는 값을 설정
        // keyof : 키를 나타내는 유니온 타입 생성
        [name]: MESSAGE.SYNTAX[key],
        // key 변수를 객체 속성 이름으로 캐스팅. ==> key 가 실제로 MESSAGE 객체의 SYNTAX 속성의 유효한 키임을 알려줌
        // as const vs readonly
        // 1. 변수에 대한 해당 타입 추론 (or 값의 타입을 그대로 사용) => 객체나 배열 내 모든 속성 요소가 readonly / 값의 타입을 불변하게 유지
        // 2. 변수나 속성, 매개변수 등에 직접 적용. 할당 후 수정 불가. 변수 또는 속성에 대한 변경 방지 / 변수나 속성의 수정을 방지
        // [name]: MESSAGE.SYNTAX[name.toUpperCase()],
      }));
    }

    return result;
  };

  // 에러 초기값
  const resetError = (name: string) => {
    if (!error[name]) return;

    setError((prev) => {
      const { [name]: _, ...rest } = prev;
      // 새로운 상태로 업데이트할 객체 반환
      return rest;
    });
  };

  const updateValue = (name: string, value: string) => {
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  // input의 값 받아서 유효성 체크
  const handleInputChange =
    (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      updateValue(name, inputValue);

      // 비밀번호 확인
      if (name === "passwordCheck") {
        const password = value["password"] as string;
        const isMatch = validatePasswordMatch(password, inputValue);
        if (isMatch) {
          resetError(name);
        } else {
          setError((prev) => ({
            ...prev,
            passwordCheck: "비밀번호가 일치하지 않습니다.",
          }));
          inputRefs?.[name].current?.focus();
        }
      } else {
        // 유효성 검사를 통과하면 에러 리셋
        if (validateInputValue(name, inputValue)) {
          resetError(name);
        } else {
          inputRefs?.[name].current?.focus();
        }
      }
    };

  // 전체 폼의 유효성 검사
  const isFormValid = () => {
    let isValid = true;

    Object.keys(patterns || {}).forEach((key) => {
      const result = validateInputValue(key, String(value[key as keyof T]));

      if (!result) {
        isValid = false;
        setError((prev) => ({
          ...prev,
          [key]: MESSAGE.SYNTAX[key as keyof (typeof MESSAGE)["SYNTAX"]],
        }));
      }
    });

    return isValid;
  };

  // 전체 폼을 제출할 때 호출
  const handleSubmit =
    (callback: () => void) => (e: FormEvent<HTMLFormElement>) => {
      // e.preventDefault();
      if (isFormValid()) {
        callback();
      }
    };

  // 초기값
  const resetFormState = () => {
    setValue(initialState);
    setError({});
  };

  return {
    formState: value,
    handleInputChange,
    resetFormState,
    error,
    handleSubmit,
  };
};
