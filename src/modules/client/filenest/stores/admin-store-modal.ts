import { create } from "zustand";
import { TCloudStorageConfig } from "../types/cloudStorage";
import { TLocalStorageConfig } from "../types/localStorage";

export type ModalType =
  | "createCloudStorage"
  | "editCloudStorage"
  | "deleteCloudStorage"
  | "createLocalStorage"
  | "editLocalStorage"
  | "deleteLocalStorage";

interface AdminStoreModal {
  type: ModalType | null;
  isOpen: boolean;
  trigger: number;
  triggerInModal: number;
  cloudStorageConfigData?: TCloudStorageConfig | null;
  localStorageConfigData?: TLocalStorageConfig | null;
  cloudStorageconfigId?: bigint | null;
  localStorageConfigId?: bigint | null;
  incrementTrigger: () => void;
  incrementInModalTrigger: () => void;
  onOpen: (props: {
    type: ModalType;
    cloudStorageConfigData?: TCloudStorageConfig | null;
    cloudStorageconfigId?: bigint | null;
    localStorageConfigData?: TLocalStorageConfig | null;
    localStorageConfigId?: bigint | null;
  }) => void;
  onClose: () => void;
}

const _useFilenestAdminStoreModal = create<AdminStoreModal>((set) => ({
  type: null,
  isOpen: false,
  trigger: 0,
  triggerInModal: 0,
  onOpen: ({
    type,
    cloudStorageConfigData = null,
    cloudStorageconfigId = null,
    localStorageConfigData = null,
    localStorageConfigId = null,
  }) =>
    set({
      isOpen: true,
      type,
      cloudStorageConfigData,
      cloudStorageconfigId,
      localStorageConfigData,
      localStorageConfigId,
    }),
  onClose: () =>
    set({
      type: null,
      isOpen: false,
      cloudStorageConfigData: null,
      cloudStorageconfigId: null,
      localStorageConfigData: null,
      localStorageConfigId: null,
      trigger: 0,
      triggerInModal: 0,
    }),
  incrementTrigger: () => set((state) => ({ trigger: state.trigger + 1 })),
  incrementInModalTrigger: () =>
    set((state) => ({ triggerInModal: state.triggerInModal + 1 })),
}));

export const useFilenestAdminStoreModal = _useFilenestAdminStoreModal;
export const filenestAdminStoreModal = _useFilenestAdminStoreModal;
