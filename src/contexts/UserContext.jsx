import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  deleteUser,
} from "../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, setUser, loading: sessionLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (!user) return;
    try {
      setLoading(true);

      const { data } = await getUser();
      setUser(data);
    } catch (err) {
      setError(err.message || "Failed to fetch user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setError(null);
    try {
      setLoading(true);
      const response = await loginUser(credentials);
      setUser(response.data.user);
      navigate("/mypets");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);

      const response = await registerUser(userData);
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const update = async (userData) => {
    try {
      setLoading(true);
      const response = await updateUser(userData);
      if (response?.data) {
        setUser(response.data);
        return response.data;
      }
      throw new Error("Failed to update user");
    } catch (err) {
      console.error("Failed to update user:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    try {
      setLoading(true);
      await deleteUser();
      setUser(null);
    } catch (err) {
      console.error("Failed to delete user:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        fetchUser,
        user,
        loading: sessionLoading || loading,
        login,
        register,
        logout,
        update,
        remove,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const {
    fetchUser,
    user,
    loading,
    login,
    register,
    logout,
    update,
    remove,
    error,
  } = useContext(UserContext);

  return {
    fetchUser,
    user,
    loading,
    login,
    register,
    logout,
    update,
    remove,
    error,
  };
};
