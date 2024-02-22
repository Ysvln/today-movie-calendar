import axios from "axios";

const apiBaseUrl = "http://54.180.114.71";

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});
