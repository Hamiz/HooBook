import Link from "next/link";
import { MoonIcon, SunIcon } from "lucide-react";

interface FooterProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Footer = ({ darkMode = false, toggleDarkMode }: FooterProps) => {
  return (
    <footer
      className={`py-8 px-4 sm:px-6 lg:px-8 border-t ${
        darkMode
          ? "bg-gray-900 border-gray-800 text-gray-300"
          : "bg-white border-gray-200 text-gray-600"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <span className={darkMode ? "text-white" : "text-gray-900"}>
              Bookme
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              .com
            </span>
          </Link>
          <p className="mt-2 text-sm">
            Find your perfect stay, anywhere in the world.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8">
          <Link href="/about" className="text-sm hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="text-sm hover:underline">
            Contact
          </Link>
          <Link href="/terms" className="text-sm hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
        </div>

        <div className="mt-6 md:mt-0">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
