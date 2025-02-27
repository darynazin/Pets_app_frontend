import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePet } from "../../contexts/PetContext";

const PetSelectionStep = ({ selectedPetIds, setSelectedPetIds, nextStep }) => {
  const { pets, fetchPets, loading } = usePet();

  useEffect(() => {
    fetchPets();
  }, []);

  const togglePetSelection = (petId) => {
    // If pet is already selected, remove it
    if (selectedPetIds.includes(petId)) {
      setSelectedPetIds(selectedPetIds.filter((id) => id !== petId));
    }
    // If not selected and we have less than 3 pets, add it
    else if (selectedPetIds.length < 3) {
      setSelectedPetIds([...selectedPetIds, petId]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!pets.length) {
    return (
      <div className="text-center p-8">
        <p className="mb-4">You don't have any registered pets yet.</p>
        <Link to="/pets/register" className="btn btn-primary">
          Register a Pet First
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">
        Which of your pets is this for? (choose up to 3 pets)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className={`card bg-base-100 shadow border-2 cursor-pointer transition-all ${
              selectedPetIds.includes(pet._id)
                ? "border-primary"
                : "border-base-200"
            }`}
            onClick={() => togglePetSelection(pet._id)}
          >
            <figure className="px-4 pt-4">
              <img
                src={pet.image || "/default-pet.png"}
                alt={pet.name}
                className="rounded-xl h-36 w-full object-cover"
              />
            </figure>
            <div className="card-body p-4 text-center">
              <h2 className="card-title justify-center">{pet.name}</h2>
              <p>
                {pet.species} • {pet.breed}
              </p>
              {selectedPetIds.includes(pet._id) && (
                <div className="badge badge-primary absolute top-3 right-3">
                  Selected
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Link to="/mypets" className="btn btn-ghost">
          Cancel
        </Link>
        <button
          className="btn btn-primary"
          disabled={selectedPetIds.length === 0}
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PetSelectionStep;
