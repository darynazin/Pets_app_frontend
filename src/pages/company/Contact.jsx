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
    <div className="container mx-auto px-8 my-16 max-w-5xl mb-32">
      <div className="flex flex-col gap-16">
        {/* header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to
            our team through any of the methods below.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-16 justify-center">
          {/* form */}
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
                  className="btn btn-primary w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </section>

          {/* contact */}
          <section id="contact-info" className="scroll-mt-24 w-full md:w-2/5">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="badge border-accent border-2 badge-lg p-4">
                  <span className="text-2xl">📞</span>
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
                <div className="badge border-accent border-2 badge-lg p-4">
                  <span className="text-2xl">📧</span>
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
                <div className="badge border-accent border-2 badge-lg p-4">
                  <span className="text-2xl">👩‍💻</span>
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
          </section>
        </div>
      </div>
    </div>
  );
}

export default Contact;
