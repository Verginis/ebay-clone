import React from 'react'
import Navbar from '../components/Navbar'
//import NewAuction from '../components/NewAuction'
import UserAuctions from '../components/UserAuctions'

const Auctions = () => {
  return (
    <div>
        <Navbar />
        <UserAuctions />
    </div>
  )
}

export default Auctions