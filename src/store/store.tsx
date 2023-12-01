// store.tsx
import { create } from "zustand";

interface ChatStore {
  sendTime: string;
  setSendTime: (time: string) => void;
  selectedRoomId: number | null;
  setSelectedRoomId: (roomId: number | null) => void;
  userId: number | null;
  setUserId: (userId: number | 1) => void;
  rooms: Room[]; // Room 타입을 찾을 수 있도록 수정
  setRooms: (rooms: Room[]) => void;
}

interface Room {
  roomId: number;
  mentorId: number;
  menteeId: number;
  roomStatus: string;
}

export const useChatStore = create<ChatStore>((set) => ({
  sendTime: "",
  setSendTime: (time) => set({ sendTime: time }),
  selectedRoomId: null,
  setSelectedRoomId: (roomId) => set({ selectedRoomId: roomId }),
  userId: 1,
  setUserId: (userId) => set({ userId: userId }),
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
}));