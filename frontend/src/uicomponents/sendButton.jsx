import { useState, useEffect, useReducer } from 'react'
import { useSocket } from '../hooks/useSocket';
import { useDispatch, useSelector } from "react-redux"
import appscss from "./chatarea.module.scss";
import { useNavigate } from 'react-router';

export function Send ({id, msg, setMessage, socket}){

    let [res,setRes] = useState(id);
    let { sendMessage } = useSocket();
    const dispatch = useDispatch();
    const navigate = useNavigate();


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

    async function sendRequest() {  
        if(res === ""){
            let response = await getChatId()
            setRes(response);
            let tempId = await sendMessage(msg, response);
            dispatch({
                type: 'add',
                id: res,
                chat_id: tempId,
                from: 'user',
                input: msg,
                message: "",
                timestamp: Date.now()
            });
    
            setMessage("");
            navigate(`/${response}`)
            
        }else{
            const tempId = await sendMessage(msg, res, socket);
            dispatch({
                type: 'add',
                id: res,
                chat_id: tempId,
                from: 'user',
                input: msg,
                message: "",
                timestamp: Date.now()
            });
    
            setMessage("");
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