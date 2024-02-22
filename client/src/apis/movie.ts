import { api } from "./@config";
import { AxiosResponse } from "axios";

const movieApi = {
  getMovieDetailInfo(movieId: string) {
    return api
      .get(`/movie/${movieId}`)
      .then((response: AxiosResponse) => response.data);
  },
  searchMovie(title: string, page: number, limit: number) {
    return api
      .get(`/movie`, { params: { title, page, limit } })
      .then((response: AxiosResponse) => response.data);
  },
};

export default movieApi;
