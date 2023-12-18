import { create } from "zustand";

interface MentorState {
  mentorId: string | null;
  setMentorId: (token: string | null) => void;
}

export const useMentorStore = create<MentorState>((set) => ({
  mentorId: "21",
  setMentorId: (id) => set({ mentorId: id }),
}));
