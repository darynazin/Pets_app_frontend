import { useState } from "react";
import {getRecommendations} from "../services/api";

const Assisitant = () => {
  const questions = [
    "What kind of pet do you have? (Dog, cat, rabbit, etc.)",
    "What is your pet's age(years)?",
    "What breed is your pet?",
    "How much does your pet weigh(kg)?",
    "What symptoms is your pet showing?",
    "When did the symptoms start?"
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNext = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const query = `My pet is a ${data[0]}, ${data[1]} years old, breed: ${data[2]}, weighing ${data[3]} kg. It is showing symptoms: ${data[4]} since ${data[5]}. What recommendations do you have?`;
      const result = await getRecommendations({ query });
      setResponse(result);
    } catch (error) {
      setResponse("Error fetching recommendations.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-80 border border-gray-200 mx-auto mt-10">
      <h3 className="font-bold text-lg mb-2">First aid Assistant</h3>
      {response ? (
        <div className="p-2 bg-gray-100 rounded">
          <p className="text-sm">{response}</p>
        </div>
      ) : loading ? (
        <p className="text-sm">Loading...</p>
      ) : (
        <div>
          <p className="text-sm mb-2">{questions[step]}</p>
          <input
            type="text"
            className="input input-bordered w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                handleNext(e.target.value);
                e.target.value = "";
              }
            }}
            placeholder="Type your answer..."
          />
        </div>
      )}
    </div>
  );
};

export default Assisitant;
