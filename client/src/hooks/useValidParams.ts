import { useParams } from "react-router-dom";

export const useValidParams = <
  T extends { [key: string]: string | undefined }
>() => {
  const params = useParams<T>();
  //   console.log(params);
  //   {id : "3000"}
  // 인덱스 시그니처 vs Record => 키가 미리 정의되어 있지 않음 ...
  if (!params || Object.values(params).some((value) => value === undefined)) {
    throw new Error("유효하지 않은 값입니다.");
  }

  return params as Record<string, string>;
};
