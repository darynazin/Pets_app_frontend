import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDoctor } from "../../contexts/DoctorContext";

const VetCard = ({ doctor }) => {
  const { selectedDoctor, setSelectedDoctor } = useDoctor();
  const doctorRef = useRef(null);

  useEffect(() => {
    if (selectedDoctor?._id === doctor._id) {
      doctorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedDoctor, doctor._id]);

  const handleCardClick = () => {
    setSelectedDoctor(doctor);
  };

  return (
    <div
      ref={doctorRef}
      className={`card w-full border-2 ${
        selectedDoctor?._id === doctor._id
          ? "border-base-300 bg-base-100 drop-shadow-lg"
          : "border-gray-100"
      } rounded-lg mb-4 p-2 hover:bg-base-100 hover:border-base-200 transition-colors`}
      onClick={handleCardClick}
    >
      <div className="card-body flex flex-row justify-between px-4 py-1">
        <figure className="flex-shrink-0">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full">
              <img
                src={doctor.image || "./src/assets/default-vet.jpg"}
                alt={doctor.name}
                className="object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "./src/assets/default-vet.jpg";
                }}
              />
            </div>
          </div>
        </figure>
        <div className="w-3/4 mx-4">
          <h2 className="card-title">{doctor.name}</h2>
          <p className="flex items-center gap-1">
            <span className="text-xl">📍 </span>
            <span className="text-sm">{doctor.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-xl">📞 </span>
            <span className="text-sm">{doctor.phoneNumber}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-xl">📧 </span>
            <span className="text-sm">{doctor.email}</span>
          </p>
        </div>
        <div className="card-actions justify-end items-center mt-4">
          <Link
            to={`/appointments/book/${doctor._id}`}
            className="btn btn-primary hover:btn-accent transition-colors duration-300"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VetCard;
