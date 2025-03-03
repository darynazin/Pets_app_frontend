import React, { useEffect, useState } from 'react';
import { useAppointment } from '../contexts/AppointmentContext';
import { useDoctor } from '../contexts/DoctorContext';
import Swal from 'sweetalert2'; // Import SweetAlert2

function VetSchedule() {
  const { appointments, fetchDoctorAppointments, loading, removeAppointment } = useAppointment();
  const { doctor } = useDoctor();
  
  // State to handle modal visibility and selected appointment
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  // Function to open the modal with the selected appointment details
  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // Function to handle appointment cancellation with confirmation
  const handleCancelAppointment = (appointmentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this appointment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with appointment cancellation
        removeAppointment(appointmentId);
        Swal.fire('Cancelled!', 'The appointment has been cancelled.', 'success');
        closeModal(); // Close the modal after cancelling
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">My Appointments</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-lg text-center">No appointments scheduled.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table w-full border border-gray-300 bg-white rounded-lg">
            <thead>
              <tr className="bg-primary text-white text-lg">
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Patient</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => openModal(appointment)} // Open modal on row click
                >
                  <td className="p-4 text-center">{appointment.date}</td>
                  <td className="p-4 text-center">{appointment.time}</td>
                  <td className="p-4 text-center font-semibold">{appointment.petName}</td>
                  <td className="p-4 text-center">
                    <button
                      className="btn btn-outline btn-info btn-sm hover:scale-105 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering modal open on button click
                        openModal(appointment); // Open modal when clicking on the "Details" button
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for displaying appointment details */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
            <p><strong>Date:</strong> {selectedAppointment.date}</p>
            <p><strong>Time:</strong> {selectedAppointment.time}</p>
            <p><strong>Patient:</strong> {selectedAppointment.petName}</p>
            <p><strong>Owner:</strong> {selectedAppointment.ownerName}</p>
            <p><strong>Details:</strong> {selectedAppointment.details}</p>

            {/* Cancel button inside modal */}
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-outline btn-error"
                onClick={() => handleCancelAppointment(selectedAppointment._id)} // Trigger Swal before cancel
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
