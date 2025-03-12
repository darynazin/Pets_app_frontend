import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDoctor } from "../contexts/DoctorContext";
import { usePet } from "../contexts/PetContext";
import { useAppointment } from "../contexts/AppointmentContext";
import { formatDateForInput } from "../utils/dateUtils";
import { VISIT_TYPES } from "../constants/visitTypes";
import Swal from "sweetalert2";

import PetSelectionStep from "../components/appointments/PetSelectionStep";
import DateTimeSelectionStep from "../components/appointments/DateTimeSelectionStep";
import VisitDetailsStep from "../components/appointments/VisitDetailsStep";
import ConfirmationStep from "../components/appointments/ConfirmationStep";

const AppointmentBooking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  // const { fetchDoctors, doctors, loading: doctorLoading } = useDoctor();
  const { fetchPets, loading: petLoading } = usePet();
  const { addAppointment, loading: appointmentLoading } = useAppointment();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPetIds, setSelectedPetIds] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    formatDateForInput(new Date())
  );
  const [selectedTime, setSelectedTime] = useState(null);
  const [visitType, setVisitType] = useState(Object.values(VISIT_TYPES)[0]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetchDoctors();
    fetchPets();
  }, []);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const appointmentPromises = selectedPetIds.map((petId) =>
        addAppointment({
          doctorId,
          petId,
          date: selectedDate,
          timeSlot: selectedTime,
          visitType,
          additionalNotes,
        })
      );

      await Promise.all(appointmentPromises);

      Swal.fire({
        title: "Success!",
        text: "Your appointment has been successfully booked.",
        icon: "success",
        confirmButtonText: "View My Pets",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/mypets");
        }
      });
    } catch (err) {
      setError("Failed to create appointment. Please try again.");
      console.error("Error creating appointment:", err);

      Swal.fire({
        title: "Error!",
        text: "Failed to create appointment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PetSelectionStep
            selectedPetIds={selectedPetIds}
            setSelectedPetIds={setSelectedPetIds}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <DateTimeSelectionStep
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            doctorId={doctorId}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <VisitDetailsStep
            visitType={visitType}
            setVisitType={setVisitType}
            additionalNotes={additionalNotes}
            setAdditionalNotes={setAdditionalNotes}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <ConfirmationStep
            selectedPetIds={selectedPetIds}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            visitType={visitType}
            additionalNotes={additionalNotes}
            doctorId={doctorId}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            loading={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <ul className="steps steps-horizontal w-full max-w-3xl">
          <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>
            Select Pets
          </li>
          <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>
            Choose Time
          </li>
          <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>
            Visit Details
          </li>
          <li className={`step ${currentStep >= 4 ? "step-primary" : ""}`}>
            Confirm
          </li>
        </ul>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Appointment Booking</h2>
        {renderStepContent()}
      </div>
    </div>
  );
};

export default AppointmentBooking;
