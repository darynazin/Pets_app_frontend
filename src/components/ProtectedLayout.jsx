import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";
import { useDoctor } from "../contexts/DoctorContext.jsx";
import Swal from "sweetalert2";

function ProtectedLayout({ allowedRoles }) {
  const { user, loading: userLoading } = useUser();
  const { doctor, loading: doctorLoading } = useDoctor();

  const showAlert = (title, message, icon) => {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK"
    });
  };

  if (userLoading || doctorLoading) {
    return <div>Loading...</div>;
  }

  if (user && allowedRoles.includes("user")) {
    return <Outlet />;
  }

  if (doctor && allowedRoles.includes("doctor")) {
    return <Outlet />;
  }

  if (user && allowedRoles.includes("doctor")) {
    showAlert(
        "Access Denied",
        "This page is only for doctors. Log in as a doctor if you are one.",
        "warning"
    );
    return <Navigate to="/" />;
  }

  if (doctor && allowedRoles.includes("user")) {
    showAlert(
        "Access Denied",
        "Please log in as a pet owner to access this page.",
        "warning"
    );
    return <Navigate to="/" />;
  }

  return <Navigate to="/login" />;
}

export default ProtectedLayout;