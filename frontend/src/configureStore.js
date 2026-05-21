import { configureStore } from "@reduxjs/toolkit"
import { taskReducer } from './hooks/taskReducer'

const store = configureStore({
    reducer: {
        data : taskReducer
    }
})

export default store