import { createContext, useContext, useState, useEffect } from "react";
import {
  getUserAppointments,
  getDoctorAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/api";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const { data } = await getUserAppointments();
      setAppointments(data);
    } catch (err) {
      console.error("Failed to fetch user appointments:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorAppointments = async (doctorId) => {
    setLoading(true);
    try {
      const { data } = await getDoctorAppointments(doctorId);
      setAppointments(data);
    } catch (err) {
      console.error("Failed to fetch doctor appointments:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      const { data } = await createAppointment(appointmentData);
      setAppointments((prev) => [...prev, data]);
    } catch (err) {
      console.error("Failed to create appointment:", err);
    } finally {
      setLoading(false);
    }
  };

  const editAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      const { data } = await updateAppointment(appointmentData);
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === data._id ? data : appt))
      );
    } catch (err) {
      console.error("Failed to update appointment:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      await deleteAppointment(appointmentId);
      setAppointments((prev) =>
        prev.filter((appt) => appt._id !== appointmentId)
      );
    } catch (err) {
      console.error("Failed to delete appointment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        fetchAppointments,
        appointments,
        loading,
        addAppointment,
        editAppointment,
        removeAppointment,
        fetchDoctorAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const {
    fetchAppointments,
    appointments,
    loading,
    addAppointment,
    editAppointment,
    removeAppointment,
    fetchDoctorAppointments,
  } = useContext(AppointmentContext);

  return {
    fetchAppointments,
    appointments,
    loading,
    addAppointment,
    editAppointment,
    removeAppointment,
    fetchDoctorAppointments,
  };
};
