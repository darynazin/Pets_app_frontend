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
    <div className="container mx-auto px-8">
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
                <button type="submit" className="btn btn-accent">
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
          <div className="bg-white flex flex-col gap-3">
            <div className="text-green-500 text-4xl">✅</div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span>🆘 AI First Aid Assistant</span>
            </div>
            <p className="text-gray-600">
              Get instant, vet-approved first aid steps tailored to your pet’s
              situation.
            </p>
          </div>

          <div className="bg-white flex flex-col gap-3">
            <div className="text-green-500 text-4xl">✅</div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span>📅 Instant Vet Booking</span>
            </div>
            <p className="text-gray-600">
              No more waiting on hold—see available slots and book in seconds.
            </p>
          </div>

          <div className="bg-white flex flex-col gap-3">
            <div className="text-green-500 text-4xl">✅</div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span>🏥 Find Trusted Vets</span>
            </div>
            <p className="text-gray-600">
              Easily locate nearby clinics with reviews, contact info, and
              directions.
            </p>
          </div>
        </div>
        <section className="faq my-24">
          <div className="faq-container bg-gray-50 p-10 rounded-lg">
            <div className="flex flex-col md:flex-row md:gap-10">
              <div className="faq-des w-full md:w-1/3 mb-10 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 mb-6">
                  Frequently asked questions ordered by popularity. If you still
                  have any doubts, feel free to ask!
                </p>
                <button className="btn">Contact us</button>
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
