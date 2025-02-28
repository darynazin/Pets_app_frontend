import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../contexts/DoctorContext";
import { uploadDoctorImage } from "../services/api";
import Swal from "sweetalert2";

function VetProfile() {
  const {
    doctor,
    updateDoctorInfo,
    deleteDoctorAccount,
    loading, 
    setLoading,
    error,
    setError
  } = useDoctor();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(doctor?.image || null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    newPassword: "",
    image: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || "",
        email: doctor.email || "",
        address: doctor.address || "",
        phone: doctor.phoneNumber || "",
        password: "",
        newPassword: "",
        image: doctor.image || "",
      });
      setPreviewUrl(doctor.image || null);
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
    setLoading(true);
    setError("");

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        try {
          const imageResponse = await uploadDoctorImage(doctor._id, imageFile);
          imageUrl = imageResponse.data.image;
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
          setError("Failed to upload image. Please try again.");
          setLoading(false);
          return;
        }
      }

      const updatedData = {
        _id: doctor._id,
        name: formData.name.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        password: formData.password.trim(),
        newPassword: formData.newPassword.trim(),
        phoneNumber: formData.phone.trim(),
        image: imageUrl,
      };

      const updatedDoctor = await updateDoctorInfo(updatedData);

      if (updatedDoctor) {
        setFormData((prev) => ({
          ...prev,
          name: updatedDoctor.name || "",
          email: updatedDoctor.email || "",
          address: updatedDoctor.address || "",
          phone: updatedDoctor.phoneNumber || "",
          password: "",
          newPassword: "",
          image: updatedDoctor.image || "",
        }));
        setPreviewUrl(updatedDoctor.image || null);
        Swal.fire("Success", "Profile updated successfully", "success");
      }
      Swal.fire("Success", "Profile updated successfully", "success");


      

    } catch (err) {
      setError(err);
      Swal.fire("Error", "Failed to update profile. Please try again.", "error");

    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoctorAccount();
          Swal.fire("Deleted!", "Your account has been deleted.", "success");
          navigate("/");
        } catch (err) {
          Swal.fire(
            "Error!",
            "Failed to delete account. Please try again.",
            "error"
          );
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return doctor && (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div className="flex flex-col items-center space-y-3">
            <label className="flex items-center px-4 py-2 rounded-lg cursor-pointer hover:underline transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              📂 Update Image
            </label>
          </div>
        </div>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          disabled
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Current Password"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white py-2 rounded mt-4"
      >
        Delete Account
      </button>
    </div>
  )
}

export default VetProfile;
