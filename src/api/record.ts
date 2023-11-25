import clientApi from "./axios";

const recordApi = {
  getRecord: async ({ id }: any) => {
    return await clientApi.get(`/record/${id}`);
  },
  addRecord: async () => {
    return await clientApi.post("/record");
  },
  patchRecord: async () => {
    return await clientApi.patch(`/record`);
  },
  deleteRecord: async () => {
    return await clientApi.delete(`/record`);
  },
  searchRecord: async ({ filtering }: any) => {
    return await clientApi.get(`/record/search/${filtering}`);
  },
};

export default recordApi;
