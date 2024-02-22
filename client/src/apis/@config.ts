import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_SERVER_URL + "/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});
