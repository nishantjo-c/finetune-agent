import { useEffect, useRef, useReducer, useState } from "react";
import { taskReducer } from "./taskReducer";
import { useDispatch, useSelector } from "react-redux"

export const useSocket = (data) => {
    const connection = useRef(null);
    const dispatch = useDispatch();
    let res = "";
    useEffect(() => {
        if(data === "") return;
        const socket = new WebSocket(`ws://127.0.0.1:8000/ws/${data}`);
        connection.current = socket;
        
        socket.onopen = () => {
            // socket.send("Connection established!");
            console.log("Connection established!");
        }

        socket.onmessage = ( event ) => {
            const data = JSON.parse(event.data);
            console.log(data)
            if(!data.done){
                res += data.msg;
                
                dispatch({
                    type: 'update',
                    id: data.id,
                    from: 'ai',
                    message: res,
                    timestamp: data.time
                })
            }else{
                res = "";
            }
            
        }

        socket.onclose = () => {
            console.log("Disconnected!");
        }


        return () => socket.close()
    }, [data]);

    const sendMessage = (message) => {
        if(connection.current && connection.current.readyState === WebSocket.OPEN){
            connection.current.send(message);
        }
    }

    return {
        socket: connection.current,
        sendMessage
    }
}