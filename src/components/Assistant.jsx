import { useState } from "react";
import { getRecommendations } from "../services/api";

const Assistant = () => {
  const questions = [
    "What type of pet do you have? (Dog, cat, rabbit, etc.)",
    "How old is your pet? (In years)",
    "What breed is your pet? (e.g., Pug, Siamese, mixed, etc.)",
    "How much does your pet weigh? (kg)",
    "What symptoms is your pet showing? (List key signs like vomiting, limping, etc.)",
    "When did the symptoms start? (e.g., Just now, a few hours ago, a day ago, etc.)",
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const totalSteps = questions.length;

  const handleBack = () => {
    if (step > 0) {
      const newAnswers = [...answers];
      newAnswers.pop();
      setInputValue(answers[step - 1] || "");
      setStep(step - 1);
      setAnswers(newAnswers);
    }
  };

  const handleNext = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setInputValue("");

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
      const response = await getRecommendations({ query });
      setResponse(response.data);
      console.log(response.data);
    } catch (error) {
      setResponse("Error fetching recommendations.");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setResponse(null);
    setInputValue("");
  };

  const stepLabels = [
    "Pet Type",
    "Age",
    "Breed",
    "Weight",
    "Symptoms",
    "Duration",
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {!response && !loading && (
        <div className="flex justify-center mb-8">
          <ul className="steps steps-horizontal w-full">
            {stepLabels.map((label, i) => (
              <li key={i} className={`step ${i <= step ? "step-primary" : ""}`}>
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 flex items-center gap-2">
            <span className="text-xl">🚑</span>
            First Aid Assistant
          </h2>

          {response ? (
            <div className="space-y-6">
              {/* First Aid Recommendations - Now more prominent and with white background */}
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  First Aid Recommendations
                </h3>
                <div className="bg-white p-6 rounded-lg border border-base-300 shadow-sm">
                  <div className="prose max-w-none">
                    {response && (
                      <div className="space-y-6">
                        {response
                          .split(/\d+\./)
                          .filter(Boolean)
                          .map((item, index) => {
                            // Extract the first few words as the "keyword" (up to the first period or colon)
                            const parts = item.trim().split(/[:\.]/);
                            const keyword = parts[0].trim();
                            const description = parts.slice(1).join(":").trim();

                            return (
                              <div key={index} className="flex gap-2">
                                <span className="font-medium text-primary min-w-[24px]">
                                  {index + 1}.
                                </span>
                                <div>
                                  <span className="font-medium">
                                    {keyword}:{" "}
                                  </span>
                                  <span>{description}</span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Pet Information - Now with less padding and secondary importance */}
              <div className="bg-base-200 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Pet Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {questions.map((question, index) => (
                    <div
                      key={index}
                      className="bg-base-100 p-3 rounded-lg shadow-sm"
                    >
                      <p className="text-xs text-base-content/70">{question}</p>
                      <p className="font-medium">{answers[index]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-sm">
                  This is AI-generated advice and should not replace
                  professional veterinary care. If your pet is in distress,
                  please contact a veterinarian immediately.
                </span>
              </div>

              <div className="flex justify-center">
                <button onClick={handleReset} className="btn btn-primary">
                  Start New Consultation
                </button>
              </div>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
              <p className="text-center text-base-content/70 mb-2">
                Analyzing your pet's symptoms...
              </p>
              <p className="text-center text-xs text-base-content/50">
                This may take a moment
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center border-b pb-3">
                {questions[step]}
              </h3>

              {answers.length > 0 && (
                <div className="mb-6">
                  <div className="bg-base-200 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-base-content/70 mb-3">
                      Previous answers:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {answers.map(
                        (answer, index) =>
                          index < step && (
                            <div
                              key={index}
                              className="flex items-center border-b border-base-300 pb-2 last:border-0"
                            >
                              <div>
                                <p className="text-sm text-base-content/70">
                                  {stepLabels[index]}
                                </p>
                                <p className="font-medium">{answer}</p>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="form-control mb-6">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder={`Enter your pet's ${stepLabels[
                    step
                  ].toLowerCase()}...`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && inputValue.trim()) {
                      handleNext(inputValue.trim());
                    }
                  }}
                  autoFocus
                />
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="btn btn-outline"
                  disabled={step === 0}
                >
                  Back
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    inputValue.trim() && handleNext(inputValue.trim())
                  }
                  disabled={!inputValue.trim()}
                >
                  {step === questions.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assistant;
