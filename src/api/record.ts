import clientApi from "./axios";

interface NewRecordProps {
  userId: number;
  title?: string;
  description?: string;
  period?: string;
  achievement?: string;
  hashtag?: string[];
}

interface RecordSearchProps {
  searchWord: string;
  type: "hashtag" | "keyword" | "user";
  page: number;
}

const recordApi = {
  getRecord: async (queryKey: (number | string)[]) => {
    const recordId = queryKey[1];
    return await clientApi.record.get(`/record/${recordId}`);
  },

  addRecord: async (newRecord: NewRecordProps) => {
    return await clientApi.record.post("/record", { newRecord });
  },
  patchRecord: async (updateRecord: NewRecordProps) => {
    return await clientApi.record.patch(`/record`, { updateRecord });
  },
  deleteRecord: async (recordId: number) => {
    return await clientApi.record.delete(`/record`, { recordId });
  },
  searchRecord: async (filtering: RecordSearchProps) => {
    return await clientApi.record.get(`/record?page=${filtering.page}&searchWord=${filtering.searchWord}&type=${filtering.type}`);
  },
};

export default recordApi;
