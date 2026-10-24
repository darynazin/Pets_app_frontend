// Calendar dates (including API birth dates) keep their written date in every timezone.
export const parseCalendarDate = (date) => {
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}(?:T|$)/.test(date)) {
    const [year, month, day] = date.slice(0, 10).split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date(date);
};

export const formatDateForInput = (date) => {
  if (!date) return null;
  const localDate = parseCalendarDate(date);
  return [
    localDate.getFullYear(),
    String(localDate.getMonth() + 1).padStart(2, "0"),
    String(localDate.getDate()).padStart(2, "0"),
  ].join("-");
};

export const formatDateForAPI = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;

  try {
    const today = new Date();
    const birth = parseCalendarDate(birthDate);

    if (isNaN(birth.getTime())) return 0;

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  } catch (error) {
    console.error("Error calculating age:", error);
    return 0;
  }
};

export const generateTimeSlots = (
  startHour = 9,
  endHour = 17,
  interval = 30
) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += interval) {
      const time = `${hour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      slots.push(time);
    }
  }
  return slots;
};

export const isTimeSlotAvailable = (timeSlot, existingAppointments, date) => {
  return !existingAppointments.some(
    (app) => app.date === date && app.timeSlot === timeSlot
  );
};

export const formatTimeSlot = (timeSlot) => {
  return new Date(`1970-01-01T${timeSlot}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
