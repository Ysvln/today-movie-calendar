import { PropsWithChildren, ReactElement, Suspense, useCallback } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  suspenseFallback: ReactElement;
  errorFallback: ReactElement;
  children: ReactElement;
}

const AsyncBoundary = ({
  suspenseFallback,
  errorFallback,
  children,
}: PropsWithChildren<Props>) => {
  const { reset } = useQueryErrorResetBoundary();
  const resetHandler = useCallback(() => {
    reset();
  }, [reset]);

  return (
    // resetKeys => 배열 안에 담긴 값이 바뀌면 ErrorBoundary로 잡힌 에러를 초기화
    <ErrorBoundary
      resetKeys={[]}
      onReset={resetHandler}
      fallback={errorFallback}
    >
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
