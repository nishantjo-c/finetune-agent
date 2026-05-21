from sqlalchemy.orm import Session
from model.index import engine
from sqlalchemy import select
from model.chat_n_conv import Conversation, Chat

async def all_chats (params):

    try:
        
        session = Session(engine)
        queryResponse = select(Conversation.id).join(target= Chat)
        execution = session.execute(queryResponse)
        raw_data = execution.mappings().all()
        
        return raw_data
            

    except:
        print("Something went wrong!")
        return False