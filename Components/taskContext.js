import React, { useReducer, createContext, useContext } from 'react'
import { v4 as uuid } from 'uuid'

const initialState = [{title: 'pasear al tony', id: '123454232434', description: 'veloz'}]

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TASK':
            return [...state, {...action.payload}] 
        case 'DELETE':
            return [...state.filter((task) => task.id !== action.payload.id)]
        case 'UPDATE_TASK':
            return [...state.map(task => task.id === action.payload.id ? {...task, ...action.payload} : task)]
        default:
            return state
        }
    }
const TaskContext = createContext()

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ( { children } )  => {


    const [tasks, dispatch] = useReducer(reducer, initialState)

    

    return (
        <TaskContext.Provider value={ {dispatch, tasks} }>
            {children}
        </TaskContext.Provider>
    )
}


