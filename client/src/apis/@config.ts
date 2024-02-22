import axios from "axios";

const apiBaseUrl = "http://54.180.114.71/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});
