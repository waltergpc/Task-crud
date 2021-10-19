import React, { useState, useEffect } from 'react'
import FormContainer from '../../Components/FormContainer'
import { useRouter } from 'next/router'
import { useTasks } from '../../Components/taskContext'

const SingleTask = () => {

    const { tasks } = useTasks()
    const [task, setTask] = useState(undefined)

    const router = useRouter()
    const id = router.query.id

    useEffect(() => {
        const taskFound = tasks.find(el => el.id == id)
        if(taskFound === undefined) {
            setTask(null)
        } else {
            setTask({title: taskFound.title, description: taskFound.description, urgency: taskFound.urgency})
            }
        console.log(task)
        },[])
   

        return (
        task === null ? (
        <FormContainer>
            <h2> No existing task</h2>
        </FormContainer> ) :
        (
        <FormContainer>
            <h2>{task.title}</h2>
            <div>{task.description}</div>
        </FormContainer>
    )
        )
}

export default SingleTask
