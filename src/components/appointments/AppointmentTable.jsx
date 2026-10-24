import React from "react";
import { parseCalendarDate } from "../../utils/dateUtils";

function AppointmentTable({ appointments, openModal }) {
  const sortedAppointments = [...appointments].sort(
    (a, b) => parseCalendarDate(a.date) - parseCalendarDate(b.date)
  );
  const groupedAppointments = sortedAppointments.reduce(
    (groups, appointment) => {
      const date = parseCalendarDate(appointment.date);
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
    <div className="w-full min-w-0">
      <p className="mb-2 text-sm text-base-content/70 md:hidden">Swipe to see all appointment columns.</p>
      <div className="w-full overflow-x-auto shadow-lg rounded-lg" role="region" aria-label="Appointments table" tabIndex={0}>
        <table className="table w-full min-w-[640px] border border-gray-300 bg-white rounded-lg table-fixed">
          <thead className="text-center">
            <tr className="bg-primary text-white text-base lg:text-lg">
              <th scope="col" className="p-4">Date</th>
              <th scope="col" className="p-4">Time</th>
              <th scope="col" className="p-4">Patient</th>
              <th scope="col" className="p-4">Owner</th>
              <th scope="col" className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {Object.entries(groupedAppointments).map(
              ([monthYear, monthAppointments]) => {
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
                        <td className="p-4 whitespace-nowrap">{appointment.date}</td>
                        <td className="p-4 whitespace-nowrap">{appointment.timeSlot}</td>
                        <td className="p-4 font-semibold whitespace-normal break-words">
                          {appointment.petId.name}
                        </td>
                        <td className="p-4 whitespace-normal break-words">{appointment.userId.name}</td>
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
    </div>
  );
}

export default AppointmentTable;
