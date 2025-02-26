import DoctorsMap from '../components/DoctorsMap';
import React, { useEffect } from "react";
import { useDoctor } from "../contexts/DoctorContext";

function FindVet() {
  const { doctors, fetchDoctors } = useDoctor();


    useEffect(() => { fetchDoctors(); }, [])
      

  return (
    <div className='flex '>
     <div>
      {doctors.map((doctor) => (
                <div key={doctor._id} className="card w-full bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title">{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                    <p className="text-sm text-gray-500">{doctor.address}</p>
                  </div>
                </div>
              ))}
     </div>
      <DoctorsMap />
    </div>
  );
}

export default FindVet;
