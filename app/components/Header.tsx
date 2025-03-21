"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MoonIcon, SunIcon, DownloadIcon } from "lucide-react";

interface HeaderProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Header = ({ darkMode = false, toggleDarkMode }: HeaderProps) => {
  const [, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-50 py-4 px-6 flex flex-col items-center">
      {/* Curved Navigation Container */}
      <div className="relative w-full max-w-4xl backdrop-blur-md dark:bg-gray-900 shadow-md rounded-full p-3 flex items-center justify-between overflow-hidden">
        <Link
          href="/"
          className="text-2xl font-bold flex items-center text-gray-900 dark:text-white px-6"
        >
          HooBook
          <span className="text-sm text-gray-500 dark:text-gray-400">.com</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 dark:text-gray-300 font-medium">
          <Link
            href="/hotels"
            className="hover:text-black dark:hover:text-white"
          >
            Hotels
          </Link>
          <Link
            href="/about"
            className="hover:text-black dark:hover:text-white"
          >
            About Us
          </Link>
          <Link href="blogs" className="hover:text-black dark:hover:text-white">
            Blogs
          </Link>
          <Link
            href="/signup"
            className="hover:text-black dark:hover:text-white"
          >
            Sign up
          </Link>
        </nav>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full border border-black dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-400"
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5 text-yellow-500" />
          ) : (
            <MoonIcon className="h-5 w-5 text-gray-800" />
          )}
        </button>

        {/* Get the App Button */}
        <button className="ml-4 px-4 py-2 rounded-full border border-black hover:bg-gray-200 flex items-center text-gray-700 dark:text-gray-300 hover:border-gray-400 transition-all">
          <DownloadIcon className="h-4 w-4 mr-2" /> Get the app
        </button>
      </div>
    </header>
  );
};

export default Header;
