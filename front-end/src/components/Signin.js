import { useRef, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';


import axios from '../api/axios';
const LOGIN_URL = '/api/v1/login';

const Signin = () => {
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                      },
                    withCredentials: true
                }
            );
            //console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const token = response?.data?.token;
            const role = response?.data?.role;
            const id = response?.data?.id;
            setAuth({ user, pwd, role, token, id });
            console.log("Role is :", role);
            setUser('');
            setPwd('');
            if(role== 'Admin'){
                navigate("/admin");
            }else{
                navigate("/products");
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className='anim-btn'>Sign In</button>
                    </form>
                    <p>
                        Need an Account?
                        <span className="line">
                            <Link to='/register'>Sign Up</Link>
                        </span>
                    </p>
                </section>
    )
}

export default Signin