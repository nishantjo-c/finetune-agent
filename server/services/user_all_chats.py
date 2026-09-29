from sqlalchemy.orm import Session
from model.index import engine
from sqlalchemy import select
from model.chat_n_conv import Conversation, Chat

async def all_chats (params):

    try:
        
        session = Session(engine)
        queryResponse = select(Conversation.id)
        raw_data = session.execute(queryResponse).mappings().fetchall()
        
        return raw_data
            

    except:
        print("Something went wrong!")
        return False