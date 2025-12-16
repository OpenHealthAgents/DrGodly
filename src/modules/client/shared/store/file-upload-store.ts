import { create } from "zustand";

export type ModalType = "fileUpload";

interface AdminStoreModal {
  type: ModalType | null;
  isOpen: boolean;
  trigger: number;
  triggerInModal: number;
  title?: string | null;
  description?: string | null;
  incrementTrigger: () => void;
  incrementInModalTrigger: () => void;
  onOpen: (props: {
    type: ModalType;
    title?: string;
    description?: string;
  }) => void;
  onClose: () => void;
}

const _useFileUploadStore = create<AdminStoreModal>((set) => ({
  type: null,
  isOpen: false,
  trigger: 0,
  triggerInModal: 0,
  onOpen: ({ type, title = null, description = null }) =>
    set({
      isOpen: true,
      type,
      title,
      description,
    }),
  onClose: () =>
    set({
      type: null,
      isOpen: false,
      title: null,
      description: null,
      trigger: 0,
      triggerInModal: 0,
    }),
  incrementTrigger: () => set((state) => ({ trigger: state.trigger + 1 })),
  incrementInModalTrigger: () =>
    set((state) => ({ triggerInModal: state.triggerInModal + 1 })),
}));

export const useFileUploadStore = _useFileUploadStore;
export const fileUploadStore = _useFileUploadStore;
