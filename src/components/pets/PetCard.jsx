import React from "react";
import { useNavigate } from "react-router-dom";

function PetCard({ pet }) {
  const navigate = useNavigate();

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure className="h-64">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-center object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pet.name}</h2>
        <div className="flex items-center text-sm w-full">
          <p className="mr-4">
            <span className="font-semibold">Species:</span> {pet.species}
          </p>
          <p className="mr-4">
            <span className="font-semibold">Age:</span> {pet.age} years
          </p>
          <div className="ml-auto">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => navigate(`/pets/${pet._id}`)}
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
