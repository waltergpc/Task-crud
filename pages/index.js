import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useTasks } from '../Components/taskContext'
import FormContainer from '../Components/FormContainer'
import Link from 'next/link'
import { VscTrash } from "@react-icons/all-files/vsc/VscTrash"
import { useEffect } from 'react'
import axios from 'axios'


export default function Home() {

  const { tasks, dispatch } = useTasks()

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }, [])

  const itemBackground = (item) => {
    if(item === 'Can wait') {
      return 'blue-task-item'
    } else if(item === 'regular') {
      return 'green-task-item'
    } else {
      return 'red-task-item'
    }
  }


  const handleDelete = (task) => {
    axios({url: `http://127.0.0.1:5000/delete/${task.id}`
    , method: 'delete', data: task})
    .then(res => dispatch({type: 'DELETE', payload: res.data},
      console.log(res)))
    .catch(err => console.log(err))
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Task App</title>
        <meta name="Task-app" content="An app created to handle your to-do's" />
      </Head>
      <FormContainer>
        <div className='task-flex'>
        {tasks.map(task => 
        <div key={task.title} className={itemBackground(task.urgency.name)}>
          <div className='task-text'><Link href={`/edit/${task.id}`}><a>{task.title}</a></Link></div>
          <button className='delete-button' 
          onClick={() => handleDelete(task)}><VscTrash/>
          </button>
        </div>)}
        </div>
      </FormContainer>
    </div>
  )
}
