import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialUser = {
  userInfo: {
    id: "",
    expTime: 0,
  },
};

export interface UserInfoType {
  id: string;
  expTime: number;
}

interface UserState {
  userInfo: UserInfoType;
}

interface UserAction {
  setUserInfo: (userInfo: UserInfoType) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState & UserAction>()(
  devtools(
    persist(
      (set) => ({
        userInfo: initialUser.userInfo,
        setUserInfo: (userInfo: UserInfoType) => set({ userInfo }),
        resetUser: () =>
          set({
            userInfo: initialUser.userInfo,
          }),
      }),
      { name: "user" }
    )
  )
);
