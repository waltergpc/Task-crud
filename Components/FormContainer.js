import React from 'react'
import { useRouter } from 'next/router'
import  Link  from 'next/link'

const FormContainer = ( {children} ) => {

    const router = useRouter()

    return (
        <div>
            <header className='header-container'>
                <h1 className='container-title'>
                    <Link href='/'>
                        <a>
                        Task Manager App
                        </a>
                    </Link>
                </h1>
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
