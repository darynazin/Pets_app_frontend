import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../services/api";

function ProtectedLayout({ allowedRoles }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await getSession();
        setSession(response.data);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = session && session.user && allowedRoles.includes(session.user.role);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedLayout;