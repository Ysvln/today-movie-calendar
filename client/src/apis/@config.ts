import axios from "axios";

const apiBaseUrl = "/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});
