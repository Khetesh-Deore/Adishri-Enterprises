import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/adishri_logo.png"
            alt="Adishri Enterprises"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold text-blue-600">
            Adishri Enterprises
          </span>
        </div>

        <ul className="hidden md:flex gap-8 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Services</li>
          <li className="hover:text-blue-600 cursor-pointer">About</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
        </ul>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center px-8 md:px-16 py-20 gap-12">
        {/* Left */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Building <span className="text-blue-600">Reliable</span> <br />
            Solutions for Your Business
          </h1>

          <p className="mt-6 text-gray-600 max-w-xl">
            Adishri Enterprises delivers high-quality, scalable, and efficient
            solutions tailored to your business needs.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Our Services
            </button>

            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              Contact Us
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1">
          <img
            src="https://illustrations.popsy.co/white/business-success.svg"
            alt="Business Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 px-8 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Quality Work</h3>
            <p className="text-gray-600">
              We maintain the highest standards in every project we deliver.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Timely Delivery</h3>
            <p className="text-gray-600">
              On-time project completion with complete transparency.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Customer Support</h3>
            <p className="text-gray-600">
              Dedicated support to help you at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p className="text-sm">
          © {new Date().getFullYear()} Adishri Enterprises. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
