import { useState, useEffect, useReducer } from 'react'
import appscss from "./chatarea.module.scss";
import { taskReducer } from "../hooks/taskReducer";
import { useSelector } from "react-redux"
import { Send } from './sendButton';

export function ChatArea () {

    let [message,setMessage] = useState("");
    const messages = useSelector(state => state.data);
    let [btnstate,setBtnState] = useState(true);

    return (
        <>
          <div className={appscss.wrapper}>
            <input 
              className={appscss.chatbox} 
              type='text' 
              name='chatinput' 
              placeholder='Ask anything...' 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {btnstate && <Send id={""} status={btnstate} msg={message} setMessage={setMessage} />}
          </div>
        </>
    )
}