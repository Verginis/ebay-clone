import React from 'react'
import {useNavigate, Link} from 'react-router-dom'
import '../styles/navbar.scss'
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useState } from 'react'
import axios from '../api/axios';

const URL_JSON  = '/api/v1/admin/download/json';
const URL_XML  = '/api/v1/admin/download/xml';

const Navbar = () => {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  
  const logout = async () => {
    // if used in more components, this should be in context 
    // axios to /logout endpoint 
    setAuth({});
    navigate('/');
  }

  const downloadXMLHandler = async(e) => {
    e.preventDefault();

    try {
       const response = await axios.get(URL_XML,
      {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
        withCredentials: true
      });
       console.log(response?.data);
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'items.xml');
       document.body.appendChild(link);
       link.click();

       document.body.removeChild(link);
       URL.revokeObjectURL(url);
   } catch (err) {
       if (!err?.response) {
           setErrMsg('No Server Response');
       } else if (err.response?.status === 500) {
           setErrMsg('No Auctions started');
       } else {
           setErrMsg('Registration Failed')
       } 
    }
  }

  const downloadJSONHandler = async(e) =>{
    e.preventDefault();
    try {
       const response = await axios.get(URL_JSON,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
       console.log(response?.data);
       let dt = JSON.stringify(response?.data, null, 4);
       const url = window.URL.createObjectURL(new Blob([dt]))
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'items.json');
       document.body.appendChild(link);
       link.click();

       document.body.removeChild(link);
       URL.revokeObjectURL(url);
   } catch (err) {
       if (!err?.response) {
           setErrMsg('No Server Response');
       } else if (err.response?.status === 500) {
           setErrMsg('No Auctions started');
       } else {
           setErrMsg('Registration Failed')
       } 
    }
  }

  return (
    <div className='header'>
        
        {auth?.user
          ?auth?.role == 'User'
            ? <Link to='/products'><h1 className='logo'>my<span>bay</span></h1></Link>
            : <Link to='/admin'><h1 className='logo'>my<span>bay</span></h1></Link>
          : <Link to='/'><h1 className='logo'>my<span>bay</span></h1></Link>
          
        }

        {auth?.user 
          ? auth?.role == 'User'
            ?<div className='form-btns'>
                <Link to='/auctions'><button className='logbtn'>Auctions</button></Link>
                <Link to='/messages'><button className='logbtn'>Messages</button></Link>
                <button onClick={logout} className='regbtn anim-btn'>Log Out</button>
              </div>
            :<div className='form-btns'>
                <button onClick={downloadXMLHandler} className='logbtn'>Export XML</button>
                <button onClick={downloadJSONHandler} className='logbtn'>Export JSON</button>
                <button onClick={logout} className='regbtn anim-btn'>Log Out</button>
              </div>
          
          :<div className='form-btns'>
              <Link to='/login'><button className='logbtn'>Log In</button></Link>
              <Link to='/register'><button className='regbtn anim-btn'>Sign Up</button></Link>
          </div>
        }
    </div>
  )
}

export default Navbar