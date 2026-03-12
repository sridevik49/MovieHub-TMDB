import React from 'react'
import { Link } from "react-router-dom"
import Input from '../../Components/Input'
import './index.css'


const Navbar = ({ search, setSearch }) => {


  return (
    <div className='navbar'>
      <div className='nav-left'>
        <h1>MovieHub</h1>
      </div>

      <div className='nav-right'>
        <ul className='nav-list'>
          <li>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Movies"
            />
          </li>

          <Link className="nav-link" to={'/'}>
            <li>Home</li>
          </Link>

          <Link className="nav-link" to={'/about'}>
            <li>About</li>
          </Link>

          <Link className="nav-link" to={'/contact'}>
            <li>Contact</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar