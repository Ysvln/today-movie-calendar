/* eslint-disable @typescript-eslint/no-unused-vars */

// BaseMutation 역할
// 도메인별로 api 콜하는 path, params
// 무조건적으로 BaseMutation 을 통과하게끔.(공통된 Mutation Options 바라볼수 있도록)

import { useState } from "react";
import { useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import { useErrorBoundary } from "react-error-boundary";
import { AxiosError, isAxiosError, HttpStatusCode } from "axios";

type BaseMutateError = {
  errorCode: number;
  msg: string;
};

// // const {
// //   data: mutateData,
// //   error: mutateError,
// //   mutate,
// //   mutateAsync,
// // } = useMutation({
// //   mutationFn,
// //   mutationKey,
// // });

// // if (mutateError) {
// //   if (isAxiosError(mutateError)) {
// //     const errorResult = handleApiError(mutateError);
// //     // Modal Component 호출
// //     setError(errorResult);
// //   }
// // }

const handleApiError = (error: AxiosError) => {
  if (error.status === HttpStatusCode.BadRequest) {
    // msg : 서버에서 보내주는 json msg로
    return { errorCode: HttpStatusCode.BadRequest, msg: "다시 시도해 주세요." };
  } else if (error.status === HttpStatusCode.InternalServerError) {
    return {
      errorCode: HttpStatusCode.InternalServerError,
      msg: "관리자에게 문의해주세요.",
    };
  } else {
    throw error;
  }
};

interface useBaseMutationType<T> {
  method: "get" | "post" | "delete" | "patch";
  mutationKey: QueryKey;
  mutationFn: () => Promise<T>;
  isShowBoundary: boolean;
  applyResult: boolean;
  gcTime: number;
}

const useBaseMutation = <T>({
  mutationFn,
  mutationKey,
  method,
  isShowBoundary,
  applyResult,
  gcTime,
}: useBaseMutationType<T>) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<BaseMutateError>();
  const { showBoundary } = useErrorBoundary();

  const {
    error: mutateError,
    mutate,
    isLoading,
    data,
  } = useMutation(mutationFn, {
    onMutate() {
      if (method === "get" && gcTime > 0) {
        // await queryClient.cancelQueries({ queryKey: itemId });
        // 기존 Query를 가져오는 함수 ( 존재하지 않으면 undefined )
        const previousValue = queryClient.getQueryData(mutationKey);

        // 이전 값 리턴
        return { previousValue };
      }
    },
    onSuccess: (data) => {
      if (applyResult && gcTime !== 0) {
        queryClient.invalidateQueries({ queryKey: mutationKey });
        queryClient.setQueriesData({ queryKey: mutationKey }, data);
        return;
      }
    },
    onError() {
      if (isAxiosError(mutateError)) {
        // console.log(mutateError?.message);
        const errorResult = handleApiError(mutateError);
        setError(errorResult);
      }
      isShowBoundary && showBoundary(error);
    },
  });

  return {
    mutate,
    error,
    data,
    isLoading,
  };
};

export default useBaseMutation;
