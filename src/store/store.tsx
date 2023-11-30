import {create} from "zustand";

interface ChatStore {
  sendTime: string;
  setSendTime: (time: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  sendTime: "",
  setSendTime: (time) => set({ sendTime: time }),
}));