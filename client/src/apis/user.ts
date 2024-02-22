import { api } from "./@config";

const userApi = {
  getUserInfo() {
    return api.get("/user").then((response) => response.data);
  },
  patchUserName(data: { id: number | null; name: string }) {
    return api.patch("/user/name", data).then((response) => response.data);
  },

  deleteUser(id: number | null) {
    return api.delete(`/user/${id}`).then((response) => response.data);
  },
};

export default userApi;
