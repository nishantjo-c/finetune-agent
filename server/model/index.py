from sqlalchemy import create_engine
engine = create_engine("postgresql://postgres:2001@localhost:5432/trainagent", echo=True)

from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

