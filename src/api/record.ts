import clientApi from "./axios";

export interface NewRecordProps {
  userId: number;
  title?: string;
  description?: string;
  period?: string;
  achievement?: string;
  hashtag?: string[];
}

export interface PatchRecordProps {
  id: number;
  title?: string;
  achievement?: string;
  period?: string;
  description?: string;
  urls?: string[];
  hashtags?: string[];
}

export interface RecordSearchProps {
  searchWord?: string;
  type?: "hashtag" | "keyword" | "user";
  page?: number;
}

const recordApi = {
  getRecord: async (queryKey: (number | string)[]) => {
    const recordId = queryKey[1];
    return await clientApi.record.get(`/record/${recordId}`);
  },

  addRecord: async ({ userId, title, description, period, achievement, hashtag }: NewRecordProps) => {
    console.log("data", userId, title, description, period, achievement, hashtag);
    return await clientApi.record.post("/record", { userId, title, description, period, achievement, hashtag });
  },

  patchRecord: async ({ id, title, achievement, period, description, urls, hashtags }: PatchRecordProps) => {
    return await clientApi.record.patch(`/record`, { id, title, achievement, period, description, urls, hashtags });
  },
  deleteRecord: async (recordId: number) => {
    return await clientApi.record.delete(`/record`, { recordId });
  },
  searchRecord: async (queryKey: (string | RecordSearchProps)[]) => {
    const filtering: RecordSearchProps = typeof queryKey[1] != "string" ? queryKey[1] : [];
    console.log(filtering);
    return await clientApi.record.get(`/record?page=${filtering.page}&searchWord=${filtering.searchWord}&type=${filtering.type}`);
  },
};

export default recordApi;
