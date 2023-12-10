import create from "zustand";

type SearchState = {
  searchWord: string;
  type: string;
  page: number;
  setSearchWord: (searchWord: string) => void;
  setType: (type: "hashtag" | "keyword" | "user") => void;
  setPage: (page: number) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  searchWord: "",
  type: "",
  page: 1,
  setSearchWord: (searchWord) => set(() => ({ searchWord })),
  setType: (type) => set(() => ({ type })),
  setPage: (page) => set(() => ({ page })),
}));
