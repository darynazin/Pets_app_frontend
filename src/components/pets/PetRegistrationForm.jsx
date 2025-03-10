import { useState } from "react";
import { createPet, uploadPetImage } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { usePet } from "../../contexts/PetContext";
import { formatDateForInput, formatDateForAPI } from "../../utils/dateUtils";
import Swal from "sweetalert2";

const PetRegistrationForm = () => {
  const navigate = useNavigate();
  const { fetchPets } = usePet();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    birthDate: formatDateForInput(new Date()),
    additionalNotes: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loadingToast = Swal.fire({
        title: "Registering your pet",
        html: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const petData = {
        ...formData,
        birthDate: formatDateForAPI(formData.birthDate),
      };

      const response = await createPet(petData);
      console.log("Full pet creation response:", response);

      let petId;
      if (response.data?.pet?._id) {
        petId = response.data.pet._id;
      } else if (response.data?._id) {
        petId = response.data._id;
      } else if (response._id) {
        petId = response._id;
      } else {
        console.error("Could not find pet ID in response:", response);
        throw new Error("Could not find pet ID in server response");
      }

      if (imageFile) {
        try {
          const imageResponse = await uploadPetImage(petId, imageFile);
          console.log("Image upload response:", imageResponse.data);
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
        }
      }

      loadingToast.close();
      await fetchPets();

      setLoading(false);

      const result = await Swal.fire({
        title: "Success!",
        text: `${formData.name} has been added to your pets!`,
        icon: "success",
        confirmButtonText: "View My Pets",
        showCancelButton: true,
        cancelButtonText: "Add Another Pet",
      });

      if (result.isConfirmed) {
        navigate("/mypets");
      } else {
        setFormData({
          name: "",
          species: "",
          breed: "",
          birthDate: formatDateForInput(new Date()),
          additionalNotes: "",
        });
        setImageFile(null);
        setPreviewUrl(null);
      }

      return;
    } catch (err) {
      console.error("Pet registration error:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to register pet";

      setError(errorMessage);

      Swal.fire({
        title: "Registration Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
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
          <span className="label-text">Pet Type</span>
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

      <button
        type="submit"
        className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
        disabled={loading}
      >
        Add new pet
      </button>
    </form>
  );
};

export default PetRegistrationForm;
