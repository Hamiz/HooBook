"use client";

import { useState } from "react";
import {
  MapPinIcon,
  WifiIcon,
  UtensilsIcon,
  DumbbellIcon,
  BedIcon,
  StarIcon,
  CalendarIcon,
  UserIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

// Expanded hotel data
const allHotels = [
  {
    id: 1,
    name: "Mountain View Resort",
    location: "Stavanger, Norway",
    price: 120,
    rating: 4.8,
    image: "/images/ammar-andiko-tu98qkamdNM-unsplash.jpg",
    images: [
      "/images/ammar-andiko-tu98qkamdNM-unsplash.jpg",
      "/images/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
      "/images/vincent-guth-MAxHEAaAukI-unsplash.jpg",
    ],
    description:
      "Luxurious resort with stunning mountain views and modern amenities. Nestled in the beautiful mountains of Stavanger, this resort offers a perfect blend of comfort and nature. Enjoy panoramic views, fine dining, and easy access to hiking trails. Our spacious rooms are designed for ultimate relaxation after a day of exploring the Norwegian countryside.",
    amenities: ["Free WiFi", "Spa", "Restaurant", "Pool", "Fitness Center"],
    featured: true,
    rooms: [
      { type: "Standard", price: 120, beds: "1 Queen", capacity: 2 },
      { type: "Deluxe", price: 180, beds: "1 King", capacity: 2 },
      { type: "Suite", price: 250, beds: "1 King + 1 Sofa", capacity: 4 },
    ],
    reviews: [
      {
        user: "John D.",
        rating: 5,
        comment: "Amazing views and excellent service!",
      },
      {
        user: "Sarah M.",
        rating: 4.5,
        comment: "Beautiful location, rooms are spacious and clean.",
      },
      {
        user: "Michael L.",
        rating: 4.8,
        comment:
          "The restaurant serves delicious local cuisine. Highly recommended!",
      },
    ],
  },
  {
    id: 2,
    name: "Seaside Getaway",
    location: "Bergen, Norway",
    price: 150,
    rating: 4.6,
    image: "/images/artiom-vallat-rFxk_Ea9PME-unsplash.jpg",
    images: [
      "/images/artiom-vallat-rFxk_Ea9PME-unsplash.jpg",
      "/images/cristina-gottardi-ru4gWU_sSpQ-unsplash.jpg",
      "/images/annie-spratt-PlM2XRenqw4-unsplash.jpg",
    ],
    description:
      "Beautiful hotel located right on the coast with breathtaking ocean views. Wake up to the sound of waves and enjoy direct access to the beach. Our resort offers a perfect combination of relaxation and adventure with water sports, boat trips, and coastal walks. The rooms feature modern amenities with a coastal-inspired decor.",
    amenities: [
      "Free WiFi",
      "Beach Access",
      "Restaurant",
      "Bar",
      "Room Service",
    ],
    featured: true,
    rooms: [
      { type: "Ocean View", price: 150, beds: "1 Queen", capacity: 2 },
      { type: "Deluxe Ocean View", price: 200, beds: "1 King", capacity: 2 },
      { type: "Family Suite", price: 280, beds: "2 Queens", capacity: 4 },
    ],
    reviews: [
      {
        user: "Emily H.",
        rating: 4.7,
        comment: "The ocean views are spectacular! Worth every penny.",
      },
      {
        user: "David W.",
        rating: 4.5,
        comment: "Great location, friendly staff, and excellent food.",
      },
      {
        user: "Lisa T.",
        rating: 4.6,
        comment:
          "Beach access is so convenient. Perfect for a relaxing holiday.",
      },
    ],
  },
  // Add more hotels as needed with full details
  {
    id: 3,
    name: "City Center Suites",
    location: "Oslo, Norway",
    price: 180,
    rating: 4.7,
    image: "/images/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
    images: [
      "/images/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
      "/images/mp-fV2dM2WvKvE-unsplash.jpg",
      "/images/yianni-mathioudakis-uaVFsw7xIm0-unsplash.jpg",
    ],
    description:
      "Modern suites in the heart of the city, walking distance to major attractions. Our luxurious suites offer the perfect base for exploring Oslo's vibrant culture, museums, and shopping districts. Each suite features a separate living area, premium bedding, and state-of-the-art technology. Enjoy complimentary breakfast and evening socials in our elegant lounge.",
    amenities: [
      "Free WiFi",
      "Business Center",
      "Restaurant",
      "Parking",
      "Concierge",
    ],
    featured: true,
    rooms: [
      { type: "Executive Suite", price: 180, beds: "1 King", capacity: 2 },
      { type: "Premium Suite", price: 220, beds: "1 King", capacity: 2 },
      {
        type: "Family Suite",
        price: 300,
        beds: "1 King + 2 Singles",
        capacity: 4,
      },
    ],
    reviews: [
      {
        user: "Robert J.",
        rating: 4.8,
        comment:
          "Perfect location for exploring Oslo. The concierge service is excellent.",
      },
      {
        user: "Amanda P.",
        rating: 4.6,
        comment:
          "Spacious suites and very comfortable beds. Will definitely stay again.",
      },
      {
        user: "Thomas K.",
        rating: 4.7,
        comment:
          "Great business facilities and the restaurant serves excellent food.",
      },
    ],
  },
  // Add more hotels...
  {
    id: 4,
    name: "Northern Lights Lodge",
    location: "Tromsø, Norway",
    price: 200,
    rating: 4.9,
    image: "/images/vincent-guth-MAxHEAaAukI-unsplash.jpg",
    images: [
      "/images/vincent-guth-MAxHEAaAukI-unsplash.jpg",
      "/images/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
      "/images/artiom-vallat-rFxk_Ea9PME-unsplash.jpg",
    ],
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
    rooms: [
      { type: "Standard", price: 200, beds: "1 Queen", capacity: 2 },
      { type: "Deluxe", price: 250, beds: "1 King", capacity: 2 },
      { type: "Suite", price: 300, beds: "1 King + 1 Sofa", capacity: 4 },
    ],
    reviews: [
      { user: "Emma L.", rating: 5, comment: "Breathtaking aurora views!" },
      {
        user: "Oliver K.",
        rating: 4.8,
        comment: "Comfortable stay and great tours.",
      },
    ],
  },
  {
    id: 5,
    name: "Fjord View Inn",
    location: "Geiranger, Norway",
    price: 160,
    rating: 4.5,
    image: "/images/cristina-gottardi-ru4gWU_sSpQ-unsplash.jpg",
    images: [
      "/images/cristina-gottardi-ru4gWU_sSpQ-unsplash.jpg",
      "/images/annie-spratt-PlM2XRenqw4-unsplash.jpg",
      "/images/yianni-mathioudakis-uaVFsw7xIm0-unsplash.jpg",
    ],
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
    rooms: [
      { type: "Standard", price: 160, beds: "1 Queen", capacity: 2 },
      { type: "Deluxe", price: 190, beds: "1 King", capacity: 2 },
      { type: "Family Room", price: 230, beds: "2 Queens", capacity: 4 },
    ],
    reviews: [
      {
        user: "Liam T.",
        rating: 4.6,
        comment: "The fjord views are mesmerizing!",
      },
      {
        user: "Sophia R.",
        rating: 4.4,
        comment: "Great hiking opportunities nearby.",
      },
    ],
  },
  {
    id: 6,
    name: "Arctic Retreat",
    location: "Svalbard, Norway",
    price: 250,
    rating: 4.8,
    image: "/images/annie-spratt-PlM2XRenqw4-unsplash.jpg",
    images: [
      "/images/annie-spratt-PlM2XRenqw4-unsplash.jpg",
      "/images/vidar-nordli-mathisen-yJKb_4vjYwA-unsplash.jpg",
      "/images/rashid-khreiss-nB6kI5sxdVc-unsplash.jpg",
    ],
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
    rooms: [
      { type: "Cabin", price: 250, beds: "1 Queen", capacity: 2 },
      { type: "Luxury Cabin", price: 300, beds: "1 King", capacity: 2 },
      { type: "Group Cabin", price: 400, beds: "2 Queens", capacity: 4 },
    ],
    reviews: [
      { user: "Noah M.", rating: 4.9, comment: "Amazing Arctic adventure!" },
      {
        user: "Ava B.",
        rating: 4.7,
        comment: "Loved the polar bear sightings.",
      },
    ],
  },
  {
    id: 7,
    name: "Historic Harbor Hotel",
    location: "Ålesund, Norway",
    price: 140,
    rating: 4.4,
    image: "/images/yianni-mathioudakis-uaVFsw7xIm0-unsplash.jpg",
    images: [
      "/images/cristina-gottardi-ru4gWU_sSpQ-unsplash.jpg",
      "/images/rashid-khreiss-nB6kI5sxdVc-unsplash.jpg",
      "/images/annie-spratt-PlM2XRenqw4-unsplash.jpg",
    ],
    description:
      "Beautifully preserved historic hotel in the picturesque harbor area.",
    amenities: [
      "Free WiFi",
      "Fishing Tours",
      "Restaurant",
      "Kayaking",
      "Hiking",
    ],
    featured: true,
    rooms: [
      { type: "Standard", price: 180, beds: "1 Queen", capacity: 2 },
      { type: "Deluxe", price: 220, beds: "1 King", capacity: 2 },
      { type: "Family Suite", price: 280, beds: "2 Queens", capacity: 4 },
    ],
    reviews: [
      {
        user: "Lucas H.",
        rating: 4.8,
        comment: "The views are unreal, and the food is fantastic!",
      },
      {
        user: "Emma W.",
        rating: 4.6,
        comment: "Loved the fishing experience and the cozy cabins.",
      },
    ],
  },
  {
    id: 8,
    name: "Glacier View Lodge",
    location: "Jostedalsbreen, Norway",
    price: 190,
    rating: 4.7,
    image: "/images/rashid-khreiss-nB6kI5sxdVc-unsplash.jpg",
    images: [
      "/images/annie-spratt-PlM2XRenqw4-unsplash.jpg",
      "/images/vidar-nordli-mathisen-yJKb_4vjYwA-unsplash.jpg",
      "/images/rashid-khreiss-nB6kI5sxdVc-unsplash.jpg",
    ],
    description:
      "Comfortable lodge near Norway's largest glacier with amazing views.",
    amenities: [
      "Glass Roof Igloos",
      "Sauna",
      "Restaurant",
      "Skiing",
      "Snowmobile Tours",
    ],
    featured: true,
    rooms: [
      { type: "Standard Igloo", price: 300, beds: "1 Queen", capacity: 2 },
      { type: "Luxury Igloo", price: 350, beds: "1 King", capacity: 2 },
      { type: "Family Igloo", price: 400, beds: "2 Queens", capacity: 4 },
    ],
    reviews: [
      {
        user: "Sophia T.",
        rating: 5.0,
        comment: "A once-in-a-lifetime experience!",
      },
      {
        user: "William R.",
        rating: 4.8,
        comment: "Unforgettable night under the auroras!",
      },
    ],
  },
  {
    id: 9,
    name: "Countryside Cabins",
    location: "Telemark, Norway",
    price: 110,
    rating: 4.5,
    image: "/images/sven-V7WkmXntA8M-unsplash.jpg",
    images: [
      "/images/ammar-andiko-tu98qkamdNM-unsplash.jpg",
      "/images/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
      "/images/vincent-guth-MAxHEAaAukI-unsplash.jpg",
    ],
    description:
      "Escape to the peaceful Scottish Highlands with scenic mountain views.",
    amenities: [
      "Free WiFi",
      "Horseback Riding",
      "Restaurant",
      "Hiking Trails",
      "Whisky Tasting",
    ],
    featured: false,
    rooms: [
      { type: "Cottage", price: 220, beds: "1 Queen", capacity: 2 },
      { type: "Deluxe Suite", price: 280, beds: "1 King", capacity: 2 },
      { type: "Family Cabin", price: 350, beds: "2 Queens", capacity: 4 },
    ],
    reviews: [
      {
        user: "Ethan P.",
        rating: 4.7,
        comment: "A perfect getaway in nature!",
      },
      {
        user: "Charlotte D.",
        rating: 4.5,
        comment: "Loved the whisky tasting and hiking trails.",
      },
    ],
  },
  {
    id: 10,
    name: "Oslo Royal Hotel",
    location: "Oslo, Norway",
    price: 220,
    rating: 4.8,
    image: "/images/mp-fV2dM2WvKvE-unsplash.jpg",
    images: [
      "/images/vincent-guth-MAxHEAaAukI-unsplash.jpg",
      "/images/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
      "/images/artiom-vallat-rFxk_Ea9PME-unsplash.jpg",
    ],
    description:
      "Luxury cliffside suites with stunning sunset views over the Aegean Sea.",
    amenities: [
      "Infinity Pool",
      "Private Balconies",
      "Restaurant",
      "Spa",
      "Wine Tasting",
    ],
    featured: true,
    rooms: [
      { type: "Standard Suite", price: 280, beds: "1 Queen", capacity: 2 },
      { type: "Luxury Suite", price: 350, beds: "1 King", capacity: 2 },
      { type: "Family Suite", price: 420, beds: "2 Queens", capacity: 4 },
    ],
    reviews: [
      {
        user: "Mia G.",
        rating: 5.0,
        comment: "The most romantic place I've ever been!",
      },
      {
        user: "James L.",
        rating: 4.8,
        comment: "Incredible views and luxury service!",
      },
    ],
  },
  {
    id: 11,
    name: "Fishing Village Inn",
    location: "Lofoten Islands, Norway",
    price: 130,
    rating: 4.6,
    image: "/images/vidar-nordli-mathisen-yJKb_4vjYwA-unsplash.jpg",
    images: [
      "/images/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
      "/images/mp-fV2dM2WvKvE-unsplash.jpg",
      "/images/yianni-mathioudakis-uaVFsw7xIm0-unsplash.jpg",
    ],
    description:
      "Traditional inn in a historic fishing village with authentic Norwegian charm.",
    amenities: [
      "Ski-in/Ski-out",
      "Hot Tub",
      "Restaurant",
      "Sauna",
      "Mountain Views",
    ],
    featured: false,
    rooms: [
      { type: "Chalet Room", price: 350, beds: "1 Queen", capacity: 2 },
      { type: "Luxury Chalet", price: 400, beds: "1 King", capacity: 2 },
      { type: "Family Suite", price: 480, beds: "2 Queens", capacity: 4 },
    ],
    reviews: [
      { user: "Alexander J.", rating: 4.9, comment: "Perfect ski vacation!" },
      {
        user: "Emily F.",
        rating: 4.7,
        comment: "Cozy, luxurious, and breathtaking views.",
      },
    ],
  },
  {
    id: 12,
    name: "Mountain Ski Lodge",
    location: "Hemsedal, Norway",
    price: 170,
    rating: 4.7,
    image: "/images/laureen-missaire-p2h69snoLAM-unsplash.jpg",
    images: [
      "/images/ammar-andiko-tu98qkamdNM-unsplash.jpg",
      "/images/andrea-cau-nV7GJmSq3zc-unsplash.jpg",
      "/images/vincent-guth-MAxHEAaAukI-unsplash.jpg",
    ],
    description:
      "Stay in a luxurious overwater bungalow with direct ocean access.",
    amenities: [
      "Private Pool",
      "Snorkeling",
      "Spa",
      "Restaurant",
      "Butler Service",
    ],
    featured: true,
    rooms: [
      { type: "Overwater Bungalow", price: 500, beds: "1 King", capacity: 2 },
      { type: "Luxury Bungalow", price: 600, beds: "1 King", capacity: 2 },
      { type: "Family Villa", price: 700, beds: "2 Queens", capacity: 4 },
    ],
    reviews: [
      { user: "Olivia M.", rating: 5.0, comment: "Absolute paradise!" },
      {
        user: "Daniel W.",
        rating: 4.9,
        comment: "Once in a lifetime experience!",
      },
    ],
  },
];

interface HotelDetailPageProps {
  id: string | string[];
}

export default function HotelDetailPage({ id }: HotelDetailPageProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const guests = searchParams.get("guests") || "1";

  // Convert id to number if it's a string
  const hotelId =
    typeof id === "string"
      ? parseInt(id)
      : Array.isArray(id)
      ? parseInt(id[0])
      : 0;

  // Find the hotel by ID
  const hotel = allHotels.find((h) => h.id === hotelId);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!hotel) {
    return (
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Hotel Not Found</h1>
            <p className="mb-8">
              We couldn&apos;t find the hotel you&apos;re looking for.
            </p>
            <Link
              href="/hotels"
              className={`px-6 py-3 rounded-lg ${
                darkMode ? "bg-amber-500" : "bg-amber-500"
              } text-white font-medium`}
            >
              Back to Hotels
            </Link>
          </div>
        </div>
        <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    );
  }

  // Function to handle room selection
  const handleRoomSelect = (roomType: string) => {
    setSelectedRoom(roomType);
  };

  // Function to handle booking
  const handleBooking = () => {
    if (!selectedRoom) {
      alert("Please select a room type first.");
      return;
    }

    // Find the selected room to get its price
    const room = hotel.rooms.find((r) => r.type === selectedRoom);
    if (!room) return;

    // Build the query parameters for the booking page
    const params = new URLSearchParams({
      hotelId: hotel.id.toString(),
      hotelName: hotel.name,
      location: hotel.location,
      roomType: selectedRoom,
      roomPrice: room.price.toString(),
      checkin: checkin || new Date().toISOString().split("T")[0],
      checkout:
        checkout || new Date(Date.now() + 86400000).toISOString().split("T")[0], // Next day by default
      guests: guests,
    });

    // Navigate to the booking page with all the required parameters
    window.location.href = `/booking?${params.toString()}`;
  };

  //   // In a real application, this would redirect to a booking form or checkout page
  //   alert(
  //     `Booking ${selectedRoom} at ${hotel.name} from ${checkin} to ${checkout} for ${guests} guests`
  //   );
  // };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/hotels"
            className={`flex items-center text-amber-500 hover:text-amber-600 transition-colors`}
          >
            <span className="mr-2">←</span> Back to Hotels
          </Link>
        </div>

        {/* Hotel Name and Rating */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
            <div className="flex items-center mt-2">
              <MapPinIcon className="h-5 w-5 mr-1 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                {hotel.location}
              </span>
            </div>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-amber-500 flex items-center text-lg font-bold">
              <StarIcon className="h-5 w-5 mr-1 fill-current" /> {hotel.rating}
            </span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">
              ({hotel.reviews.length} reviews)
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={hotel.images[activeImageIndex]}
              alt={hotel.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
            {hotel.images.map((image, index) => (
              <div
                key={index}
                className={`h-16 w-24 rounded-md overflow-hidden cursor-pointer ${
                  activeImageIndex === index ? "ring-2 ring-amber-500" : ""
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${hotel.name} - ${index + 1}`}
                  width={96} // Adjust as needed
                  height={64} // Adjust as needed
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description and Amenities */}
          <div className="lg:col-span-2">
            <div
              className={`p-6 rounded-lg mb-6 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4">About this hotel</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {hotel.description}
              </p>

              <h3 className="text-xl font-semibold mb-3">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    {amenity.includes("WiFi") && (
                      <WifiIcon className="h-5 w-5 mr-2 text-amber-500" />
                    )}
                    {amenity.includes("Restaurant") && (
                      <UtensilsIcon className="h-5 w-5 mr-2 text-amber-500" />
                    )}
                    {amenity.includes("Fitness") && (
                      <DumbbellIcon className="h-5 w-5 mr-2 text-amber-500" />
                    )}
                    {!amenity.includes("WiFi") &&
                      !amenity.includes("Restaurant") &&
                      !amenity.includes("Fitness") &&
                      !amenity.includes("Pool") && (
                        <span className="h-5 w-5 mr-2 text-amber-500">•</span>
                      )}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>
              <div className="space-y-4">
                {hotel.reviews.map((review, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{review.user}</h4>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-amber-500 fill-current" />
                        <span className="ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div
              className={`p-6 rounded-lg sticky top-24 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4">Book Your Stay</h2>

              {/* Booking details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-amber-500" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Check-in
                    </div>
                    <div className="font-medium">
                      {checkin || "Select date"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-amber-500" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Check-out
                    </div>
                    <div className="font-medium">
                      {checkout || "Select date"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-amber-500" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Guests
                    </div>
                    <div className="font-medium">{guests}</div>
                  </div>
                </div>
              </div>

              {/* Room selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Select Room Type</h3>
                <div className="space-y-3">
                  {hotel.rooms.map((room, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg cursor-pointer border transition-colors ${
                        selectedRoom === room.type
                          ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                          : `${
                              darkMode
                                ? "border-gray-700 bg-gray-700"
                                : "border-gray-200 bg-white"
                            }`
                      }`}
                      onClick={() => handleRoomSelect(room.type)}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{room.type}</h4>
                        <div className="font-bold text-amber-500">
                          ${room.price}/night
                        </div>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <BedIcon className="h-4 w-4 mr-1" />
                        <span>{room.beds}</span>
                        <span className="mx-2">•</span>
                        <UserIcon className="h-4 w-4 mr-1" />
                        <span>Up to {room.capacity} guests</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBooking}
                className={`w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors ${
                  !selectedRoom ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!selectedRoom}
              >
                Book Now
              </button>
              {!selectedRoom && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                  Please select a room to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
