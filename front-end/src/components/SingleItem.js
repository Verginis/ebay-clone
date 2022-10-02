import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet'
import useAuth from '../hooks/useAuth';
import {Link} from 'react-router-dom'
import axios from '../api/axios'
import completed from '../assets/completed.jpg'
import L from 'leaflet'
import '../styles/map.scss'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import '../styles/single-item.scss'


const AFM_REGEX = /^[0-9]{1,10}$/;

const SingleItem = () => {
    const markerRef = useRef( null );
    const errRef = useRef();
    const { auth } = useAuth();

    const [make_bid, setmake_bid] = useState('');
    const [validmake_bid, setValidmake_bid] = useState(false);
    const [make_bidFocus, setmake_bidFocus] = useState(false);

    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);



    let DefaultIcon = L.icon({
      iconUrl: icon
    });

    const location = useLocation();
    const data = location.state;
    console.log(data);
    //const cordinates = {data.longitude,data.latitude}
    const longitude = data.longitude;
    const latitude = data.latitude;
    var boolmap = false;
    if(longitude!=null && latitude!=null){
      boolmap = true;
    }

    useEffect(() => {
      var bool = false;
      if(make_bid> data.current_bid && AFM_REGEX.test(make_bid)){
        bool = true;
      }
      setValidmake_bid(bool);
    }, [make_bid])


    const handleBuy = async () => {

      var bidderId = auth?.id;
      console.log('bbb', bidderId ,' id' , data.id );
      try {
        // console.log('yeaaah')
         const response = await axios.post('api/v1/items/'+ data.id +'/buy',
             { bidderId },
             {
                 headers: { 'Content-Type': 'application/json' },
                 withCredentials: true
             }
         );
         console.log("aaaaaaaaaa");
         console.log(response?.data);
         //console.log(response?.accessToken);
         //console.log(JSON.stringify(response))
         setSuccess(true);
         //clear state and controlled inputs
         //need value attrib on inputs for this
         setmake_bid('');

     } catch (err) {
         if (!err?.response) {
             setErrMsg('No Server Response');
         } else if (err.response?.status === 409) {
             setErrMsg('Username Taken');
         } else {
             setErrMsg('Registration Failed')
         }
     }
    }

    const handleBid = async () => {

      var bidderId = auth?.id;
      var amount = make_bid;
      try {
        // console.log('yeaaah')
         const response = await axios.post('api/v1/items/'+ data.id +'/bid',
             { bidderId, amount },
             {
                 headers: { 'Content-Type': 'application/json' },
                 withCredentials: true
             }
         );
         console.log("aaaaaaaaaa");
         console.log(response?.data);
         //console.log(response?.accessToken);
         //console.log(JSON.stringify(response))
         setSuccess(true);
         //clear state and controlled inputs
         //need value attrib on inputs for this
         setmake_bid('');

     } catch (err) {
         if (!err?.response) {
             setErrMsg('No Server Response');
         } else if (err.response?.status === 409) {
             setErrMsg('Username Taken');
         } else {
             setErrMsg('Registration Failed')
         }
         errRef.current.focus();
     }
    }



  return (

    <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <img src={completed} alt="completed" className='com-img'/>
                <p className='success-par'>
                    Your auction has been successfully submited.<br/>
                    Return to <Link to='/products'>Home</Link>
                </p>
            </section>
        ) : (
            <div className='single-item-page'>
                <div className='single-item-page-wrapper'>
                  <h1>{data.name}</h1>
                  <p className='descr-par'>{data.description}</p>
                  <div className='wrapper-cat'>
                    <h4>Categories: </h4>
                        
                    <h5>{data.category[0]}</h5>
                    <h5>{data.category[1]}</h5>
                    <h5>{data.category[2]}</h5>
                    <h5>{data.category[3]}</h5>
                    </div>
                      
                      <div className="wrapper-2">
                        <span>Country: {data.country}</span>
                        <span>Location: {data.location}</span>
                      </div>

                      

                      {boolmap === true &&
                        <MapContainer center={[longitude, latitude]} zoom={13} scrollWheelZoom={false}>
                          <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker
                              icon={DefaultIcon}
                              draggable={false}
                              position={[
                                  longitude ? longitude : "",
                                  latitude ? latitude : "",
                              ]}
                              ref={markerRef}>
                          </Marker>
                        </MapContainer>
                      }

                      

                      <h5>The Auction ends in: {data.ended}</h5>

                      <div className="wrapper-2">
                        <div className='btn-cont'>
                          <span>Buy Price: {data.buy_price}</span>
                          <button className='anim-btn' onClick={handleBuy}>Buy Now</button>
                        </div>

                        <div className='btn-cont'>
                          <span>Current Bid: {data.current_bid}</span>
                          <div>

                            <input
                                type="make_bid"
                                id="make_bid"
                                autoComplete="on"
                                onChange={(e) => setmake_bid(e.target.value)}
                                value={make_bid}
                                required
                                aria-invalid={validmake_bid ? "false" : "true"}
                                aria-describedby="make_bidnote"
                                onFocus={() => setmake_bidFocus(true)}
                                onBlur={() => setmake_bidFocus(false)}
                            />
                            <p id="make_bidnote" className={make_bidFocus && make_bid && !validmake_bid ? "instructions" : "offscreen"}>
                                put a higher price than the current bid.
                            </p>
                            <button className='anim-btn' onClick={handleBid}>Place a Bid</button>
                          </div>
                        </div>
                      </div>

                </div>
                          
                      
                      
            </div>

    )}
    </>
  )
}

export default SingleItem