import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDoctor } from "../../contexts/DoctorContext";
import defaultVetImage from "../../assets/default-vet.jpg";

const VetCard = ({ doctor }) => {
  const { selectedDoctor, setSelectedDoctor } = useDoctor();
  const doctorRef = useRef(null);

  useEffect(() => {
    if (selectedDoctor?._id === doctor._id) {
      doctorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [selectedDoctor, doctor._id]);

  const handleCardClick = () => {
    setSelectedDoctor(doctor);
  };

  return (
    <div
      ref={doctorRef}
      className={`card w-full min-w-0 border-2 ${
        selectedDoctor?._id === doctor._id
          ? "border-base-300 bg-base-100 drop-shadow-lg"
          : "border-gray-100"
      } rounded-lg mb-4 p-2 hover:bg-base-100 hover:border-base-200 transition-colors`}
      onClick={handleCardClick}
    >
      <div className="card-body min-w-0 gap-4 p-2 sm:p-4 md:flex-row justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <figure className="flex-shrink-0">
            <div className="avatar">
              <div className="w-16 h-16 rounded-full">
                <img
                  src={doctor.image || defaultVetImage}
                  alt={doctor.name}
                  className="object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultVetImage;
                  }}
                />
              </div>
            </div>
          </figure>
          <div className="min-w-0 flex-1 space-y-1">
            <h2 className="card-title block break-words text-lg">{doctor.name}</h2>
            <p className="flex items-start gap-2">
              <span className="shrink-0 text-xl">📍 </span>
              <span className="min-w-0 break-words text-sm">{doctor.address}</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="shrink-0 text-xl">📞 </span>
              <span className="min-w-0 break-words text-sm">{doctor.phoneNumber}</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="shrink-0 text-xl">📧 </span>
              <span className="min-w-0 break-words text-sm">{doctor.email}</span>
            </p>
          </div>
        </div>
        <div className="card-actions justify-end items-end">
          <Link
            to={`/appointments/book/${doctor._id}`}
            className="btn btn-primary w-full hover:btn-accent transition-colors duration-300 sm:w-auto"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VetCard;
