from sqlalchemy.orm import Session
from model.index import engine
from model.chat_n_conv import Conversation

def newChat (params):

    try:
        new_chat = Conversation(
            chat_name= "new_chat"
        )

        with Session(engine) as session:
            try:       
                session.add(new_chat)
                session.commit()
                responseObj = {
                    "chat_id": str(new_chat.id)
                }
                return responseObj
            
            except:
                session.rollback()
                raise
    except:
        return False