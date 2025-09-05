import { ChevronDown } from "lucide-react";
import Logo from "../../public/images/Swah Ai 02.png"; // Update with correct path

function Header() {
  return (
    <header className="w-full px-6 py-4 border-b transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="icon" className="w-12 h-12 rounded-xl" />
          <span className="text-xl font-bold">SmarttWrap Ai</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Get Started Button - Desktop */}
          <button
            onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight * 0.5, // scroll to 50% of page height
                behavior: "smooth", // smooth scrolling
              });
            }}
            className="hidden sm:flex px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 transform cursor-pointer bg-blue-600 hover:bg-blue-500 text-white"
          >
            Get Started
          </button>

          {/* Down Arrow - Mobile Only */}
          <button
            onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight * 0.5,
                behavior: "smooth",
              });
            }}
            className="sm:hidden p-3 rounded-full font-medium transition-all duration-200 hover:scale-105 transform cursor-pointer bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center"
            aria-label="Scroll to content"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
