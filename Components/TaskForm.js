import React, { useState, useEffect } from 'react'
import { useTasks } from './taskContext'
import { useRouter } from 'next/router'

const TaskForm = () => {

    const { tasks, dispatch } = useTasks()

    const [task, setTask] = useState({title:'', description:'', urgency:'regular'})

    const router = useRouter()

    useEffect(() => {
        if(router.query.id) {
            const taskFound = tasks.find(el => el.id == router.query.id)
            setTask({title: taskFound.title, description: taskFound.description, urgency: taskFound.urgency})
        }
    }, [])

    const handleChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!router.query.id) {
            dispatch({type: 'ADD_TASK', payload: task})
        }
        else {
            dispatch({type: 'UPDATE_TASK', payload: {...task, id: router.query.id}})
        }
        setTask({title:'', description:'', urgency:'regular'})
        router.push('/')
    }

    return (
        <div className='form-div'>
            <form className='form' onSubmit={handleSubmit}>
            <h3>Add a task</h3>
                <input 
                type='text'
                name='title'
                placeholder='Task title'
                className='title-input'
                value={task.title}
                onChange={handleChange} />
                <textarea 
                name='description'
                placeholder='Write a description'
                className='description-input'
                value={task.description}
                onChange={handleChange}/>
                <select name='urgency' className='urgency-select' value={task.urgency} onChange={handleChange}>
                    <option value={'regular'}>Regular</option>
                    <option value={'Urgent'}>Urgent</option>
                    <option value={'Can wait'}>Can wait</option>
                </select>
                <button className='submit-button' type='submit' disabled={!task.title}>Save</button>
            </form>
        </div>
    )
}

export default TaskForm
