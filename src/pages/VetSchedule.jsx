import React, { useEffect, useState } from "react";
import { useAppointment } from "../contexts/AppointmentContext";
import Swal from "sweetalert2";
import AppointmentTable from "../components/appointments/AppointmentTable";

function VetSchedule() {
  const { appointments, fetchDoctorAppointments, loading, removeAppointment } =
    useAppointment();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancelAppointment = (appointmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this appointment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAppointment(appointmentId);
        Swal.fire(
          "Cancelled!",
          "The appointment has been cancelled.",
          "success"
        );
        closeModal();
        fetchDoctorAppointments();
      }
    });
  };

  return (
    <div className="container mx-auto px-8 my-20">
      <h1 className="text-3xl font-bold mb-20">My Appointments</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-lg text-center">No appointments scheduled.</p>
      ) : (
        <AppointmentTable appointments={appointments} openModal={openModal} />
      )}

      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
            <p>
              <strong>Date:</strong> {selectedAppointment.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedAppointment.timeSlot}
            </p>
            <p>
              <strong>Patient:</strong> {selectedAppointment.petId.name}
            </p>
            <p>
              <strong>Owner:</strong> {selectedAppointment.userId.name}
            </p>
            <p>
              <strong>Details:</strong> {selectedAppointment.additionalNotes}
            </p>

            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-outline btn-error"
                onClick={() => handleCancelAppointment(selectedAppointment._id)}
              >
                Cancel Appointment
              </button>
              <button
                className="btn btn-outline btn-primary ml-2"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VetSchedule;
