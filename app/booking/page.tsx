"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { CalendarIcon, UserIcon, BedIcon, MapPinIcon } from "lucide-react";

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}

function BookingContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ `useSearchParams()` is now inside a component wrapped in <Suspense>
  const searchParams = useSearchParams();
  const hotelId = searchParams.get("hotelId") || "";
  const hotelName = searchParams.get("hotelName") || "";
  const location = searchParams.get("location") || "";
  const roomType = searchParams.get("roomType") || "";
  const roomPrice = searchParams.get("roomPrice") || "";
  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const guests = searchParams.get("guests") || "1";

  // Calculate number of nights
  const [nights, setNights] = useState(1);

  useEffect(() => {
    if (checkin && checkout) {
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);
      const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
      const nightsCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setNights(nightsCount > 0 ? nightsCount : 1);
    }
  }, [checkin, checkout]);

  // Calculate total price
  const totalPrice = parseFloat(roomPrice) * nights;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name in formErrors) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // In a real application, this would submit the booking to a server
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "Booking confirmed! A confirmation email has been sent to your inbox."
      );
      // In a real app, you would redirect to a confirmation page
    }, 1500);
  };

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
            href={`/hotels/${hotelId}`}
            className={`flex items-center text-amber-500 hover:text-amber-600 transition-colors`}
          >
            <span className="mr-2">←</span> Back to Hotel Details
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div
              className={`p-6 rounded-lg mb-6 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h2 className="text-2xl font-bold mb-6">Guest Information</h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="firstName"
                    >
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="lastName"
                    >
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="phone"
                    >
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="specialRequests"
                  >
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full p-3 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div
              className={`p-6 rounded-lg sticky top-24 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg">{hotelName}</h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{location}</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <BedIcon className="h-5 w-5 mr-2 text-amber-500" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Room Type
                    </div>
                    <div className="font-medium">{roomType}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-amber-500" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Check-in
                    </div>
                    <div className="font-medium">{checkin}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-amber-500" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Check-out
                    </div>
                    <div className="font-medium">{checkout}</div>
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

              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } mb-4`}
              >
                <div className="flex justify-between mb-2">
                  <span>Room ({roomType})</span>
                  <span>${roomPrice}/night</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Nights</span>
                  <span>{nights}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 my-2 pt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-amber-500">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } text-sm`}
              >
                <p className="mb-2">
                  <strong>Cancellation Policy:</strong> Free cancellation up to
                  48 hours before check-in.
                </p>
                <p>
                  <strong>Payment:</strong> Your card will not be charged until
                  check-in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
