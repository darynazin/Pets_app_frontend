import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyPets,
  createPet,
  updatePet,
  getPetById,
  deletePet as apiDeletePet,
} from "../services/api";

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  const fetchPets = async () => {
    try {
      const { data } = await getMyPets();
      setPets(data);
    } catch (err) {
      setError(err.message || "Failed to fetch pets");
      setPets([]); // Empty the pets list on error
    } finally {
      setLoading(false);
    }
  };

  const addPet = async (petData) => {
    try {
      setLoading(true);
      const { data } = await createPet(petData);
      setPets((prevPets) => [...prevPets, data]);
    } catch (err) {
      setError(err.message || "Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  const editPet = async (petData) => {
    try {
      setLoading(true);
      const { data } = await updatePet(petData);
      setPets((prevPets) =>
        prevPets.map((pet) => (pet._id === data._id ? data : pet))
      );
    } catch (err) {
      setError(err.message || "Failed to edit pet");
    } finally {
      setLoading(false);
      navigate("/mypets");
    }
  };

  const fetchPetById = async (petId) => {
    try {
      setLoading(true);
      const response = await getPetById(petId);
      setPet(response.data);
    } catch (err) {
      console.error("Error:", err);
      setError(err || "Failed to fetch pet");
      setPet(null);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (petId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    responce = await uploadPetImage(petId, formData);
  };

  const deletePet = async (petId) => {
    try {
      setLoading(true);
      await apiDeletePet(petId);
      // Remove the pet from local state immediately
      setPets((prevPets) => prevPets.filter((pet) => pet._id !== petId));
      // Clear any cached data
      await fetchPets();
      navigate("/mypets", { replace: true });
      return true;
    } catch (err) {
      console.error("Failed to delete pet:", err);
      throw err;
    } finally {
      setLoading(false);
      navigate("/mypets", { replace: true });
    }
  };

  return (
    <PetContext.Provider
      value={{
        fetchPets,
        pets,
        pet,
        setPet,
        loading,
        setLoading,
        addPet,
        editPet,
        fetchPetById,
        deletePet,
        error,
        uploadImage,
        setError,
        uploadImage
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  const {
    fetchPets,
    pets,
    loading,
    setLoading,
    addPet,
    editPet,
    fetchPetById,
    pet,
    setPet,
    error,
    setError,
    deletePet,
    uploadImage,
  } = useContext(PetContext);

  return {
    fetchPets,
    pets,
    loading,
    setLoading,
    addPet,
    editPet,
    fetchPetById,
    pet,
    setPet,
    error,
    setError,
    deletePet,
    uploadImage,
  };
};
