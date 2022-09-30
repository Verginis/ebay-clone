import { useState, useEffect, useReducer } from "react"
import {Link} from 'react-router-dom'
import axios from "../api/axios";
import useAuth from '../hooks/useAuth';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/messages.scss'

const Sent = () => {
    const [messages, setmessages] = useState();
    const { auth } = useAuth();
    const [active, setActive] = useState(null);
    const [reducerValue, forceUpdate] = useReducer(x => x+1,0);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        //console.log(auth?.id)

        const getmessages = async () => {
            try {
                const response = await axios.get('/api/v1/messages/'+ auth?.id +'/sent', {
                headers: { 'Authorization': `bearer ${auth?.token}` }
                });
                //console.log(response?.data);
                setmessages(response?.data);
            } catch (err) {
                console.error(err);
            }
        }

        getmessages();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [reducerValue])

    function DeleteMessage(id) {

        axios.delete('/api/v1/messages/'+id+'/delete', {
            headers: { 'Authorization': `bearer ${auth?.token}` }
          })
        
          forceUpdate();
      }


  return (
    <div>
        <div className='messages-btns'>
            <div className='sent-btns'>
                <Link to='/messages' className='anim-btn not-active'>Inbox</Link>
                <Link to='/messages/sent' className='anim-btn active'>Sent</Link>
            </div>
            <Link to='/messages/sendmessage' className='anim-btn new-mes'>New message</Link>


            </div>
            <div>
                {messages?.length
                        ? (
                            <ul className="message-list">
                                
                                {messages.map(({i, id, recieverId, text}) => {
                                    return (
                                    <li key={i} className={`list-group-item ${active == id && 'active'}`}>
                                        <h3>To: {recieverId}</h3>
                                        <p>{text}</p>
                                        <button onClick={ function(event){ DeleteMessage(id);setActive(id);}}><FontAwesomeIcon icon={faTimes} className='invalid' /></button>
                                    </li>
                                    );
                                })}
                            </ul>
                        ) : <p>No messages to display</p>
                }
        </div>
    </div>
  )
}

export default Sent