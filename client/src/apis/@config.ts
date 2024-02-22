import axios from "axios";

const apiBaseUrl =
  "https://port-0-today-movie-17xco2nlsxfe2il.sel5.cloudtype.app/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});
