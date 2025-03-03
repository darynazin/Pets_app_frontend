import React from 'react';

function AppointmentTable({ appointments, openModal }) {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg w-9/12 mx-auto">
      <table className="table w-full border border-gray-300 bg-white rounded-lg table-fixed">
        <thead className="text-center">
          <tr className="bg-primary text-white text-lg">
            <th className="p-4 w-1/4">Date</th>
            <th className="p-4 w-1/4">Time</th>
            <th className="p-4 w-1/4">Patient</th>
            <th className="p-4 w-1/4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {appointments.map((appointment) => (
            <tr
              key={appointment._id}
              className="border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer"
              onClick={() => openModal(appointment)}
            >
              <td className="p-4">{appointment.date}</td>
              <td className="p-4">{appointment.timeSlot}</td>
              <td className="p-4 font-semibold">{appointment.petId.name}</td>
              <td className="p-4">
                <button
                  className="btn btn-outline btn-info btn-sm hover:scale-105 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(appointment);
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
  );
}

export default AppointmentTable;
