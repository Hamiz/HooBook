"use client";

import { useState } from "react";
import {
  UserIcon,
  LockIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SignupPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the Terms and Privacy Policy");
      return;
    }

    try {
      setIsLoading(true);
      // Here you would typically make an API call to your registration endpoint
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful registration - would typically redirect or update auth state
      console.log("Registered with:", { name, email });
      // Redirect would happen here - e.g., router.push('/dashboard')
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="max-w-md mx-auto px-4 py-16">
        <div
          className={`rounded-lg shadow-lg p-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            Create Account
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div
                className={`flex items-center border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300 bg-white"
                } rounded-lg`}
              >
                <span className="px-3">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-3 bg-transparent focus:outline-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email</label>
              <div
                className={`flex items-center border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300 bg-white"
                } rounded-lg`}
              >
                <span className="px-3">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-3 bg-transparent focus:outline-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  placeholder="Your email address"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <div
                className={`flex items-center border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300 bg-white"
                } rounded-lg`}
              >
                <span className="px-3">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3 bg-transparent focus:outline-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div
                className={`flex items-center border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300 bg-white"
                } rounded-lg`}
              >
                <span className="px-3">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-3 bg-transparent focus:outline-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="px-3"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm">
                I agree to the{" "}
                <a href="#" className="text-amber-500 hover:text-amber-600">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-amber-500 hover:text-amber-600">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-amber-500 hover:text-amber-600 font-medium"
              >
                Login in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
