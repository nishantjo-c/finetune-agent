import { useEffect, useRef, useReducer, useState } from "react";
import { taskReducer } from "./taskReducer";
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import utf8 from "utf8"

export const useSocket = () => {
    const connection = useRef(null);
    const dispatch = useDispatch();
    let res = useRef("");

    const connectSocket = (chatId) => {
        return new Promise((resolve,reject) => {

            if (connection.current && connection.current.readyState === WebSocket.OPEN){
                resolve(connection.current);
                return;
            }

            const socket = new WebSocket(`ws://127.0.0.1:8000/ws/${chatId}`);
            connection.current = socket;

            socket.onopen = ( event ) => {
                console.log("Connection Established!");
                resolve(socket);
            }

            socket.onmessage = ( event ) => {
                const data = JSON.parse(event.data);
                if(!data.done){

                    res.current += data.msg;

                    dispatch({
                        type: 'update',
                        id: data.id,
                        chat_id: data.chat_unique_id,
                        temp_id: data.temp_id,
                        from: 'ai',
                        message: res.current,
                        timestamp: data.time
                    })
                } else {
                    res.current = "";
                }
            }

            socket.onclose = () => {
                console.log("Disconnected!");
            }

            socket.onerror = (err) => {
                reject(err);
            }
        })
    } 

    const sendMessage = async (message, chatId) => {        
        const socket = await connectSocket(chatId);
        const initiateID = uuidv4();
        if(socket.readyState === WebSocket.OPEN){
            const sendData = utf8.encode(JSON.stringify({"id": initiateID, "message": message}));
            await socket.send(sendData);
        }
        return initiateID;
    }

    useEffect(() => {
        return () => {
            if(socket.current) {
                socket.current.onclose();
            }
        }
    }, []);

    return {
        sendMessage
    }
}