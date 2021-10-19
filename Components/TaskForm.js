import React, { useState, useEffect } from 'react'
import { useTasks } from './taskContext'
import { useRouter } from 'next/router'
import axios from 'axios'

const TaskForm = () => {

    const { tasks, dispatch } = useTasks()
    const today = Date.now()

    const [task, setTask] = useState({title:'', description:'', urgency:'regular', date: 'Not set'})

    const router = useRouter()

    useEffect(() => {
        if(router.query.id) {
            const taskFound = tasks.find(el => el.id == router.query.id)
            setTask({title: taskFound.title, description: taskFound.description, urgency: taskFound.urgency})
        }
    }, [])

    const handleChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value})
        console.log(task)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!router.query.id) {
            axios({url: 'http://127.0.0.1:5000/newtask', method: 'post', data: task})
            .then(res => dispatch({type: 'ADD_TASK', payload: res.data}))
            .catch(err => console.log(err))
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
                placeholder='Write a description, urls or other useful info'
                className='description-input'
                value={task.description}
                onChange={handleChange}/>
                <select name='urgency' className='urgency-select' value={task.urgency} onChange={handleChange}>
                    <option value={'Regular'}>Regular</option>
                    <option value={'Urgent'}>Urgent</option>
                    <option value={'Can wait'}>Can wait</option>
                </select>
                <div className='date-div'>
                <label> Done before?</label>
                <input
                type = 'date'
                name = 'date'
                placeholder = 'Done before?'
                className = 'date-input'
                value={task.date}
                onChange={handleChange}
                ></input>
                </div>
                <button className='submit-button' type='submit' disabled={!task.title}>Save</button>
            </form>
        </div>
    )
}

export default TaskForm
