import { createContext, useContext, useState, useEffect } from "react";
import {
  getDoctor,
  loginDoctor,
  logoutDoctor,
  registerDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} from "../services/api";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);


  const fetchDoctor = async () => {
    try {
      const { data } = await getDoctor();
      setDoctor(data);
    } catch (err) {
      console.error("Failed to fetch doctor:", err);
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = (query) => {
    if (!query) {
      fetchDoctors();
      return;
    }
    const lowercasedQuery = query.toLowerCase();
    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(lowercasedQuery) ||
        doctor.address.toLowerCase().includes(lowercasedQuery)
    );
    setDoctors(filtered);
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      await loginDoctor(credentials);
      const { data } = await getDoctor();
      setDoctor(data);
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (doctorData) => {
    try {
      setLoading(true);
      await registerDoctor(doctorData);
      const { data } = await getDoctor();
      setDoctor(data);
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutDoctor();
      setDoctor(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await getDoctors();
      setDoctors(data);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateDoctorInfo = async (doctorData) => {
    try {
      setLoading(true);
      await updateDoctor(doctorData);
      const { data } = await getDoctor();
      setDoctor(data);
    } catch (err) {
      console.error("Failed to update doctor:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctorAccount = async () => {
    try {
      setLoading(true);
      await deleteDoctor();
      setDoctor(null);
    } catch (err) {
      console.error("Failed to delete doctor account:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        doctor,
        doctors,
        loading,
        fetchDoctor,
        login,
        register,
        logout,
        fetchDoctors,
        updateDoctorInfo,
        deleteDoctorAccount,
        selectedDoctor,
        setSelectedDoctor,
        filterDoctors,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  const {
    doctor,
    doctors,
    loading,
    login,
    register,
    logout,
    fetchDoctor,
    fetchDoctors,
    updateDoctorInfo,
    deleteDoctorAccount,
    selectedDoctor,
    setSelectedDoctor,
    filterDoctors,
  } = useContext(DoctorContext);

  return {
    doctor,
    doctors,
    loading,
    login,
    register,
    logout,
    fetchDoctor,
    fetchDoctors,
    updateDoctorInfo,
    deleteDoctorAccount,
    selectedDoctor,
    setSelectedDoctor,
    filterDoctors,
  };
};
