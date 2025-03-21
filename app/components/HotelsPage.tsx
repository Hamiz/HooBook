"use client";

import { useState, useEffect } from "react";
import { MapPinIcon, ListFilterIcon } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Expanded hotel data
const allHotels = [
  {
    id: 1,
    name: "Mountain View Resort",
    location: "Stavanger, Norway",
    price: 120,
    rating: 4.8,
    image: "/images/ammar-andiko-tu98qkamdNM-unsplash.jpg",
    description:
      "Luxurious resort with stunning mountain views and modern amenities.",
    amenities: ["Free WiFi", "Spa", "Restaurant", "Pool", "Fitness Center"],
    featured: true,
  },
  {
    id: 2,
    name: "Seaside Getaway",
    location: "Bergen, Norway",
    price: 150,
    rating: 4.6,
    image: "/images/artiom-vallat-rFxk_Ea9PME-unsplash.jpg",
    description:
      "Beautiful hotel located right on the coast with breathtaking ocean views.",
    amenities: [
      "Free WiFi",
      "Beach Access",
      "Restaurant",
      "Bar",
      "Room Service",
    ],
    featured: true,
  },
  {
    id: 3,
    name: "City Center Suites",
    location: "Oslo, Norway",
    price: 180,
    rating: 4.7,
    image: "/images/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
    description:
      "Modern suites in the heart of the city, walking distance to major attractions.",
    amenities: [
      "Free WiFi",
      "Business Center",
      "Restaurant",
      "Parking",
      "Concierge",
    ],
    featured: true,
  },
  {
    id: 4,
    name: "Northern Lights Lodge",
    location: "Tromsø, Norway",
    price: 200,
    rating: 4.9,
    image: "/images/vincent-guth-MAxHEAaAukI-unsplash.jpg",
    description:
      "Cozy lodge perfect for viewing the northern lights with guided aurora tours.",
    amenities: [
      "Free WiFi",
      "Aurora Viewing Deck",
      "Restaurant",
      "Bar",
      "Tours",
    ],
    featured: true,
  },
  {
    id: 5,
    name: "Fjord View Inn",
    location: "Geiranger, Norway",
    price: 160,
    rating: 4.5,
    image: "/images/cristina-gottardi-ru4gWU_sSpQ-unsplash.jpg",
    description:
      "Charming inn with spectacular views of the famous Geiranger fjord.",
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Hiking Tours",
      "Terrace",
      "Breakfast Included",
    ],
    featured: false,
  },
  {
    id: 6,
    name: "Arctic Retreat",
    location: "Svalbard, Norway",
    price: 250,
    rating: 4.8,
    image: "/images/annie-spratt-PlM2XRenqw4-unsplash.jpg",
    description:
      "Unique accommodation experience in the Arctic with wildlife viewing opportunities.",
    amenities: [
      "Free WiFi",
      "Arctic Safari",
      "Restaurant",
      "Lounge",
      "Guided Tours",
    ],
    featured: false,
  },
  {
    id: 7,
    name: "Historic Harbor Hotel",
    location: "Ålesund, Norway",
    price: 140,
    rating: 4.4,
    image: "/images/yianni-mathioudakis-uaVFsw7xIm0-unsplash.jpg",
    description:
      "Beautifully preserved historic hotel in the picturesque harbor area.",
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Bar",
      "Bike Rental",
      "Maritime Tours",
    ],
    featured: false,
  },
  {
    id: 8,
    name: "Glacier View Lodge",
    location: "Jostedalsbreen, Norway",
    price: 190,
    rating: 4.7,
    image: "/images/rashid-khreiss-nB6kI5sxdVc-unsplash.jpg",
    description:
      "Comfortable lodge near Norway's largest glacier with amazing views.",
    amenities: [
      "Free WiFi",
      "Glacier Tours",
      "Restaurant",
      "Sauna",
      "Hiking Trails",
    ],
    featured: false,
  },
  {
    id: 9,
    name: "Countryside Cabins",
    location: "Telemark, Norway",
    price: 110,
    rating: 4.5,
    image: "/images/sven-V7WkmXntA8M-unsplash.jpg",
    description:
      "Rustic cabins in the Norwegian countryside, perfect for a peaceful getaway.",
    amenities: [
      "Free WiFi",
      "Private Kitchen",
      "Fireplace",
      "BBQ Area",
      "Nature Trails",
    ],
    featured: false,
  },
  {
    id: 10,
    name: "Oslo Royal Hotel",
    location: "Oslo, Norway",
    price: 220,
    rating: 4.8,
    image: "/images/mp-fV2dM2WvKvE-unsplash.jpg",
    description:
      "Elegant hotel in Oslo with royal-inspired decor and premium services.",
    amenities: [
      "Free WiFi",
      "Fine Dining",
      "Spa",
      "Concierge",
      "Luxury Suites",
    ],
    featured: false,
  },
  {
    id: 11,
    name: "Fishing Village Inn",
    location: "Lofoten Islands, Norway",
    price: 130,
    rating: 4.6,
    image: "/images/vidar-nordli-mathisen-yJKb_4vjYwA-unsplash.jpg",
    description:
      "Traditional inn in a historic fishing village with authentic Norwegian charm.",
    amenities: [
      "Free WiFi",
      "Fresh Seafood Restaurant",
      "Boat Tours",
      "Fishing Equipment",
      "Local Guides",
    ],
    featured: false,
  },
  {
    id: 12,
    name: "Mountain Ski Lodge",
    location: "Hemsedal, Norway",
    price: 170,
    rating: 4.7,
    image: "/images/laureen-missaire-p2h69snoLAM-unsplash.jpg",
    description:
      "Ski-in/ski-out lodge at one of Norway's premier ski destinations.",
    amenities: [
      "Free WiFi",
      "Ski Storage",
      "Hot Tub",
      "Restaurant",
      "Fireplace Lounge",
    ],
    featured: false,
  },
];

export default function HotelsPage() {
  const searchParams = useSearchParams();

  const [darkMode, setDarkMode] = useState(false);
  const [filteredHotels, setFilteredHotels] = useState(allHotels);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [locationFilter, setLocationFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get search parameters
  const checkin = searchParams?.get("checkin") || "";
  const checkout = searchParams?.get("checkout") || "";
  const guests = searchParams?.get("guests") || "1";
  const locationParam = searchParams?.get("location") || "";

  // Get URL parameters for search
  useEffect(() => {
    // If there are search parameters, filter the hotels
    if (locationParam) {
      setLocationFilter(locationParam);
      filterHotels(locationParam, priceRange, ratingFilter);
    }

    // We'd store these values for booking purposes
    console.log({
      location: locationParam,
      priceRange,
      ratingFilter,
      checkin,
      checkout,
      guests,
    });
  }, [locationParam, priceRange, ratingFilter, checkin, checkout, guests]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePriceChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPriceRange: [number, number] = [...priceRange] as [number, number];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
    filterHotels(locationFilter, newPriceRange, ratingFilter);
  };

  const handleRatingChange = (rating: number) => {
    setRatingFilter(rating);
    filterHotels(locationFilter, priceRange, rating);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value;
    setLocationFilter(location);
    filterHotels(location, priceRange, ratingFilter);
  };

  const filterHotels = (
    location: string,
    price: [number, number],
    rating: number
  ) => {
    let filtered = allHotels.filter(
      (hotel) =>
        hotel.price >= price[0] &&
        hotel.price <= price[1] &&
        hotel.rating >= rating
    );

    if (location) {
      filtered = filtered.filter((hotel) =>
        hotel.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredHotels(filtered);
  };

  const featuredHotels = filteredHotels.filter((hotel) => hotel.featured);
  const regularHotels = filteredHotels.filter((hotel) => !hotel.featured);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Page Title */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl pt-20 font-bold">Find Your Perfect Stay</h1>
          <p className="mt-2 text-xl text-gray-500 dark:text-gray-400">
            Discover our collection of handpicked hotels and accommodations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Controls */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">All Hotels</h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <ListFilterIcon className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>

          {isFilterOpen && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Location Filter */}
                <div>
                  <label className="block mb-2 font-medium">Location</label>
                  <input
                    type="text"
                    value={locationFilter}
                    onChange={handleLocationChange}
                    placeholder="Search by location"
                    className={`w-full p-2 rounded ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    } border ${
                      darkMode ? "border-gray-600" : "border-gray-300"
                    }`}
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block mb-2 font-medium">Price Range</label>
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="number"
                      min="100"
                      max="250"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(0, e)}
                      className={`w-1/2 p-2 rounded ${
                        darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-white text-gray-900"
                      } border ${
                        darkMode ? "border-gray-600" : "border-gray-300"
                      }`}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      min="100"
                      max="250"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(1, e)}
                      className={`w-1/2 p-2 rounded ${
                        darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-white text-gray-900"
                      } border ${
                        darkMode ? "border-gray-600" : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block mb-2 font-medium">
                    Minimum Rating
                  </label>
                  <div className="flex items-center">
                    {[0, 3, 3.5, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingChange(rating)}
                        className={`mr-2 px-3 py-1 rounded ${
                          ratingFilter === rating
                            ? "bg-amber-500 text-white"
                            : darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {rating === 0 ? "All" : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Featured Hotels */}
        {featuredHotels.length > 0 && (
          <>
            <h2
              className={`text-2xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Featured Hotels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredHotels.map((hotel) => (
                <Link
                  href={`/hotel/${hotel.id}?checkin=${checkin}&checkout=${checkout}&guests=${guests}`}
                  key={hotel.id}
                >
                  <div
                    className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className="h-48 bg-gray-300 relative overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                        style={{ backgroundImage: `url(${hotel.image})` }}
                      ></div>
                      <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded text-sm font-bold">
                        Featured
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <span className="font-bold text-lg">
                            ${hotel.price}
                          </span>
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
                </Link>
              ))}
            </div>
          </>
        )}

        {/* All Hotels */}
        <h2
          className={`text-2xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          All Hotels
        </h2>

        {filteredHotels.length === 0 ? (
          <div
            className={`text-center py-12 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <p className="text-xl">No hotels match your search criteria.</p>
            <p className="mt-2">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularHotels.map((hotel) => (
              <Link
                href={`/hotel/${hotel.id}?checkin=${checkin}&checkout=${checkout}&guests=${guests}`}
                key={hotel.id}
              >
                <div
                  className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="h-48 bg-gray-300 relative overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                      style={{ backgroundImage: `url(${hotel.image})` }}
                    ></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>
                    <p
                      className={`text-sm mt-2 line-clamp-2 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {hotel.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="font-bold text-lg">
                          ${hotel.price}
                        </span>
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
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
