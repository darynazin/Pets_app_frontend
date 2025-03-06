import PetRegistrationForm from "../components/pets/PetRegistrationForm";

const PetRegistrationPage = () => {
  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-2xl font-bold text-center mb-6">Register New Pet</h1>
      <PetRegistrationForm />
    </div>
  );
};

export default PetRegistrationPage;
