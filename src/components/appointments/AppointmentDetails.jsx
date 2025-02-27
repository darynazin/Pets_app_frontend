import React, { useState, useEffect } from "react";
import { FaClock, FaMapMarkerAlt, FaPaw } from "react-icons/fa";
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
      title: "Are you sure?",
      text: "You won’t be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#2463eb",
      confirmButtonText: "Yes, cancel it!",
    });
  
    if (result.isConfirmed) {
      removeAppointment(appointment._id);
      Swal.fire("Canceled!", "Your appointment has been canceled.", "success");
      navigate("/mypets");
    }
  };

  return (
    <div className="max-w-[500px] mx-auto my-8 rounded-lg shadow-lg">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaClock />
          <span>{appointment?.date}</span>
        </div>
        <span>{appointment?.timeSlot}</span>
      </div>

      <div className="flex items-center p-4 border-b">
        <img
          src={appointment?.doctorId?.image || "https://masterpiecer-images.s3.yandex.net/514a9d14308211ee99a1c20edf74fa66:upscaled"}
          alt="Doctor"
          className="rounded-full w-12 h-12 mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {appointment?.doctorId?.name}
          </h2>
        </div>
      </div>

      <AdditionalNotes appointment={appointment} />

      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Patient</h3>
        <div className="flex items-center space-x-2 mt-2">
          <FaPaw />
          <p className="font-medium">
            {appointment?.petId?.name}
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="mt-2">
          <h4 className="font-sm">Getting to the appointment</h4>
          <div className="flex items-center space-x-2 mt-2">
            <FaMapMarkerAlt />
            <a
              href={mapsUrl}
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue-600 font-medium hover:underline"
            >
              {appointment?.doctorId?.address}
            </a>
          </div>

          <div className="flex justify-end mt-6">
            <p className="text-red-500 pointer cursor-pointer" onClick={handleRemove}>
              Cancel Appointment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;
