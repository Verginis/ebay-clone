import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/navbar.scss'

const Navbar = () => {
  return (
    <div className='header'>
        <Link to='/'><h1 className='logo'>my<span>bay</span></h1></Link>
        <div className='form-btns'>
            <Link to='/login'><button className='logbtn'>Log In</button></Link>
            <Link to='/register'><button className='regbtn anim-btn'>Sign Up</button></Link>
        </div>
    </div>
  )
}

export default Navbar