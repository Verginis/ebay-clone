import { useState, useEffect } from "react"
import axios from "../api/axios";
import useAuth from '../hooks/useAuth';
import { faCheck , faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/users.scss'

const LOGIN_URL = '/api/v1/users';
const ACCEPT_URL = '/api/v1/items/';

const UserAuctions = () => {
  const [users, setUsers] = useState();
  const { auth } = useAuth();

  // console.log(auth?.token);
  // const response =  axios.get(LOGIN_URL, {
  //   headers: { 'Authorization': `bearer ${auth?.token}` }
  // });
  // console.log(response.data);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
        try {
            const response = await axios.get('/api/v1/items/'+ auth?.id, {
              headers: { 'Authorization': `bearer ${auth?.token}` }
            });
            console.log(JSON.stringify(response?.data));
            isMounted && setUsers(response.data);
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
        <h2>User List</h2>
        {users?.length
                ? (
                    <div>
                      
                       {users.map(({name,country}) => {
                            return (
                            <ul>
                                <li>{name}</li>
                                <li>{country}</li>
                            </ul>
                            );
                        })}
                    </div>
                ) : <p>No users to display</p>
            }
    </div>
  )
}

export default UserAuctions