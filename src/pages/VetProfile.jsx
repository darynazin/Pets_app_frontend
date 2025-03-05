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
    loading: contextLoading,
    setLoading: setContextLoading,
    error: contextError,
    setError: setContextError,
    fetchDoctor,
  } = useDoctor();

  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(doctor?.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
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
        phoneNumber: formData.phone.trim(),
        image: imageUrl,
      };

      if (formData.password) {
        updatedData.password = formData.password.trim();
      }

      if (formData.newPassword) {
        updatedData.newPassword = formData.newPassword.trim();
      }

      const updatedDoctor = await updateDoctorInfo(updatedData);
      if (updatedDoctor) {
        fetchDoctor();
        setPreviewUrl(updatedDoctor.image || null);
        setFormData((prev) => ({
          ...prev,
          password: "",
          newPassword: "",
        }));
        Swal.fire("Success", "Profile updated successfully", "success");
        navigate("/appointments");
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
      Swal.fire(
        "Error",
        "Failed to update profile. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your account and all appointments.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        setLoading(true);
        await deleteDoctorAccount();
        Swal.fire("Deleted!", "Your account has been deleted.", "success").then(
          () => {
            navigate("/");
          }
        );
      } catch (err) {
        Swal.fire(
          "Delete Failed",
          "Failed to delete account. Try again later.",
          "error"
        );
        setLoading(false);
      }
    }
  };

  if (contextLoading || !doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 my-20 mb-32">
      <h1 className="text-3xl font-bold mb-8">{doctor.name}'s Profile Page</h1>
      <div className="max-w-md mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col items-center mb-6">
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-primary mb-4">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="rounded-full object-cover"
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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="input input-bordered"
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Current Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner loading-xs mr-2"></span>
              )}
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline btn-error flex-1"
              onClick={() => navigate("/appointments")}
            >
              Cancel
            </button>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="btn btn-error w-full"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VetProfile;
