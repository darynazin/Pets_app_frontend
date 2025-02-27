import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../contexts/DoctorContext";

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

  const faqs = [
    {
      question: "How do I book an appointment with a vet?",
      answer:
        "Booking an appointment with a vet is simple and hassle-free. All you need to do is enter your city or zip code in the search bar, and you'll instantly see a list of available veterinary clinics near you. Each clinic's profile includes details such as operating hours, available services, customer reviews, and pricing information. Once you've selected a clinic, you can choose a time slot that fits your schedule and confirm your booking in just a few clicks. No need to call or wait on hold—everything is done online for your convenience. You will receive an email confirmation, and some clinics even offer reminders via text message to ensure you don’t miss your appointment.",
    },
    {
      question: "Is the AI First Aid Assistant free to use?",
      answer:
        "Yes! Our AI First Aid Assistant is completely free to use and is designed to provide immediate, expert-backed first aid guidance for your pet. Whether your pet is experiencing an emergency, showing unusual symptoms, or you simply need advice on minor injuries, our AI assistant can help. It’s built using verified veterinary resources and is constantly updated with the latest pet care information. However, please remember that the AI First Aid Assistant does not replace a professional veterinarian’s diagnosis. If your pet's condition seems serious, it is always best to consult a licensed vet as soon as possible.",
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer:
        "Absolutely! We understand that unexpected situations can arise, so we offer a flexible cancellation and rescheduling system. To cancel or change your appointment, simply go to your profile, navigate to your scheduled bookings, and select the appointment you’d like to modify. Some clinics may have specific policies regarding cancellations and rescheduling, such as requiring a certain notice period or applying a small fee for last-minute changes. Be sure to check the clinic’s cancellation policy before confirming your appointment. If you have an emergency and need immediate assistance, you can also contact the clinic directly through the platform.",
    },
    {
      question: "Are the vets on this platform verified?",
      answer:
        "Yes, all the veterinarians and clinics listed on our platform go through a strict verification process. We ensure that every vet is fully licensed and certified according to local regulations. Additionally, we review customer feedback and ratings regularly to maintain a high standard of service. You can view each vet's qualifications, experience, and specialties on their profile, along with genuine reviews from pet owners who have previously visited them. This ensures that you have complete transparency and can make an informed decision when choosing the right vet for your pet’s needs.",
    },
  ];

  return (
    <div className="flex flex-col gap-36 flex-grow p-10">
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
                placeholder="City or Zipcode"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
              <button type="submit" className="btn btn-neutral">
                Find a Vet
              </button>
            </form>
            <p className="text-xs my-3">
              By clicking Sign Up you're confirming that you agree with our
              Terms and Conditions.
            </p>
          </div>
          <img src="/home.svg" className="rounded-lg shadow-2xl" />
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
            <span className="text-blue-500 text-xl">🔍</span>
            <span>📅 Instant Vet Booking</span>
          </div>
          <p className="text-gray-600">
            No more waiting on hold—see available slots and book in seconds.
          </p>
        </div>

        <div className="bg-white flex flex-col gap-3">
          <div className="text-green-500 text-4xl">✅</div>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-red-500 text-xl">💊</span>
            <span>🏥 Find Trusted Vets</span>
          </div>
          <p className="text-gray-600">
            Easily locate nearby clinics with reviews, contact info, and
            directions.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-10 rounded-lg flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3 flex flex-col">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-6">
            Frequently asked questions ordered by popularity. If you still have
            any doubts, feel free to ask!
          </p>
          <button className="border border-black px-5 py-2 rounded-lg hover:bg-gray-200 self-start">
            Contact us
          </button>
        </div>

        <div className="md:w-2/3 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b pb-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center py-3">
                <span className="text-lg font-semibold">{faq.question}</span>
                <span className="text-xl">
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </div>
              {openIndex === index && (
                <p className="text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
