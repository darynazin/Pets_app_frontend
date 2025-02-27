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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <AuthForm
          isRegistering={false}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleLogin}
          error={error}
        />
      </div>
    </div>
  );
}

export default LogIn;
