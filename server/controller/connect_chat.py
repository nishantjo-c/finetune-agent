from socket_requests.connection import manager, WebSocket, WebSocketDisconnect
from services.agent_call import inputChat
from sqlalchemy.orm import Session
from sqlalchemy import select
from model.index import engine
from model.chat_n_conv import Conversation
from uuid import UUID

async def connectToChat(websocket: WebSocket, chat_id: UUID):

    try:
        session = Session(engine)
        validate_id = select(Conversation).where(Conversation.id == chat_id)
        print(session.scalars(validate_id).one())
    except:
        print("Invalid client!")
        return

    try:
        await manager.connect(websocket)
        while True:
            data = await websocket.receive_text()
            await inputChat({"id": chat_id,"data": data}, websocket)
    
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        return