import type { ISessionData } from "@/types/session";
import jwtDecode from "jwt-decode";
import { type StateCreator } from "zustand";

export interface IAppUnPersistSlice {
  search: string;
  session: ISessionData | null;
  setSearch: (data: string) => void;
  setSession: (token?: string | null) => void;
}

export const appUnPersistSlice: StateCreator<IAppUnPersistSlice> = (set) => ({
  search: "",
  session: null,
  setSearch: (data => set((state) => ({ ...state, search: data }))),
  setSession: (token => set((state) => ({ ...state, session: token ? jwtDecode<ISessionData>(token) : null }))),
})