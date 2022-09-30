import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { faCheck , faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import completed from '../assets/completed.jpg'
import {Link} from 'react-router-dom'
import useAuth from "../hooks/useAuth";
import axios from '../api/axios'
import '../styles/forms.scss'

const USER_REGEX = /^[A-z][A-z0-9-_]{0,24}$/;
const NAME_REGEX = /^([^\s])/;

const NewMessage = () => {
    const { auth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [message, setMessage] = useState('');
    const [validMessage, setvalidMessage] = useState(false);
    const [messageFocus, setmessageFocus] = useState(false);


    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setvalidMessage(NAME_REGEX.test(message));
    }, [message])

   

    useEffect(() => {
        setErrMsg('');
    }, [user, message])


    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
       // const v2 = PWD_REGEX.test(pwd);
        if (!v1) {
            setErrMsg("Invalid Entry");
            return;
        }

        
        var senderId= auth?.id;
        //var text= "what a nice ass";
        console.log({user, senderId, message});
       // var role = 'User';
        //console.log(user, message, lastname, email, pwd , phoneNumber, country, afm)
        try {
           // console.log('yeaaah')
            const response = await axios.post('/api/v1/messages/'+user+'/send',
                JSON.stringify({ senderId, text: message}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            //console.log(response?.accessToken);
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setMessage('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 500) {
                setErrMsg('Username Does Not Exist');
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
                    Your message has been successfully sent.<br/>
                    Return to <Link to='/products'>Home</Link>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>New Message</h1>
                <form onSubmit={handleSubmit} className='messageform'>
                    <label htmlFor="username">
                        To:
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

                    <label htmlFor="message">
                        Message:
                        <FontAwesomeIcon icon={faCheck} className={validMessage ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMessage || !message ? "hide" : "invalid"} />
                    </label>
                    <textarea
                        type="text"
                        id="message"
                        autoComplete="on"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        required
                        aria-invalid={validMessage ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setmessageFocus(true)}
                        onBlur={() => setmessageFocus(false)}
                    />

                    

                    <button className='anim-btn' disabled={!validName  || !validMessage  ? true : false}>Send</button>
                </form>
            </section>
        )}
    </>
  )
}

export default NewMessage