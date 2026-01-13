import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white text-gray-800 overflow-hidden">
      
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 group">
            <img
              src="/adishri_logo3.png"
              alt="Adishri Enterprises"
              className="h-11 w-11 object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
            />
            <span className="text-xl font-extrabold tracking-wide text-blue-600">
              Adishri Enterprises
            </span>
          </div>

          <ul className="hidden md:flex gap-8 font-medium">
            {["Home", "Services", "About", "Contact"].map((item) => (
              <li
                key={item}
                className="relative cursor-pointer text-gray-700 hover:text-blue-600 transition
                after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600
                after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </li>
            ))}
          </ul>

          <button className="relative overflow-hidden rounded-xl px-6 py-2 font-semibold text-white bg-blue-600
            transition-all duration-300 hover:scale-105 hover:shadow-lg
            before:absolute before:inset-0 before:bg-blue-700 before:translate-x-[-100%]
            hover:before:translate-x-0 before:transition-transform before:duration-300 before:-z-10">
            Get Started
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative flex flex-col md:flex-row items-center px-8 md:px-16 py-24 gap-16 max-w-7xl mx-auto">
        
        {/* Floating Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse" />

        {/* Left */}
        <div className="flex-1 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Building{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Reliable
            </span>
            <br />
            Solutions for Your Business
          </h1>

          <p className="mt-6 text-gray-600 max-w-xl text-lg">
            Adishri Enterprises delivers high-quality, scalable, and future-ready
            solutions crafted to elevate your business.
          </p>

          <div className="mt-10 flex gap-5">
            <button className="px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold
              hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl">
              Our Services
            </button>

            <button className="px-7 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold
              hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 animate-fadeInRight">
          <img
            src="/adishri_logo3.png"
            alt="Illustration"
            className="w-full max-w-md mx-auto
              transition-transform duration-700 hover:scale-110 hover:rotate-1"
          />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 px-8 md:px-16 bg-white">
        <h2 className="text-4xl font-extrabold text-center mb-16">
          Why Choose{" "}
          <span className="text-blue-600">Adishri?</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[
            {
              title: "Premium Quality",
              desc: "We follow industry-leading standards with zero compromise."
            },
            {
              title: "On-Time Delivery",
              desc: "Your deadlines are our top priority — always."
            },
            {
              title: "24/7 Support",
              desc: "Dedicated assistance whenever you need us."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white p-8 rounded-2xl border border-gray-100
              shadow-md hover:shadow-2xl transition-all duration-500
              hover:-translate-y-3 hover:border-blue-200"
            >
              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-gray-300 text-center py-8">
        <p className="text-sm tracking-wide">
          © {new Date().getFullYear()} Adishri Enterprises. Crafted with ❤️ & Precision.
        </p>
      </footer>
    </div>
  );
}

export default App;
