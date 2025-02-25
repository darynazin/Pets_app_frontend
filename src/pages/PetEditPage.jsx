import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePet } from "../contexts/PetContext";
import PetEditForm from "../components/pets/PetEditForm";

function PetEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPetById } = usePet();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadPet = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const petData = await fetchPetById(id);
        if (mounted) {
          if (!petData) {
            navigate("/mypets", { replace: true });
            return;
          }
          setPet(petData);
        }
      } catch (err) {
        console.error("Failed to load pet:", err);
        if (mounted) {
          navigate("/mypets", { replace: true });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPet();

    return () => {
      mounted = false;
    };
  }, [id, fetchPetById, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!pet) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit {pet.name}</h1>
      <PetEditForm pet={pet} />
    </div>
  );
}

export default PetEditPage;
