import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FAQS } from "../../constants/faqs";
import { ADDITIONAL_FAQS } from "../../constants/additionalFaqs";

function Help() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
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
    <div className="container mx-auto px-8 my-16 mb-32">
      <div className="flex flex-col gap-16">
        {/* header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions and learn how to make the most of
            VetiGO's features.
          </p>

          {/* searchbar */}
          <div className="form-control w-full max-w-md mx-auto mb-2">
            <input
              type="text"
              placeholder="Search for help..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* tabs */}
        <div className="tabs tabs-bordered flex justify-center">
          <button
            className={`tab tab-bordered ${
              activeCategory === "general" ? "tab-active" : ""
            }`}
            onClick={() => setActiveCategory("general")}
          >
            <span className="text-lg ml-2">General</span>
          </button>

          <button
            className={`tab tab-bordered ${
              activeCategory === "account" ? "tab-active" : ""
            }`}
            onClick={() => setActiveCategory("account")}
          >
            <span className="text-lg ml-2">Account</span>
          </button>

          <button
            className={`tab tab-bordered ${
              activeCategory === "appointments" ? "tab-active" : ""
            }`}
            onClick={() => setActiveCategory("appointments")}
          >
            <span className="text-lg ml-2">Appointments</span>
          </button>

          <button
            className={`tab tab-bordered ${
              activeCategory === "technical" ? "tab-active" : ""
            }`}
            onClick={() => setActiveCategory("technical")}
          >
            <span className="text-lg ml-2">Technical</span>
          </button>
        </div>
        {/* results */}
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
        {/* faqs */}
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
