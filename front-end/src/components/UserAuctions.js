import { useState, useEffect } from "react"
import axios from "../api/axios";
import useAuth from '../hooks/useAuth';
import {Link} from 'react-router-dom'
import { faCheck , faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/auctions.scss'

const LOGIN_URL = '/api/v1/users';
const ACCEPT_URL = '/api/v1/items/';

const UserAuctions = () => {
  const [users, setUsers] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(auth?.id)

    const getUsers = async () => {
        try {
            const response = await axios.get('/api/v1/items/'+auth?.id);
            console.log(response?.data);
            setUsers(response?.data);
        } catch (err) {
            console.error(err);
        }
    }

    getUsers();

    return () => {
        isMounted = false;
        controller.abort();
    }
}, [])

  return (
    <div>
        <div className="up-btn">
          <h2>Auctions List</h2>
          <Link to='/auctions/form' className='anim-btn new-mes'>New Auction</Link>
        </div>
        {users?.length
                ? (
                  <div className="auct-list">
                    {users.map(({name, i, description,category, country, location, buy_price, current_bid}) => {
                      return(
                        <div key={i} className='auction-details-container'>
                          <h2>{name}</h2>

                          <div className="categories-wrapper">
                            <h4>Categories: </h4>
                            <h5>{category[0]}</h5>
                            <h5>{category[1]}</h5>
                            <h5>{category[2]}</h5>
                            <h5>{category[3]}</h5>
                          </div>
                          
                          <p>Description: {description}</p>
                          
                          <div className="wrapper-2">
                            <span>Country: {country}</span>
                            <span>Location: {location}</span>
                          </div>

                          <div className="wrapper-2">
                            <span>Buy Price: {buy_price}</span>
                            <span>Current Bid: {current_bid}</span>
                          </div>


                          
                          

                        </div>
                      );
                      })}
                </div>
                ) : <p>No users to display</p>
        }
    </div>
  )
}

export default UserAuctions