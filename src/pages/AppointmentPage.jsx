import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppointment } from "../contexts/AppointmentContext";
import AppointmentDetails from "../components/appointments/AppointmentDetails";

function AppointmentPage() {
  const { id } = useParams();
  const { appointment, fetchSingleAppointment } = useAppointment();

  useEffect(() => {
    fetchSingleAppointment(id);
  }, []);

  return appointment && <AppointmentDetails appointment={appointment} />;
}

export default AppointmentPage;
