import React from "react";
import { useNavigate } from "react-router-dom";

function AppointmentCard({ appointment, status }) {
  const navigate = useNavigate();

  return (
    <div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
      onClick={() => navigate(`/vets/${appointment.doctorId.id}`)}
    >
      <div className="card-body">
        <h3 className="card-title text-lg">
          {status} Visit
        </h3>
        <div className="text-sm space-y-1">
          <p className="font-semibold">For: {appointment.petId.name} 🐾</p>
          <p>Date: {appointment.date}</p>
          <p>Time: {appointment.timeSlot}</p>
          <p>Doctor: {appointment.doctorId.name}</p>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
