from fastapi.responses import JSONResponse
from uuid import UUID
from utility.response_format import responseObj
from services.list_chat_history import chat_history

async def conversation_history(chat_id: UUID) :
    
    try:
        
        if chat_id == "":
            return JSONResponse(status_code=400, content=responseObj(False, [], "Bad Request!"))
        
        response_id = chat_history({"chat_id":chat_id})
        
        if len(response_id) >= 0:
            return JSONResponse(status_code=200, content=responseObj(True, response_id))
        return JSONResponse(status_code=400, content=responseObj(False, [], "Something Went Wrong!"))

    except:
        return JSONResponse(status_code=500, content=responseObj(False, [], "Internal Server Error!"))