// store.tsx
import { create } from "zustand";
import { CompatClient } from "@stomp/stompjs";

interface Room {
  roomId: number;
  mentorId: number;
  menteeId: number;
  roomStatus: string;
}

interface Message {
  roomId: number;
  senderId: number;
  receiverId: number;
  message: string;
  sendTime: string;
  chatMessageType: string;
}

interface ChatStore {
  sendTime: string;
  setSendTime: (time: string) => void;
  selectedRoomId: number | null;
  setSelectedRoomId: (roomId: number | null) => void;
  userId: number;
  setUserId: (userId: number | 1) => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
  client: CompatClient | null;
  setClient: (client: CompatClient | null) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  chatstatus: boolean;
  setChatStatus: (chatstatus: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  sendTime: "",
  setSendTime: (time) => set({ sendTime: time }),
  selectedRoomId: null,
  setSelectedRoomId: (roomId) => set({ selectedRoomId: roomId }),
  userId: 1,
  setUserId: (userId) => set({ userId: userId as number }),
  messages: [],
  addMessage: (message) => set(() => {
    const updatedMessages = [message];
    return { messages: updatedMessages };
  }),
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  client: null, 
  setClient: (client) => set({ client }),
  update : false,
  setUpdate: (update) => set({ update }),
  chatstatus : false,
  setChatStatus: (chatstatus) => set({ chatstatus }),
}));