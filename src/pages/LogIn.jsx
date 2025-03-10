import React from "react";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useUser } from "../contexts/UserContext";

function LogIn() {
  const { login, error } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
    petsId: "[]",
  });

  const handleLogin = async (values) => {
    await login(values);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-20 px-4">
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          <AuthForm
            isRegistering={false}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleLogin}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
