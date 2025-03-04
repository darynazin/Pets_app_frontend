import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FAQS } from "../../constants/faqs";

// Additional FAQ categories
const ADDITIONAL_FAQS = {
  account: [
    {
      question: "How do I create an account?",
      answer:
        "Creating an account is simple! Click 'Sign Up' in the top-right corner of the homepage, fill in your details, and you're set. You can sign up using your email or through social media accounts.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "If you've forgotten your password, click 'Login' and then 'Forgot password?' Enter the email address associated with your account, and we'll send you a link to reset your password.",
    },
    {
      question: "Can I have multiple pets on one account?",
      answer:
        "Absolutely! You can add as many pets as you need to your account. Go to 'My Pets' section and click 'Add New Pet' to enter your pet's information including name, species, breed, age, and any relevant medical history.",
    },
  ],
  appointments: [
    {
      question: "How far in advance can I book an appointment?",
      answer:
        "You can book appointments up to 60 days in advance, depending on the vet clinic's availability. Some clinics may have different scheduling policies, which will be indicated on their profile.",
    },
    {
      question: "Can I book recurring appointments?",
      answer:
        "Currently, you need to book each appointment individually. However, you can easily view your pet's appointment history and schedule follow-ups from the same clinic through your dashboard.",
    },
    {
      question: "What information do I need to provide when booking?",
      answer:
        "When booking an appointment, you'll need to select your pet, indicate the reason for the visit, choose a date and time, and provide any additional notes about your pet's condition that might be helpful for the vet.",
    },
  ],
  technical: [
    {
      question: "Is my data secure on the platform?",
      answer:
        "Yes, we take data security seriously. All personal and pet information is encrypted and stored securely. We comply with GDPR and other relevant data protection regulations. You can review our privacy policy for more details.",
    },
    {
      question: "What browsers are supported?",
      answer:
        "VetiGO is optimized for modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated to the latest version.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Our website is fully responsive and works well on mobile devices. While a dedicated mobile app is in development, you can currently access all features through your mobile browser.",
    },
  ],
};

function Help() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Scroll to section if hash is present in URL
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    if (searchTerm) {
      const allFaqs = [
        ...FAQS.map((faq) => ({ ...faq, category: "general" })),
        ...ADDITIONAL_FAQS.account.map((faq) => ({
          ...faq,
          category: "account",
        })),
        ...ADDITIONAL_FAQS.appointments.map((faq) => ({
          ...faq,
          category: "appointments",
        })),
        ...ADDITIONAL_FAQS.technical.map((faq) => ({
          ...faq,
          category: "technical",
        })),
      ];

      const results = allFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const categoryLabels = {
    general: "General Questions",
    account: "Account & Profile",
    appointments: "Appointments",
    technical: "Technical Support",
  };

  return (
    <div className="container mx-auto px-8 my-16">
      <div className="flex flex-col gap-16">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions and learn how to make the most of
            VetiGO's features.
          </p>

          {/* Search Bar */}
          <div className="form-control max-w-md mx-auto">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search for help..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="tabs tabs-boxed justify-center">
          <a
            className={`tab ${
              activeCategory === "general" ? "tab-active" : ""
            }`}
            onClick={() => setActiveCategory("general")}
          >
            General
          </a>
          <a
            className={`tab ${
              activeCategory === "account" ? "tab-active" : ""
            }`}
            onClick={() => setActiveCategory("account")}
          >
            Account
          </a>
          <a
            className={`tab ${
              activeCategory === "appointments" ? "tab-active" : ""
            }`}
            onClick={() => setActiveCategory("appointments")}
          >
            Appointments
          </a>
          <a
            className={`tab ${
              activeCategory === "technical" ? "tab-active" : ""
            }`}
            onClick={() => setActiveCategory("technical")}
          >
            Technical
          </a>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <section id="search-results" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6">
              Search Results for "{searchTerm}"
            </h2>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-arrow bg-base-100 border border-base-300"
                  >
                    <input type="checkbox" />
                    <div className="collapse-title font-medium">
                      <span className="badge mr-2">
                        {categoryLabels[faq.category]}
                      </span>
                      {faq.question}
                    </div>
                    <div className="collapse-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>No results found. Try a different search term.</span>
              </div>
            )}
          </section>
        )}

        {/* FAQ Content */}
        {!searchTerm && (
          <div>
            {activeCategory === "general" && (
              <section id="general-faqs" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-6">
                  {categoryLabels.general}
                </h2>
                {FAQS.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-arrow bg-base-100 border border-base-300"
                  >
                    <input type="checkbox" />
                    <div className="collapse-title font-medium">
                      {faq.question}
                    </div>
                    <div className="collapse-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {activeCategory === "account" && (
              <section id="account-faqs" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-6">
                  {categoryLabels.account}
                </h2>
                {ADDITIONAL_FAQS.account.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-arrow bg-base-100 border border-base-300"
                  >
                    <input type="checkbox" />
                    <div className="collapse-title font-medium">
                      {faq.question}
                    </div>
                    <div className="collapse-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {activeCategory === "appointments" && (
              <section id="appointment-faqs" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-6">
                  {categoryLabels.appointments}
                </h2>
                {ADDITIONAL_FAQS.appointments.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-arrow bg-base-100 border border-base-300"
                  >
                    <input type="checkbox" />
                    <div className="collapse-title font-medium">
                      {faq.question}
                    </div>
                    <div className="collapse-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {activeCategory === "technical" && (
              <section id="technical-faqs" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold mb-6">
                  {categoryLabels.technical}
                </h2>
                {ADDITIONAL_FAQS.technical.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-arrow bg-base-100 border border-base-300"
                  >
                    <input type="checkbox" />
                    <div className="collapse-title font-medium">
                      {faq.question}
                    </div>
                    <div className="collapse-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Help;
