import React, { useState } from "react";
import { useAppointment } from "../../contexts/AppointmentContext";


function AdditionalNotes({ appointment }) {
  const [isEditing, setIsEditing] = useState(false);
    const { editAppointment } = useAppointment();
  
  const [notes, setNotes] = useState(appointment.additionalNotes || "");

  const handleChange = (e) => setNotes(e.target.value);

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    editAppointment({ 
      _id: appointment._id, 
      additionalNotes: notes 
    });

    setIsEditing(false);
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold">Additional Notes</h3>
      {isEditing ? (
        <>
          <textarea
            name="additional"
            value={notes}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-md"
          />
          <button
            onClick={handleSaveClick}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p className="mt-2 p-2 rounded-md text-gray-500 text-sm">
            {notes || "No additional notes."}
          </p>
          <button
            onClick={handleEditClick}
            className="mt-2 text-blue-500 px-1 py-1 rounded-md"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}

export default AdditionalNotes;
