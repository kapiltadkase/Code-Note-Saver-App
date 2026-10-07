import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-30 justify-center place-content-evenly mb-2 mt-2'>
        <NavLink to="/">
            Home
        </NavLink>

        <NavLink to="/pastes">
            Pastes
        </NavLink>
    </div>
  )
}

export default Navbar