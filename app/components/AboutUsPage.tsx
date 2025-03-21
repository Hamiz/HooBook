"use client";

import { useState, useEffect } from "react";
import { MapPinIcon, Mail, PhoneCall } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Emma Johnson",
      role: "CEO & Founder",
      image: "/images/colton-sturgeon-mE5oHZrWN-Q-unsplash.jpg",
      bio: "With over 15 years of experience in hospitality, Emma founded the company with a vision to provide exceptional stays in Norway.",
    },
    {
      id: 2,
      name: "Markus Nilsen",
      role: "Chief Experience Officer",
      image: "/images/dan-asaki-CG6Wo4Ac4uc-unsplash.jpg",
      bio: "Markus ensures that every property in our collection meets our high standards for comfort, beauty, and authentic Norwegian experiences.",
    },
    {
      id: 3,
      name: "Sofia Berg",
      role: "Head of Customer Relations",
      image: "/images/jake-nackos-IF9TK5Uy-KI-unsplash.jpg",
      bio: "Sofia Berg our Head of Customer Relations service team, ensuring that every guest receives personalized attention and support throughout their stay.",
    },
    {
      id: 4,
      name: "Lars Olsen",
      role: "Property Scout",
      image: "/images/albert-dera-ILip77SbmOE-unsplash.jpg",
      bio: "Lars travels across Norway to discover unique properties and build relationships with local hosts and property owners.",
    },
  ];

  // Company values
  const values = [
    {
      id: 1,
      title: "Authentic Experiences",
      description:
        "We believe in providing genuine Norwegian experiences that connect our guests with local culture and traditions.",
    },
    {
      id: 2,
      title: "Environmental Responsibility",
      description:
        "We are committed to sustainable tourism practices that protect Norway's breathtaking natural landscapes.",
    },
    {
      id: 3,
      title: "Exceptional Service",
      description:
        "We go above and beyond to ensure that every guest has a memorable and comfortable stay.",
    },
    {
      id: 4,
      title: "Community Connection",
      description:
        "We work closely with local communities to create positive impact and support the regions we operate in.",
    },
  ];

  // Animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10"></div>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(images/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg)`,
            }}
          ></div>
        </div>

        <div
          className={`relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white transition-all duration-700 transform ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="pt-32 md:pt-0">
            <h1
              className="text-4xl md:text-6xl font-bold mb-4 transition-transform duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "200ms",
              }}
            >
              About Us
            </h1>
            <p
              className="text-xl max-w-2xl transition-transform duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "300ms",
              }}
            >
              Connecting travelers with Norway&apos;s most beautiful
              accommodations since 2015.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transitionDelay: "400ms",
              }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="mb-4">
                Founded in 2015, our journey began with a simple mission: to
                showcase the breathtaking beauty of Norway through exceptional
                accommodations that reflect the country&apos;s natural splendor
                and cultural heritage.
              </p>
              <p className="mb-4">
                What started as a small collection of handpicked properties in
                the fjord region has grown into Norway&apos;s premier
                accommodation platform, connecting travelers with authentic
                experiences across the country.
              </p>
              <p>
                Today, we continue to curate the finest hotels, cabins, and
                unique stays throughout Norway, ensuring that each property
                meets our exacting standards for quality, authenticity, and
                memorable experiences.
              </p>
            </div>
            <div
              className="rounded-lg overflow-hidden shadow-xl transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(20px)",
                transitionDelay: "500ms",
              }}
            >
              <div
                className="w-full h-96 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(/images/austin-distel-wD1LRb9OeEo-unsplash.jpg)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl font-bold mb-12 text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease",
              transitionDelay: "300ms",
            }}
          >
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.id}
                className={`p-6 rounded-lg shadow-lg transition-all duration-700 ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${600 + index * 100}ms`,
                }}
              >
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl font-bold mb-12 text-center"
            style={{
              opacity: visible ? 1 : 0,
              transition: "all 0.7s ease",
              transitionDelay: "300ms",
            }}
          >
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${700 + index * 100}ms`,
                }}
              >
                <div className="h-60 bg-gray-300 relative overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                    style={{ backgroundImage: `url(${member.image})` }}
                  ></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p
                    className={`text-sm mb-3 ${
                      darkMode ? "text-amber-400" : "text-amber-600"
                    }`}
                  >
                    {member.role}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div
          className="max-w-4xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
            transitionDelay: "800ms",
          }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>

          <div
            className={`rounded-lg shadow-lg p-8 ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-3 text-amber-500" />
                    <span>Storgata 5, 0155 Oslo, Norway</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-amber-500" />
                    <span>contact@norwaystays.com</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneCall className="h-5 w-5 mr-3 text-amber-500" />
                    <span>+47 23 96 58 00</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
                <form>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full p-2 rounded border ${
                        darkMode
                          ? "bg-gray-600 border-gray-500 text-white"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className={`w-full p-2 rounded border ${
                        darkMode
                          ? "bg-gray-600 border-gray-500 text-white"
                          : "bg-white border-gray-300"
                      }`}
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className={`w-full p-2 rounded border ${
                        darkMode
                          ? "bg-gray-600 border-gray-500 text-white"
                          : "bg-white border-gray-300"
                      }`}
                    ></textarea>
                  </div>
                  <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 transform hover:scale-105 active:scale-95 w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
