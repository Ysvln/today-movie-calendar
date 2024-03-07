import axios from "axios";
// import { AxiosResponse } from "axios";

const apiBaseUrl = "/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: 5000,
});
