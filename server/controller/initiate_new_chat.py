from services.new_chat import newChat
from fastapi import Request
from fastapi.responses import JSONResponse
from utility.response_format import responseObj

async def requestNew (request: Request):

    try:
        input = await request.json()
        print(input)

        if "message" not in input or "from" not in input:
            raise KeyError
        
        res = newChat(input)

        if res:
            return JSONResponse(
                    status_code=200, 
                    content=responseObj(True, res)
                )
        else:
            return JSONResponse(status_code=500, content=responseObj(False, [], "Internal Server Error!"))    

    except KeyError:
        print("Insufficient Parameter(s)")
        return JSONResponse(status_code=400, content=responseObj(False, [], "Insufficient Parameter(s)"))
    