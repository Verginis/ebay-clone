import { useState, useEffect } from "react"
import axios from "../api/axios";
import useAuth from '../hooks/useAuth';
import { faCheck , faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/users.scss'


const LOGIN_URL = '/api/v1/users';


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
  }, [auth?.token])



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
    return axios.patch('/api/v1/admin/users/'+id+'/decline', {
        headers: { 'Authorization': `bearer ${auth?.token}` }
      });

  }


  return (
    <div>
        <h2>User List</h2>
        {users?.length
                ? (
                    <div className="users-cont">
                        
                       {users.map(({id, username, firstname,lastname, email, country, access}) => {
                            return (
                            <ul key={id} className="user-list">
                                <li className="uu">{username}</li>
                                <li className="ff">{firstname}</li>
                                <li className="ll">{lastname}</li>
                                <li className="ee">{email}</li>
                                <li className="cc">{country}</li>
                                {access === 'GRANTED'
                                  ?<li className="aa">Accepted</li>
                                  :<li className="aa">
                                      <button onClick={()=> giveAccess(id)} ><FontAwesomeIcon icon={faCheck} className='valid' /></button>
                                      <button onClick={()=> denyAccess(id)}><FontAwesomeIcon icon={faTimes} className='invalid' /></button>
                                    </li>
                                }
                            </ul>
                            );
                        })}
                        <ul className="user-list bold-up">
                                <li className="uu">Username:</li>
                                <li className="ff">First Name:</li>
                                <li className="ll">Last Name:</li>
                                <li className="ee">Email:</li>
                                <li className="cc">Country:</li>
                                <li className="aa">Access</li>
                          </ul>
                    </div>
                ) : <p>No users to display</p>
            }
    </div>
  )
}

export default Users