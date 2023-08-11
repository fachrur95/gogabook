import { useAppStore } from "@/utils/store";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import type { ISessionData } from "@/types/session";
import jwtDecode from "jwt-decode";

const useSessionData = ({ token }: { token?: string }) => {
  const { setGeneralSettings, setMenuRoles } = useAppStore();
  const [sessionData, setSessionData] = useState<ISessionData | null>(null);
  const { data: dataGeneralSettings } = api.generalSettings.getAll.useQuery();
  const { data: dataMenuRole } = api.menuRole.getAll.useQuery();

  useEffect(() => {
    if (token) {
      const dataSession = jwtDecode<ISessionData>(token);
      setSessionData(dataSession);
    }
  }, [token]);

  useEffect(() => {
    if (dataGeneralSettings) {
      setGeneralSettings(dataGeneralSettings);
    }
  }, [dataGeneralSettings, setGeneralSettings]);

  useEffect(() => {
    if (dataMenuRole) {
      setMenuRoles(dataMenuRole);
    }
  }, [dataMenuRole, setMenuRoles]);

  return { data: sessionData };
};

export default useSessionData;
