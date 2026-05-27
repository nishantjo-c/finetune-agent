import { useState, useEffect, useReducer } from 'react'
import { useSocket } from '../hooks/useSocket';
import { useDispatch, useSelector } from "react-redux"
import appscss from "./chatarea.module.scss";

export function Send ({msg, setMessage}){

    let [res,setRes] = useState("");
    let { sendMessage } = useSocket();
    const dispatch = useDispatch();


    async function getChatId() {
        let response = await fetch("http://localhost:8000", {
            "method": "POST",
            "body": JSON.stringify({
                "message":"Hey",
                "from":"user"
            })
        });
        response = await response.json();
        return response.data[0].chat_id;
    }

    function sendRequest() {  
        if(res === ""){
            getChatId()
            .then((response) => {
                setRes(response);
                sendMessage(msg, response).then(tempId => {
                    dispatch({
                        type: 'add',
                        id: res,
                        chat_id: tempId,
                        from: 'user',
                        message: msg,
                        timestamp: Date.now()
                    });
            
                    setMessage("");
                });
        
            });
        }else{
            const tempId = sendMessage(msg, res).then(tempId => {
                dispatch({
                    type: 'add',
                    id: res,
                    chat_id: tempId,
                    from: 'user',
                    message: msg,
                    timestamp: Date.now()
                });
        
                setMessage("");
            });
        }
    }

    return (
    <>
        <button className={appscss.sendbtn} onClick={sendRequest}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" 
                stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
        </button>
    </>
    )
}