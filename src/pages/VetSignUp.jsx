import React from "react";
import { useDoctor } from "../contexts/DoctorContext";
import { useState } from "react";
import AuthForm from "../components/AuthForm";

function VetSignUp() {
  const { register } = useDoctor();
  const [error, setError] = useState("");

  const handleRegister = async (values) => {
    try {
      await register(values);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-20 px-4">
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Vet Sign Up</h1>
          <AuthForm
            isRegistering={true}
            isVetRegistering={true}
            onSubmit={handleRegister}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default VetSignUp;
