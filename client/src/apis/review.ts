import { api } from "./@config";
import { ReviewType } from "@/@types/review";

const reviewApi = {
  postReview(movieId: string, data: ReviewType) {
    return api
      .post(`/review/${movieId}`, data)
      .then((response) => response.data);
  },

  updateReview(movieId: string, data: ReviewType) {
    return api
      .patch(`/review/${movieId}`, data)
      .then((response) => response.data);
  },

  deleteReview(movieId: string, reviewId: string | null) {
    return api
      .delete(`/review/${movieId}`, { data: { reviewId } })
      .then((response) => response.data);
  },

  getWatchedMovie() {
    return api.get("/review/watched").then((response) => response.data);
  },
  getCommentedMovie() {
    return api.get("/review/commented").then((response) => response.data);
  },
  getRatingMovie() {
    return api.get("/review/rating").then((response) => response.data);
  },
};

export default reviewApi;
