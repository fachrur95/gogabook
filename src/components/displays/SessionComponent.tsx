import { useAppStore } from "@/utils/store";
import { useEffect } from "react";
import { api } from "@/utils/api";

const SessionComponent = ({ token }: { token?: string }) => {
  const { setSession, setGeneralSettings, setMenuRoles } = useAppStore();
  const { data: dataGeneralSettings } = api.generalSettings.getAll.useQuery();
  const { data: dataMenuRole } = api.menuRole.getAll.useQuery();
  // console.log({ dataGeneralSettings });
  // console.log({ dataMenuRole });
  useEffect(() => {
    if (token) {
      setSession(token);
    }
    if (dataGeneralSettings) {
      setGeneralSettings(dataGeneralSettings);
    }
    if (dataMenuRole) {
      setMenuRoles(dataMenuRole);
    }
  }, [
    token,
    dataGeneralSettings,
    dataMenuRole,
    setSession,
    setGeneralSettings,
    setMenuRoles,
  ]);

  return null;
};

export default SessionComponent;
