import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePet } from "../contexts/PetContext";
import PetEditForm from "../components/pets/PetEditForm";

function PetEditPage() {
  const { id } = useParams();
  const { fetchPetById, pet, loading } = usePet();

  useEffect(() => {
    fetchPetById(id);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500">
          Loading...
        </div>
      </div>
    );
  }

  if (!pet) {
    return null;
  }

  return (
    <div className="container mx-auto px-8 my-20 mb-32">
      <h1 className="text-3xl font-bold mb-8">{pet.name}'s Page</h1>
      <PetEditForm pet={pet} />
    </div>
  );
}

export default PetEditPage;
