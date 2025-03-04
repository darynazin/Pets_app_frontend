import React from "react";
import { VISIT_TYPES } from "../../constants/visitTypes.js";

const VisitDetailsStep = ({
  visitType,
  setVisitType,
  additionalNotes,
  setAdditionalNotes,
  nextStep,
  prevStep,
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">What is the visit for?</h3>

      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text">Visit Type</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.values(VISIT_TYPES).map((type) => (
            <div key={type} className="form-control">
              <label
                className={`label cursor-pointer justify-start gap-2 p-3 border rounded-lg ${
                  visitType === type ? "border-primary bg-base-200" : ""
                }`}
              >
                <input
                  type="radio"
                  name="visitType"
                  className="radio radio-primary"
                  checked={visitType === type}
                  onChange={() => setVisitType(type)}
                />
                <span className="label-text">{type}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text">Additional Notes (Optional)</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Describe any symptoms, concerns, or questions you have for the vet..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-between mt-8">
        <button className="btn btn-ghost" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default VisitDetailsStep;
