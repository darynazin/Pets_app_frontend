import DoctorsMap from "../components/DoctorsMap";
import { useEffect } from "react";
import { useDoctor } from "../contexts/DoctorContext";
import VetCard from "../components/vets/VetCard";

function FindVet() {
  const {
    filteredDoctors,
    fetchDoctors,
    searchTerm,
    setSearchTerm,
    filterDoctors,
    doctors,
  } = useDoctor();

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (doctors.length > 0) {
      filterDoctors(searchTerm);
    }
  }, [searchTerm, doctors]);

  return (
    <div className="container mx-auto px-4 my-8 mb-12 sm:px-6 lg:px-8 lg:my-20 lg:mb-32">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] xl:gap-10">
        <div className="min-w-0">
          <div className="mb-4 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctors by name or address..."
              aria-label="Search doctors by name or address"
              className="input input-bordered focus:outline-none focus:ring-0 w-full min-w-0"
            />
          </div>
          <div className="max-h-[500px] overflow-y-auto overflow-x-hidden lg:h-[500px]">
            {filteredDoctors.map((doctor) => (
              <VetCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        </div>
        <DoctorsMap />
      </div>
    </div>
  );
}

export default FindVet;
