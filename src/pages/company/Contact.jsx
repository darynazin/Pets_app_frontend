import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // In a real app, you'd send this to your backend
      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-8 my-16">
      <div className="flex flex-col gap-16">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to
            our team through any of the methods below.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          {/* Contact Form */}
          <section id="contact-form" className="scroll-mt-24 w-full md:w-3/5">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            {submitStatus === "success" && (
              <div className="alert alert-success mb-6">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Your message has been sent successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-32"
                  required
                ></textarea>
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </section>

          {/* Contact Information */}
          <section id="contact-info" className="scroll-mt-24 w-full md:w-2/5">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">+49 30 12345678</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Monday-Friday, 9am-6pm CET
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">support@vetigo-app.com</p>
                  <p className="text-sm text-gray-500 mt-1">
                    We respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Office</h3>
                  <p className="text-gray-600">Alexanderplatz 1</p>
                  <p className="text-gray-600">10178 Berlin, Germany</p>
                  <p className="text-sm text-gray-500 mt-1">
                    By appointment only
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/13.4133,52.5219,14,0/600x400?access_token=pk.example"
                alt="Office Location Map"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400?text=Office+Location+Map";
                }}
              />
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section
          id="faq"
          className="scroll-mt-24 bg-base-100 shadow-xl p-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
              <input type="radio" name="contact-faq" defaultChecked />
              <div className="collapse-title font-medium">
                How quickly can I expect a response?
              </div>
              <div className="collapse-content">
                <p>
                  We strive to respond to all inquiries within 24 hours during
                  business days. For urgent matters, we recommend calling our
                  support line.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
              <input type="radio" name="contact-faq" />
              <div className="collapse-title font-medium">
                Can I schedule a demonstration of the platform?
              </div>
              <div className="collapse-content">
                <p>
                  Absolutely! We offer virtual demonstrations of our platform
                  for both pet owners and veterinary clinics. Fill out our
                  contact form with your request, and our team will schedule a
                  convenient time.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
              <input type="radio" name="contact-faq" />
              <div className="collapse-title font-medium">
                How can veterinary clinics join the platform?
              </div>
              <div className="collapse-content">
                <p>
                  Veterinary clinics can join VetiGO by registering through our
                  dedicated vet portal. We'll review your application and
                  contact you to complete the onboarding process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <div className="bg-base-100 shadow p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Quick Navigation</h3>
          <div className="flex flex-wrap gap-3">
            <a href="#contact-form" className="btn btn-sm btn-outline">
              Contact Form
            </a>
            <a href="#contact-info" className="btn btn-sm btn-outline">
              Contact Information
            </a>
            <a href="#faq" className="btn btn-sm btn-outline">
              FAQs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
