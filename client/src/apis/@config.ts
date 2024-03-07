import axios from "axios";
import { AxiosResponse } from "axios";

const apiBaseUrl = "/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: 5000,
});

type ApiFetcherParams = [string, any];
export type ApiMethods = "get" | "post" | "put" | "delete" | "patch";
export type APiFetcher = (...args: ApiFetcherParams) => Promise<any>;

const getFetcher: (
  path: string,
  { params }: any
) => Promise<AxiosResponse<any, any>> = async (path, params) => {
  return await api.get(path, { params });
};
const postFetcher = async (path: string, body: any) => {
  return await api.post(path, body);
};
const patchFetcher = async (path: string, body: any) => {
  return await api.put(path, body);
};
const putFetcher = async (path: string, body: any) => {
  return await api.put(path, body);
};
const deleteFetcher = async (path: string, params: any) => {
  return await api.delete(path, { params });
};

// const args = {path:string, body: any } as const;

export const API_FETCHER: { [key in ApiMethods]: APiFetcher } = {
  get: (...args) => getFetcher(...args),
  post: (...args) => postFetcher(...args),
  put: (...args) => putFetcher(...args),
  patch: (...args) => patchFetcher(...args),
  delete: (...args) => deleteFetcher(...args),
};
