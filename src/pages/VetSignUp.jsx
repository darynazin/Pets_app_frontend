import React from "react";
import { useDoctor } from "../contexts/DoctorContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm";

function VetSignUp() {
  const navigate = useNavigate();
  const { register } = useDoctor();
  const [error, setError] = useState("");

  const handleRegister = async (values) => {
    try {
      await register(values);
      navigate("/vet/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Vet Sign Up</h1>
        <AuthForm
          isRegistering={true}
          isVetRegistering={true}
          onSubmit={handleRegister}
          error={error}
        />
      </div>
    </div>
  );
}

export default VetSignUp;
