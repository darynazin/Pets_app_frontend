import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../services/api";

function ProtectedLayout({ allowedRoles }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await getSession();
        setSession(response);
      } catch (error) {
        console.error("Error fetching session:", error);
        setSession(null);
      }
    };

    fetchSession();
  }, []);

  if (!session || !session.data.authenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(session.data.user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
