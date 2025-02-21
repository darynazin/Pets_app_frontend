import { useState } from "react";
import { createPet, uploadPetImage } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { usePet } from "../../contexts/PetContext";

const PetRegistrationForm = () => {
  const navigate = useNavigate();
  const { fetchPets } = usePet();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    additionalNotes: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // Add this state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await createPet(formData);
      const petId = response.data._id;

      if (imageFile) {
        await uploadPetImage(petId, imageFile);
      }

      await fetchPets();
      navigate("/mypets");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center mb-6">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full ring ring-gray-300">
            {previewUrl ? (
              <img src={previewUrl} alt="Pet preview" />
            ) : (
              <div className="bg-gray-200 w-full h-full rounded-full" />
            )}
          </div>
        </div>
        <label className="btn btn-outline btn-sm mt-2">
          Choose Image
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Pet Name</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Species</span>
        </label>
        <input
          type="text"
          name="species"
          value={formData.species}
          onChange={handleInputChange}
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Breed</span>
        </label>
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleInputChange}
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Age</span>
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Additional Notes</span>
        </label>
        <textarea
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleInputChange}
          className="textarea textarea-bordered h-24"
        />
      </div>

      <button
        type="submit"
        className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
        disabled={loading}
      >
        Register Pet
      </button>
    </form>
  );
};

export default PetRegistrationForm;
