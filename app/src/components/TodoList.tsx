import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos }) =>  {

    return(
        <ul>
        {
            todos.map((todo, i) => {
                return (
                    <Todo
                        key={i}
                        id={todo.id}
                        title={todo.title}
                        descr={todo.description}
                        user={todo.user}
                    />
                )
            })
        }  
        </ul>
    );
  
}

export default TodoList; 