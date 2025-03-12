import React from "react"
import { Link } from "react-router-dom"
import logo from "@src/assets/tmovie.png"

const Logo: React.FC = () => {

  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="Logo" className="w-12" />
      <Link to="/" className="text-2xl font-bold text-white">
        Movie Time
      </Link>
    </div>
  )
}

export default Logo
