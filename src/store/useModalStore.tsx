import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ModalType = null | "example";

interface ModalState {
  showModal: boolean;
  modalType: ModalType;
}

interface ModalAction {
  setShowModal: (showModal: boolean) => void;
  setModalType: (modalType: ModalType) => void;
}

const useModalStore = create<ModalState & ModalAction>()(
  devtools((set) => ({
    modalType: null,
    showModal: false,

    setModalType: (modalType: ModalType) => set({ modalType }),
    setShowModal: (showModal: boolean) => set({ showModal }),
  }))
);

export default useModalStore;
