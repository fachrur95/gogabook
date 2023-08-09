import { type StateCreator } from "zustand";

export interface IAppUnPersistSlice {
  search: string;
  setSearch: (data: string) => void;
}

export const appUnPersistSlice: StateCreator<IAppUnPersistSlice> = (set) => ({
  search: "",
  setSearch: (data => set((state) => ({ ...state, search: data }))),
})