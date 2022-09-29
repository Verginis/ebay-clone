import React from 'react'
import Navbar from '../components/Navbar'
import unauthorized from '../assets/unauthorized.jpg'
import { useNavigate } from "react-router-dom"
import '../styles/unauthorized.scss'

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

  return (
    <div>
        <Navbar />
        <div className='unauth'>
            <h1>Unauthorized</h1>
            <img src={unauthorized} alt="unauthorized"/>
            <div className="flexGrow">
                <p>You do not have access to the requested page. </p>
                <button onClick={goBack}>Go Back</button>
            </div>
        </div>
    </div>
  )
}

export default Unauthorized