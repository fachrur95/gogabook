import { useEffect } from "react";
import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";

const useGeneralSetting = () => {
  const { generalSettings, setGeneralSettings } = useAppStore();
  const { data: dataGeneralSettings } = api.generalSettings.getAll.useQuery();

  useEffect(() => {
    if (dataGeneralSettings) {
      setGeneralSettings(dataGeneralSettings);
    }
  }, [dataGeneralSettings, setGeneralSettings]);

  return { data: generalSettings };
};

export default useGeneralSetting;
