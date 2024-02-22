import { api } from "./@config";
import { AxiosResponse } from "axios";

const calendarApi = {
  getMovieListByDate(dateString: string) {
    return api
      .get(`/calendar/day/${dateString}`)
      .then((response: AxiosResponse) => response.data);
  },
  getMovieList(year: number, month: number | string) {
    return api
      .get(`/calendar/${year}/${month}`)
      .then((response: AxiosResponse) => response.data);
  },
};

export default calendarApi;
