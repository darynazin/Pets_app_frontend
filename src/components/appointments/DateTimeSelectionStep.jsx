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

  const isWeekend = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const isPastTimeSlot = (timeSlot) => {
    const today = new Date();
    const selectedDateObj = new Date(selectedDate);

    if (
      selectedDateObj > today &&
      !(
        selectedDateObj.getDate() === today.getDate() &&
        selectedDateObj.getMonth() === today.getMonth() &&
        selectedDateObj.getFullYear() === today.getFullYear()
      )
    ) {
      return false;
    }

    const [hours, minutes] = timeSlot
      .split(":")
      .map((num) => parseInt(num, 10));

    const timeSlotDate = new Date(selectedDate);
    timeSlotDate.setHours(hours, minutes, 0, 0);

    return timeSlotDate <= today;
  };

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

        if (Array.isArray(response.data)) {
          setAvailableSlots(response.data);
        } else if (response.data && response.data.availableSlots) {
          setAvailableSlots(response.data.availableSlots);

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

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;

    if (isWeekend(newDate)) {
      Swal.fire({
        title: "Weekend Not Available",
        text: "Our clinic is closed on weekends. Please select a weekday.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }

    setSelectedDate(newDate);
    setSelectedTime(null);
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
              availableSlots.map((slot) => {
                const isPast = isPastTimeSlot(slot);

                return (
                  <button
                    key={slot}
                    className={`btn btn-sm ${
                      selectedTime === slot ? "btn-primary" : "btn-outline"
                    } ${isPast ? "btn-disabled opacity-50" : ""}`}
                    onClick={() => !isPast && setSelectedTime(slot)}
                    disabled={isPast}
                    title={isPast ? "This time slot is in the past" : ""}
                  >
                    {formatTimeSlot(slot)}
                  </button>
                );
              })
            ) : (
              <div className="col-span-full text-center py-4 text-info">
                <p>
                  {selectedDate && !isWeekend(selectedDate)
                    ? "No available time slots for this date."
                    : "Our clinic is closed on the weekends, please select another day."}
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
