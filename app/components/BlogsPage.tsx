"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, User, Clock, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BlogsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Fjord Views You Can't Miss in Norway",
      excerpt:
        "Discover the most breathtaking fjord viewpoints across Norway that will leave you in awe of nature's grandeur.",
      image: "/images/vidar-nordli-mathisen-641pLhGEEyg-unsplash.jpg",
      author: "Emma Johnson",
      date: "March 10, 2025",
      readTime: "6 min read",
      category: "Travel Tips",
    },
    {
      id: 2,
      title: "Traditional Norwegian Cabin Culture: What to Expect",
      excerpt:
        "Experience the authentic 'hytte' lifestyle that Norwegians cherish and how it connects people with nature and tradition.",
      image: "/images/michael-fousert-lE5-z4nTCTQ-unsplash.jpg",
      author: "Markus Nilsen",
      date: "March 5, 2025",
      readTime: "4 min read",
      category: "Culture",
    },
    {
      id: 3,
      title: "Sustainable Tourism: How Norway Leads the Way",
      excerpt:
        "Learn about Norway's pioneering efforts in sustainable tourism and how our properties embrace eco-friendly practices.",
      image: "/images/michael-fousert-0962p7mcux4-unsplash.jpg",
      author: "Sofia Berg",
      date: "February 28, 2025",
      readTime: "5 min read",
      category: "Sustainability",
    },
    {
      id: 4,
      title: "Northern Lights Season: Best Places to Stay",
      excerpt:
        "Plan your aurora borealis adventure with our guide to the best accommodations for viewing the northern lights.",
      image: "/images/lightscape-LtnPejWDSAY-unsplash.jpg",
      author: "Lars Olsen",
      date: "February 20, 2025",
      readTime: "7 min read",
      category: "Seasonal Guide",
    },
    {
      id: 5,
      title: "Hidden Gems: Lesser-Known Norwegian Destinations",
      excerpt:
        "Step off the beaten path and discover Norway's secret locations that offer tranquility away from tourist crowds.",
      image: "/images/seth-kane-XOEAHbE_vO8-unsplash.jpg",
      author: "Emma Johnson",
      date: "February 15, 2025",
      readTime: "5 min read",
      category: "Travel Tips",
    },
    {
      id: 6,
      title: "Norwegian Food: What to Try During Your Stay",
      excerpt:
        "Explore the traditional and modern culinary delights that make Norwegian cuisine unique and delicious.",
      image: "/images/ferdinand-stohr-W1FIkdPAB7E-unsplash.jpg",
      author: "Sofia Berg",
      date: "February 8, 2025",
      readTime: "4 min read",
      category: "Food & Drink",
    },
  ];

  // Blog categories
  const categories = [
    "All",
    "Travel Tips",
    "Culture",
    "Sustainability",
    "Seasonal Guide",
    "Food & Drink",
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
              backgroundImage: `url(/images/sven-V7WkmXntA8M-unsplash.jpg)`,
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
              The Norway Journal
            </h1>
            <p
              className="text-xl max-w-2xl transition-transform duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "300ms",
              }}
            >
              Stories, insights, and tips to enhance your Norwegian adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Categories */}
      <section
        className={`py-8 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="flex flex-wrap gap-2 justify-center transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "400ms",
            }}
          >
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === "All"
                    ? darkMode
                      ? "bg-amber-500 text-white"
                      : "bg-amber-500 text-white"
                    : darkMode
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section
        className={`py-12 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-lg overflow-hidden shadow-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease",
              transitionDelay: "500ms",
            }}
          >
            <div className="h-96 bg-gray-300 relative overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${blogPosts[0].image})` }}
              ></div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    darkMode
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {blogPosts[0].category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {blogPosts[0].title}
              </h2>
              <p
                className={`mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-sm">{blogPosts[0].author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-sm">{blogPosts[0].date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-sm">{blogPosts[0].readTime}</span>
                </div>
              </div>
              <button className="flex items-center font-medium text-amber-500 hover:text-amber-600 transition-colors">
                Read Full Article <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section
        className={`py-12 px-4 sm:px-6 lg:px-8 ${
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
            Latest Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <div
                key={post.id}
                className={`rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${600 + index * 100}ms`,
                }}
              >
                <div className="h-52 bg-gray-300 relative overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                    style={{ backgroundImage: `url(${post.image})` }}
                  ></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        darkMode
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                  <p
                    className={`text-sm mb-4 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center text-sm">
                      <User className="h-3 w-3 mr-1 text-amber-500" />
                      <span className="mr-3">{post.author}</span>
                      <Clock className="h-3 w-3 mr-1 text-amber-500" />
                      <span>{post.readTime}</span>
                    </div>
                    <button className="text-amber-500 hover:text-amber-600 transition-colors text-sm font-medium flex items-center">
                      Read <ChevronRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div
          className="max-w-3xl mx-auto text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
            transitionDelay: "800ms",
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p
            className={`mb-8 mx-auto max-w-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Subscribe to receive travel inspiration, exclusive offers, and
            insider tips for your next Norwegian adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your Email Address"
              className={`flex-grow p-3 rounded-md border ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300"
              }`}
            />
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-md transition duration-200 transform hover:scale-105 active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section
        className={`py-8 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-center">
          <div
            className="flex space-x-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease",
              transitionDelay: "700ms",
            }}
          >
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
              } font-medium shadow-sm`}
            >
              1
            </button>
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                darkMode
                  ? "bg-gray-900 text-gray-400"
                  : "bg-gray-100 text-gray-600"
              } font-medium hover:bg-amber-500 hover:text-white transition-colors`}
            >
              2
            </button>
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                darkMode
                  ? "bg-gray-900 text-gray-400"
                  : "bg-gray-100 text-gray-600"
              } font-medium hover:bg-amber-500 hover:text-white transition-colors`}
            >
              3
            </button>
            <span
              className={`w-10 h-10 flex items-center justify-center ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              ...
            </span>
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                darkMode
                  ? "bg-gray-900 text-gray-400"
                  : "bg-gray-100 text-gray-600"
              } font-medium hover:bg-amber-500 hover:text-white transition-colors`}
            >
              10
            </button>
          </div>
        </div>
      </section>

      <Footer darkMode={darkMode} />
    </div>
  );
}
