import React from "react";

function AppointmentTable({ appointments, openModal }) {
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const groupedAppointments = sortedAppointments.reduce(
    (groups, appointment) => {
      const date = new Date(appointment.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }

      groups[monthYear].push(appointment);
      return groups;
    },
    {}
  );
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg w-9/12 mx-auto">
      <table className="table w-full border border-gray-300 bg-white rounded-lg table-fixed">
        <thead className="text-center">
          <tr className="bg-primary text-white text-lg">
            <th className="p-4 w-1/4">Date</th>
            <th className="p-4 w-1/4">Time</th>
            <th className="p-4 w-1/4">Patient</th>
            <th className="p-4 w-1/4">Owner</th>
            <th className="p-4 w-1/4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {Object.entries(groupedAppointments).map(
            ([monthYear, monthAppointments], groupIndex) => {
              const [year, month] = monthYear.split("-");
              const monthName = new Date(
                parseInt(year),
                parseInt(month) - 1
              ).toLocaleString("default", { month: "long" });

              return (
                <React.Fragment key={monthYear}>
                  <tr className="bg-gray-300 bg-opacity-50">
                    <td
                      colSpan="5"
                      className="p-2 text-left font-bold text-base-content/70"
                    >
                      {monthName} {year}
                    </td>
                  </tr>

                  {monthAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => openModal(appointment)}
                    >
                      <td className="p-4">{appointment.date}</td>
                      <td className="p-4">{appointment.timeSlot}</td>
                      <td className="p-4 font-semibold">
                        {appointment.petId.name}
                      </td>
                      <td className="p-4">{appointment.userId.name}</td>
                      <td className="p-4">
                        <button
                          className="btn btn-primary btn-sm  hover:btn-accent transition-colors duration-300"
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
                </React.Fragment>
              );
            }
          )}

          {appointments.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentTable;
