import { useParams } from "react-router-dom";

export const useValidParams = <
  T extends Record<string, string | undefined>
>() => {
  const params = useParams<T>();
  //   console.log(params);
  //   {id : "3000"}
  // key 값으로 오는 데이터가 불특정하기 때문에 Record Type으로 작성
  if (!params || Object.values(params).some((value) => value === undefined)) {
    throw new Error("유효하지 않은 값입니다.");
  }

  return params as Record<string, string>;
};
