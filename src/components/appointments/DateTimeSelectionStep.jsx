import React, { useState, useEffect } from "react";
import { formatTimeSlot } from "../../utils/dateUtils";
import { getAvailableTimeSlots } from "../../services/api";
import Swal from "sweetalert2";

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
  //check if weekend
  const isWeekend = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  // Fetch available slots when date or doctor changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate || !doctorId) return;

      if (isWeekend(selectedDate)) {
        Swal.fire({
          title: "Weekend Not Available",
          text: "Our clinic is closed on weekends. Please select a weekday.",
          icon: "info",
          confirmButtonText: "OK",
        });
        setAvailableSlots([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await getAvailableTimeSlots(doctorId, selectedDate);

        // Check if response is an array or object with availableSlots property
        if (Array.isArray(response.data)) {
          setAvailableSlots(response.data);
        } else if (response.data && response.data.availableSlots) {
          setAvailableSlots(response.data.availableSlots);

          // If there's a message, show it with SweetAlert2
          if (response.data.message) {
            Swal.fire({
              title: "Information",
              text: response.data.message,
              icon: "info",
              confirmButtonText: "OK",
            });
          }
        } else {
          setAvailableSlots([]);
        }
      } catch (err) {
        console.error("Error fetching available time slots:", err);
        setError("Failed to load available times. Please try again.");

        // Show error with SweetAlert2
        Swal.fire({
          title: "Error",
          text: "Failed to load available times. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });

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

  // Handle date change with validation
  const handleDateChange = (e) => {
    const newDate = e.target.value;

    // Check if it's a weekend
    if (isWeekend(newDate)) {
      Swal.fire({
        title: "Weekend Not Available",
        text: "Our clinic is closed on weekends. Please select a weekday.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }

    setSelectedDate(newDate);
    setSelectedTime(null); // Reset selected time when date changes
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
          onChange={handleDateChange}
        />
        <label className="label">
          <span className="label-text-alt text-info">
            Our clinic is open Monday through Friday
          </span>
        </label>
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

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {availableSlots && availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <button
                  key={slot}
                  className={`btn btn-sm ${
                    selectedTime === slot ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {formatTimeSlot(slot)}
                </button>
              ))
            ) : (
              <div className="col-span-full text-center py-4 text-info">
                <p>
                  Our clinic is closed on the weekends, please select another
                  day.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button className="btn btn-ghost" onClick={prevStep}>
          Back
        </button>
        <button
          className="btn btn-primary"
          disabled={!selectedTime || !selectedDate || isWeekend(selectedDate)}
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DateTimeSelectionStep;
