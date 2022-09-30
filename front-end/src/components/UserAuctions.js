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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(auth?.id)

    const getUsers = async () => {
        try {
            const response = await axios.get('/api/v1/items/'+auth?.id, {
              headers: { 'Authorization': `bearer ${auth?.token}` }
            });
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
        <h2>User List</h2>
        {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.name}</li>)}
                    </ul>
                ) : <p>No users to display</p>
        }
    </div>
  )
}

export default UserAuctions