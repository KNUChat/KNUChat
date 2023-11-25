import clientApi from "./axios";

const userApi = {
  signIn: async () => {
    return await clientApi.get("users/signin");
  },
  signUp: async () => {
    return await clientApi.post("/users/signup");
  },
  initUserProfile: async () => {
    return await clientApi.post("/users/");
  },
  getUserProfile: async ({ id }: any) => {
    return await clientApi.get(`/users/${id}`);
  },
  updateUserProfile: async () => {
    return await clientApi.patch(`/users`);
  },
  deleteUserProfile: async () => {
    return await clientApi.delete(`/users`);
  },
  searchUserProfile: async ({ major }: any) => {
    return await clientApi.get(`/users/search/${major}`);
  },
};

export default userApi;
