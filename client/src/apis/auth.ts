import { api } from "./@config";
// import { AxiosResponse } from "axios";
import {
  UserLoginRequest,
  SignUpCheckEmailRequest,
  SignUpSendEmailRequest,
} from "@/@types/user";

const authApi = {
  signup(data: { email: string; name: string; password: string }) {
    return api.post("/auth/signUp", data).then((response) => response.data);
  },

  login(data: UserLoginRequest) {
    return api.post("/auth/login", data).then((response) => response.data);
  },

  logout() {
    return api.get("/auth/logout").then((response) => response.data);
  },

  sendEmail(data: SignUpSendEmailRequest) {
    return api.post("/auth/mail", data).then((response) => response.data);
  },

  checkCode(data: SignUpCheckEmailRequest) {
    return api.post("/auth/mail/check", data).then((response) => response.data);
  },
};

export default authApi;
