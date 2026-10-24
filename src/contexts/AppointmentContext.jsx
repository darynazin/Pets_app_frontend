import { createContext, useContext, useState } from "react";
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
  const [doctorAppointments, setDoctorAppointments] = useState([]);

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

  const fetchDoctorAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await getDoctorAppointments();
      setDoctorAppointments(data);
    } catch (err) {
      console.error("Failed to fetch doctor appointments:", err);
      setDoctorAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      await createAppointment(appointmentData);
    } catch (err) {
      console.error("Failed to create appointment:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      await updateAppointment(appointmentData);
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
      setAppointments((previous) => previous.filter((item) => item._id !== appointmentId));
      setDoctorAppointments((previous) => previous.filter((item) => item._id !== appointmentId));
    } catch (err) {
      console.error("Failed to delete appointment:", err);
      throw err;
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
        doctorAppointments
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
    doctorAppointments
  } = useContext(AppointmentContext);

  return {
    fetchAppointments,
    appointments,
    loading,
    addAppointment,
    editAppointment,
    removeAppointment,
    fetchDoctorAppointments,
    doctorAppointments
  };
};
