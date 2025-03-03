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
    <div className="container mx-auto px-8">
      <h2 className="text-3xl font-bold mb-6">My Pets & Appointments</h2>

      <div className="flex flex-col-reverse lg:flex-row gap-16 mx-auto flex-grow">
        <div className="flex-1 flex flex-col items-start">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-6">My Pets</h2>

            {pets.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {pets.map((pet) => (
                    <PetCard key={pet._id} pet={pet} />
                  ))}
                </div>
                <div className="flex justify-start w-full">
                  <button
                    className="btn btn-button w-fit my-10"
                    onClick={() => {
                      navigate("/mypets/register");
                    }}
                  >
                    Add another Pet
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-500">No pets registered yet.</p>
                <button
                  className="btn btn-button w-fit my-10"
                  onClick={() => {
                    navigate("/mypets/register");
                  }}
                >
                  Add a Pet
                </button>
              </>
            )}
          </div>
        </div>

        <div className="appointmentside flex-2 space-y-8 items-start">
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
            <div className="flex flex-col">
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
              {appointments.length > 0 ? (
                <div className="flex justify-start w-full mt-5">
                  {" "}
                  <button
                    className="btn btn-button w-fit my-10"
                    onClick={() => {
                      navigate("/search");
                    }}
                  >
                    Create another Appointment
                  </button>
                </div>
              ) : (
                <div className="flex justify-start w-full mt-5">
                  {" "}
                  <button
                    className="btn btn-button w-fit my-10"
                    onClick={() => {
                      navigate("/search");
                    }}
                  >
                    Create Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPets;
