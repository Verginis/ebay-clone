import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='header'>
        <Link to='/'><h1>MyBay</h1></Link>
        <div>
            <Link to='/login'><button>Log In</button></Link>
            <Link to='/register'><button>Sign In</button></Link>
        </div>
    </div>
  )
}

export default Navbar