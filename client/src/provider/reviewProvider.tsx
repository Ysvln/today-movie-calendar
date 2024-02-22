/* eslint-disable react-refresh/only-export-components */
import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface ReviewProviderProps {
  children: ReactNode;
}

const initialReviewInfo = {
  id: null,
  MovieId: "",
  title: "",
  watchedAt: null,
  rating: null,
  content: null,
};

export interface ReviewContextType {
  review: typeof initialReviewInfo;
  setReview: Dispatch<SetStateAction<typeof initialReviewInfo>>;
}

export const ReviewContext = createContext<ReviewContextType>({
  review: initialReviewInfo,
  setReview: () => {},
});

const ReviewProvider = ({ children }: ReviewProviderProps) => {
  const [review, setReview] = useState(initialReviewInfo);

  return (
    <ReviewContext.Provider value={{ review, setReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => useContext(ReviewContext);

export default ReviewProvider;
