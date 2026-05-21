from .index import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey, Uuid, func
from uuid import UUID, uuid4
from datetime import datetime

class Conversation (Base):
    __tablename__ = "conversation"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    chat_name: Mapped[str]
    timestamp: Mapped[datetime] = mapped_column(insert_default=func.now())

    def __repr__(self):
        return f"Conversation(id={self.id!r}, chat_name={self.chat_name!r})"
    
class Chat (Base):
    __tablename__ = "chat"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    user: Mapped[str]
    agent: Mapped[str]
    convo: Mapped[UUID] = mapped_column(ForeignKey("conversation.id"))
    timestamp: Mapped[datetime] = mapped_column(insert_default=func.now())

    def __repr__(self):
        return f"Chat(id={self.id!r}, user={self.user!r}, agent={self.agent!r}, convo={self.convo!r})"