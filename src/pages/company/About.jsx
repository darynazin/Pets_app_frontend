// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import aboutImg1 from "../../assets/about-img_1.jpg";
import aboutImg2 from "../../assets/about-img_2.jpg";

function About() {
  // const location = useLocation();

  // useEffect(() => {
  //   // Scroll to section if hash is present in URL
  //   if (location.hash) {
  //     const element = document.getElementById(location.hash.slice(1));
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   } else {
  //     window.scrollTo(0, 0);
  //   }
  // }, [location]);

  return (
    <div className="container mx-auto px-8 my-16">
      <div className="flex flex-col gap-20">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About VetiGO</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your trusted emergency and veterinary companion, bringing peace of
            mind to pet owners nationwide.
          </p>
        </div>

        {/* Mission Section */}
        <section id="mission" className="scroll-mt-24">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At VetiGO, our mission is to transform pet healthcare by
                removing barriers between pet owners and quality veterinary
                care. We believe every pet deserves immediate attention when
                they need it most.
              </p>
              <p className="text-gray-600">
                We're committed to providing peace of mind for pet owners by
                offering immediate, trustworthy pet health support and seamless
                vet access—right when it's needed most.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src={aboutImg1}
                alt="VetiGO Mission"
                className="rounded-lg shadow-md w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400?text=Our+Mission";
                }}
              />
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="scroll-mt-24">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                We envision a world where pet emergencies are less stressful
                because pet owners have the tools and access they need at their
                fingertips. VetiGO strives to be the go-to platform that
                connects pets to timely care through technology.
              </p>
              <p className="text-gray-600">
                By bridging the gap between veterinary professionals and pet
                owners, we're creating an ecosystem that benefits both and
                ultimately leads to healthier, happier pets.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src={aboutImg2}
                alt="VetiGO Vision"
                className="rounded-lg shadow-md w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x400?text=Our+Vision";
                }}
              />
            </div>
          </div>
        </section>

        {/* What We Do Section
        <section id="what-we-do" className="scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
        {/* Card 1 */}
        {/* <div
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all transform"
              style={{ transition: "all 0.3s ease" }}
            >
              <div className="card-body">
                <h3 className="card-title text-xl">
                  <span>🆘 </span>
                  AI-Powered First Aid
                </h3>
                <p className="text-gray-600">
                  Get immediate pet health advice powered by AI. Know exactly
                  what to do in emergencies before reaching a vet.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="badge badge-outline text-green-500 border-green-500">
                    24/7 Available
                  </span>
                  <span className="badge badge-outline text-green-500 border-green-500">
                    Vet Approved
                  </span>
                </div>
              </div>
            </div> */}

        {/* Card 2 */}
        {/* <div
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all transform"
              style={{ transition: "all 0.3s ease" }}
            >
              <div className="card-body">
                <h3 className="card-title text-xl">
                  <span>📅 </span>
                  Seamless Booking System
                </h3>
                <p className="text-gray-600">
                  For pet owners: Register, browse available slots, book,
                  modify, or cancel appointments with ease.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="badge badge-outline text-blue-500 border-blue-500">
                    Real-time Availability
                  </span>
                  <span className="badge badge-outline text-blue-500 border-blue-500">
                    Easy Scheduling
                  </span>
                </div>
              </div>
            </div> */}

        {/* Card 3 */}
        {/* <div
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all transform"
              style={{ transition: "all 0.3s ease" }}
            >
              <div className="card-body">
                <h3 className="card-title text-xl">
                  <span>📍 </span>
                  Find Nearby Vets
                </h3>
                <p className="text-gray-600">
                  Locate trusted vets based on your location. View clinic
                  details and contact information instantly.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="badge badge-outline text-purple-500 border-purple-500">
                    Location-Based
                  </span>
                  <span className="badge badge-outline text-purple-500 border-purple-500">
                    Verified Clinics
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="scroll-mt-24">
          <div className="card bg-base-100 shadow-xl mb-20">
            <div className="card-body">
              <h2 className="card-title text-3xl font-bold justify-center mb-8">
                Why Choose VetiGO
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Immediate Assistance */}
                <div className="card bg-base-200 hover:shadow-md transition-all">
                  <div className="card-body">
                    <div className="flex items-center gap-4">
                      <div className="badge badge-white badge-lg p-4">
                        <span className="text-2xl">🚑</span>
                      </div>
                      <h3 className="card-title text-lg">
                        Immediate Assistance
                      </h3>
                    </div>
                    <p className="text-base-content/70 mt-2">
                      Get instant guidance for pet emergencies when every minute
                      counts.
                    </p>
                  </div>
                </div>

                {/* Trusted Information */}
                <div className="card bg-base-200 hover:shadow-md transition-all">
                  <div className="card-body">
                    <div className="flex items-center gap-4">
                      <div className="badge badge-white badge-lg p-4">
                        <span className="text-2xl">👨‍⚕️</span>
                      </div>
                      <h3 className="card-title text-lg">
                        Trusted Information
                      </h3>
                    </div>
                    <p className="text-base-content/70 mt-2">
                      All first aid guidance is verified by professional
                      veterinarians.
                    </p>
                  </div>
                </div>

                {/* Seamless Booking */}
                <div className="card bg-base-200 hover:shadow-md transition-all">
                  <div className="card-body">
                    <div className="flex items-center gap-4">
                      <div className="badge badge-white badge-lg p-4">
                        <span className="text-2xl">📅</span>
                      </div>
                      <h3 className="card-title text-lg">Seamless Booking</h3>
                    </div>
                    <p className="text-base-content/70 mt-2">
                      Book, modify, or cancel appointments without phone calls
                      or waiting.
                    </p>
                  </div>
                </div>

                {/* Vetted Professionals */}
                <div className="card bg-base-200 hover:shadow-md transition-all">
                  <div className="card-body">
                    <div className="flex items-center gap-4">
                      <div className="badge badge-white badge-lg p-4">
                        <span className="text-2xl">✅</span>
                      </div>
                      <h3 className="card-title text-lg">
                        Vetted Professionals
                      </h3>
                    </div>
                    <p className="text-base-content/70 mt-2">
                      All vets on our platform are verified and licensed
                      professionals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Section
        <div className="bg-base-100 shadow p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Quick Navigation</h3>
          <div className="flex flex-wrap gap-3">
            <a href="#mission" className="btn btn-sm btn-outline">
              Our Mission
            </a>
            <a href="#vision" className="btn btn-sm btn-outline">
              Our Vision
            </a>
            <a href="#what-we-do" className="btn btn-sm btn-outline">
              What We Do
            </a>
            <a href="#why-choose-us" className="btn btn-sm btn-outline">
              Why Choose Us
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default About;
