"use client";

import { useState } from "react";
import { UserIcon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      // Here you would typically make an API call to your auth endpoint
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful login - would typically redirect or update auth state
      console.log("Logged in with:", { email });
      // Redirect would happen here - e.g., router.push('/dashboard')
    } catch (err) {
      setError("Invalid email or password");
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

      <div className="max-w-md mx-auto px-4 py-24">
        <div
          className={`rounded-lg shadow-lg p-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
                  <UserIcon className="h-5 w-5 text-gray-400" />
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
                  placeholder="Your password"
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

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm">
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="#"
                  className="text-sm text-amber-500 hover:text-amber-600"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-amber-500 hover:text-amber-600 font-medium"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
