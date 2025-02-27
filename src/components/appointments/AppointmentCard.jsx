import React from "react";
import { useNavigate } from "react-router-dom";

function AppointmentCard({ appointment, status }) {
  const navigate = useNavigate();

  return (
    <div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
      onClick={() => {
        if (status === "Upcoming") {
          navigate(`/appointments/${appointment._id}`);
        } 
      }}
    >
      <div className="card-body p-4">
        <h3 className="card-title text-lg">{status} Visit</h3>
        <div className="text-sm space-y-1">
          <div className="flex items-center space-x-4">
            <p className="font-semibold">For: {appointment.petId.name} 🐾</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.timeSlot}</p>
            {status === "Upcoming" && (
              <button className="btn btn-sm btn-outline">✏️ Edit</button>
            )}
          </div>

          <p>Doctor: {appointment.doctorId.name}</p>
          <div className="card-actions justify-end mt-4"></div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
