import { PropsWithChildren, ReactElement, Suspense, useCallback } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../ErrorFallback";

interface AsyncBoundaryProps {
  suspenseFallback: ReactElement;
  children: ReactElement;
}

const AsyncBoundary = ({
  suspenseFallback,
  children,
}: PropsWithChildren<AsyncBoundaryProps>) => {
  const { reset } = useQueryErrorResetBoundary();
  const resetHandler = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <ErrorBoundary
      onReset={resetHandler}
      FallbackComponent={(props) => (
        <ErrorFallback error={props.error} reset={props.resetErrorBoundary} />
      )}
    >
      {/* data-fetching 하면서 생기는 loading 상태를 suspense로 관리 */}
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
