import React, { useState } from "react";
import { useParams } from "react-router-dom";

const AppointmentBooking = () => {
  const { doctorId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);

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
        <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
      </div>
    </div>
  );
};

export default AppointmentBooking;
