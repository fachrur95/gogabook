export interface IDataTab {
  id: string;
  label: string;
  url: string;
}

export const dormsTabs: IDataTab[] = [
  {
    id: "dorm",
    label: "Kamar",
    url: "/dorms",
  },
  {
    id: "area",
    label: "Gedung",
    url: "/dorms/areas",
  },
  {
    id: "branch",
    label: "Asrama",
    url: "/dorms/branches",
  },
];

export const permissionsTabs: IDataTab[] = [
  {
    id: "permission",
    label: "Perizinan",
    url: "/permissions",
  },
  {
    id: "history",
    label: "History",
    url: "/permissions/histories",
  },
];