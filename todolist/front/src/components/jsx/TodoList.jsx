import React from 'react';
import '../css/TodoList.css';

const TodoList = ({form, children}) =>{
    return(
        <>
        <main className='todo-list-template'>
            <div className='todo-list-title'>
                오늘 할 일
            </div>  
            <section className='form-wrapper'>
                {form}    
            </section>
            <section className='todoitemList-wrapper'>
                {children}
            </section> 
        </main>
        </>
    );
};

export default TodoList;