import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <div className='navbar'>
        <ul className='nav-list'>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/read")}>Read</li>
            <li onClick={() => navigate("/update")}>Update</li>
        </ul>
    </div>
  )
}

export default Navbar