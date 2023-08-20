import { useEffect } from "react";
import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";

const useMenuRole = () => {
  const { menuRoles, setMenuRoles } = useAppStore();
  const { data: dataMenuRole } = api.menuRole.getAll.useQuery();

  useEffect(() => {
    if (dataMenuRole) {
      setMenuRoles(dataMenuRole);
    }
  }, [dataMenuRole, setMenuRoles]);

  return { data: menuRoles };
};

export default useMenuRole;
