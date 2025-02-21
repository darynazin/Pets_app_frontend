import React, { useState } from "react";
import { emergencyClinicData } from "../data/MockData";

function Emergency() {
  const [searchLocation, setSearchLocation] = useState("");
  const filteredClinics = emergencyClinicData.filter((clinic) =>
    clinic.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        <span>🆘 </span>Vet Clinics with Emergency Service
      </h1>

      <div className="flex justify-between gap-4 items-center mb-8">
        <div className="form-control w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by location..."
            className="input input-bordered w-full"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
        <button className="btn btn-ghost whitespace-nowrap">
          Search All Vets
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClinics.map((clinic) => (
          <div
            key={clinic.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="card-body">
              <h2 className="card-title text-xl">
                <span>🏥 </span>
                {clinic.clinicName}
              </h2>
              <div className="space-y-2">
                <p className="text-success font-semibold">
                  <span>⏰ </span>
                  {clinic.hours}
                </p>
                <p>
                  <span>📍 </span>
                  {clinic.clinicAddress}
                </p>
                <p className="font-semibold">
                  <span>☎️ </span>
                  {clinic.phone}
                </p>
                <div className="flex flex-wrap gap-2">
                  {clinic.services.map((service, index) => (
                    <span
                      key={index}
                      className="badge badge-outline text-red-500 border-red-500"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-circle btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Emergency;
