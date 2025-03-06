import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../contexts/DoctorContext";
import { FAQS } from "../constants/faqs";

function Home() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { setSearchTerm } = useDoctor();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
    setSearchTerm(search);
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-8 mt-20">
      <div className="flex flex-col gap-36 flex-grow">
        <div className="hero bg-base-100">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="ml-10">
              <h1 className="text-5xl font-bold">
                Book a Vet. Get Trusted Pet Care. Stress-Free.
              </h1>
              <p className="py-6">
                Find nearby vets, book appointments instantly, and access expert
                first aid tips—all in one place. No more phone calls, no more
                hassle.
              </p>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter Your Location"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
                <button
                  type="submit"
                  className="btn btn-accent  hover:btn-primary transition-colors duration-300"
                >
                  Find a Vet
                </button>
              </form>
              <p className="text-xs my-3">
                Quickly locate trusted vets in your area and book an appointment
                in just one step.
              </p>
            </div>
            <img
              src="/home.svg"
              className="rounded-lg max-w-full max-h-full"
              style={{ maxWidth: "480px", maxHeight: "480px" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Card 1: Get first aid assistance */}
          <div
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all transform"
            style={{ transition: "all 0.3s ease" }}
          >
            <div className="card-body flex flex-col justify-between h-full">
              <h2 className="card-title text-xl">
                <span>🆘 </span>
                AI First Aid Assistant
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Get instant, vet-approved first aid steps tailored to your
                  pet's situation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline text-green-500 border-green-500">
                    24/7 Available
                  </span>
                  <span className="badge badge-outline text-green-500 border-green-500">
                    Vet Approved
                  </span>
                </div>
              </div>
              <div className="card-actions justify-end mt-6">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/ai");
                  }}
                >
                  Try Now
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Instant Vet Booking */}
          <div
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all transform"
            style={{ transition: "all 0.3s ease" }}
          >
            <div className="card-body flex flex-col justify-between h-full">
              <h2 className="card-title text-xl">
                <span>📅 </span>
                Instant Vet Booking
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  No more waiting on hold—see available slots and book in
                  seconds.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline text-blue-500 border-blue-500">
                    Quick Booking
                  </span>
                  <span className="badge badge-outline text-blue-500 border-blue-500">
                    Verified Clinics
                  </span>
                </div>
              </div>
              <div className="card-actions justify-end mt-6">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "instant" });
                    navigate("/search");
                  }}
                >
                  Find Vets
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Find Trusted Vets */}
          <div
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all transform"
            style={{ transition: "all 0.3s ease" }}
          >
            <div className="card-body flex flex-col justify-between h-full">
              <h2 className="card-title text-xl">
                <span>🏥 </span>
                Are You a Vet?
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Join the Vet Network. Manage appointments effortlessly, and
                  grow your practice.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline text-purple-500 border-purple-500">
                    Practice Growth
                  </span>
                  <span className="badge badge-outline text-purple-500 border-purple-500">
                    Effortless Booking
                  </span>
                </div>
              </div>
              <div className="card-actions justify-end mt-6">
                <button
                  className="btn btn-primary btn-sm  hover:btn-accent transition-colors duration-300"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "instant" });
                    navigate("/vet/login");
                  }}
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className="faq my-24">
          <div className="faq-container bg-base-100 shadow-xl hover:shadow-2xl p-10 rounded-lg">
            <div className="flex flex-col md:flex-row md:gap-10">
              <div className="faq-des w-full md:w-1/3 mb-10 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 mb-6">
                  Frequently asked questions ordered by popularity. If you still
                  have any doubts, feel free to ask!
                </p>
                <button
                  className="btn"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "instant" });
                    navigate("/company/contact");
                  }}
                >
                  Contact us
                </button>
              </div>

              <div className="faq-accordion w-full md:w-2/3 space-y-4">
                {FAQS.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-arrow bg-base-100 border border-base-300"
                  >
                    <input
                      type="radio"
                      name="my-accordion-2"
                      defaultChecked={index === 0}
                    />
                    <div className="collapse-title font-semibold">
                      {faq.question}
                    </div>
                    <div className="collapse-content text-sm">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>{" "}
    </div>
  );
}

export default Home;
