import { useEffect, useState } from "react";
import type { ISessionData } from "@/types/session";
import jwtDecode from "jwt-decode";

const useSessionData = ({ token }: { token?: string }) => {
  const [sessionData, setSessionData] = useState<ISessionData | null>(null);

  useEffect(() => {
    if (token) {
      const dataSession = jwtDecode<ISessionData>(token);
      setSessionData(dataSession);
    }
  }, [token]);

  return { data: sessionData };
};

export default useSessionData;
