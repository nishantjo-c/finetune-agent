from dotenv import load_dotenv, dotenv_values
import httpx
import json
from socket_requests.connection import manager
from sqlalchemy.orm import Session
from model.index import engine
from model.chat_n_conv import Chat
from datetime import datetime

load_dotenv()
config = dotenv_values(".env")

async def inputChat(input, websocket):

    try:
        input_prompt = input['data']
        ai_response = []
        chat_id = ""
        async with httpx.AsyncClient(timeout=None) as client:
            async with client.stream(
                "POST",
                f"{config.get("IP")}/api/generate",
                json={
                    "model": "qwen2.5:7b",
                    "prompt": input_prompt
                }
            ) as response:
                
                current_time = datetime.now()
                chat_entry = Chat(
                    convo= input['id'],
                    user= input_prompt,
                    agent= "",
                    timestamp= str(current_time)
                )

                with Session(engine) as session:
                    try:
                        session.add(chat_entry)
                        session.commit()
                        chat_id = chat_entry.id
                    except: 
                        session.rollback()
                        raise

                async for line in response.aiter_lines():
                    try:
                        if line:
                            ai_data = json.loads(line)
                            text = ai_data.get("response")
                            ai_response.append(text)
                            sendMsg = {
                                "id": str(input['id']), 
                                "msg":text, 
                                "done": ai_data.get("done"), 
                                "time":str(current_time), 
                                "chat_unique_id": str(chat_entry.id)
                                }
                            await manager.send_personal_text(json.dumps(sendMsg), websocket)
                    except:
                        print("Error occured!")
        
        ai_final_response = "".join(ai_response)
        with Session(engine) as session:
            try:
                session.query(Chat).filter(Chat.id == chat_id).update({'agent': ai_final_response})
                session.commit()
            except:
                session.rollback()
                raise
    except:
        print("Something went wrong!")
                
    return