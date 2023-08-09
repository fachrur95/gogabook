import { useAppStore } from "@/utils/store";
import { useEffect } from "react";

const SessionComponent = ({ token }: { token?: string }) => {
  const { setSession } = useAppStore();

  useEffect(() => {
    if (token) {
      setSession(token);
    }
  }, [token, setSession]);

  return null;
};

export default SessionComponent;
