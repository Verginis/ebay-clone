import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { faCheck , faTimes , faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import completed from '../assets/completed.jpg'
import useAuth from '../hooks/useAuth';
import {Link} from 'react-router-dom'
import axios from '../api/axios'
import Map from './Map'
import '../styles/forms.scss'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const NAME_REGEX = /^[a-zA-Z ]{3,24}$/;
const CATEGORY_REGEX = /^([^\s])/;
const AFM_REGEX = /^[0-9]{1,10}$/;
const REGISTER_URL = '/api/v1/items';

const NewAuction = () => {
    const userRef = useRef();
    const errRef = useRef();
    const { auth } = useAuth();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [categories, setCategories] = useState(['']);
    const [validCategories, setValidCategories] = useState(false);
    const [categoriesFocus, setCategoriesFocus] = useState(false);

    const [description, setDescription] = useState('');
    const [validDescription, setValidDescription] = useState(false);
    const [descriptionFocus, setDescriptionFocus] = useState(false);

    const [location, setlocation] = useState('');
    const [validlocation, setValidlocation] = useState(false);
    const [locationFocus, setlocationFocus] = useState(false);

    const [country, setCountry] = useState('');
    const [validCountry, setValidCountry] = useState(false);
    const [countryFocus, setCountryFocus] = useState(false);

    const [buy_price, setbuy_price] = useState('');
    const [Validbuy_price, setValidbuy_price] = useState(false);
    const [buy_priceFocus, setbuy_priceFocus] = useState(false);

    const [first_bid, setfirst_bid] = useState('');
    const [validfirst_bid, setValidfirst_bid] = useState(false);
    const [first_bidFocus, setfirst_bidFocus] = useState(false);

    const [date, setdate] = useState('');
    const [validdate, setValiddate] = useState(false);
    const [dateFocus, setdateFocus] = useState(false);

    const [cordinates, setCordinates] = useState({ lng:37.9774919277906 , lat:23.73046875})

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name])

    useEffect(() => {
        var bool = [];
        var number = 0;
        for (let i=0; i < categories.length; i++) {
            //console.log(categories[i]);
            bool[i] = CATEGORY_REGEX.test(categories[i]);
            //console.log(bool[i]);
        } 
        for (let i=0; i < categories.length; i++){
            if(bool[i]=== true){
                number++;
                //console.log(number);
            }
        }

        if(number===categories.length){
            setValidCategories(true);
        }else{
            setValidCategories(false);
        }

    }, [categories])

    useEffect(() => {
        setValidDescription(CATEGORY_REGEX.test(description));
    }, [description])

    useEffect(() => {
        setValidlocation(NAME_REGEX.test(location));
    }, [location])

    useEffect(() => {
        setValidCountry(NAME_REGEX.test(country));
    }, [country])

    useEffect(() => {
        setValidbuy_price(AFM_REGEX.test(buy_price));
    }, [buy_price])
    
    useEffect(() => {
        setValidfirst_bid(AFM_REGEX.test(first_bid));
    }, [first_bid])

    useEffect(() => {
        setValiddate(CATEGORY_REGEX.test(date));
    }, [date])

    useEffect(() => {
        setErrMsg('');
    }, [name, categories, location, buy_price, country, first_bid, date])


    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(name);
       // const v2 = PWD_REGEX.test(pwd);
        if (!v1) {
            setErrMsg("Invalid Entry");
            return;
        }

        //var categories =  ["BANANA", "APPLE", "apple 14"];
        var current_bid =  first_bid; // aut
        //var first_bid  =  1;
        var nof_bids = 0; // aut
        //var buy_price  =  50;
        //var location  =  "home";
        var latitude =  cordinates.lat;
        var longitude =  cordinates.lng;
        var sellerId =  auth?.id; //aut
        //var country  =  "greece";
        //var description  =  "hi i am the best fruit";
        var runningAuction = true; // aut
        var ended = date

        console.log({ name, categories, current_bid, first_bid, nof_bids, buy_price, location, latitude, longitude, sellerId, country, description, ended});
        // var role = 'User';
        //console.log(name, categories, description, location, pwd , buy_price, country, first_bid)
        try {
           // console.log('yeaaah')
            const response = await axios.post(REGISTER_URL,
                { name, categories, first_bid, nof_bids, buy_price, location, latitude, longitude, sellerId, country, description,runningAuction, ended},
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
            setName('');
            setCategories('');
            setDescription('');
            setlocation('');
            setbuy_price('');
            setCountry('');
            setfirst_bid('');
            setdate('');
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

    const handleCategoriesChange = (e, index) => {
        const {value} = e.target;
        const list = [...categories];
        list[index] = value;
        setCategories(list);
    }

    const handleAdd = () => {
        setCategories([...categories,'']);
    }

    const handleRemove = (index) => {
        const list = [...categories];
        list.splice(index, 1);
        setCategories(list);
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
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>New Auction</h1>
                <form onSubmit={handleSubmit} className='new-auction'>
                    <label htmlFor="name">
                        Auction Name:
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="name"
                        ref={userRef}
                        autoComplete="on"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                    />
                    <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        3 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label htmlFor="categories">
                        Categories:
                        <FontAwesomeIcon icon={faCheck} className={validCategories ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validCategories || !categories ? "hide" : "invalid"} />
                    </label>

                    {categories.map((singleCategory,index) => (
                        <div className='categories-container' key={index}>
                            <div className='categories-wrapper'>
                                <input
                                    type="text"
                                    name='category'
                                    id="categories"
                                    autoComplete="on"
                                    value={singleCategory.category}
                                    onChange={(e) =>  handleCategoriesChange(e, index)}
                                    required
                                    aria-invalid={validCategories ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setCategoriesFocus(true)}
                                    onBlur={() => setCategoriesFocus(false)}
                                />
                                {categories.length - 1=== index && categories.length < 4 &&
                                (
                                    <button onClick={handleAdd} className='add-btn'>Add</button>
                                )}
                                
                            </div>
                            <div className='second-wrapper'>
                                {categories.length > 1 &&(
                                    <button onClick={()=> handleRemove(index)} className='remove-btn'>Remove</button>
                                )}
                                
                            </div>
                        </div>
                    ))}


                    <p id="firstnote" className={categoriesFocus && categories && !validCategories ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Fill the Categories
                    </p>

                    <label htmlFor="description">
                        Description:
                        <FontAwesomeIcon icon={faCheck} className={validDescription ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validDescription || !description ? "hide" : "invalid"} />
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        autoComplete="on"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                        aria-invalid={validDescription ? "false" : "true"}
                        aria-describedby="lastnote"
                        onFocus={() => setDescriptionFocus(true)}
                        onBlur={() => setDescriptionFocus(false)}
                    />



                    <label htmlFor="location">
                        Location:
                        <FontAwesomeIcon icon={faCheck} className={validlocation ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validlocation || !location ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="location"
                        autoComplete="on"
                        onChange={(e) => setlocation(e.target.value)}
                        value={location}
                        required
                        aria-invalid={validlocation ? "false" : "true"}
                        aria-describedby="locationnote"
                        onFocus={() => setlocationFocus(true)}
                        onBlur={() => setlocationFocus(false)}
                    />
                    <p id="locationnote" className={locationFocus && location && !validlocation ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        put the name of the country.<br />
                        e.x. Neos Kosmos
                    </p>



                    <label htmlFor="country">
                        Country:
                        <FontAwesomeIcon icon={faCheck} className={validCountry ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validCountry || !country ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="country"
                        id="country"
                        autoComplete="on"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        required
                        aria-invalid={validCountry ? "false" : "true"}
                        aria-describedby="countrynote"
                        onFocus={() => setCountryFocus(true)}
                        onBlur={() => setCountryFocus(false)}
                    />
                    <p id="countrynote" className={countryFocus && country && !validCountry ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        put the name of the country.<br />
                        e.x. Greece
                    </p>

                    <Map 
                        center = { cordinates }
                        draggable = { true }
                        title = " sample text "
                        onDragMarker = { (e) => {
                            console.log( "e" ,e );
                            let loc = { lat: e.lng, lng: e.lat };
                            setCordinates (loc);
                        }}
                    />

                    <div className='show-cordinates'>
                        

                        <div className='wrapper-1'>
                            <label htmlFor="Longitude">
                                Longitude:
                            </label>
                            <div className='long'>
                                {cordinates.lng}
                            </div>
                        </div>


                        <div className='wrapper-1'>
                            <label htmlFor="Latitude">
                                Latitude:
                            </label>
                            
                            <div className='lat'>{cordinates.lat}</div>
                            
                        </div>


                    </div>
                    
                    


                    <label htmlFor="buy_price">
                        But Price:
                        <FontAwesomeIcon icon={faCheck} className={Validbuy_price ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={Validbuy_price || !buy_price ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="buy_price"
                        id="buy_price"
                        autoComplete="on"
                        onChange={(e) => setbuy_price(e.target.value)}
                        value={buy_price}
                        required
                        aria-invalid={Validbuy_price ? "false" : "true"}
                        aria-describedby="buy_pricenote"
                        onFocus={() => setbuy_priceFocus(true)}
                        onBlur={() => setbuy_priceFocus(false)}
                    />
                    <p id="buy_pricenote" className={buy_priceFocus && buy_price && !Validbuy_price ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        put a price number.
                    </p>

                    <label htmlFor="first_bid">
                        First Bid:
                        <FontAwesomeIcon icon={faCheck} className={validfirst_bid ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validfirst_bid || !first_bid ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="first_bid"
                        id="first_bid"
                        autoComplete="on"
                        onChange={(e) => setfirst_bid(e.target.value)}
                        value={first_bid}
                        required
                        aria-invalid={validfirst_bid ? "false" : "true"}
                        aria-describedby="first_bidnote"
                        onFocus={() => setfirst_bidFocus(true)}
                        onBlur={() => setfirst_bidFocus(false)}
                    />
                    <p id="first_bidnote" className={first_bidFocus && first_bid && !validfirst_bid ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        put a price number.
                    </p>

                    <label htmlFor="date">
                        Ends:
                        <FontAwesomeIcon icon={faCheck} className={validdate ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validdate || !date ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="date"
                        id="date"
                        autoComplete="on"
                        onChange={(e) => setdate(e.target.value)}
                        value={date}
                        required
                        aria-invalid={validdate ? "false" : "true"}
                        aria-describedby="datenote"
                        onFocus={() => setdateFocus(true)}
                        onBlur={() => setdateFocus(false)}
                    />
                    <p id="datenote" className={dateFocus && date && !validdate ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        put a price number.
                    </p>

                    <button className='anim-btn' disabled={!validName  || !validCategories || !validDescription || !validlocation || !Validbuy_price || !validCountry || !validfirst_bid || !validdate ? true : false}>Start Auction</button>
                </form>
            </section>
        )}
    </>
  )
}

export default NewAuction