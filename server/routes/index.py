from fastapi import APIRouter
from controller.connect_chat import connectToChat
from controller.initiate_new_chat import requestNew
from controller.list_all import list
from controller.conversation_history import conversation_history

router = APIRouter()

router.post("/")(requestNew)
router.get("/list_all")(list)
router.get("/{chat_id}")(conversation_history)
router.websocket("/ws/{chat_id}")(connectToChat)