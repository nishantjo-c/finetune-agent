import { Send } from './sendButton';
import appscss from "./conversationarea.module.scss";
import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../hooks/useSocket';
import { data, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

export function ConversationArea () {

    let [message,setMessage] = useState("");
    let [btnstate,setBtnState] = useState(true);
    let params = useParams();
    const dispatch = useDispatch();
    const messages = useSelector(state => state.data);
    const { connectSocket } = useSocket();
    const socket = useRef(null);

    const chatHistory = async (id) => {
        let response = await fetch(`http://localhost:8000/${id}`, {
            method: 'GET'
        });
        response = await response.json();
        if(response.success === true){
            console.log(response.data);
        }
        return response.data;
    }
    useEffect(()=>{
        // CALL CHAT CONVERSATION AND LOAD IT ON REDUX
        console.log("yeh hua\n",messages)
        chatHistory(params.id).then(response => {
            console.log("yhaaaaaase\n",response)
            dispatch({
                type: 'load',
                chatData: response
            })
        });
        connectSocket(params.id).then(response => socket.current = response);

    }, []);

    return (
        <>
        <section className={appscss.airesponse}>
            {messages.map((msg,key) => (
                <div key={key}>
                    <div>{msg.input}</div>
                    <div>{msg.message}</div>
                </div>
            ))}
        </section>
        <div className={appscss.wrapper}>
            <input 
              className={appscss.chatbox} 
              type='text' 
              name='chatinput' 
              placeholder='Ask anything...' 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {btnstate && <Send id={params.id} status={btnstate} msg={message} setMessage={setMessage} socket={socket.current} />}
        </div>
        </>
    )
}