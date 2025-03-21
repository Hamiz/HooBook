"use client";

import { useState, useEffect, useRef } from "react";
import { CalendarIcon, MapPinIcon, UserIcon, SearchIcon } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Dummy hotel data
const featuredHotels = [
  {
    id: 1,
    name: "Mountain View Resort",
    location: "Stavanger, Norway",
    price: 120,
    rating: 4.8,
    image: "/mountain-resort.jpg",
  },
  {
    id: 2,
    name: "Seaside Getaway",
    location: "Bergen, Norway",
    price: 150,
    rating: 4.6,
    image: "/seaside-hotel.jpg",
  },
  {
    id: 3,
    name: "City Center Suites",
    location: "Oslo, Norway",
    price: 180,
    rating: 4.7,
    image: "/city-hotel.jpg",
  },
  {
    id: 4,
    name: "Northern Lights Lodge",
    location: "Tromsø, Norway",
    price: 200,
    rating: 4.9,
    image: "/northern-lodge.jpg",
  },
];

const popularDestinations = [
  { id: 1, name: "Stavanger", image: "/stavanger.jpg" },
  { id: 2, name: "Oslo", image: "/oslo.jpg" },
  { id: 3, name: "Bergen", image: "/bergen.jpg" },
  { id: 4, name: "Tromsø", image: "/tromso.jpg" },
];

// Popular cities for location suggestions
const popularCities = [
  "Stavanger, Norway",
  "Oslo, Norway",
  "Bergen, Norway",
  "Tromsø, Norway",
  "Trondheim, Norway",
  "Ålesund, Norway",
  "Kristiansand, Norway",
  "Bodø, Norway",
];

// Background images for hero section
const backgroundImages = [
  "/images/frames-for-your-heart-zSG-kd-L6vw-unsplash.jpg",
  "/images/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg",
  "/images/paolo-nicolello-2gOxKj594nM-unsplash.jpg",
  "/images/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg",
];

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [searchError, setSearchError] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLDivElement>(null);

  // Fixed: Properly typed image refs
  const imageRefs = useRef<HTMLImageElement[]>([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Preload images on component mount
  useEffect(() => {
    // Create image objects for preloading
    backgroundImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      // Fixed: Type safety for imageRefs
      if (!imageRefs.current[index]) {
        imageRefs.current[index] = img;
      }
    });
  }, []);

  // Effect to change background image with improved transition
  useEffect(() => {
    if (heroVisible) {
      const intervalId = setInterval(() => {
        setIsTransitioning(true);

        // Set the next slide index
        const newSlide = (currentSlide + 1) % backgroundImages.length;
        setNextSlide(newSlide);

        // After a short delay, complete the transition
        setTimeout(() => {
          setCurrentSlide(newSlide);
          setIsTransitioning(false);
        }, 700); // Slightly shorter than the CSS transition duration
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [currentSlide, heroVisible]);

  // Effect to animate hero visibility on load with optimized timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle location input and filter suggestions with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (location.trim() !== "") {
        // Fixed: Proper type for filteredLocations
        const filteredLocations: string[] = popularCities.filter((city) =>
          city.toLowerCase().includes(location.toLowerCase())
        );
        setLocationSuggestions(filteredLocations);
      } else {
        setLocationSuggestions([]);
      }
    }, 150);

    return () => clearTimeout(debounceTimer);
  }, [location]);

  // Handle clicking outside the location suggestions
  useEffect(() => {
    // Fixed: Properly typed event parameter
    function handleClickOutside(event: MouseEvent) {
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target as Node)
      ) {
        setShowLocationSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search validation and submission
  const handleSearch = () => {
    setSearchError("");

    if (!location) {
      setSearchError("Please enter a destination");
      return;
    }

    if (!checkIn || !checkOut) {
      setSearchError("Please select check-in and check-out dates");
      return;
    }

    // Check if check-in date is before check-out date
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      setSearchError("Check-out date must be after check-in date");
      return;
    }

    // Show search animation
    setIsSearching(true);

    // Simulate search process (would be replaced with actual API call)
    setTimeout(() => {
      setIsSearching(false);
      // Here you would typically navigate to search results page
      alert(
        `Searching for accommodations in ${location} for ${guests} guests from ${checkIn} to ${checkOut}`
      );
    }, 1500);
  };

  // Manually transition to a specific slide
  // Fixed: Properly typed index parameter
  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;

    setIsTransitioning(true);
    setNextSlide(index);

    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 700);
  };

  // Get today's date in YYYY-MM-DD format for min date on calendar
  const today = new Date().toISOString().split("T")[0];

  // Calculate tomorrow's date for checkout min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split("T")[0];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background image with improved transition */}
        <div className="absolute inset-0 z-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10"></div>

          {/* Current slide */}
          <div
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 will-change-transform will-change-opacity`}
            style={{
              backgroundImage: `url(${backgroundImages[currentSlide]})`,
              opacity: isTransitioning ? 0 : 1,
            }}
          ></div>

          {/* Next slide (preloaded) */}
          <div
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 will-change-transform will-change-opacity`}
            style={{
              backgroundImage: `url(${backgroundImages[nextSlide]})`,
              opacity: isTransitioning ? 1 : 0,
            }}
          ></div>
        </div>

        {/* Hero content */}
        <div
          className={`relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white transition-all duration-700 transform ${
            heroVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="pt-32 md:pt-0">
            <h1
              className="text-4xl md:text-6xl font-bold mb-4 transition-transform duration-500 will-change-transform"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "200ms",
              }}
            >
              Explore your place <br />
              to stay
            </h1>

            {/* Search Box */}
            <div
              ref={searchBoxRef}
              className="mt-8 bg-black/20 backdrop-blur-md rounded-lg p-4 md:p-0 w-full max-w-4xl shadow-lg transition-transform duration-500 will-change-transform"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "300ms",
              }}
            >
              <div className="md:flex relative">
                {/* Location */}
                <div
                  ref={locationInputRef}
                  className="flex items-center border-b md:border-b-0 md:border-r border-gray-700 p-4 md:w-1/3 relative"
                >
                  <MapPinIcon className="h-5 w-5 mr-3 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setShowLocationSuggestions(true)}
                    placeholder="Where are you going?"
                    className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400"
                  />

                  {/* Location suggestions dropdown */}
                  {showLocationSuggestions &&
                    locationSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-gray-800 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                        {locationSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors"
                            onClick={() => {
                              setLocation(suggestion);
                              setShowLocationSuggestions(false);
                            }}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                {/* Check-in / Check-out */}
                <div className="flex flex-col md:flex-row md:border-r border-gray-700 p-4 md:w-2/5">
                  <div className="flex items-center mb-4 md:mb-0 md:mr-6 w-full md:w-1/2">
                    <CalendarIcon className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={today}
                      placeholder="Check in"
                      className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="flex items-center w-full md:w-1/2">
                    <CalendarIcon className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || tomorrowString}
                      placeholder="Check out"
                      className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="flex items-center p-4 md:w-1/6 ml-auto">
                  <UserIcon className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="bg-transparent w-full focus:outline-none text-white"
                  >
                    <option value="1" className="bg-gray-800">
                      1 Guest
                    </option>
                    <option value="2" className="bg-gray-800">
                      2 Guests
                    </option>
                    <option value="3" className="bg-gray-800">
                      3 Guests
                    </option>
                    <option value="4" className="bg-gray-800">
                      4 Guests
                    </option>
                    <option value="5" className="bg-gray-800">
                      5+ Guests
                    </option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="p-4 md:w-1/6">
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className={`w-full flex justify-center items-center gap-2 ${
                      isSearching
                        ? "bg-amber-600"
                        : "bg-amber-500 hover:bg-amber-600"
                    } text-white font-medium py-2 px-4 rounded-md transition duration-200 transform hover:scale-105 active:scale-95`}
                  >
                    {isSearching ? (
                      <>
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        <span>Searching</span>
                      </>
                    ) : (
                      <>
                        <SearchIcon className="h-4 w-4" />
                        <span>Search</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {searchError && (
                <div className="p-2 text-red-400 text-sm text-center animate-pulse">
                  {searchError}
                </div>
              )}
            </div>

            {/* Hero Text */}
            <div
              className="mt-16 max-w-lg transition-transform duration-500 will-change-transform"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: "400ms",
              }}
            >
              <h2 className="text-2xl font-bold mb-2">
                We provide a variety of the best lodging accommodations for
                those of you who need it.
              </h2>
              <p className="text-gray-300">
                Don&apos;t worry about the quality of the service.
              </p>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div
          className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2 transition-opacity duration-500"
          style={{
            opacity: heroVisible ? 1 : 0,
            transitionDelay: "500ms",
          }}
        >
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-8 bg-white"
                  : "w-2 bg-gray-500 hover:bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Hotels</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="h-48 bg-gray-300 relative overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110 will-change-transform"
                    style={{ backgroundImage: `url(${hotel.image})` }}
                  ></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <span className="font-bold text-lg">${hotel.price}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /night
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-amber-500">★</span>
                      <span className="ml-1">{hotel.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                darkMode
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "bg-gray-600 hover:bg-gray-700 text-white"
              }`}
            >
              View All Hotels
            </button>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <div
                key={destination.id}
                className="rounded-lg overflow-hidden shadow-lg group relative h-64 cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 will-change-transform"
                  style={{ backgroundImage: `url(${destination.image})` }}
                ></div>
                <div className="absolute bottom-6 left-6 z-20 text-white">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
