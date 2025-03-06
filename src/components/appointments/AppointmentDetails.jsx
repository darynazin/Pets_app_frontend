import React, { useState, useEffect } from "react";
// import { FaClock, FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../../contexts/AppointmentContext";
import AdditionalNotes from "./AdditionalNotes";
import Swal from "sweetalert2";

function AppointmentDetails({ appointment }) {
  const [mapsUrl, setMapsUrl] = useState("");
  const { removeAppointment } = useAppointment();
  const navigate = useNavigate();

  useEffect(() => {
    if (appointment?.doctorId?.address) {
      setMapsUrl(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          appointment.doctorId.address
        )}`
      );
    }
  }, [appointment]);

  const handleRemove = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Cancel Appointment?",
      text: "This action cannot be undone. Are you sure you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#2463eb",
      confirmButtonText: "Yes, cancel appointment!",
      cancelButtonText: "Kepp my booking",
    });

    if (result.isConfirmed) {
      removeAppointment(appointment._id);
      Swal.fire("Canceled!", "Your appointment has been canceled.", "success");
      navigate("/mypets");
    }
  };

  return (
    <div className="container mx-auto px-8 my-20">
      <h1 className="text-3xl font-bold mb-8">Appointment Details</h1>
      <div className="card max-w-[500px] mx-auto my-8 bg-base-100 shadow-xl">
        <div className="bg-primary text-primary-content p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">📆</span>
            <span className="text-lg opacity-80">Appointment:</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">{appointment?.date}</h2>
            </div>
            <div>
              <span className="badge badge-secondary badge-lg text-base px-4 py-3">
                {appointment?.timeSlot}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center p-4 border-b">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full mr-4">
              <img
                src={
                  appointment?.doctorId?.image ||
                  "https://masterpiecer-images.s3.yandex.net/514a9d14308211ee99a1c20edf74fa66:upscaled"
                }
                alt="Doctor"
              />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {appointment?.doctorId?.name}
            </h2>
          </div>
        </div>

        <AdditionalNotes appointment={appointment} />

        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Patient</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl">🐾</span>
            <p className="font-medium">{appointment?.petId?.name}</p>
          </div>
        </div>

        <div className="p-4">
          <div className="mt-2">
            <h4 className="text-base-content/70">Getting to the appointment</h4>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl">📍</span>
              <a
                href={mapsUrl}
                rel="noopener noreferrer"
                target="_blank"
                className="link link-primary font-medium"
              >
                {appointment?.doctorId?.address}
              </a>
            </div>

            <div className="flex justify-end mt-6">
              <p
                className="text-error cursor-pointer hover:underline"
                onClick={handleRemove}
              >
                Cancel Appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;
