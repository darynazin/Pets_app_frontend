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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">{doctor.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-sm">{doctor.phoneNumber}</span>
          </p>
          <p className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">{doctor.email}</span>
          </p>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/appointments/book/${doctor._id}`}
            className="btn btn-primary"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VetCard;
