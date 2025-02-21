import React from "react";

function Home() {
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
            <input
              type="text"
              placeholder="City or Zipcode"
              className="input input-bordered w-full max-w-xs"
            />

            <button className="btn btn-neutral mx-5">Find a Vet</button>
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
    </div>
  );
}

export default Home;
