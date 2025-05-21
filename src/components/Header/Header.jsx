import React, { useState } from "react";
import { Link } from "react-router-dom";
import {motion , useScroll, useMotionValueEvent} from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarFixed isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
  );
}

function NavbarFixed({ isMenuOpen, setIsMenuOpen }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [showLinksOnly, setShowLinksOnly] = useState(false);

  useMotionValueEvent(scrollY, "change",(latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    if (latest > 500) { // Adjust this value based on the height of your hero section
      setShowLinksOnly(true);
    } else {
      setShowLinksOnly(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration:0.5, ease: "easeInOut" }}
      className="fixed z-10 flex justify-between w-full px-16 py-2 top-2"
    >
      <div className={`flex items-center gap-2 text-white transition-transform duration-700 ${showLinksOnly ? 'translate-y-[-100px]' : 'translate-y-0'}`}>        
        <svg
          className="rotate-180"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.49988 1.82689C4.36688 1.8269 1.82707 4.36672 1.82707 7.49972C1.82707 10.6327 4.36688 13.1725 7.49988 13.1726C10.6329 13.1725 13.1727 10.6327 13.1727 7.49972C13.1727 4.36672 10.6329 1.8269 7.49988 1.82689Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <p className="text-2xl font-bold">Boyztrip</p>
      </div>
      <div className="flex items-center md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <ul className="hidden md:flex items-center text-white px-3 py-2 rounded-full bg-black bg-opacity-30 backdrop-blur-md">
        <li className="px-4 text-xl hover:bg-white hover:bg-opacity-20 rounded-full transition duration-300">
          <Link to="/pods">Home</Link>
        </li>
        <li className="px-4 text-xl hover:bg-white hover:bg-opacity-20 rounded-full transition duration-300">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="px-4 text-xl hover:bg-white hover:bg-opacity-20 rounded-full transition duration-300">
          <Link to="/">Store</Link>
        </li>
      </ul>
      <div className={`hidden md:block px-6 py-2 ml-4 text-white bg-black bg-opacity-50 rounded-full text-lg hover:bg-opacity-70 transition-transform duration-700 ${showLinksOnly ? 'translate-y-[-100px]' : 'translate-y-0'}`}>
        <Link to="/">Login</Link>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 py-10 left-0 w-full bg-black text-white md:hidden">
          <ul className="flex flex-col items-center">
            <li className="px-2 py-2 text-md">
              <Link to="/pods">Home</Link>
            </li>
            <li className="px-2 py-2 text-md">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="px-2 py-2 text-md">
              <Link to="/">Store</Link>
            </li>
            <li className="px-4 py-1 mt-2 text-md bg-white text-black rounded-full">
              <Link to="/">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </motion.nav>
  );
}

// Remove NavbarScroll component as it is no longer needed