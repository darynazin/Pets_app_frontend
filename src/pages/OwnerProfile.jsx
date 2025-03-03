import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { uploadUserImage } from "../services/api";
import Swal from "sweetalert2";

function OwnerProfile() {
  const { user, update, remove, loading: contextLoading } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    newPassword: "",
    image: user?.image || null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        image: user.image || null,
      }));
      setPreviewUrl(user.image || null);
    }
  }, [user]);

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
          const imageResponse = await uploadUserImage(user._id, imageFile);
          imageUrl = imageResponse.data.image;
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
          setError("Failed to upload image. Please try again.");
          setLoading(false);
          return;
        }
      }

      const updateData = {
        name: formData.name.trim(),
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      if (formData.newPassword) {
        updateData.newPassword = formData.newPassword;
      }

      if (imageUrl !== undefined) {
        updateData.image = imageUrl;
      }

      const updatedUser = await update(updateData);

      if (updatedUser) {
        setFormData((prev) => ({
          ...prev,
          name: updatedUser.name,
          image: updatedUser.image,
          password: "",
          newPassword: "",
        }));
        navigate("/mypets");
      }
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your account and cancel all appointments.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await remove();
        Swal.fire("Deleted!", "Your account has been deleted.", "success").then(() => {
          navigate("/");
        });
      } catch (err) {
        Swal.fire("Delete Failed", "Failed to delete account. Try again later.", "error");
        setLoading(false);
      }
    }
  };

  if (contextLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
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
            onChange={handleInputChange}
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
            value={formData.email}
            className="input input-bordered"
            disabled
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onClick={() => navigate("/mypets")}
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
  );
}

export default OwnerProfile;
