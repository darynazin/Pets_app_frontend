import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  deleteUser,
  getSession,
  uploadUserImage,
} from "../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      setLoading(true);

      const sessionResponse = await getSession();
      if (!sessionResponse.data.authenticated && sessionResponse.data.user.role !== "user") {
        setUser(null);
        return;
      }

      const { data } = await getUser();
      setUser(data);
    } catch (err) {
      setError(err.message || "Failed to fetch user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getSession();
        if (response.data.authenticated && response.data.user.role === "user") {
          fetchUser();
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await loginUser(credentials);
      setUser(response.data.user);
      navigate("/mypets");
    } catch (err) {
      setError("Invalid email or password", err);
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
        loading,
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
