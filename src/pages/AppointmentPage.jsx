import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppointmentById } from "../services/api";
import AppointmentDetails from "../components/appointments/AppointmentDetails";

function AppointmentPage() {
  const { id } = useParams();
  return <AppointmentContent key={id} />;
}

function AppointmentContent() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadAppointment = async () => {
      try {
        const { data } = await getAppointmentById(id);
        if (active) setAppointment(data);
      } catch (err) {
        if (active) {
          setError(err.response?.status === 404
            ? "Appointment not found."
            : "Failed to load appointment. Please try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadAppointment();
    return () => { active = false; };
  }, [id]);

  if (loading) return <div role="status">Loading appointment...</div>;
  if (error) return <div role="alert">{error}</div>;

  return (
    <div className="flex-grow">
      {appointment && <AppointmentDetails appointment={appointment} />}
    </div>
  );
}

export default AppointmentPage;
