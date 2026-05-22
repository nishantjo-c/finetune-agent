import { useState, useEffect, useReducer } from 'react'
import appscss from "./app.module.scss";
import { useSocket } from './hooks/useSocket';
import { taskReducer } from "./hooks/taskReducer";
import { useDispatch, useSelector } from "react-redux"

function App() {

  let [message,setMessage] = useState("");
  const messages = useSelector(state => state.data);
  const dispatch = useDispatch();
  let [btnstate,setBtnState] = useState(true);
  let [res,setRes] = useState("");
  let { sendMessage } = useSocket(res);
  // console.log(messages)
  useEffect(() => {
    fetch("http://localhost:8000/", {
      "method": "POST",
      "body": JSON.stringify({
        "message":"Hey",
        "from":"user"
      })
    })
    .then(response => response.json())
    .then(json => {
      setRes(json.data[0].chat_id)
    })
    .catch(error => console.log(error));
  }, []);


  function sendRequest() {    
    const tempId = sendMessage(message);

    dispatch({
      type: 'add',
      id: res,
      chat_id: tempId,
      from: 'user',
      message: message,
      timestamp: Date.now()
    });

    setMessage("");

  }

  return (
    <>
      <section className={appscss.airesponse}>
          {messages.map((msg,key) => (
            <div key={key}>{msg.message}</div>
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
        {btnstate && <button className={appscss.sendbtn} onClick={sendRequest}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" 
              stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>}
      </div>
    </>
  )
}

export default App
