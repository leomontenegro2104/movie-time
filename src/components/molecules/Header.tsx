import React, { useRef, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Logo from "../../atoms/Logo"
import Navbar from "../../atoms/Navbar"

const headerNav = [
  { display: "Home", path: "/" },
  { display: "Movies", path: "/movie" },
  { display: "TV Series", path: "/tv" },
]

const Header: React.FC = () => {
  const { pathname } = useLocation()
  const headerRef = useRef<HTMLDivElement | null>(null)

  const activeIndex = headerNav.findIndex((e) => e.path === pathname)

  useEffect(() => {
    const shrinkHeader = () => {
      if (headerRef.current) {
        if (window.scrollY > 100) {
          headerRef.current.classList.add("bg-gray-900", "shadow-md", "h-14")
        } else {
          headerRef.current.classList.remove("bg-gray-900", "shadow-md", "h-14")
        }
      }
    }

    window.addEventListener("scroll", shrinkHeader)
    return () => window.removeEventListener("scroll", shrinkHeader)
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 flex items-center px-6 bg-transparent"
    >
      <div className="container mx-auto flex flex-row justify-between items-center">
        <Logo />

        <Navbar activeIndex={activeIndex} headerNav={headerNav} />
      </div>
    </header>
  )
}

export default Header
