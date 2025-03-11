import React, { useState, useEffect } from "react";
import PetCard from "../components/pets/PetCard";
import AppointmentCard from "../components/appointments/AppointmentCard";
import { usePet } from "../contexts/PetContext";
import { useAppointment } from "../contexts/AppointmentContext";
import { useNavigate, useLocation } from "react-router-dom";

function MyPets() {
  const { pets, fetchPets } = usePet();
  const { appointments, fetchAppointments } = useAppointment();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const categorizeAppointments = () => {
    if (!appointments || appointments.length === 0) {
      setUpcomingAppointments([]);
      setPastAppointments([]);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedAppointments = JSON.parse(JSON.stringify(appointments)).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const upcoming = [];
    const past = [];

    sortedAppointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.date);

      if (appointmentDate >= today) {
        upcoming.push(appointment);
      } else {
        past.push(appointment);
      }
    });

    setUpcomingAppointments(upcoming);
    setPastAppointments(past);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setFetchError(null);

      try {
        await fetchPets();
        await fetchAppointments();
      } catch (error) {
        setFetchError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [location.key]);

  useEffect(() => {
    categorizeAppointments();
  }, [appointments]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-8 my-20 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading pets and appointments...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="container mx-auto px-8 my-20">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{fetchError}</span>
          <button
            className="btn btn-button mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 my-20">
      <h2 className="text-3xl font-bold mb-6">My Pets & Appointments</h2>

      <div className="flex flex-col-reverse lg:flex-row gap-16 mx-auto flex-grow">
        <div className="flex-1 flex flex-col items-start">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-6">My Pets</h2>

            {pets && pets.length > 0 ? (
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
            <h2 className="text-2xl font-bold mb-6">
              Upcoming Appointments
              <span className="text-sm text-gray-500 ml-2">
                ({upcomingAppointments.length})
              </span>
            </h2>
            {upcomingAppointments && upcomingAppointments.length > 0 ? (
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
              <h2 className="text-2xl font-bold mb-6">
                Past Appointments
                <span className="text-sm text-gray-500 ml-2">
                  ({pastAppointments.length})
                </span>
              </h2>
              {pastAppointments && pastAppointments.length > 0 ? (
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
              <div className="flex justify-start w-full mt-5">
                <button
                  className="btn btn-button w-fit my-10"
                  onClick={() => {
                    navigate("/search");
                  }}
                >
                  {appointments && appointments.length > 0
                    ? "Create another Appointment"
                    : "Create Appointment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPets;
