import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePet } from "../contexts/PetContext";
import PetEditForm from "../components/pets/PetEditForm";

function PetEditPage() {
  const { id } = useParams();
  const { fetchPetById } = usePet();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const petData = await fetchPetById(id);
        setPet(petData);
      } catch (err) {
        console.error("Failed to load pet:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPet();
  }, [id, fetchPetById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!pet) {
    return <div className="text-center">Pet not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit {pet.name}</h1>
      <PetEditForm pet={pet} />
    </div>
  );
}

export default PetEditPage;
