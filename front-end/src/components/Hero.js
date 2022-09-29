import React from 'react'
import {Link} from 'react-router-dom'
import Typed from 'react-typed'
import '../styles/hero.scss'
import heroimg from '../assets/heroimg.jpg'

const Hero = () => {
  return (
    <main className='heromain'>
        <div>
            <h1>With myBay, if you can dream it, you can<br/>
                <Typed strings={['sell it...', 'buy it...']} typeSpeed={100} backSpeed={120} loop/> </h1>
            
            <p>At myBay, we create pathways to connect millions of sellers and buyers all around the world.
                Our technology empowers our customers, providing everyone the opportunity to grow and thrive — no matter who they
                are or where they are in the world.</p>
                <Link to='/products'><button className='anim-btn'>Start Exploring Now</button></Link>
        </div>

        <img src={heroimg} alt="hero"/>
    </main>
  )
}

export default Hero