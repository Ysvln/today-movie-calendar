/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, RefObject } from "react";

const useInfiniteScroll = (loadData: () => void, deps: any[]) => {
  const [targetRef, setTargetRef] = useState<RefObject<HTMLElement>>(
    useRef(null)
  );

  const intersectionObserver = new IntersectionObserver((entries) => {
    const target = entries[0];

    if (target.isIntersecting) {
      // console.log("통과1");
      intersectionObserver.unobserve(targetRef.current!);
      loadData();
    }
  });

  useEffect(() => {
    if (targetRef.current) {
      // console.log("통과2");

      intersectionObserver.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) {
        intersectionObserver.disconnect();
      }
    };
  }, [targetRef, ...deps]);

  return { setTargetRef };
};

export default useInfiniteScroll;
