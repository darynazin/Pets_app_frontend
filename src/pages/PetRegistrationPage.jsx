import PetRegistrationForm from "../components/pets/PetRegistrationForm";

const PetRegistrationPage = () => {
  return (
    <div className="container mx-auto p-4 max-w-xl mb-32">
      <h1 className="text-3xl font-bold mb-8">Add a new pet</h1>
      <PetRegistrationForm />
    </div>
  );
};

export default PetRegistrationPage;
