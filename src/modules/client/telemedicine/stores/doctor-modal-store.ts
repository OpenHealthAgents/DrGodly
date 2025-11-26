import { create } from "zustand";

export type ModalType = "addService" | "deleteService";

interface DoctoeStore {
  type: ModalType | null;
  isOpen: boolean;
  userId?: string;
  orgId?: string;
  serviceId?: string;
  doctorData?: any;
  appointmentData?: any;
  trigger: number;
  triggerInModal: number;
  incrementTrigger: () => void;
  incrementInModalTrigger: () => void;
  onOpen: (props: {
    type: ModalType;
    userId?: string;
    orgId?: string;
    serviceId?: string;
    doctorData?: any;
    appointmentData?: any;
  }) => void;
  onClose: () => void;
}

const _useDoctoeModalStore = create<DoctoeStore>((set) => ({
  type: null,
  isOpen: false,
  trigger: 0,
  triggerInModal: 0,
  onOpen: ({
    type,
    serviceId = undefined,
    orgId = undefined,
    userId = undefined,
    doctorData = null,
    appointmentData = null,
  }) =>
    set({
      isOpen: true,
      type,
      userId,
      orgId,
      serviceId,
      doctorData,
      appointmentData,
    }),
  onClose: () =>
    set({
      type: null,
      isOpen: false,
      trigger: 0,
      triggerInModal: 0,
      serviceId: undefined,
      userId: undefined,
      orgId: undefined,
      doctorData: null,
      appointmentData: null,
    }),
  incrementTrigger: () => set((state) => ({ trigger: state.trigger + 1 })),
  incrementInModalTrigger: () =>
    set((state) => ({ triggerInModal: state.triggerInModal + 1 })),
}));

export const useDoctoeModalStore = _useDoctoeModalStore;
export const doctorModalStore = _useDoctoeModalStore;
