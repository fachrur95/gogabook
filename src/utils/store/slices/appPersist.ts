import menuData from "@/components/layouts/Navigations/SidebarMenu/data";
import { IGeneralSettings } from "@/types/cores/generalSettings";
import { IRole } from "@/types/cores/roles";
import { type StateCreator } from "zustand";

type OpenMenuType = Record<string, boolean>

type InitialStateI = Record<string, boolean>;

export const initialStateMenu: InitialStateI = Object.fromEntries(
  menuData.map((i) => [i.url, false])
);

const initialStateForm = {
  branch: {
    open: false,
    id: undefined,
  },
  globalMaster: {
    open: false,
    id: undefined,
  },
  area: {
    open: false,
    id: undefined,
  },
  dorm: {
    open: false,
    id: undefined,
  },
  user: {
    open: false,
    id: undefined,
  },
  openPermission: {
    open: false,
    id: undefined,
  },
  permissionDetail: {
    open: false,
    id: undefined,
  },
  permissionComeback: {
    open: false,
    id: undefined,
  },
  retireStudent: {
    open: false,
    id: undefined,
  },
  dormHistory: {
    open: false,
    id: undefined,
  },
  permissionHistory: {
    open: false,
    id: undefined,
  },
}

// console.log({ initialStateMenu })
export interface IAppPersistSlice {
  generalSettings: IGeneralSettings | null,
  menuRoles: IRole[],
  setGeneralSettings: (data: IGeneralSettings) => void;
  setMenuRoles: (data: IRole[]) => void;
  openMenu: OpenMenuType;
  density: "compact" | "standard" | "comfortable";
  setOpenMenu: (url: string) => void;
  form: {
    branch: {
      open: boolean;
      id?: string;
    },
    globalMaster: {
      open: boolean;
      id?: string;
    },
    area: {
      open: boolean;
      id?: string;
    },
    dorm: {
      open: boolean;
      id?: string;
    },
    user: {
      open: boolean;
      id?: string;
    },
    openPermission: {
      open: boolean;
      id?: string;
    },
    permissionDetail: {
      open: boolean;
      id?: string;
    },
    permissionComeback: {
      open: boolean;
      id?: string;
    },
    retireStudent: {
      open: boolean;
      id?: string;
    },
    dormHistory: {
      open: boolean;
      id?: string;
    },
    permissionHistory: {
      open: boolean;
      id?: string;
    },
  },
  setFormOpen: ({ form, id }: { form: "branch" | "globalMaster" | "area" | "dorm" | "user" | "openPermission" | "permissionDetail" | "permissionComeback" | "retireStudent" | "dormHistory" | "permissionHistory", id?: string }) => void
  setFormClose: (form: "branch" | "globalMaster" | "area" | "dorm" | "user" | "openPermission" | "permissionDetail" | "permissionComeback" | "retireStudent" | "dormHistory" | "permissionHistory") => void
}

export const appPersistSlice: StateCreator<IAppPersistSlice> = (set) => ({
  generalSettings: null,
  menuRoles: [],
  setGeneralSettings: (data => set((state) => ({ ...state, generalSettings: data }))),
  setMenuRoles: (data => set((state) => ({ ...state, menuRoles: data }))),
  density: "standard",
  openMenu: initialStateMenu,
  setOpenMenu: (url => set((state) => ({ ...state, openMenu: { ...state.openMenu, [url]: !state.openMenu[url] } }))),
  form: initialStateForm,
  setFormOpen: (({ form, id }) => set(state => ({ ...state, form: { ...state.form, [form]: { open: true, id } } }))),
  setFormClose: ((form) => set(state => ({ ...state, form: ({ ...state.form, [form]: { open: false, id: undefined } }) }))),
})