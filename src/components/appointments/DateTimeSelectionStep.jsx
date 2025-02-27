import React, { useState, useEffect } from "react";
import { formatTimeSlot } from "../../utils/dateUtils";
import { getAvailableTimeSlots } from "../../services/api";

const DateTimeSelectionStep = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  doctorId,
  nextStep,
  prevStep,
}) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available slots when date or doctor changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate || !doctorId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await getAvailableTimeSlots(doctorId, selectedDate);
        setAvailableSlots(response.data);
      } catch (err) {
        console.error("Error fetching available time slots:", err);
        setError("Failed to load available times. Please try again.");
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [selectedDate, doctorId]);

  // Function to disable past dates
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">
        Select a date and time for your appointment
      </h3>

      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text">Date</span>
        </label>
        <input
          type="date"
          className="input input-bordered w-full"
          value={selectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedTime(null); // Reset selected time when date changes
          }}
        />
      </div>

      {loading ? (
        <div className="flex justify-center p-4">
          <span className="loading loading-spinner"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      ) : (
        <div className="mb-6">
          <label className="label">
            <span className="label-text">Available Time Slots</span>
          </label>

          {availableSlots.length === 0 ? (
            <div className="alert alert-info">
              <span>
                No available time slots for this date. Please select another
                date.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  className={`btn btn-sm ${
                    selectedTime === slot ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {formatTimeSlot(slot)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button className="btn btn-ghost" onClick={prevStep}>
          Back
        </button>
        <button
          className="btn btn-primary"
          disabled={!selectedTime || !selectedDate}
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DateTimeSelectionStep;
