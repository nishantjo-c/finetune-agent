from sqlalchemy.orm import Session
from model.index import engine
from model.chat_n_conv import Conversation, Chat
from sqlalchemy import select

def chat_history (params):

    try:

        session = Session(engine)
        validate_id = select(Conversation).where(Conversation.id == params['chat_id'])
        query_response = session.execute(validate_id).scalar_one_or_none()

        if query_response is not None:
            chat_data = select(Chat.id,Chat.user,Chat.agent,Chat.convo,Chat.timestamp).where(Chat.convo == params['chat_id'])
            query_response = session.execute(chat_data).mappings().fetchall()
            return query_response

        return False
    except:
        return False