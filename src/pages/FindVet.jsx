import DoctorsMap from '../components/DoctorsMap';
import React, { useEffect, useState } from "react";
import { useDoctor } from "../contexts/DoctorContext";
import { MAPS_KEY } from '../config/googleMaps';

function FindVet() {
  const { doctors } = useDoctor();
  const [doctorLocations, setDoctorLocations] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const updatedDoctors = await Promise.all(
        doctors.map(async (doctor) => {
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                doctor.address
              )}&key=${MAPS_KEY }`
            );
            const data = await response.json();
            if (data.status === "OK") {
              const { lat, lng } = data.results[0].geometry.location;
              return { ...doctor, latitude: lat, longitude: lng };
            } else {
              console.error(`Geocoding failed for ${doctor.name}:`, data.status);
              return null;
            }
          } catch (error) {
            console.error("Error fetching geolocation:", error);
            return null;
          }
        })
      );

      setDoctorLocations(updatedDoctors.filter((doc) => doc !== null));
    };
  
    fetchCoordinates();
  }, [doctors]);

  return (
    <div>
      {/* Pass the doctorLocations as a prop */}
      <DoctorsMap doctorLocations={doctorLocations} />
    </div>
  );
}

export default FindVet;
