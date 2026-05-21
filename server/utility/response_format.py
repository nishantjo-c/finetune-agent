from fastapi.encoders import jsonable_encoder

def responseObj(success: bool, data: list = [], error:str = None):
    if error:
        return jsonable_encoder({
            "success": success, 
            "data": data,
            "error": error
            })
    else:
        if type(data) == list:
            return jsonable_encoder({
                "success": success, 
                "data": data
                })
        else:
            return jsonable_encoder({
                "success": success, 
                "data": [data]
                })