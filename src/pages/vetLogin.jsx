import React from "react";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useDoctor } from "../contexts/DoctorContext";

function VetLogIn() {
  const { loginVet, error } = useDoctor();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (values) => {
    await loginVet(values);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Vet Login</h1>
        <AuthForm
          isRegistering={false}
          isVetLogIn={true}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleLogin}
          error={error}
        />
      </div>
    </div>
  );
}

export default VetLogIn;
