import React from "react";

function PetCard({ pet }) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure className="h-64">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-center object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pet.name}</h2>
        <div className="text-sm">
          <p>
            <span className="font-semibold">Species:</span> {pet.species}
          </p>
          <p>
            <span className="font-semibold">Age:</span> {pet.age} years
          </p>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-outline">✏️ Edit</button>
        </div>
      </div>
    </div>
  );
}

export default PetCard;
