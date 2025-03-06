import React from "react";
import { useDoctor } from "../../contexts/DoctorContext";
import { usePet } from "../../contexts/PetContext";
import { formatTimeSlot } from "../../utils/dateUtils";

const ConfirmationStep = ({
  selectedPetIds,
  selectedDate,
  selectedTime,
  visitType,
  additionalNotes,
  doctorId,
  handleSubmit,
  prevStep,
  loading,
}) => {
  const { doctors } = useDoctor();
  const { pets } = usePet();

  // Find the selected doctor
  const doctor = doctors.find((doc) => doc._id === doctorId);

  // Find the selected pets
  const selectedPets = pets.filter((pet) => selectedPetIds.includes(pet._id));

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Confirm Appointment Details</h3>

      <div className="bg-base-200 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm opacity-70 mb-1">Date & Time</h4>
            <p className="text-lg">
              {selectedDate} at {formatTimeSlot(selectedTime)}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm opacity-70 mb-1">Visit Type</h4>
            <p className="text-lg">{visitType}</p>
          </div>

          <div>
            <h4 className="font-medium text-sm opacity-70 mb-1">Doctor</h4>
            <p className="text-lg">
              {doctor ? `Dr. ${doctor.name}` : "Loading..."}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm opacity-70 mb-1">
              Pets ({selectedPets.length})
            </h4>
            <div className="flex flex-wrap gap-1">
              {selectedPets.map((pet) => (
                <span key={pet._id} className="badge badge-primary">
                  {pet.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {additionalNotes && (
          <div className="mt-4">
            <h4 className="font-medium text-sm opacity-70 mb-1">
              Additional Notes
            </h4>
            <p className="bg-base-100 p-2 rounded">{additionalNotes}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button className="btn btn-ghost" onClick={prevStep} disabled={loading}>
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
