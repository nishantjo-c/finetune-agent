export function taskReducer(tasks = [], action){
    // id = conversation id 
    switch (action.type) {
        case 'add' : {
            return [
                ...tasks,
                {
                    id: action.id,
                    chat_id: action.chat_id,
                    from: action.from,
                    message: action.message,
                    timestamp: action.timestamp
                }
            ]
        }
        case 'update' : {
            const ifExists = tasks.find(data => data.chat_id == action.chat_id)
            if(ifExists !== undefined){
                return tasks.map(data => {
                    if (data.chat_id == action.chat_id){
                        return {
                            ...data,
                            message: action.message
                        }
                    }else 
                        return data;
                })
            }
            return [
                ...tasks,
                {
                    id: action.id,
                    chat_id: action.chat_id,
                    from: action.from,
                    message: action.message,
                    timestamp: action.timestamp
                }
            ]
        }

        default: {
            return tasks
        }
    }
}
