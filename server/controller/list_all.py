from services.user_all_chats import all_chats
from fastapi.responses import JSONResponse
from utility.response_format import responseObj

async def list ():

    try:
        params = {}
        res = await all_chats(params)
        if res:
            responseFormat = responseObj(True, res)
            return JSONResponse(
                status_code=200,
                content=responseFormat
            )
        else:
            raise

    except: 
        print("Something went wrong!")
        responseFormat = responseObj(False, [], "Unknown Error!")
        return JSONResponse(status_code=500, content=responseFormat)