export function taskReducer(tasks = [], action){
    switch (action.type) {
        case 'add' : {
            return [
                ...tasks,
                {
                    id: action.id,
                    from: action.from,
                    message: action.message,
                    timestamp: action.time
                }
            ]
        }
        case 'update' : {
            if (tasks.length > 0) {
                return tasks.map(data => {
                    if (data.id == action.id){
                        return {
                            ...data,
                            message: action.message
                        }
                    }
                    return data;
                })
            }else{
                return [
                    ...tasks,
                    {
                        id: action.id,
                        from: action.from,
                        message: action.message,
                        timestamp: action.time
                    }
                ];
            }

        }

        default: {
            return tasks
        }
    }
}
