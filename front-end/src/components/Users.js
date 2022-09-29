import { useState, useEffect } from "react"
import axios from "../api/axios";
import useAuth from '../hooks/useAuth';
import { faCheck , faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/users.scss'


const LOGIN_URL = '/api/v1/users';
const ACCEPT_URL = '/api/v1/admin/users/:id/accept';

const Users = () => {
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
              const response = await axios.get(LOGIN_URL, {
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



  function giveAccess(id) {
    return axios.patch('/api/v1/admin/users/'+id+'/accept', {
        headers: { 'Authorization': `bearer ${auth?.token}` }
      });

    //   const getasers = async () => {
    //     try {
    //         await axios.patch('/api/v1/admin/users/:'+id+'/accept', {
    //           headers: { 'Authorization': `bearer ${auth?.token}` }
    //         });
            
            
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // getasers();

  }

  function denyAccess(id) {
    console.log(auth?.token);
    // return axios.patch('/api/v1/admin/users/'+id+'/decline', {
    //     headers: { 'Authorization': `bearer ${auth?.token}` }
    //   });

  }


  return (
    <div>
        <h2>User List</h2>
        {users?.length
                ? (
                    <div>
                        <ul>
                                <li>Username:</li>
                                <li>First Name:</li>
                                <li>Last Name:</li>
                                <li>Email:</li>
                                <li>Country:</li>
                                <li>Access</li>
                            </ul>
                       {users.map(({id, username, firstname,lastname, email, country, access}) => {
                            return (
                            <ul key={id}>
                                <li>{username}</li>
                                <li>{firstname}</li>
                                <li>{lastname}</li>
                                <li>{email}</li>
                                <li>{country}</li>
                                {access == 'GRANTED'
                                  ?<li>Accepted</li>
                                  :<li>
                                      <button onClick={()=> giveAccess(id)} ><FontAwesomeIcon icon={faCheck} className='valid' /></button>
                                      <button onClick={()=> denyAccess(id)}><FontAwesomeIcon icon={faTimes} className='invalid' /></button>
                                    </li>
                                }
                            </ul>
                            );
                        })}
                    </div>
                ) : <p>No users to display</p>
            }
    </div>
  )
}

export default Users