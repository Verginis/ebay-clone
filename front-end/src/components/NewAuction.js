import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { faCheck , faTimes , faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import completed from '../assets/completed.jpg'
import {Link} from 'react-router-dom'
import axios from '../api/axios'
import '../styles/forms.scss'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const NAME_REGEX = /^[a-zA-Z ]{3,24}$/;
// eslint-disable-next-line
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const AFM_REGEX = /^[0-9]{4,10}$/;
const REGISTER_URL = '/api/v1/items';

const NewAuction = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [firstname, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstnameFocus, setFirstNameFocus] = useState(false);

    const [lastname, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastnameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [country, setCountry] = useState('');
    const [validCountry, setValidCountry] = useState(false);
    const [countryFocus, setCountryFocus] = useState(false);

    const [afm, setafm] = useState('');
    const [validafm, setValidafm] = useState(false);
    const [afmFocus, setafmFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstname));
    }, [firstname])

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastname));
    }, [lastname])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPhoneNumber(AFM_REGEX.test(phoneNumber));
    }, [phoneNumber])
    
    useEffect(() => {
        setValidCountry(NAME_REGEX.test(country));
    }, [country])

    useEffect(() => {
        setValidafm(AFM_REGEX.test(afm));
    }, [afm])

    useEffect(() => {
        setErrMsg('');
    }, [user, firstname, email, phoneNumber, country, afm])


    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
       // const v2 = PWD_REGEX.test(pwd);
        if (!v1) {
            setErrMsg("Invalid Entry");
            return;
        }


        var name =  "item-7";
        var categories =  ["BANANA", "APPLE", "apple 14"];
        var current_bid =  1;
        var first_bid  =  1;
        var nof_bids = 0;
        var buy_price  =  50;
        var location  =  "home";
        var latitude =  62.6;
        var longitude =  64.5;
        var sellerId =  2;
        var country  =  "greece";
        var description  =  "hi i am the best fruit";
        var runningAuction = true;
        console.log({ name, categories, current_bid, first_bid, nof_bids, buy_price, location, latitude, longitude, sellerId, country, description});
       // var role = 'User';
        //console.log(user, firstname, lastname, email, pwd , phoneNumber, country, afm)
        try {
           // console.log('yeaaah')
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ name, categories, first_bid, nof_bids, buy_price, location, latitude, longitude, sellerId, country, description,runningAuction}),
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
            setUser('');
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setCountry('');
            setafm('');
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
                <p>
                    <Link to='/login'>Sign In</Link>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>New Auction</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="on"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        3 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label htmlFor="firstname">
                        Firstname:
                        <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstname ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        autoComplete="on"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstname}
                        required
                        aria-invalid={validFirstName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setFirstNameFocus(true)}
                        onBlur={() => setFirstNameFocus(false)}
                    />
                    <p id="firstnote" className={firstnameFocus && firstname && !validFirstName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        3 to 24 characters.<br />
                        e.x. John
                    </p>

                    <label htmlFor="lastname">
                        Lastname:
                        <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validLastName || !lastname ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        autoComplete="on"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastname}
                        required
                        aria-invalid={validLastName ? "false" : "true"}
                        aria-describedby="lastnote"
                        onFocus={() => setLastNameFocus(true)}
                        onBlur={() => setLastNameFocus(false)}
                    />
                    <p id="lastnote" className={lastnameFocus && lastname && !validLastName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        3 to 24 characters.<br />
                        e.x. Doe
                    </p>


                    <label htmlFor="email">
                        Email:
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="on"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        e.x. jondoe@gmail.com
                    </p>

                    <label htmlFor="phoneNumber">
                        Phone Number:
                        <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="phoneNumber"
                        id="phoneNumber"
                        autoComplete="on"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        required
                        aria-invalid={validPhoneNumber ? "false" : "true"}
                        aria-describedby="phoneNumbernote"
                        onFocus={() => setPhoneNumberFocus(true)}
                        onBlur={() => setPhoneNumberFocus(false)}
                    />
                    <p id="phoneNumbernote" className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 10 numbers.
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

                    <label htmlFor="afm">
                        AFM:
                        <FontAwesomeIcon icon={faCheck} className={validafm ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validafm || !afm ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="afm"
                        id="afm"
                        autoComplete="on"
                        onChange={(e) => setafm(e.target.value)}
                        value={afm}
                        required
                        aria-invalid={validafm ? "false" : "true"}
                        aria-describedby="afmnote"
                        onFocus={() => setafmFocus(true)}
                        onBlur={() => setafmFocus(false)}
                    />
                    <p id="afmnote" className={afmFocus && afm && !validafm ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 10 numbers.
                    </p>

                    <button className='anim-btn' disabled={!validName  || !validFirstName || !validLastName || !validEmail || !validPhoneNumber || !validCountry || !validafm ? true : false}>Sign Up</button>
                </form>
                <p>
                    Already registered?
                    <span className="line">
                        <Link to='/login'> Sign In</Link>
                    </span>
                </p>
            </section>
        )}
    </>
  )
}

export default NewAuction