export const mockUserData = {
  pets: [
    {
      id: "1",
      name: "Max",
      species: "Dog",
      age: 3,
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3",
    },
    {
      id: "2",
      name: "Luna",
      species: "Cat",
      age: 2,
      image:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3",
    },
  ],
  appointments: [
    {
      id: "1",
      doctorName: "Dr. Smile",
      petId: "1",
      date: "2025-03-01",
      timeSlot: "10:00 AM",
      status: "upcoming",
    },
    {
      id: "2",
      doctorName: "Dr. Paws",
      petId: "2",
      date: "2025-01-15",
      timeSlot: "2:00 PM",
      status: "past",
    },
  ],
};

export const emergencyClinicData = [
  {
    id: 1,
    clinicName: "24/7 TierNotfall Berlin-Mitte",
    hours: "00:00-24:00",
    clinicAddress: "Alexanderstraße 5, 10178 Berlin",
    phone: "+49 30 1234 5678",
    location: "Berlin",
    services: ["Emergency Surgery", "Critical Care", "Trauma Care"],
  },
  {
    id: 2,
    clinicName: "VetEmergency Kreuzberg",
    hours: "00:00-24:00",
    clinicAddress: "Kottbusser Damm 22, 10967 Berlin",
    phone: "+49 30 8765 4321",
    location: "Berlin",
    services: ["Poison Control", "Emergency Surgery", "Intensive Care"],
  },
  {
    id: 3,
    clinicName: "Potsdam Pet Emergency",
    hours: "08:00-22:00",
    clinicAddress: "Am Kanal 5, 14467 Potsdam",
    phone: "+49 331 123 4567",
    location: "Potsdam",
    services: ["Emergency Surgery", "Critical Care"],
  },
  {
    id: 4,
    clinicName: "Brandenburg Emergency Vet",
    hours: "08:00-20:00",
    clinicAddress: "Hauptstraße 15, 14770 Brandenburg",
    phone: "+49 3381 987 6543",
    location: "Brandenburg",
    services: ["Trauma Care", "Critical Care"],
  },
  {
    id: 5,
    clinicName: "TierNotfall Prenzlauer Berg",
    hours: "00:00-24:00",
    clinicAddress: "Prenzlauer Allee 89, 10405 Berlin",
    phone: "+49 30 9876 5432",
    location: "Berlin",
    services: ["Emergency Surgery", "Intensive Care"],
  },
];
