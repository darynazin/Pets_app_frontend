import React from "react";
import PetCard from "../components/pets/PetCard";
import AppointmentCard from "../components/appointments/AppointmentCard";
import { usePet } from "../contexts/PetContext";
import { useAppointment } from "../contexts/AppointmentContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyPets() {
  const { pets, fetchPets } = usePet();
  const { appointments, fetchAppointments } = useAppointment();
  const today = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPets();
    fetchAppointments();
  }, []);

  today.setHours(0, 0, 0, 0);
  const upcomingAppointments = [];
  const pastAppointments = [];

  appointments.forEach((appointment) => {
    const appointmentDate = new Date(appointment.date);

    if (appointmentDate >= today) {
      upcomingAppointments.push(appointment);
    } else {
      pastAppointments.push(appointment);
    }
  });

  return (
    <div className="petside flex flex-col lg:flex-row w-8/12 gap-8 p-8 mx-auto">
      <div className="flex-2">
        <div className="m-x floar-right">
          <h2 className="text-2xl font-bold mb-6">My Pets</h2>
          <div className="flex flex-col gap-6 mx-auto">
            {pets.length > 0 ? (
              pets.map((pet) => <PetCard key={pet._id} pet={pet} />)
            ) : (
              <p className="text-gray-500">No pets registered yet.</p>
            )}
            <button className="btn btn-button w-fit mx-auto my-10" onClick={() => { navigate("/mypets/register") }}>
              {pets.length > 0 ? "Add Another Pet" : "Add a Pet"}
            </button>
          </div>
        </div>
      </div>

      <div className="appointmentside flex-1 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  status="Upcoming"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Past Appointments</h2>
          {pastAppointments.length > 0 ? (
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  status="Past"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No past appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPets;
