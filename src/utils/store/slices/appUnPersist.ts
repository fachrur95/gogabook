import { type StateCreator } from "zustand";

export interface IAppUnPersistSlice {
  search: string;
  setSearch: (data: string) => void;
  // importWorker: React.MutableRefObject<Worker | undefined> | undefined;
  // deleteWorker: React.MutableRefObject<Worker | undefined> | undefined;
  // setImportWorker: (worker: React.MutableRefObject<Worker | undefined>) => void;
  // setDeleteWorker: (worker: React.MutableRefObject<Worker | undefined>) => void;
}

export const appUnPersistSlice: StateCreator<IAppUnPersistSlice> = (set) => ({
  search: "",
  setSearch: (data => set((state) => ({ ...state, search: data }))),
  // importWorker: undefined,
  // deleteWorker: undefined,
  // setImportWorker: ((worker) => set({ importWorker: worker })),
  // setDeleteWorker: ((worker) => set({ deleteWorker: worker })),
})