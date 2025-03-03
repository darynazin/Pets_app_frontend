import React from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm";

function SignUp() {
  const navigate = useNavigate();
  const { register } = useUser();
  const [error, setError] = useState("");

  const handleRegister = async (values) => {
    try {
      await register(values);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-20 px-4">
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
          <AuthForm
            isRegistering={true}
            onSubmit={handleRegister}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
