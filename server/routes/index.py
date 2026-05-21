from fastapi import APIRouter
from controller.connect_chat import connectToChat
from controller.initiate_new_chat import requestNew
from controller.list_all import list

router = APIRouter()

router.post("/")(requestNew)
router.get("/list_all")(list)
router.websocket("/ws/{chat_id}")(connectToChat)