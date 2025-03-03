import DoctorsMap from "../components/DoctorsMap";
import React, { useEffect, useState } from "react";
import { useDoctor } from "../contexts/DoctorContext";
import VetCard from "../components/vets/VetCard";

function FindVet() {
  const {
    filteredDoctors,
    fetchDoctors,
    searchTerm,
    setSearchTerm,
    filterDoctors,
    doctors,
  } = useDoctor();

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (doctors.length > 0) {
      filterDoctors(searchTerm);
    }
  }, [searchTerm, doctors]);

  return (
    <div className="container mx-auto px-8 my-20">
      <div className="flex p-10 gap-16 flex-grow">
        <div className="flex-grow">
          <div className="mb-4 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctors by name or address..."
              className="input input-bordered focus:outline-none focus:ring-0 w-full"
              autoFocus
            />
          </div>
          <div className="h-[500px] overflow-y-auto  overflow-x-hidden ounline-none">
            {filteredDoctors.map((doctor) => (
              <VetCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        </div>
        <DoctorsMap />
      </div>
    </div>
  );
}

export default FindVet;
