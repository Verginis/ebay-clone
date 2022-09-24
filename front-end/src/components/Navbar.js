import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
import '../styles/navbar.scss'
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Navbar = () => {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = async () => {
    // if used in more components, this should be in context 
    // axios to /logout endpoint 
    setAuth({});
    navigate('/');
  }

  return (
    <div className='header'>
        <Link to='/'><h1 className='logo'>my<span>bay</span></h1></Link>

        {auth?.user &&
          <button onClick={logout} className='regbtn anim-btn'>Log Out</button>
        }
        {!auth?.user &&
        <div className='form-btns'>
            <Link to='/login'><button className='logbtn'>Log In</button></Link>
            <Link to='/register'><button className='regbtn anim-btn'>Sign Up</button></Link>
        </div>
        }
    </div>
  )
}

export default Navbar