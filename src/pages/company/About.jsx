import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import aboutImg1 from "../../assets/about-img_1.jpg";
import aboutImg2 from "../../assets/about-img_2.jpg";
import aboutImg1Placeholder from "../../assets/placeholders/about-img_1-small.jpg";
import aboutImg2Placeholder from "../../assets/placeholders/about-img_2-small.jpg";

function About() {
  const location = useLocation();
  const [imagesLoaded, setImagesLoaded] = useState({
    img1: false,
    img2: false,
  });

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

  return (
    <div className="container mx-auto px-8 my-16">
      <div className="flex flex-col gap-20">
        {/* header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About VetiGO</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your trusted emergency and veterinary companion, bringing peace of
            mind to pet owners nationwide.
          </p>
        </div>

        <section className="scroll-mt-24">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b-4 border-accent inline-block">
                Our Mission
              </h2>
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
              <div className="relative rounded-lg shadow-md overflow-hidden bg-gray-100">
                {!imagesLoaded.img1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                  </div>
                )}
                <LazyLoadImage
                  src={aboutImg1}
                  alt="VetiGO Mission"
                  className="w-full h-auto rounded-lg"
                  effect="blur"
                  placeholder={
                    <img
                      src={aboutImg1Placeholder}
                      alt="Loading"
                      className="w-full h-auto rounded-lg blur-sm"
                    />
                  }
                  threshold={300}
                  afterLoad={() =>
                    setImagesLoaded((prev) => ({ ...prev, img1: true }))
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400?text=Our+Mission";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="vision" className="scroll-mt-24">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b-4 border-accent inline-block">
                Our Vision
              </h2>
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
              <div className="relative rounded-lg shadow-md overflow-hidden bg-gray-100">
                {!imagesLoaded.img2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                  </div>
                )}
                <LazyLoadImage
                  src={aboutImg2}
                  alt="VetiGO Vision"
                  className="w-full h-auto rounded-lg"
                  effect="blur"
                  placeholder={
                    <img
                      src={aboutImg2Placeholder}
                      alt="Loading"
                      className="w-full h-auto rounded-lg blur-sm"
                    />
                  }
                  threshold={300}
                  afterLoad={() =>
                    setImagesLoaded((prev) => ({ ...prev, img2: true }))
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400?text=Our+Vision";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="why-choose-us" className="scroll-mt-24">
          <div className="card bg-base-100 shadow-xl mb-20">
            <div className="card-body">
              <h2 className="card-title text-3xl font-bold justify-center mb-8">
                Why Choose VetiGO
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card bg-base-200 hover:shadow-md transition-all">
                  <div className="card-body">
                    <div className="flex items-center gap-4">
                      <div className="badge badge-white badge-lg border-accent border-2 p-4">
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

                <div className="card bg-base-200 hover:shadow-md transition-all">
                  <div className="card-body">
                    <div className="flex items-center gap-4">
                      <div className="badge badge-white badge-lg border-accent border-2 p-4">
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

                <div className="card bg-base-200 hover:shadow-md transition-all">
                  <div className="card-body">
                    <div className="flex items-center gap-4">
                      <div className="badge badge-white badge-lg border-accent border-2 p-4">
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

                <div className="card bg-base-200 hover:shadow-md transition-all">
                  <div className="card-body">
                    <div className="flex items-center gap-4">
                      <div className="badge badge-white badge-lg border-accent border-2 p-4">
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
      </div>
    </div>
  );
}

export default About;
