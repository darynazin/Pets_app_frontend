import { createContext, useContext, useState, useEffect } from "react";
import { getMyPets, createPet, updatePet, getPetById } from "../services/api";

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    try {
      const { data } = await getMyPets();
      setPets(data);
    } catch (err) {
      console.error("Failed to fetch pets:", err);
      setPets([]); // Empty the pets list on error
    } finally {
      setLoading(false);
    }
  };

  const addPet = async (petData) => {
    try {
      setLoading(true);
      const { data } = await createPet(petData);
      setPets((prevPets) => [...prevPets, data]); // Add the new pet to the state
    } catch (err) {
      console.error("Failed to add pet:", err);
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
      ); // Update the pet in the state
    } catch (err) {
      console.error("Failed to edit pet:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPetById = async (petId) => {
    try {
      setLoading(true);
      const { data } = await getPetById(petId);
      return data; // Return the pet data
    } catch (err) {
      console.error("Failed to fetch pet by ID:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PetContext.Provider
      value={{ fetchPets, pets, loading, addPet, editPet, fetchPetById }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  const { fetchPets, pets, loading, addPet, editPet, fetchPetById } =
    useContext(PetContext);

  return { fetchPets, pets, loading, addPet, editPet, fetchPetById };
};
