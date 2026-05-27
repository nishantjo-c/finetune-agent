import { useEffect, useState } from "react";
import chatcss from "./chatlist.module.scss";
import { Link } from "react-router-dom"

export function ChatLists () {
    const [chats, setChats] = useState([]);
    
    const allChats = async () => {
        let response = await fetch("http://localhost:8000/list_all", {
            "method": "GET"
        });
        response = await response.json();
        if(response.success === true){
            console.log(response.data)
            setChats(response.data);
        }
        return response;
    }

    useEffect(()=> {
        allChats()
        .then(response => response);
    }, []);

    return <>
        <div className={chatcss.wrapper}>
            {chats.map((val,key) => (
                <div key={key}>
                    <Link to='/'>
                        {val.id}
                    </Link>
                </div>
            ))}
        </div>
    </>
}
