import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import Input from '../../Components/Input'
import './index.scss'

const Navbar = ({ search, setSearch }) => {

  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className='navbar'>

      {/* LEFT - LOGO */}
      <div className='nav-left'>
        <h1>MovieHub</h1>
      </div>

      {/* 🔍 SEARCH */}
      <div className="nav-search">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search Movies"
        />
      </div>

      {/* 🍔 HAMBURGER */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* MENU */}
      <div className={`nav-right ${menuOpen ? "active" : ""}`}>
        <ul className='nav-list'>

          <Link className="nav-link" to={'/'} onClick={closeMenu}>
            <li>Home</li>
          </Link>

          <Link className="nav-link" to={'/about'} onClick={closeMenu}>
            <li>About</li>
          </Link>

          <Link className="nav-link" to={'/contact'} onClick={closeMenu}>
            <li>Contact</li>
          </Link>

          {/* 👤 AUTH SECTION */}
          <li className="auth-group">
            {user ? (
              <div className="user-menu">

                {/* Avatar + Name */}
                <div
                  className="user-info"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${user.email}`
                    }
                    alt="avatar"
                    className="avatar"
                  />
                  <span className="username">
                    {user.displayName || user.email.split("@")[0]}
                  </span>
                </div>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="dropdown">
                    <Link to="/profile" onClick={closeMenu}>
                      Profile
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                        setDropdownOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <Link className="auth-btn" to="/login" onClick={closeMenu}>
                Login
              </Link>
            )}
          </li>

        </ul>
      </div>

    </div>
  )
}

export default Navbar