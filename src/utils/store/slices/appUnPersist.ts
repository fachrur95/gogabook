import type { VariantType } from "notistack";
import { type StateCreator } from "zustand";

type ToastType = { message: string | null, variant?: VariantType };

const defaultToast: ToastType = {
  message: "",
  variant: "default",
}
export interface IAppUnPersistSlice {
  search: string;
  setSearch: (data: string) => void;
  toast: ToastType;
  setToast: (data: ToastType) => void;
  deletingProcess: number;
  setDeletingProcess: (value: number) => void;
  // importWorker: React.MutableRefObject<Worker | undefined> | undefined;
  // deleteWorker: React.MutableRefObject<Worker | undefined> | undefined;
  // setImportWorker: (worker: React.MutableRefObject<Worker | undefined>) => void;
  // setDeleteWorker: (worker: React.MutableRefObject<Worker | undefined>) => void;
}

export const appUnPersistSlice: StateCreator<IAppUnPersistSlice> = (set) => ({
  search: "",
  setSearch: (data => set((state) => ({ ...state, search: data }))),
  toast: defaultToast,
  setToast: (data => set((state) => ({ ...state, toast: data }))),
  deletingProcess: 0,
  setDeletingProcess: ((value) => set((state) => ({ ...state, deletingProcess: value }))),
  // importWorker: undefined,
  // deleteWorker: undefined,
  // setImportWorker: ((worker) => set({ importWorker: worker })),
  // setDeleteWorker: ((worker) => set({ deleteWorker: worker })),
})