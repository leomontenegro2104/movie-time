import React from "react";
import { Link } from "react-router-dom";

export interface HeaderNavProps {
  display: string;
  path: string;
}

export interface NavbarProps {
  activeIndex: number;
  headerNav: HeaderNavProps[];
}

const Navbar: React.FC<NavbarProps> = ({ activeIndex, headerNav }) => {

  return (
    <nav>
      <ul className="flex gap-6">
        {headerNav.map((item, index) => (
          <li key={index} className={`relative font-semibold text-lg ${index === activeIndex ? "text-red-500" : "text-white"}`}>
            <Link to={item.path} className="hover:text-red-500 transition duration-300">
              {item.display}
            </Link>
            {index === activeIndex && (
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 h-[2px] w-full bg-red-500"></span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
