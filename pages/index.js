import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useTasks } from '../Components/taskContext'
import FormContainer from '../Components/FormContainer'
import Link from 'next/link'
import { VscTrash } from "@react-icons/all-files/vsc/VscTrash"


export default function Home() {

  const { tasks, dispatch } = useTasks()

  const itemBackground = (item) => {
    if(item === 'Can wait') {
      return 'blue-task-item'
    } else if(item === 'regular') {
      return 'green-task-item'
    } else {
      return 'red-task-item'
    }
  }

 console.log(tasks)

  return (
    <div className={styles.container}>
      <Head>
        <title>Task App</title>
        <meta name="Task-app" content="An app created to handle your to-do's" />
      </Head>
      <FormContainer>
        <div className='task-flex'>
        {tasks.map(task => 
        <div key={task.title} className={itemBackground(task.urgency)}>
          <div className='task-text'><Link href={`/edit/${task.id}`}><a>{task.title}</a></Link></div>
          <button className='delete-button' 
          onClick={() => dispatch({type: 'DELETE', payload: task})}><VscTrash/>
          </button>
        </div>)}
        </div>
      </FormContainer>
        
      
      
    
    </div>
  )
}
