import React, { useState } from "react";
import { emergencyClinicData } from "../data/MockData";

function Emergency() {
  const [searchLocation, setSearchLocation] = useState("");
  const [favoriteClinics, setFavoriteClinics] = useState([]);

  // favorite status
  const toggleFavorite = (clinicId) => {
    setFavoriteClinics((prev) => {
      if (prev.includes(clinicId)) {
        return prev.filter((id) => id !== clinicId);
      } else {
        return [...prev, clinicId];
      }
    });
  };

  // filter by location
  const locationFilteredClinics = emergencyClinicData.filter((clinic) =>
    clinic.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  // show favorites first
  const sortedClinics = [...locationFilteredClinics].sort((a, b) => {
    const aFavorite = favoriteClinics.includes(a.id);
    const bFavorite = favoriteClinics.includes(b.id);

    if (aFavorite && !bFavorite) return -1;
    if (!aFavorite && bFavorite) return 1;
    return 0;
  });

  return (
    <div className="container mx-auto px-8 my-20">
      <h1 className="text-3xl font-bold mb-8">
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
        <a href="/search" className="btn btn-ghost whitespace-nowrap">
          Search All Vets
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedClinics.map((clinic) => {
          const isFavorite = favoriteClinics.includes(clinic.id);

          return (
            <div
              key={clinic.id}
              className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all transform ${
                isFavorite ? "scale-102 border-2 border-primary" : ""
              }`}
              style={{
                transition: "all 0.3s ease",
                zIndex: isFavorite ? 10 : 1,
              }}
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
                  <button
                    className={`btn btn-circle btn-sm ${
                      isFavorite ? "btn-primary" : ""
                    }`}
                    onClick={() => toggleFavorite(clinic.id)}
                    aria-label={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill={isFavorite ? "currentColor" : "none"}
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
          );
        })}
      </div>
    </div>
  );
}

export default Emergency;
