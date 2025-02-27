import React, { useState, useEffect } from "react";
import { FaClock, FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppointment } from "../../contexts/AppointmentContext";


function AppointmentDetails({ appointment }) {
  const [mapsUrl, setMapsUrl] = useState("");
  const [notes, setNotes] = useState("");
  const { editAppointment, removeAppointment } = useAppointment();


  useEffect(() => {
      if (appointment.additionalNotes) {
        setNotes(appointment.additionalNotes);
      }
      if (appointment.doctorId.address) {
        setMapsUrl(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appointment?.doctorId?.address)}`
        );
      }
    }, [appointment]);

    const handleChange = (e) => setNotes(e.target.value);

  const handleRemove = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to cancel the appointment?")) {
      removeAppointment(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editAppointment({ 
      _id: appointment._id, 
      userId: appointment.userId,
      doctorId: appointment.doctorId,
      date: appointment.date,
      timeSlot: appointment.timeSlot,
      petId: appointment.petId,
      additionalNotes: notes 
    });
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto my-8 rounded-lg shadow-lg">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaClock />
            <span>{appointment.date || "Thursday, 20 February"}</span>
          </div>
          <span>{appointment?.timeSlot || "15:30"}</span>
        </div>

        <div className="flex items-center p-4 border-b">
          <img
            src="https://masterpiecer-images.s3.yandex.net/514a9d14308211ee99a1c20edf74fa66:upscaled"
            alt="Doctor"
            className="rounded-full w-12 h-12 mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {appointment?.doctorId?.name || "Rasmus Knauer"}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-b">
          <h3 className="text-lg font-semibold">Additional notes</h3>
          <textarea
            name="additional"
            value={notes}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-md"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save Notes
          </button>
        </form>

        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Patient</h3>
          <div className="flex items-center space-x-2 mt-2">
            <FaPaw />
            <p className="font-medium">
              {appointment?.petId?.name || "Daryna ZINCHENKO"}
            </p>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold">
            Details of the healthcare facility
          </h3>
          <div className="mt-2">
            <h4 className="font-medium">Getting to the appointment</h4>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt />
              <p>
                {appointment.doctorId.address ||
                  "Jahnstraße 50, 16321 Bernau bei Berlin"}
              </p>
            </div>

            <div className="flex justify-between mt-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium"
              >
                Open map
              </a>
              <Link
                to="/myPets"
                className="text-red-500"
                onClick={handleRemove}
              >
                Cancel Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;
