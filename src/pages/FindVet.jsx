import DoctorsMap from '../components/DoctorsMap';
import React, { useEffect, useState } from "react";
import { useDoctor } from "../contexts/DoctorContext";
import VetCard from '../components/vets/VetCard';

function FindVet() {
  const { doctors, fetchDoctors, filterDoctors } = useDoctor();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDoctors();
  }
  , []);

  useEffect(() => {
    filterDoctors(searchTerm);
  }, [searchTerm]);

  return (
    <div className='flex p-10 gap-16'>
      
      <div className='flex-1 h-[600px] overflow-y-auto px-10 overflow-x-hidden'>
      <div className='mb-4'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search doctors by name or address...'
            className='input input-bordered w-full'
          />
        </div>
        {doctors.map((doctor) => (
          <VetCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
      <DoctorsMap />
    </div>
  );
}

export default FindVet;