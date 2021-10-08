import React from 'react'
import { useRouter } from 'next/router'

const FormContainer = ( {children} ) => {

    const router = useRouter()

    return (
        <div>
            <header className='header-container'>
                <h1 className='container-title'>Task Manager App</h1>
                <button className='add-task-button' onClick={() => router.push('/newtask')}>
                Add Task
                </button>
            </header>

            <main className='main-container'>
                {children}
            </main>
        </div>
    )
}

export default FormContainer
