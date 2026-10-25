import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getSession, getUser, getDoctor } from "../services/api";
import { createInitialSessionLoader } from "../utils/initialSession";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialSession = useRef(null);
  const revision = useRef(0);

  useEffect(() => {
    let active = true;
    const currentRevision = revision.current;
    if (!initialSession.current) {
      initialSession.current = createInitialSessionLoader({ getSession, getUser, getDoctor });
    }

    initialSession.current()
      .then((session) => {
        if (active && revision.current === currentRevision) setAccount(session);
      })
      .catch(() => {
        if (active && revision.current === currentRevision) setAccount(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  const setUser = useCallback((profile) => {
    revision.current += 1;
    setAccount((current) => profile
      ? { role: "user", profile }
      : current?.role === "user" ? null : current);
  }, []);

  const setDoctor = useCallback((profile) => {
    revision.current += 1;
    setAccount((current) => profile
      ? { role: "doctor", profile }
      : current?.role === "doctor" ? null : current);
  }, []);

  return (
    <AuthContext.Provider value={{
      user: account?.role === "user" ? account.profile : null,
      doctor: account?.role === "doctor" ? account.profile : null,
      loading,
      setUser,
      setDoctor,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
