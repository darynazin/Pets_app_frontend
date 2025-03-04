import React from "react";
import { useNavigate } from "react-router-dom";
import defaultPetImage from "../../assets/default-pet.jpg";
import { calculateAge } from "../../utils/dateUtils";

function PetCard({ pet }) {
  const navigate = useNavigate();

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleImageError = (e) => {
    e.target.src = defaultPetImage;
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
      <figure className="h-64">
        <img
          src={pet.image || defaultPetImage}
          alt={pet.name}
          className="w-full h-full object-center object-cover"
          onError={handleImageError}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pet.name}</h2>
        <div className="flex items-center text-sm w-full">
          <p className="mr-4">
            <span className="font-semibold">Pet Type:</span> {pet.species}
          </p>
          <p className="mr-4">
            <span className="font-semibold">Age:</span>{" "}
            {calculateAge(pet.birthDate)}{" "}
            {calculateAge(pet.birthDate) === 1 ? "year" : "years"}
          </p>
          <div className="ml-auto">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => navigate(`/pets/${pet._id}/edit`)}
            >
              ✏️ Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetCard;
