import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePet } from "../../contexts/PetContext";
import { formatDateForInput } from "../../utils/dateUtils";
import { uploadPetImage } from "../../services/api";

const PetEditForm = ({ pet }) => {
  const navigate = useNavigate();
  const {
    editPet,
    deletePet,
    loading,
    setLoading,
    error,
    setError,
    uploadImage,
  } = usePet();

  const [formData, setFormData] = useState({
    _id: pet._id,
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    birthDate:
      formatDateForInput(pet.birthDate) || formatDateForInput(new Date()), // Format the date
    additionalNotes: pet.additionalNotes || "",
    image: pet.image,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(pet.image);

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
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      let finalImageUrl = formData.image;

      if (imageFile) {
        try {
          const imageResponse = await uploadImage(pet._id, imageFile);
          if (imageResponse && imageResponse.data) {
            finalImageUrl =
              imageResponse.data.imageUrl ||
              imageResponse.data.image ||
              formData.image;
          }
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
          setError("Failed to upload image. Pet details were not updated.");
          setLoading(false);
          return;
        }
      }

      await editPet({
        ...formData,
        image: finalImageUrl,
      });

      navigate("/mypets");
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.message || "Failed to update pet");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePet = () => {
    if (!window.confirm("Are you sure you want to delete this pet?")) {
      return;
    }

    try {
      setLoading(true);
      deletePet(formData._id);
      // Navigate immediately after successful deletion
      // Using replace to prevent back navigation
    } catch (err) {
      setError("Failed to delete pet");
      console.error("Delete failed:", err);
      setLoading(false); // Only set loading false on error
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col items-center mb-6">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full ring ring-primary">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Pet preview"
                className="rounded-full"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full rounded-full" />
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <label className="btn btn-outline btn-sm">
            Change Image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {(previewUrl || formData.image) && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="btn btn-outline btn-error btn-sm"
            >
              Remove Image
            </button>
          )}
        </div>
      </div>

      {/* Form fields */}
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
          <span className="label-text">Birth Date</span>
        </label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          className="input input-bordered"
          max={new Date().toISOString().split("T")[0]}
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

      <div className="flex gap-4">
        <button
          type="submit"
          className={`btn btn-primary flex-1 ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Save Changes
        </button>
        <button
          type="button"
          className="btn btn-outline btn-error flex-1"
          onClick={() => navigate("/mypets")}
        >
          Cancel
        </button>
      </div>
      <div className="flex gap-4 mt-4">
        <button
          type="button"
          className="btn btn-error w-full"
          onClick={handleDeletePet}
          disabled={loading}
        >
          Delete Pet
        </button>
      </div>
    </form>
  );
};

export default PetEditForm;
