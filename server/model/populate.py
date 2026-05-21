# SCHEMA POPULATION FUNCTION
from .index import Base, engine
from .chat_n_conv import Conversation, Chat

Conversation()
Chat()

Base.metadata.create_all(engine)