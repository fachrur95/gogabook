import { useEffect, useState } from "react";
import type { ISessionData } from "@/types/session";
import jwtDecode from "jwt-decode";
import { signOut, useSession } from "next-auth/react";

const useSessionData = () => {
  const { data: session } = useSession();
  const [sessionData, setSessionData] = useState<ISessionData | null>(null);

  useEffect(() => {
    if (!session) {
      return void signOut();
    }
    const now = new Date().getTime();
    const expiry = new Date(session.expires).getTime();
    if (expiry < now) {
      return void signOut();
    }

    const token = session.accessToken;
    const dataSession = jwtDecode<ISessionData>(token);
    const tokenExpiry = dataSession.exp * 1000;
    if (tokenExpiry < now) {
      return void signOut();
    }
    setSessionData(dataSession);
  }, [session]);

  return { data: sessionData };
};

export default useSessionData;
